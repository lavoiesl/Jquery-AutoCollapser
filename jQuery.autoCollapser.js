(function($){
  var plugin = {
    name: 'autoCollapser'
  };

  var default_settings = {
    box: '.collapse-box',                 // The box that will be collasped
    toggle: '.collapse-toggle',           // The trigger, binding will be added onClick
    collapsedClass: 'collapse-collapsed', // Class to be added to the wrapper when it is collapsed
    expandedClass: 'collapse-expanded',   // Idem
    duration: 800,                        // Speed in ms for the animation,
    stop: true                            // Empty the queue using .stop(true, true)
  };

  // Utility function to hide/show
  function animation(func, removeClass, addClass) {
    var data = this.data(plugin.name);
    if (data.settings.stop) {
      data.box.stop(true, true);
    }
    data.box[func](data.duration);
    data.wrapper.removeClass(data.settings[removeClass]);
    data.wrapper.addClass(data.settings[addClass]);
  }

  var methods = {
    init: function(options) {
      var settings = $.extend(default_settings, options);
      var data = {
        settings: settings,
        box: this.find(settings.box),
        toggle: this.find(settings.toggle),
        wrapper: this
      };

      this.data(plugin.name, data);
      methods.bind.call(this);
    },
    
    bind: function() {
      // In case init is called multiple times
      methods.unbind.call(this);

      var data = this.data(plugin.name);
      data.wrapper.addClass(data.settings.expandedClass);
      data.toggle.bind('click', methods.click);
      data.toggle.data(plugin.name, {wrapper: data.wrapper});
    },

    unbind: function() {
      var data = this.data(plugin.name);
      var settings = data.settings;
      
      data.wrapper.removeClass(settings.collapsedClass + ' ' + settings.expandedClass);
      data.toggle.unbind('click', methods.click);
    },

    destroy: function() {
      methods.unbind.call(this);
      this.removeData(plugin.name);
    },

    show: function() {
      animation.call(this, 'slideDown', 'collapsedClass', 'expandedClass');
    },

    hide: function() {
      animation.call(this, 'slideUp', 'expandedClass', 'collapsedClass');
    },

    click: function(e) {
      if (e) {e.preventDefault();}
      var wrapper = $(this).data(plugin.name).wrapper;
      methods.toggle.call(wrapper);
    },

    toggle: function() {
      var data = this.data(plugin.name);
      var method = data.wrapper.hasClass(data.settings.expandedClass) ? "hide" : "show";
      methods[method].call(this);
    }
  };

  $.fn[plugin.name] = function(method) {

    var args = false;
    if ( typeof method === 'object' || ! method ) {
      // Constructor
      args = [method];
      method = 'init';
    } else if ( methods[method] ) {
      // Method, shift method name and call on each
      args = Array.prototype.slice.call(arguments, 1);
    }
    if (args) {
      return this.each(function(){
        methods[method].apply($(this), args);
      });
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.' + plugin.name );
    }

  };
})( jQuery );