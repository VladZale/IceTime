;(function name(params) {
    window.lib = {};

    window.lib.body = document.querySelector('body');

    window.lib.closestAttr = function (item, attr) {
        var node = item;

        while(node){
            var attrValue = node.getAttribute(attr);
            if (attrValue) {
                return attrValue;
            }
            node = node.parentElement; 
        }
        return null;
    };

    window.lib.closestItemByClass = function (item, className) {
        var node = item;

        while(node){
            if (node.classList.contains(className)) {
                return node;
            }
            node = node.parentElement; 
        }
        return null;
    };

    window.lib.togleScroll = function () {
        lib.body.classList.toggle('lock');
    }
})();