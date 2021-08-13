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

@@include('lib.js')

@@include('header.js')
@@include('popup.js')
@@include('scrollTo.js')
@@include('catalog.js')
@@include('product.js')
@@include('map.js')

@@include('form.js')

@@include('animate.js')