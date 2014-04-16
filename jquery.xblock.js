//
// Copyright (C) 2014 edX
//
// Authors:
// Xavier Antoviaque <xavier@antoviaque.org>
//
// This software's license gives you freedom; you can copy, convey,
// propagate, redistribute and/or modify this program under the terms of
// the GNU Affero General Public License (AGPL) as published by the Free
// Software Foundation (FSF), either version 3 of the License, or (at your
// option) any later version of the AGPL published by the FSF.
//
// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
// General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program in a file in the toplevel directory called
// "AGPLv3". If not, see <http://www.gnu.org/licenses/>.
//

(function($) {

    $.xblock = {
        window: window,

        location: location,

        default_options: {
            usageId: null,       // [Mandatory] The usage id of the XBlock to display
            sessionId: null,     // [Mandatory] User session id from the LMS
            baseDomain: null,    // Common part of the client & LMS domain names
                                 // (eg: `example.com`, defaults to current domain)
            lmsSubDomain: 'lms', // The subdomain part for the LMS (eg, `lms` for `lms.example.com`)
            lmsSecureURL: false, // Is the LMS on HTTPS?
        },

        loadResource: function(resource, options, root) {
            console.log('Loading XBlock resource', resource);

            if (resource.kind === 'url') {
                var resourceURL = this.getLmsBaseURL(options) + resource.data,
                    deferred = $.Deferred().resolve(); // By default, don't wait for the resource to load

                if (resource.mimetype === 'text/css') {
                    $('head').append('<link href="' + resourceURL + '" rel="stylesheet" />')
                } else if (resource.mimetype === 'application/javascript') {
                    deferred = $.getScript(resourceURL);
                } else {
                    console.log('Unknown XBlock resource mimetype', resource.kind);
                }
            } else if (resource.kind === 'text') {
                if (resource.mimetype === 'text/css') {
                    $('head').append('<style type="text/css">' + resource.data + '</style>');
                } else if (resource.mimetype === 'application/javascript') {
                    deferred = $.globalEval(resource.data);
                } else if (resource.mimetype === 'text/html') {
                    $('head').append(resource.data);
                } else {
                    console.log('Unknown XBlock resource mimetype', resource.mimetype);
                }
            } else {
                console.log('Unknown XBlock resource kind', resource.kind);
            }
            return deferred;
        },

        getRuntime: function(options, root) {
            var $this = this;

            return {
                handlerUrl: function(element, handlerName) {
                    var usageId = $(element).data('usage-id'),
                        courseId = $(element).data('course-id'),
                        lmsBaseURL = $this.getLmsBaseURL(options);

                    return (lmsBaseURL + '/courses/' + courseId + '/xblock/' + usageId + 
                            '/handler/' + handlerName);
                },
            };
        },

        jsInit: function(options, root) {
            var $this = this;

            $('.xblock', root).not('.xblock-initialized').each(function(index, blockDOM) {
                var initFnName = $(blockDOM).data('init');
                if (!initFnName) {
                    return;
                }

                // Don't fail when the page still contains XModules
                if (initFnName === 'XBlockToXModuleShim') {
                    console.log('Warning: Unsupported XModule JS init', blockDOM);
                    return;
                }

                if (typeof window[initFnName] != 'function') {
                    console.log('Warning: Undefined init function for XBlock', blockDOM, initFnName);
                    return;
                }

                console.log('Initializing XBlock JS', initFnName, blockDOM);
                window[initFnName]($this.getRuntime(options, root), blockDOM);
                $(blockDOM).addClass('xblock-initialized');
            });
        },

        eventsInit: function(options, root) {
            // Catch jump_to_id URLs
            $('a', root).not('.xblock-jump').each(function(index, linkDOM) {
                var link_url = $(linkDOM).attr('href'),
                    link_found = /^\/courses\/([^\/]+\/[^\/]+)\/([^\/]+)\/jump_to_id\/(.+)/.exec(link_url);

                if (link_found) {
                    var course_id = link_found[1],
                        block_type = link_found[2],
                        block_id = link_found[3];

                    $(linkDOM).on('click', function(e) {
                        e.preventDefault();
                        console.log(course_id, block_type, block_id);
                        $(linkDOM).trigger('xblock_jump', [course_id, block_type, block_id]);
                    });
                    $(linkDOM).addClass('xblock-jump');
                }
            });
        },

        csrfSafeMethod: function(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        },

        setAjaxCSRFToken: function(csrftoken, options, root) {
            var $this = this;

            $.cookie('csrftoken', csrftoken, { domain: '.' + options.baseDomain });
            $.ajaxSetup({
                xhrFields: {
                    withCredentials: true,
                },
                beforeSend: function(xhr, settings) {
                    var queryDomain = $('<a>').prop('href', settings.url).prop('hostname'),
                        lmsDomain = $this.getLmsDomain(options);

                    if (!$this.csrfSafeMethod(settings.type) && queryDomain === lmsDomain) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                }
            });
        },

        getCourseId: function(options) {
            return options.usageId.substr(8).replace(/(.+);_(.+);_(.+);_.+/, '$1/$2/$3');
        },

        getLmsDomain: function(options) {
            return options.lmsSubDomain + '.' + options.baseDomain;
        },

        getLmsBaseURL: function(options) {
            if (options.lmsSecureURL || 'https:' === document.location.protocol) {
                return 'https://' + this.getLmsDomain(options);
            } else {
                return 'http://' + this.getLmsDomain(options);
            }
        },

        getViewUrl: function(viewName, options) {
            return (this.getLmsBaseURL(options) + '/courses/' + this.getCourseId(options) +
                    '/xblock/' + options.usageId + '/view/' + viewName)
        },

        init: function(options, root) {
            var $this = this,
                blockURL = this.getViewUrl('student_view', options);

            // Set the LMS session cookie on the shared domain to authenticate on the LMS
            if (!options.sessionId) {
                console.log('Error: You must provide a session id from the LMS (cf options)');
                return;
            }
            $.cookie('sessionid', options.sessionId, { domain: '.' + options.baseDomain });

            // Avoid failing if the XBlock contains XModules
            window.setup_debug = function(){};

            $.ajax({
                url: blockURL,
                dataType: 'json',
                xhrFields: {
                    withCredentials: true,
                },
            }).done(function(response) {
                var deferreds = $.map(response.resources, function(resource) {
                    return $this.loadResource(resource, options, root);
                })

                root.html(response.html);

                $.when.apply($, deferreds).then(function() {
                    console.log('All XBlock resources successfully loaded');
                    $this.eventsInit(options, root);
                    $this.jsInit(options, root);
                });

                $this.setAjaxCSRFToken(response.csrf_token, options, root);
            }).error(function(response, text_status, error_msg) {
                console.log('Error getting XBlock: ' + text_status);
                console.log('Can be caused by a wrong session id, or missing CORS headers from the LMS');
            });
        },

        bootstrap: function(options, root) {
            var options = $.extend({}, this.default_options, options);

            if (!options.baseDomain) {
                options.baseDomain = this.location.host;
            }

            this.init(options, root);
        },
    };

    $.fn.xblock = function(options) {
        return this.each(function() {
            $.xblock.bootstrap(options, $(this));
        });
    };

})(jQuery);
