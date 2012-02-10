# jQuery AutoCollapser

## Author
Sébastien Lavoie (sebastien@lavoie.sl)

## Description
Simple solution to a common problem:

  * Easy binding for the toggle of collasped/expanded of a selector
  * Provides an API to show/hide/toggle
  * Adds classes collapse-{expanded,collapsed} on the wrapper

Much can be done, but this is the first version

## Prerequisites
  * jQuery, should work with any version but tested with 1.7

## Basic setup 

```html
  <div class="collapse-wrapper">
    <div class="header">
      <a href="#" class="collapse-toggle">Toggle</a>
    </div>
    <div class="collapse-box">
      <ul>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
      </ul>
    </div>
  </div>
```

## Initialization 
```javascript
$(function() {
    $('.collapse-wrapper').autoCollapser();
});
```

### Options
```javascript
{
    box: '.collapse-box',                 // The box that will be collasped
    toggle: '.collapse-toggle',           // The trigger, binding will be added onClick
    collapsedClass: 'collapse-collapsed', // Class to be added to the wrapper when it is collapsed
    expandedClass: 'collapse-expanded',   // Idem
    duration: 800,                        // Speed in ms for the animation,
    stop: true                            // Empty the queue using .stop(true, true)
}
```

## CSS Example
```css
.collapse-wrapper {
    border: 1px solid green;
    padding: 10px;
    margin: 10px;
}

.collapse-expanded .collapse-toggle::after {
    content: " -"
}
.collapse-collapsed .collapse-toggle::after {
    content: " +"
}

.collapse-box {
    border: 1px solid red;
    margin: 10px;
}
```

## API
```javascript
$('.collapse-wrapper').autoCollapser('show');
$('.collapse-wrapper').autoCollapser('hide');
$('.collapse-wrapper').autoCollapser('toggle');
````


### Events
Two events are made and they both pass the data.show as a boolean

  * autoCollapser.toggle.start
  * autoCollapser.toggle.after

```javascript
$('.collapse-wrapper').on('autoCollapser.toggle.start', function(event,data){
  console.log("Collapser has started " + (data.show ? 'expanding' : 'collasping'));
});
$('.collapse-wrapper').on('autoCollapser.toggle.after', function(event,data){
  console.log("Collapser was " + (data.show ? 'expanded' : 'collasped'));
});
```

## Demo

Checkout the [demo](http://lavoiesl.github.com/Jquery-AutoCollapser/demo.html)
