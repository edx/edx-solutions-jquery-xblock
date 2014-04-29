function AnswerBlock(runtime, element) {
    return {

        init: function(options) {
            var checkmark = $('.answer-checkmark', element);
            var completed = $('.xblock-answer', element).data('completed');
            if (completed === 'True') {
                checkmark.addClass('checkmark-correct icon-ok fa-check');
            }
        }
    }
}
