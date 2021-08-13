;(function () {
    var catalogSection = document.querySelector('.section-catalog');

    if (catalogSection === null) {
        return;
    }

    var removeChildren = function(item) {
        while(item.firstChild)
        {
            item.removeChild(item.firstChild);
        }
    };

    var updateChildren = function(item, children)    
    {
        removeChildren(item);
        for (var index = 0; index < children.length; index++) {
            item.appendChild(children[index]);
        }
    };

    var catalog = catalogSection.querySelector('.catalog');
    var catalogNav = catalogSection.querySelector('.catalog-nav');
    var catalogItems = catalogSection.querySelectorAll('.catalog__item');

    catalogNav.addEventListener('click', function (e) {
        var target = e.target;
        var item = lib.closestItemByClass(target, 'catalog-nav__btn');
        
        if (item === null || item.classList.contains('is-active')) {
            return;
        }

        e.preventDefault();
        var filterValue = item.getAttribute('data-filter');
        var prevBtnActive = catalogNav.querySelector('.catalog-nav__btn.is-active');

        prevBtnActive.classList.remove('is-active');
        item.classList.add('is-active');

        if (filterValue === 'all') {
            updateChildren(catalog, catalogItems);
            return;
        }

        var filteredItems = [];
        for (var index = 0; index < catalogItems.length; index++) {
            const current = catalogItems[index];
            if (current.getAttribute('data-category') === filterValue) {
                filteredItems.push(current);
            }
        }

        updateChildren(catalog, filteredItems);
    });
})();