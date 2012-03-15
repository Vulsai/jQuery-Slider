# jQuery Vulsai Slider

vulsaiSlider is a jQuery plugin that allows you to create fancy and lightweight content sliders with no html or css overhead.

## How to install

Download from <https://github.com/Vulsai/jQuery-Slider/downloads>

## How to use (Example)

Add your markup

```html
  <div id="controls">
    <a id="prev" href="#">&laquo; Previous</a>
    <a id="next" href="#">Next &raquo;</a>
  </div>
  <div id="slider">
    <ul>
      <li><img src="http://the-simpsons.otavo.tv/wp-content/uploads/2008/07/thesimpsonswallpaper640.jpg" alt="" /></li>
      <li><img src="http://the-simpsons.otavo.tv/wp-content/uploads/2008/07/thesimpsonswallpaper640.jpg" alt="" /></li>
      <li><img src="http://the-simpsons.otavo.tv/wp-content/uploads/2008/07/thesimpsonswallpaper640.jpg" alt="" /></li>
      <li><img src="http://the-simpsons.otavo.tv/wp-content/uploads/2008/07/thesimpsonswallpaper640.jpg" alt="" /></li>
      <li><img src="http://the-simpsons.otavo.tv/wp-content/uploads/2008/07/thesimpsonswallpaper640.jpg" alt="" /></li>
    </ul>
  </div>
  <div id="thumbs">
    <ul>
      <li><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#">3</a></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>
    </ul>
  </div>
```
After adding your jQuery script tag insert

```html
<script type="text/javascript" src="your/path/to/vulsaiSlider.min.js"></script>
<script>
  $(function(){
		$('#mydiv').vulsaiSlider(options);
	});
</script>
```

## Features

* Support for slide and fade transitions
* Next / Prev controls
* Selectable thumbnails
* Automatic mode with time interval option
* Infinite mode (After the last element goes back to the first one)
* Controls opacity

## Options

* **transition** defaults to `fade`
 * The transition type, 'fade' and 'slide' are currently supported

* **thumb_list_id** defaults to `#thumbs`
 * The thumbs container, can be any DOM element

* **prev** defaults to `#prev`
 * The previous control, can be any DOM element

* **next** defaults to `#next`
 * The next control, can be any DOM element

* **nav_opacity** defaults to `.3`
 * The disabled control opacity, values from 0 to 1 are useful
 
* **fade_opacity** defaults to `.2`
 * The transition fade opacity, values from 0 to 1 are useful

* **infinite** defaults to `false`
 * Enable or disable the infinite repetition of the content

* **automatic** defaults to `false`
 * Enable or disable the auto start of the slider transitions
