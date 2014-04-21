var XBLOCK_MENTORING_ANSWER = {
  "csrf_token": "5H7uQag10YyEpX6gGne1o98fz8zwJYh0",
  "html": "\n\n<div class=\"xblock xblock-student_view\" data-runtime-class=\"LmsRuntime\" data-init=\"MentoringBlock\" data-course-id=\"edX/Open_DemoX/edx_demo_course\" data-runtime-version=\"1\" data-usage-id=\"i4x:;_;_edX;_Open_DemoX;_mentoring;_0074176676df4056af3bc098202211b9\" data-block-type=\"mentoring\">\n    <div class=\"mentoring\">\n  <div class=\"missing-dependency warning\" data-missing=\"False\">\n    You need to complete <a href=\"False\">the previous step</a> before\n    attempting this step.\n  </div>\n  \n  <div class=\"xblock-light-child\" name=\"None_0\" data-type=\"HTMLBlock\"><div>\n        <p>What is your goal?</p>\n    </div>\n\n    </div>\n  \n  <div class=\"xblock-light-child\" name=\"goal\" data-type=\"AnswerBlock\"><div class=\"xblock-answer\" data-completed=\"True\">\n  <textarea\n     class=\"answer editable\" cols=\"50\" rows=\"10\" name=\"input\"\n     data-min_characters=\"0\"\n     >dsaa</textarea>\n  <span class=\"answer-checkmark icon-2x\"></span>\n</div>\n</div>\n  \n  \n  <div class=\"attempts\" data-max_attempts=\"0\" data-num_attempts=\"0\"></div>\n  <div class=\"submit\">\n    <input type=\"button\" class=\"input-main\" value=\"Submit\"></input>\n  </div>\n  \n  <div class=\"messages\"></div>\n</div>\n\n</div>\n\n\n",
  "resources": [
    {
      "kind": "url",
      "data": "//localhost:8000/xblock/resource/mentoring/public/js/answer.js",
      "mimetype": "application/javascript",
      "placement": "foot"
    },
    {
      "kind": "url",
      "data": "//localhost:8000/xblock/resource/mentoring/public/js/vendor/underscore-min.js",
      "mimetype": "application/javascript",
      "placement": "foot"
    },
    {
      "kind": "url",
      "data": "//localhost:8000/xblock/resource/mentoring/public/js/mentoring.js",
      "mimetype": "application/javascript",
      "placement": "foot"
    },
    {
      "kind": "text",
      "data": "<script type=\"text/template\" id=\"xblock-attempts-template\">\n  <% if (_.isNumber(max_attempts) && max_attempts > 0) {{ %>\n  <div> You have used <%= _.min([num_attempts, max_attempts]) %> of <%= max_attempts %> attempts.</div>\n  <% }} %>\n</script>\n",
      "mimetype": "text/html",
      "placement": "head"
    }
  ]
};

var XBLOCK_MENTORING_HTML = {"html": "<div class=\"mentoring\">\n  <div class=\"missing-dependency warning\" data-missing=\"False\">\n    You need to complete <a href=\"False\">the previous step</a> before\n    attempting this step.\n  </div>\n  \n  <div class=\"xblock-light-child\" name=\"None_0\" data-type=\"HTMLBlock\"><div>\n        <p>What is your goal?</p>\n    </div>\n\n    </div>\n  \n  <div class=\"xblock-light-child\" name=\"goal\" data-type=\"AnswerBlock\"><div class=\"xblock-answer\" data-completed=\"True\">\n  <textarea\n     class=\"answer editable\" cols=\"50\" rows=\"10\" name=\"input\"\n     data-min_characters=\"0\"\n     >dsaa</textarea>\n  <span class=\"answer-checkmark icon-2x\"></span>\n</div>\n</div>\n  \n  \n  <div class=\"attempts\" data-max_attempts=\"0\" data-num_attempts=\"0\"></div>\n  <div class=\"submit\">\n    <input type=\"button\" class=\"input-main\" value=\"Submit\"></input>\n  </div>\n  \n  <div class=\"messages\"></div>\n</div>\n"};

var XBlockData = {
    getMentoringHtml: function() {
        return XBLOCK_MENTORING_HTML;
    },

    getMentoringAnswer: function() {
        return XBLOCK_MENTORING_ANSWER;
    }
};
