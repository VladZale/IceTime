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