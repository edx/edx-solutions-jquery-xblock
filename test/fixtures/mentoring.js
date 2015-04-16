function MentoringBlock(runtime, element) {
    var children = runtime.children(element);

    function callIfExists(obj, fn) {
        if (typeof obj !== 'undefined' && typeof obj[fn] == 'function') {
            return obj[fn].apply(obj, Array.prototype.slice.call(arguments, 2));
        } else {
            return undefined;
        }
    }

    function initChildren(options) {
        options = options || {};
        for (var i=0; i < children.length; i++) {
            var child = children[i];
            if (child.type.substr(0,3) == "pb-") {
                callIfExists(child, 'init', options);
            }
        }
    }

    function initXBlock() {
        var submit_dom = $(element).find('.submit .input-main');
        submit_dom.bind('click', function() {
            var handlerUrl = runtime.handlerUrl(element, 'submit');
            $.post(handlerUrl);
        });

        initChildren();
    }

    initXBlock();
}
