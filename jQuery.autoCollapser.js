(function($){
  var plugin = {
    name: 'autoCollapser'
  };

  var default_settings = {
    box: '.collapse-box',
    toggle: '.collapse-toggle',
    collapsedClass: 'collapse-collapsed',
    expandedClass: 'collapse-expanded',
    duration: 800
  };

  var methods = {
    init: function(options) {

      return this.each(function(){
        var $this = $(this);
        var settings = $.extend(default_settings, options);
        var data = {
          settings: settings,
          box: $(settings.box, this),
          toggle: $(settings.toggle, this),
          wrapper: $this
        };

        $this.data(plugin.name, data);
        data.wrapper.addClass(settings.expandedClass);
        data.toggle.click(function(e){
          e.preventDefault();
          methods.toggle.call($this);
        });
      });
    },
    
    /* TODO
    destroy: function() {
      return this.each(function(){
        var $this = $(this);
        $this.removeData(plugin.name);
      });
    },
    */

    show: function() {
      return this.each(function(){
        var data = $(this).data(plugin.name);
        data.box.slideDown(data.duration);
        data.wrapper.removeClass(data.settings.collapsedClass);
        data.wrapper.addClass(data.settings.expandedClass);
      });
    },

    hide: function() {
      return this.each(function(){
        var data = $(this).data(plugin.name);
        data.box.slideUp(data.duration);
        data.wrapper.removeClass(data.settings.expandedClass);
        data.wrapper.addClass(data.settings.collapsedClass);
      });
    },

    toggle: function() {
      return this.each(function(){
        var data = $(this).data(plugin.name);
        var method = data.wrapper.hasClass(data.settings.expandedClass) ? "hide" : "show";
        methods[method].call($(this));
      });
    }
  };

  $.fn[plugin.name] = function(method) {

    if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.' + plugin.name );
    }

  };
})( jQuery );