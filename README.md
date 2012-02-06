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


## Demo

Checkout the demo on [JSFiddle](http://jsfiddle.net/PLVYg/)