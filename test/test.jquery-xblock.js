var expect = chai.expect;

describe('jquery-xblock', function() {

    const VALID_MENTORING_USAGE_ID = 'i4x:;_;_edX;_Open_DemoX;_mentoring;_d66b5ffbb8a44f93b0b832c1ec25007c';
    const VALID_LINKS_USAGE_ID = 'i4x:;_;_edX;_Open_DemoX;_mentoring;_399b159119dd4feb87e69800ba2ce113';
    const VALID_NO_INIT_XBLOCK_USAGE_ID = 'i4x:;_;_edX;_Open_DemoX;_no_init;_12312312312312313123123123123123';

    var validUsageIds = [
        VALID_MENTORING_USAGE_ID, VALID_LINKS_USAGE_ID, VALID_NO_INIT_XBLOCK_USAGE_ID
    ];

    function getDefaultConfig(transform_config){
        var config = {
            courseId: 'edX/Open_DemoX/edx_demo_course',
            usageId: VALID_MENTORING_USAGE_ID,
            sessionId: '37af0d2122b87150e69fecb8122eebe2',
            baseDomain: 'localhost',
            lmsSubDomain: 'lms',
            disableGlobalOptions: true,
            useCurrentHost: false
        };
        if (transform_config)
            transform_config(config);
        return config;
    }

    function getAnswerForUsageId(usage_id){
        if (usage_id === VALID_MENTORING_USAGE_ID)
            return XBLOCK_MENTORING_ANSWER;
        else if (usage_id === VALID_LINKS_USAGE_ID)
            return XBLOCK_LINKS_ANSWER;
        else if (usage_id === VALID_NO_INIT_XBLOCK_USAGE_ID)
            return XBLOCK_NO_INIT_ANSWER;
    }

    before(function() {
        var ajaxOptions = {}; // global ajax setup

        // Append our xblock div
        $('body').append("<div id='jquery-xblock-test'>"
                        + "<h1>My amazing XBlock</h1>"
                        + "<div class='courseware-content'></div>"
                        + "</div>");

        // setup our ajax stub
        sinon.stub($, 'ajaxSetup', function(options) {
            ajaxOptions = options;
        });

        sinon.stub($, 'ajax', function(options) {
            sinon.useFakeXMLHttpRequest();
            var req = new XMLHttpRequest();

            var deferred =  new $.Deferred();

            var usageId = options.url.match(/(i4x[^/]+)/);

            // call the beforeSend function if specified
            if (ajaxOptions.beforeSend) {
                var opts = {
                    url: options.url,
                    type: options.type ? options.type : 'GET'
                };

                req.open(opts.type, opts.url);
                ajaxOptions.beforeSend(req, opts);
            }

            if (options.url.match(/\/null\//)) { // no course id?
                deferred.reject();
            }
            // simulate a bad usageId
            else if (usageId && $.inArray(usageId[0], validUsageIds) == -1) {
                // TODO: this doesn't seem to call the fail callback...
                deferred.reject();
            }
            else if (options.url.match(/view\/student_view$/)) {
                var target_usage_id = usageId ? usageId[0] : VALID_MENTORING_USAGE_ID;
                deferred.resolveWith(null, [getAnswerForUsageId(target_usage_id)]);
            }
            else if (options.url.match(/mentoring.js$/)) {
                $.globalEval(window.__html__['test/fixtures/mentoring.js']);
                deferred.resolve();
            }
            else if (options.url.match(/answer.js$/)) {
                $.globalEval(window.__html__['test/fixtures/answer.js']);
                deferred.resolve();
            }
            else if (options.url.match(/underscore-min.js$/)) {
                /* This is not currently as mocking since there was some issues with
                 * $.globalEval(). Loaded directly with karma. */
                deferred.resolve();
            } else if (options.url.match(/testHeader$/)) {
                deferred.resolveWith(null, [{headers: req.requestHeaders}]);
            }

            return deferred;
        });

        sinon.stub($, 'post', function(options) {
            var deferred =  new $.Deferred();
            var promise = deferred.promise();
            deferred.resolve({});

            return promise;
        });
    });

    after(function() {
        $.ajax.restore();
    });

    describe('valid-xblock', function() {

        before(function() {
            $('.courseware-content').xblock(getDefaultConfig());
        });

        it('loaded xblock through ajax', function() {
            expect($.ajax.called).to.be.true;
        });

        it('loaded xblock through ajax', function() {
            expect($.ajax.called).to.be.true;
        });

        it('has the X-Requested-With header for cross origin request', function() {
            $.ajax({
                url: VALID_MENTORING_USAGE_ID+'/testHeader'
            }).done(function(data) {
                expect(data).to.have.deep.property('headers.X-Requested-With').and.to.equal('XMLHttpRequest');
            });
        });

        it('loaded the xblock student view properly', function() {
            expect($('.courseware-content .xblock').hasClass('xblock-student_view')).to.be.true;
        });

        it('loaded the mentoring view properly', function() {
            expect($('.courseware-content .mentoring')).to.have.length(1);
        });

        it('contains the mentoring answer block child', function() {
            expect($('.courseware-content .mentoring .xblock-answer')).to.have.length(1);
        });

        it('called the xblock mentoring and answer init function', function() {
            expect(
                $('.courseware-content .mentoring .answer-checkmark').hasClass('checkmark-correct')
            ).to.be.true;
        });

        it('contains the xblock submit button', function() {
            expect($('.courseware-content .mentoring .submit')).to.have.length(1);
        });

        it('can call xblock submit button', function() {
            expect($.post.calledWithMatch(/handler\/submit$/)).to.be.false;
            $('.courseware-content .mentoring .submit .input-main').click();
            expect($.post.called).to.be.true;
            expect($.post.calledWithMatch(/handler\/submit$/)).to.be.true;
        });

        after(function() {
            $('.courseware-content').empty();
        });
    });

    describe('valid-xblock-links', function() {
        function checkLink(linkDOM, expected_event_parameters) {
            expect(linkDOM).to.have.length(1);
            var spy = sinon.spy($.prototype, 'trigger');
            linkDOM.click();
            expect(spy.calledWithExactly('xblock_jump', expected_event_parameters)).to.be.true;
            spy.restore();
        }

        before(function() {
            $('.courseware-content').xblock(getDefaultConfig(function(config){
                config.usageId = VALID_LINKS_USAGE_ID;
            }));
        });

        it('should process jump_to link', function() {
            var linkDom = $('#jump_to_link');
            checkLink(linkDom, [
                'edX/Open_DemoX',
                'edx_demo_course',
                'location://edX/Open_DemoX/edx_demo_course/vertical/38751697369040e39ec1d0403efbac96'
            ]);
        });

        it('should process jump_to_id link', function() {
            var linkDom = $('#jump_to_id_link');
            checkLink(linkDom, [
                'edX/Open_DemoX',
                'edx_demo_course',
                '38751697369040e39ec1d0403efbac96'
            ]);
        });

        it('should process dynamically added jump_to links', function(){
            var href = "/courses/edX/Other_CourseX/edx_other_course/jump_to/location://edX/Other_CourseX/edx_other_course/vertical/1234567890abcdef1234567890abcdef";
            var linkDom = $("<a id='dynamic_jump_to_link'>Another Link to unit 2</a>");
            linkDom.attr('href', href);
            $('.xblock').append(linkDom);
            checkLink(linkDom, [
                'edX/Other_CourseX',
                'edx_other_course',
                'location://edX/Other_CourseX/edx_other_course/vertical/1234567890abcdef1234567890abcdef'
            ]);
        });

        it('should process dynamically added jump_to_id links', function(){
            var href = "/courses/edX/Other_CourseX/edx_other_course/jump_to_id/1234567890abcdef1234567890abcde";
            var linkDom = $("<a id='dynamic_jump_to_id_link'>Another Link to unit 2 by id</a>");
            linkDom.attr('href', href);
            $('.xblock').append(linkDom);
            checkLink(linkDom, [
                'edX/Other_CourseX',
                'edx_other_course',
                '1234567890abcdef1234567890abcde'
            ]);
        });

        after(function() {
            $('.courseware-content').empty();
        });
    });

    describe('invalid-xblock', function() {

        before(function() {
            $('.courseware-content').xblock(getDefaultConfig(function(config) {
                config.usageId = 'i4x:;_;_edX;_Open_DemoX;_mentoring;_invalid_xblock';
            }));

        });

        it("hasn't loaded any xblock", function() {
            expect($('.courseware-content .xblock')).to.have.length(0);
        });

    });

    describe("xblock-no-init", function(){
        before(function() {
            $('.courseware-content').xblock(getDefaultConfig(function(config) {
                config.usageId = VALID_NO_INIT_XBLOCK_USAGE_ID;
            }));
        });

        it("should treat xblock with no init as initialized", function(){
            expect($('.courseware-content .xblock').hasClass('xblock-initialized')).to.be.true;
        });

        after(function() {
            $('.courseware-content').empty();
        });
    });

    describe('no-course-id', function() {

        before(function() {
            $('.courseware-content').xblock(getDefaultConfig(function(config) {
                delete config.courseId;
            }));
        });

        it("hasn't loaded any xblock", function() {
            expect($('.courseware-content .xblock')).to.have.length(0)
        });

    });

    describe('invalid-sessionid', function() {

        before(function() {
            $('.courseware-content').xblock(getDefaultConfig(function(config) {
                delete config.sessionId;
            }));
        });

        it("hasn't loaded any xblock", function() {
            expect($('.courseware-content .xblock')).to.have.length(0)
        });

    });

    describe('enable-useCurrentHost', function() {

        before(function() {
            $('.courseware-content').xblock(getDefaultConfig(function(config) {
                delete config.sessionId;
                delete config.baseDomain;
                delete config.lmsSubDomain;
                config.useCurrentHost = true;
            }));
        });

        it("has loaded a xblock", function() {
            expect($('.courseware-content .xblock')).to.have.length(1);
        });

    });

    describe('enable-global-options', function() {

        function compare_options(options, current_options) {
            expect(options.sessionId).to.be.equals(current_options.sessionId);
            expect(options.baseDomain).to.be.equals(current_options.baseDomain);
            expect(options.lmsSubDomain).to.be.equals(current_options.lmsSubDomain);
            expect(options.useCurrentHost).to.be.equals(current_options.useCurrentHost);
        };

        beforeEach(function() {
            $('.courseware-content').empty();
        });

        it("has loaded the first xblock with options", function() {

            expect($.xblock.global_options).to.be.null;

            var current_options = getDefaultConfig(function(config) {
                config.disableGlobalOptions = false;
            });
            $('.courseware-content').xblock(current_options);

            compare_options($.xblock.global_options, current_options);
            expect($('.courseware-content .xblock')).to.have.length(1);
        });

        it("has loaded the second xblock without options", function() {

            expect($.xblock.global_options).to.be.a('object');

            sinon.stub($.xblock, 'eventsInit', function(options, root) {
                compare_options($.xblock.global_options, options);
            });

            $('.courseware-content').xblock(getDefaultConfig(function(config) {
                delete config.sessionId;
                delete config.baseDomain;
                delete config.lmsSubDomain;
                config.disableGlobalOptions = false;
            }));

            $.xblock.eventsInit.restore();
            expect($('.courseware-content .xblock')).to.have.length(1);
        });

    });

    describe('send-runtime-notifications', function() {
        it("Should send notifications to registered events.", function(done) {
            $.xblock.dispatcher.bind('test_event', function(event, data) {
                // Objects are only ever equal to themselves.
                expect(event.target).to.equal($.xblock.dispatcher[0]);
                expect(data['test_stuff']).to.equal(5);
                done();
            });
            $.xblock.getRuntime().notify('test_event', {'test_stuff': 5})
        });
    });

});
