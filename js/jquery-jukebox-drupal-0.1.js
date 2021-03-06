/**
 * Copyright (C) 2012 by Nick Procter takealook@zumzing.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * Version		0.1
 * Requires   jQuery 1.2.6 (For compatibility with Drupal 6.x)
 * Website		http://www.zumzing.com
 * 
 */	

;(function ($) {
	
	$.fn.jukebox = function (option) {
		
		/*////////////////////////////////////////////////////////////////////VIEW */
		
		var billboard = function (params) {

			var posters = params.posters,
					posterCount = posters.length;
			
			var that = {
				featurePosterAt: function (idx) {
					that.hideAllPosters();
					that.showPosterAt(idx);
				},
				showPosterAt: function (idx) {
					$('#' + posters[idx].id).show();
				},
				hideAllPosters: function () {
					for(var i = 0; i < posterCount; i += 1){
						$('#' + posters[i].id).hide();
					}
				},
				renderTo: function (target) {
					var len = posters.length;
					
					$('<div/>').attr('id', 'jukebox-billboard').appendTo(target);					
					$('<div/>').attr('id', 'jukebox-posters').appendTo('#jukebox-billboard');
					
					for (var i=0; i < len; i++){
						posters[i].renderTo('#jukebox-posters');
					}
				}
			};
			
			return that;
		}
		
		
		var poster = function (params) {
			var _id = params.id,
					_idx = params.idx,
					_url = params.url;
			
			var that = {
				id: _id,
				idx: _idx,
				url: _url,
				renderTo: function (target) {
					$('<img>').attr('id', 'poster-' + _idx).addClass('poster').attr('src', _url).attr('data-playlistIdx', _idx).bind('click', function (e) {
							var clickTarget = $(e.target);
							e.stopPropagation();
							e.preventDefault();
							clickTarget.trigger('posterClick', {'idx': _idx});
						}).appendTo(target);
				},
				show: function () {
					$('#' + _id).fadeIn(200);
				},
				hide: function () {
					$('#' + _id).fadeOut(200);
				}
			}
			return that;
		}
		
		
		var tray = function (params) {
			var covers = params.covers;
					
			var that = {
				addPlaylist: function (playlist) {
					playlists.push(playlist);
				},
				renderTo: function ($target) {
					var len = covers.length;
					var totalWidth = 0;
					$('<div/>').attr('id', 'jukebox-tray').appendTo($target);
					
					$('<div/>').attr('id', 'jukebox-tray-prev').bind('click', function (e) {

					}).appendTo('#jukebox-tray');
					
					$('<div/>').attr('id', 'jukebox-tray-liner').appendTo('#jukebox-tray');
					$('<div/>').attr('id', 'jukebox-covers').appendTo('#jukebox-tray-liner');
					
					$('<div/>').attr('id', 'jukebox-tray-next').bind('click', function (e) {

					}).appendTo('#jukebox-tray');

					for (var i=0; i < len; i++){
						totalWidth += parseInt($('<a/>').attr('id', 'cover-' + covers[i].idx).addClass('jukebox-cover').attr('data-playlistIdx', covers[i].idx).css('background-image', 'url(' + covers[i].url + ')' ).bind('click', function (e) {
							
						}).appendTo('#jukebox-covers').css('width').replace(/[^0-9]/g, ''));
					}
					$('#jukebox-covers').css('width', function () {
						return totalWidth;
					});
				}
			};
			return that;
		}
		
		var playButton = function (){
			var that = {
				renderTo: function (target) { 

					$('<div/>').attr('id', 'jukebox-play').bind('click', function (e) {

					}).appendTo(target);
				}
			}
			return that;
		}
		
		
		var forwardButton = function (){
			var that = {
				renderTo: function (target) { 

					$('<div/>').attr('id', 'jukebox-forward').bind('click', function (e) {
					}).appendTo(target);
				}
			}
			return that;
		}
		
		
		var backwardButton = function (){
			var that = {
				renderTo: function (target) { 
					
					$('<div/>').attr('id', 'jukebox-backward').bind('click', function (e) {
					}).appendTo(target);
				}
			}
			return that;
		}
		
		var trackInfo = function () {
			var that = {
				renderTo: function (target){
					$(target).append('<div id="jukebox-track-info">Click an image below to listen</div>');
				},
				setText: function (text) {
					$('#jukebox-track-info').text(text);
				}
			}
			return that;
		}
		
		var player = function (){
			
			var _playButton = playButton();
			var _forwardButton = forwardButton();
			var _backwardButton = backwardButton();
			var _trackInfo = trackInfo();
			
			var that = {
				renderTo: function (target) {
					$('<div/>').attr('id', 'jukebox-controls').appendTo(target);
					_playButton.renderTo('#jukebox-controls');
					_forwardButton.renderTo('#jukebox-controls');
					_backwardButton.renderTo('#jukebox-controls');
					_trackInfo.renderTo('#jukebox-controls');
				},
				setText: function (text){
					_trackInfo.setText(text);
				}
			};
			return that;
		}
		
		var jukeboxView = function (model, container) {
			var _model = model,
					$container = $(container);
			
			var _billboard = billboard({'posters': _model.getPosters()});
			var _tray = tray({'covers': _model.getCovers()});
			var _player = player();
					
			var that = {
				render: function () {
					_billboard.renderTo($container);
					_billboard.featurePosterAt(0);
					_tray.renderTo($container);
					_player.renderTo('#jukebox-billboard');
				},
				setPlayButtonState: function (isPlaying) {
					if(isPlaying){
						$('#jukebox-play').addClass('isPlaying');
					} else {
						$('#jukebox-play').removeClass('isPlaying');
					}
				},
				scrollCarousel: function (carouselX) {
					$('#jukebox-covers').animate({'left': carouselX}, 250);
				},
				setText: function (text){
					_player.setText(text);
				},
				featurePosterAt: function (idx) {
					_billboard.featurePosterAt(idx);
				}
			}
			return that;
		}
		
		/*////////////////////////////////////////////////////////////////////MODEL */
		
		var playlist = function (params) {
			var _name = params.name,
					_cover = params.cover,
					_poster = params.poster,
					_tracks = params.tracks,
					_title = params.title;
					
			var that = {
				name: _name,
				cover: _cover,
				poster: _poster,
				tracks: _tracks,
				title: _title,
				addTrack: function (track) {
					_tracks.push(track);
				}		
			};
			return that;
		}
		
		
		var track = function (params) {
			var playlistIdx = params.playlistIdx,
					trackIdx = params.trackIdx,
					id = params.id,
					title = params.title,
					element = params.element;
			
			var that = {
				id: id,
				idx: trackIdx,
				title: title,
				playlist: playlistIdx,
				play: function () {
					element.play();
				},
				pause: function () {
					element.pause();
				},
				stop: function () {
					element.pause();
					element.currentTime = 0;
				}
			};
			
			return that;
		}
		
		
		var jukeboxModel = function ($playlists){
			var _playlists = [],
					_isPlaying = false,
					_currentTrack = {};
			
			$playlists.each(function (idx, playlistData) {
				
				$playlist = $(playlistData);
				
				_audio = []; 
				
				$playlist.find('audio').each(function (audioIdx, audioElement){
					_audio.push(track({'id': audioElement.id, 'playlistIdx': idx, 'trackIdx': audioIdx, 'title': audioElement.getAttribute('data-track-title'), 'element': audioElement}));
				});
				
				_playlists.push(playlist({
					name: $playlist.attr('data-playlist-name'),
					cover: {
						'idx': idx, 
						'url': $playlist.attr('data-cover-art')
					},
					poster: poster({
						'idx': idx,
						'id': 'poster-' + idx, 
						'url': $playlist.attr('data-poster-art')
					}),
					tracks: _audio
				}));

			});
			
			// private methods
			
			var init = function (){
				setCurrentTrack(0,0);
			}
			
			var setCurrentTrack = function (playlistIdx, trackIdx) {
				// TODO: refactor into a hasIndex function
				if(playlistIdx <= _playlists.length && trackIdx <= _playlists[playlistIdx].tracks.length){
					_currentTrack = _playlists[playlistIdx].tracks[trackIdx];
				}
			}
			
			var hasNextTrack = function () {
					if(undefined !== _playlists[_currentTrack.playlist].tracks[_currentTrack.idx + 1])
					{
						return true;
					}
					return false;
			};
			
			var hasPrevTrack = function () {
					if(undefined !== _playlists[_currentTrack.playlist].tracks[_currentTrack.idx - 1])
					{
						return true;
					}
					return false;
			};
			
			var getPageCount = function () {
				if(_playlists.length % option.carouselScroll === 0){
					return _playlists.length / option.carouselScroll;
				} else {
					return Math.floor(_playlists.length / option.carouselScroll) + 1;
				}
			}
			
			// public methods
			
			var that = {
				carouselWidth: option.carouselWidth,
				carouselScroll: option.carouselScroll,
				carouselIdx: option.carouselIndex,
				carouselLeft: option.carouselLeft,
				carouselPages: getPageCount(),
				autoplay: option.autoplay,
				getCurrentTrack: function () {
					return _currentTrack;
				},
				getLastTrack: function (){
					var playlistIdx = _currentTrack.playlist,
							lastTrackIdx = that.getTrackCountForPlaylist(playlistIdx) - 1;
					setCurrentTrack(playlistIdx, lastTrackIdx);
					return _currentTrack;
				},
				setFirstTrackForPlaylist: function (idx) {
					setCurrentTrack(idx, 0);
				},
				getNextTrack: function () {
					if(hasNextTrack()){
						_currentTrack = _playlists[_currentTrack.playlist].tracks[_currentTrack.idx + 1];
					} else {
						_currentTrack = _playlists[_currentTrack.playlist].tracks[0];
					}
					return _currentTrack;
				},
				getPrevTrack: function () {
					if(hasPrevTrack()){
						_currentTrack = _playlists[_currentTrack.playlist].tracks[_currentTrack.idx - 1];
					}
					return _currentTrack;
				},
				getPlaylistAtIndex: function (idx) {
					return _playlists[idx];
				},
				getTrackCountForPlaylist: function (idx){
					if(undefined !== _playlists[idx]){
						return _playlists[idx].tracks.length;
					}
				},
				getPlaylistCount: function () {
					return _playlists.length;
				},
				getPosters: function () {
					var posters = [];
					var len = _playlists.length;
					for(var i=0; i < len; i++) {
						posters.push(_playlists[i].poster);
					}
					return posters;
				},
				getCovers: function () {
					var covers = [];
					var len = _playlists.length;
					for(var i=0; i < len; i++) {
						covers.push(_playlists[i].cover);
					}
					return covers;
				},
				getTracksForPlaylist: function (idx) {
					return _playlists[idx].tracks;
				},
				getTrackCountForPlaylist: function (idx) {
					return _playlists[idx].tracks.length;
				}
			};
			init();
			return that;
		}
		
		
		/*//////////////////////////////////////////////////////////////////CONTROLLER */
		
		var Jukebox = function ($playlists, params) {		
			var playingState = {
				play: function () {
					var audio = _model.getCurrentTrack();
					audio.pause();
					audio.currentTime = 0;
					_view.setPlayButtonState();
					_state = readyState;
				},
				stop: function () {
					var audio = _model.getCurrentTrack();
					audio.pause();
					audio.currentTime = 0;
					_state = readyState;
				},
				next: function (track) {
					playingState.stop();
					_model.getNextTrack();
					_state.play(track);
				},
				prev: function (track) {
					playingState.stop();
					_model.getPrevTrack();
					_state.play(track);
				}
			}
			
			var readyState = {
				play: function () {
					try {
						_model.getCurrentTrack().play();
						_state = playingState;
					} catch (e) {
						if(window.console && console.error("Error:" + e));
					}
				},
				stop: function () {
					// do nothing already stopped
				},
				next: function () {
					readyState.play()
				},
				prev: function () {
					_model.getLastTrack();
					readyState.play();
				}
			}
			
			var loadingState = {
				play: function () {
					
				},
				pause: function () {
					
				},
				stop: function () {
					
				}
			}
			
			var initState = {
				play: function () {
				},
				pause: function () {
					
				},
				stop: function () {
					
				}
			}
			
			var _state = initState,
					_container = params.jukebox,
					_model = jukeboxModel($playlists),
					_view = jukeboxView(_model, _container);
					
			var navigate = function ()
			{
				var carouselX = ((_model.carouselIdx * _model.carouselWidth) * -1) + _model.carouselLeft;
				_view.scrollCarousel( carouselX );
			}
					
			// Event handlers
			$(window).bind('click', function (e) {
				
				if(e.target.className === 'jukebox-cover'){
					_state.stop();
					var idx = e.target.getAttribute('data-playlistidx');
					_model.setFirstTrackForPlaylist(idx);
					_view.featurePosterAt(idx);
					_state.play();
				}
				
				if(e.target.id === 'jukebox-tray-prev'){
					if (_model.carouselIdx !== 0)
					{
						_model.carouselIdx = --_model.carouselIdx % _model.carouselPages;
						navigate();
					}
				}
				
				if(e.target.id === 'jukebox-tray-next'){
					_model.carouselIdx = ++_model.carouselIdx % _model.carouselPages;
					navigate();
				}
				
				if(e.target.id === 'jukebox-play'){
					_state.play();
				}
				
				if(e.target.id === 'jukebox-forward'){
					_state.next();
				}
				
				if(e.target.id === 'jukebox-backward'){
					_state.prev();
				}

			});
			
			/* HTMLMediaElement listners */
			
			
			$('audio').bind('abort', function (e) {
				_state.stop();
				_view.setPlayButtonState(false);
				_view.setText("Data connection aborted");
				say('abort: ' + e.target.id);
			});
			
			$('audio').bind('canplay', function (e) {
				//say('canplay: ' + e.target);
			});
			
			$('audio').bind('canplaythrough', function (e) {
				say('canplaythrough: ' + e.target.id);
			});
			
			$('audio').bind('durationchange', function (e) {
				//say('durationchange: ' + e.target);
			});
			
			$('audio').bind('emptied', function (e) {
				_state.stop();
				_view.setPlayButtonState(false);
				_view.setText("Data connection lost");
			});
			
			$('audio').bind('ended', function (e) {
				_view.setPlayButtonState(false);
				_view.setText("Click an image below to listen");
				if(_model.autoplay){
					_state.next();
				}
			});
			
			$('audio').bind('error', function (e) {
				_view.setPlayButtonState(false);
				_view.setText("An error occured: " + e.message);
				if(_model.autoplay){
					_state.next();
				}
			});
			
			$('audio').bind('loadeddata', function (e) {
				say('loadeddata: ' + e.target.id);
			});
			
			$('audio').bind('loadedmetadata', function (e) {
				say('loadedmetadata: ' + e.target.id);
			});
			
			$('audio').bind('loadstart', function (e) {
				say('loadstart: ' + e.target.id);
			});
			
			$('audio').bind('pause', function () {
				_view.setPlayButtonState(false);
				_view.setText("Click an image below to listen");
			});
			
			$('audio').bind('play', function (e) {
				say('play: ' + e.target);
			});
			
			$('audio').bind('playing', function () {
				_view.setPlayButtonState(true);
				_view.setText(_model.getCurrentTrack().title);
			});
			
			$('audio').bind('progress', function (e) {
				say('progress: ' + e.target);
			});
			
			$('audio').bind('ratechange', function (e) {
				say('ratechange: ' + e.target);
			});
			
			$('audio').bind('stalled', function (e) {
				say('stalled: ' + e.target.id);
			});
			
			$('audio').bind('suspend', function (e) {
				say('suspend: ' + e.target);
			});
			
			$('audio').bind('timeupdate', function (e) {
				//say('timeupdate: ' + e.target);
			});			
			
			$('audio').bind('waiting', function (e) {
				_view.setText("Waiting for data...");
				say('waiting: ' + e.target);
			});
			
			
			_view.render();
			_state = readyState;
			
			// public api
			var that = {
				play: function () {
					_state.play();
				}
			};
			
			return that;
		}
		
		/*////////////////////////////////////////////////////////////////// UTILS */
		
		function digits(str){
			return str.replace(/[^0-9]/g, '');
		}
		
		function say(msg) {
			if(window.console && console.log) {
				console.log(msg);
			}
		}
		
		/*/////////////////////////////////////////////////////////////////// INIT */
		
		option = $.extend({}, $.fn.jukebox.defaults, option);
		
		var _jukebox = Jukebox(this, option);
		
		return this;
			
	}

	$.fn.jukebox.defaults = {
		coverWidth: 200,
		coverHeight: 200,
		carouselWidth: 600,
		carouselScroll: 3,
		carouselIndex: 0,
		carouselLeft: 0,
		jukebox: '#jukebox',
		autoplay: false
	};

	
})(jQuery);