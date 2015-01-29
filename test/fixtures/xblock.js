var XBLOCK_MENTORING_ANSWER = {
    "csrf_token": "5H7uQag10YyEpX6gGne1o98fz8zwJYh0",
    "html": "\
<div class=\"xblock xblock-student_view\" data-runtime-class=\"LmsRuntime\" data-init=\"MentoringBlock\" \
    data-course-id=\"edX/Open_DemoX/edx_demo_course\" data-runtime-version=\"1\" \
    data-usage-id=\"i4x:;_;_edX;_Open_DemoX;_mentoring;_0074176676df4056af3bc098202211b9\" data-block-type=\"mentoring\">\
    <div class=\"mentoring\">\
        <div class=\"missing-dependency warning\" data-missing=\"False\">\
            You need to complete <a href=\"False\">the previous step</a> before\
            attempting this step.\
        </div>\
        <div class=\"xblock-light-child\" name=\"None_0\" data-type=\"HTMLBlock\">\
            <div><p>What is your goal?</p></div>\
        </div>\
        <div class=\"xblock-light-child\" name=\"goal\" data-type=\"AnswerBlock\">\
            <div class=\"xblock-answer\" data-completed=\"True\">\
                <textarea class=\"answer editable\" cols=\"50\" rows=\"10\" name=\"input\" data-min_characters=\"0\">\
                    dsaa\
                </textarea>\
                <span class=\"answer-checkmark icon-2x\"></span>\
            </div>\
        </div>\
    <div class=\"attempts\" data-max_attempts=\"0\" data-num_attempts=\"0\"></div>\
    <div class=\"submit\">\
        <input type=\"button\" class=\"input-main\" value=\"Submit\"></input>\
    </div>\
    <div class=\"messages\"></div>\
</div>\
</div>",
    "resources": [
        [
            '1',
            {
                "kind": "url",
                "data": "//localhost:8000/xblock/resource/mentoring/public/js/answer.js",
                "mimetype": "application/javascript",
                "placement": "foot"
            }
        ],
        [
            '2',
            {
                "kind": "url",
                "data": "//localhost:8000/xblock/resource/mentoring/public/js/vendor/underscore-min.js",
                "mimetype": "application/javascript",
                "placement": "foot"
            }
        ],
        [
            '3',
            {
                "kind": "url",
                "data": "//localhost:8000/xblock/resource/mentoring/public/js/mentoring.js",
                "mimetype": "application/javascript",
                "placement": "foot"
            }
        ],
        [
            '4',
            {
                "kind": "text",
                "data": "\
<script type=\"text/template\" id=\"xblock-attempts-template\">\
    <% if (_.isNumber(max_attempts) && max_attempts > 0) {{ %>\
    <div> You have used <%= _.min([num_attempts, max_attempts]) %> of <%= max_attempts %> attempts.</div>\
    <% }} %>\
</script>",
                "mimetype": "text/html",
                "placement": "head"
            }
        ]
    ]
};

var XBLOCK_LINKS_ANSWER = {
    'csrf_token': "5H7uQag10YyEpX6gGne1o98fz8zwJYh0",
    'html': "\
<div class=\"xblock xblock-student_view xmodule_display xmodule_HtmlModule xblock-initialized\" \
    data-runtime-class=\"LmsRuntime\" data-init=\"XBlockToXModuleShim\" data-block-type=\"html\" \
    data-runtime-version=\"1\" data-usage-id=\"i4x:;_;_TerraCorp;_T101;_html;_3082f5b3cbd74687846619b66b98ae59\" \
    data-type=\"HTMLModule\" data-course-id=\"edX/Open_DemoX/edx_demo_course\">\
    <p>\
        <a id=\"jump_to_link\" target=\"[object Object]\" \
            href=\"/courses/edX/Open_DemoX/edx_demo_course/jump_to/location://edX/Open_DemoX/edx_demo_course/vertical/38751697369040e39ec1d0403efbac96\"\
        >Link to unit 2</a>\
    </p>\
    <p>\
        <a id=\"jump_to_id_link\" target=\"[object Object]\"\
            href=\"/courses/edX/Open_DemoX/edx_demo_course/jump_to_id/38751697369040e39ec1d0403efbac96\"\
        >Link to unit 2 by id</a>\
    </p>\
</div>",
    'resources': [
        [
            '1',
            {
                "kind": "url",
                "data": "//localhost:8000/xblock/resource/mentoring/public/js/vendor/underscore-min.js",
                "mimetype": "application/javascript",
                "placement": "foot"
            }
        ],
    ]
};

var XBLOCK_NO_INIT_ANSWER = {
    'csrf_token': "5H7uQag10YyEpX6gGne1o98fz8zwJYh0",
    'html': "<div class=\"xblock xblock-student_view\" data-course-id=\"edX/Open_DemoX/edx_demo_course\"/>",
    'resources': []
}