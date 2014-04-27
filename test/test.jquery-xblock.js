var expect = chai.expect;

describe('jquery-xblock', function() {

    before(function() {
        // Append our xblock div
        $('body').append("<div id='jquery-xblock-test'>"
                        + "<h1>My amazing XBlock</h1>"
                        + "<div class='courseware-content'></div>"
                        + "</div>");

        // setup our ajax stub
        sinon.stub($, 'ajax', function(options) {
            var deferred =  new $.Deferred();
            var validUsageId = 'i4x:;_;_edX;_Open_DemoX;_mentoring;_d66b5ffbb8a44f93b0b832c1ec25007c';
            var usageId = options.url.match(/(i4x[^/]+)/);

            if (usageId && usageId[0] !== validUsageId) { // simulate a bad url
                // TODO: this doesn't seem to call the fail callback...
                deferred.reject();
            }
            else if (options.url.match(/view\/student_view$/)) {
                deferred.resolveWith(null, [XBlockData.getMentoringAnswer()]);
            }
            else if (options.url.match(/answer.js$/) ||
                     options.url.match(/mentoring.js$/) ||
                     options.url.match(/underscore-min.js$/)) {
                /* already loaded with test */
                deferred.resolve();
            }
            else if (options.url.match(/handler\/view$/)) {
                deferred.resolveWith(null, [XBlockData.getMentoringHtml()]);
            }

            return deferred;
        });

        sinon.stub($, 'post', function(options) {
            var deferred =  new $.Deferred();
            var promise = deferred.promise()
            deferred.resolve({});

            return promise;
        });
    });

    after(function() {
        $.ajax.restore();
    })

    describe('valid-xblock', function() {

        before(function() {
            $('.courseware-content').xblock({
                usageId: 'i4x:;_;_edX;_Open_DemoX;_mentoring;_d66b5ffbb8a44f93b0b832c1ec25007c',
                sessionId: '37af0d2122b87150e69fecb8122eebe2',
                baseDomain: 'localhost',
                lmsSubDomain: 'lms'
            });
        });

        it('loaded xblock through ajax', function() {
            expect($.ajax.called).to.be.true;
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
            $('.courseware-content').remove();
        });
    });

    describe('invalid-xblock', function() {

        before(function() {
            $('.courseware-content').xblock({
                usageId: 'i4x:;_;_edX;_Open_DemoX;_mentoring;_invalid_xblock',
                baseDomain: 'localhost',
                lmsSubDomain: 'lms'
            });
        });

        it("hasn't loaded any xblock", function() {
            expect($('.courseware-content .xblock')).to.have.length(0)
        });

    });

    describe('invalid-sessionid', function() {

        before(function() {
            $('.courseware-content').xblock({
                usageId: 'i4x:;_;_edX;_Open_DemoX;_mentoring;_d66b5ffbb8a44f93b0b832c1ec25007c'
            });
        });

        it("hasn't loaded any xblock", function() {
            expect($('.courseware-content .xblock')).to.have.length(0)
        });

    });

});
