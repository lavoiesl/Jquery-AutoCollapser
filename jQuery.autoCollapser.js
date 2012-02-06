(function($){
  var plugin = {
    name: 'autoCollapser'
  };

  var default_settings = {
    box: '.collapse-box',                 // The box that will be collasped
    toggle: '.collapse-toggle',           // The trigger, binding will be added onClick
    collapsedClass: 'collapse-collapsed', // Class to be added to the wrapper when it is collapsed
    expandedClass: 'collapse-expanded',   // Idem
    duration: 800                         // Speed in ms for the animation
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
        methods.bind.call($this);
      });
    },
    
    bind: function() {
      // In case init is call two times
      methods.unbind.call(this);

      return this.each(function(){
        var data = $(this).data(plugin.name);
        data.wrapper.addClass(data.settings.expandedClass);
        data.toggle.bind('click', methods.click);
        data.toggle.data(plugin.name, {wrapper: data.wrapper});
      });
    },

    unbind: function() {
      return this.each(function(){
        var data = $(this).data(plugin.name);
        data.wrapper.removeClass(data.settings.collapsedClass);
        data.wrapper.removeClass(data.settings.expandedClass);
        data.toggle.unbind('click', methods.click);
      });
    },

    destroy: function() {
      methods.unbind.call(this);

      return this.each(function(){
        $(this).removeData(plugin.name);
      });
    },

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

    click: function(e) {
      if (e) {e.preventDefault();}
      var wrapper = $(this).data(plugin.name).wrapper;
      return methods.toggle.call(wrapper);
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