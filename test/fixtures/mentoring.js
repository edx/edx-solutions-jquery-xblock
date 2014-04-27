function MentoringBlock(runtime, element) {
    var children;

    function callIfExists(obj, fn) {
        if (typeof obj !== 'undefined' && typeof obj[fn] == 'function') {
            return obj[fn].apply(obj, Array.prototype.slice.call(arguments, 2));
        } else {
            return undefined;
        }
    }

    function getChildren(element) {
        if (!_.isUndefined(children))
            return children;

        var children_dom = $('.xblock-light-child', element);
        children = [];

        $.each(children_dom, function(index, child_dom) {
            var child_type = $(child_dom).attr('data-type'),
                child = window[child_type];
            if (typeof child !== 'undefined') {
                child = child(runtime, child_dom);
                child.name = $(child_dom).attr('name');
                children.push(child);
            }
        });
        return children;
    }

    function initXBlock() {
        var submit_dom = $(element).find('.submit .input-main');
        submit_dom.bind('click', function() {
            var handlerUrl = runtime.handlerUrl(element, 'submit');
            $.post(handlerUrl);
        });

        var children = getChildren(element);
        _.each(children, function(child) {
            callIfExists(child, 'init');
        });
    }

    initXBlock();
}
