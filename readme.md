# Jukebox (Drupal 6 Compatible) #

This jQuery plugin came from working with record labels, who often need to display a "jukebox" of new releases or other items. This was previously done with Flash, this is a first attempt to move this into HTML5.

## Usage (See Examples)

Once the jukebox JavaScript and CSS files have been added to your HTML page:

```html
<link rel="stylesheet" href="../css/jquery-jukebox-0.1.css">
<script src="../js/jquery-jukebox-drupal-0.1.js"></script>
```

Define your playlist. Using new data- attributes to specify cover and poster artwork, and track titles:

```html
<div id="playlist-01" class="jukebox-playlist" data-cover-art="images/covers/playlist-01.jpg" data-poster-art="images/posters/playlist-01.jpg">
	<audio preload="metadata" class="audio-track" id="track01-01" data-track-title="Track 01">
		<source src="audio/1-1.mp3" type="audio/mp3"></source>
		<source src="audio/1-1.ogg" type="audio/ogg"></source>
	</audio>
	<audio preload="metadata" class="audio-track" id="track01-02" data-track-title="Track 02">
		<source src="audio/1-2.mp3" type="audio/mp3"></source>
		<source src="audio/1-2.ogg" type="audio/ogg"></source>
	</audio>
</div>
<div id="playlist-02" class="jukebox-playlist" data-cover-art="images/covers/playlist-02.jpg" data-poster-art="images/posters/playlist-02.jpg">
	<audio preload="metadata" class="audio-track" id="track02-01" data-track-title="Track 01">
		<source src="audio/2-1.mp3" type="audio/mp3"></source>
		<source src="audio/2-1.ogg" type="audio/ogg"></source>
	</audio>
</div>
```

Add a div with an id or jukebox

```html
<div id="jukebox"></div>
```
Call jukebox() from your document.ready handler with options


```html
<script type="text/javascript">
$(function() {
	
	$('.jukebox-playlist').jukebox({
		'jukebox': '#jukebox',
		'autoplay': false
	});
	
});
</script>
```