;(function () {
    var scroll = function (target) {
        var targetTop = target.getBoundingClientRect().top;
        var scrollTop = window.pageYOffset;
        var targetOffsetTop = targetTop + scrollTop;
        var headerOffset = document.querySelector('.header-page').clientHeight;

        window.scrollTo(0, targetOffsetTop - headerOffset);
    }

    lib.body.addEventListener('click', function (e) {
        var target = e.target;
        var scrollToItemClass = lib.closestAttr(target,'data-scroll-to');

        if (scrollToItemClass === null) {
            return;
        }

        e.preventDefault();
        var scrollToItem = document.querySelector('.' + scrollToItemClass);

        if (scrollToItem) {
            scroll(scrollToItem);
        }

    })
})();