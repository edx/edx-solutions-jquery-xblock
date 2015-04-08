var XBLOCK_MENTORING_ANSWER = {
    "csrf_token": "5H7uQag10YyEpX6gGne1o98fz8zwJYh0",
    "html": "\
<div class='xblock xblock-student_view' data-runtime-class='LmsRuntime' data-init='MentoringBlock' data-course-id='TextX/101/2015' data-request-token='e5f73ceede3c11e4a685080027880ca6' data-runtime-version='1' data-usage-id='i4x:;_;_edX;_Open_DemoX;_mentoring;_0074176676df4056af3bc098202211b9' data-block-type='mentoring'>\
  <div class='mentoring themed-xblock' data-mode='standard' data-step='0'>\
    <div class='missing-dependency warning' data-missing='False'>\
      You need to complete <a href='False'>the previous step</a> before attempting this step.\
    </div>\
    <div class='title'><h2>Mentoring Questions</h2></div>\
    <div class='standard-question-block'>\
      <div class='xblock xblock-student_view xmodule_display xmodule_HtmlModule' data-runtime-class='LmsRuntime' data-init='XBlockToXModuleShim' data-block-type='html' data-request-token='e5f73ceede3c11e4a685080027880ca6' data-runtime-version='1' data-usage-id='i4x:;_;_TextX;_101;_html;_cdd90d4dfa3d473da8c2ef6ab75dedb0' data-type='HTMLModule' data-course-id='TextX/101/2015'>\
        <p>Some HTML is here inside an HTML block.</p>\
      </div>\
      <div class='xblock xblock-mentoring_view' data-name='answer1' data-runtime-class='LmsRuntime' data-init='AnswerBlock' data-course-id='TextX/101/2015' data-request-token='e5f73ceede3c11e4a685080027880ca6' data-runtime-version='1' data-usage-id='i4x:;_;_TextX;_101;_pb-answer;_7c079582098d40c8a2ecf7922d208e34' data-block-type='pb-answer'>\
        <div class='xblock-answer' data-completed='True'>\
          <h3 class='question-title'>Question</h3>\
          <p>What do you think of jquery-xblock?</p>\
          <textarea class='answer editable' cols='50' rows='10' name='input' data-min_characters='0'></textarea>\
          <span class='answer-checkmark fa icon-2x'></span>\
        </div>\
      </div>\
      <div class='grade' data-score='0' data-correct_answer='0' data-incorrect_answer='0' data-partially_correct_answer='0' data-max_attempts='0' data-num_attempts='0'>\
      </div>\
      <div class='submit'>\
        <input type='button' class='input-main' value='Submit' disabled='disabled' style='display: inline-block;'>\
        <div class='attempts' data-max_attempts='0' data-num_attempts='0'></div>\
      </div>\
      <div class='messages'></div>\
    </div>\
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
        ]
    ]
};

var XBLOCK_LINKS_ANSWER = {
    'csrf_token': "5H7uQag10YyEpX6gGne1o98fz8zwJYh0",
    'html': "\
<div class=\"xblock xblock-student_view xmodule_display xmodule_HtmlModule\" \
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