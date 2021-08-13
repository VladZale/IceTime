;(function () {

    var canUseWebP = function() {
        var elem = document.createElement('canvas');
    
        if (!!(elem.getContext && elem.getContext('2d'))) {
            // was able or not to get WebP representation
            return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
        }
    
        // very old browser like IE 8, canvas not supported
        return false;
      };
      
      var isWebpSupported = canUseWebP();
    
      if (isWebpSupported === false) {
        var lazyItems = document.querySelectorAll('[data-src-replace-webp]');
    
        for (var i = 0; i < lazyItems.length; i += 1) {
          var item = lazyItems[i];
    
          var dataSrcReplaceWebp = item.getAttribute('data-src-replace-webp');
          if (dataSrcReplaceWebp !== null) {
            item.setAttribute('data-src', dataSrcReplaceWebp);
          }
        }
      }
    
      var lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
      });
})();

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

;(function(){
   if (window.matchMedia('(max-width: 992px)').matches) {
       return;
   }

    var headerPage = document.querySelector('.header-page');
    window.addEventListener('scroll', function () {
       if (window.pageYOffset > 0) {
           headerPage.classList.add('is-active');
       } else {
        headerPage.classList.remove('is-active');
       }
    });
})();
;(function () {
    var showPopup = function (target) {
        target.classList.add('is-active');
    };

    var closePopup = function (target) {
      target.classList.remove('is-active');  
    };

    lib.body.addEventListener('click', function (e) {
       var target = e.target; 
       var popupClass = lib.closestAttr(target, 'data-popup');

        if (popupClass === null) {
            return;
        }

        e.preventDefault();
        var popup = document.querySelector('.' + popupClass);

        if (popup) {
            showPopup(popup);
            lib.togleScroll();
        }
    });
    
    lib.body.addEventListener('click', function (e) {
      var target = e.target;

      if (target.classList.contains('popup-close') ||
          target.classList.contains('popup__inner')) {
           var popup = lib.closestItemByClass(target, 'popup');

           
            closePopup(popup);
            lib.togleScroll();
      }
    });

    lib.body.addEventListener('keydown', function (e) {
        if (e.keyCode != 27) {
            return;
        }
        var popup = document.querySelector('.popup.is-active');

        if (popup) {
            closePopup(popup);
            lib.togleScroll();
        }

     });

})();
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
;(function () {
    var catalog = document.querySelector('.catalog');

    if (catalog === null) {
        return;
    }

    var updateProductPrice = function (product, price) {
        var productPrice = product.querySelector('.product__price-value');
        productPrice.textContent = price;
    };

    var changeProductSize = function (target) {
        var product = lib.closestItemByClass(target, 'product');
        var prevBtnActive = product.querySelector('.product__size.is-active');
        var newPrice = target.getAttribute('data-product-size-price');


        prevBtnActive.classList.remove('is-active');
        target.classList.add('is-active');

        updateProductPrice(product, newPrice);
    };

    var changeProductOrderInfo = function (target) {
        var product = lib.closestItemByClass(target, 'product');
        var order = document.querySelector('.popup-order');

        var productTitle = product.querySelector('.product__title').textContent;
        var productSize = product.querySelector('.product__size.is-active').textContent;
        var productPrice = product.querySelector('.product__price-value').textContent;
        var productImgSrc = product.querySelector('.product__img').getAttribute('src');
        
        order.querySelector('.order-info-title').setAttribute('value', productTitle);
        order.querySelector('.order-info-size').setAttribute('value', productSize);
        order.querySelector('.order-info-price').setAttribute('value', productPrice);      
        
        order.querySelector('.order-product-title').textContent = productTitle;
        order.querySelector('.order-product-price').textContent = productPrice;
        order.querySelector('.order__size').textContent = productSize;
        order.querySelector('.order__img').setAttribute('src',productImgSrc);
    };

    catalog.addEventListener('click', function (e) {
        var target = e.target;

        if (target.classList.contains('product__size') && !target.classList.contains('is-active')) {
            e.preventDefault();
            changeProductSize(target);
        }

        if (target.classList.contains('product__btn')) {
            e.preventDefault();
            changeProductOrderInfo(target);
        }
    })
})();
;(function () {
    var sectionContacts = document.querySelector('.section-contacts');
    
    var ymapInit = function () {     
            if (typeof ymaps === 'undefined') {
                return;
            }

        ymaps.ready(function () {
            var myMap = new ymaps.Map('ymap', {
                    center: [55.753605, 37.621694],
                    zoom: 16
                }, {
                    searchControlProvider: 'yandex#search'
                }),
    
                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                    balloonContent: 'Some text'
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '../img/ice-icon.png',
                    iconImageSize: [50, 64],
                    iconImageOffset: [-10, -40]
                });
        
                myMap.geoObjects.add(myPlacemark)
            myMap.behaviors.disable('scrollZoom');
        });
    }

    var ymapLoad = function() {
        var script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?lang=en_RU';
        lib.body.appendChild(script);
        script.addEventListener('load', ymapInit);
      };
    
      var checkYmapInit = function() {
        var sectionContactsTop = sectionContacts.getBoundingClientRect().top;
        var scrollTop = window.pageYOffset;
        var sectionContactsOffsetTop = scrollTop + sectionContactsTop;
    
        if (scrollTop + window.innerHeight > sectionContactsOffsetTop) {
          ymapLoad();
          window.removeEventListener('scroll', checkYmapInit);
        }
      };
    
      window.addEventListener('scroll', checkYmapInit);
      checkYmapInit();
})();


;(function() {
  var forms = document.querySelectorAll('.form-send');

  if (forms.length === 0) {
    return;
  }

  var serialize = function(form) {
    var items = form.querySelectorAll('input, select, textarea');
    var str = '';
    for (var i = 0; i < items.length; i += 1) {
      var item = items[i];
      var name = item.name;
      var value = item.value;
      var separator = i === 0 ? '' : '&';

      if (value) {
        str += separator + name + '=' + value;
      }
    }
    return str;
  };

  var formSend = function(form) {
    var data = serialize(form);
    var xhr = new XMLHttpRequest();
    var url = 'mail/mail.php';
    
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
      var activePopup = document.querySelector('.popup.is-active');

      if (activePopup) {
        activePopup.classList.remove('is-active');
      } else {
        myLib.toggleScroll();
      }

      if (xhr.response === 'success') {
        document.querySelector('.popup-thanks').classList.add('is-active');
      } else {
        document.querySelector('.popup-error').classList.add('is-active');
      }

      form.reset();
    };

    xhr.send(data);
  };

  for (var i = 0; i < forms.length; i += 1) {
    forms[i].addEventListener('submit', function(e) {
      e.preventDefault();
      var form = e.currentTarget;
      formSend(form);
    });
  }
})();

AOS.init({
    // Global settings:
    disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
  
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 1250, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  });