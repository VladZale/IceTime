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
