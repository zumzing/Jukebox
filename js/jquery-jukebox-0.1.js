;(function($) {
	
	$.fn.jukebox = function(option) {
		
		/*////////////////////////////////////////////////////////////////////VIEW */
		
		var billboard = function(params) {

			var posters = params.posters,
					posterCount = posters.length;
			
			var that = {
				featurePosterAt: function(idx) {
					that.hideAllPosters();
					that.showPosterAt(idx);
				},
				showPosterAt: function(idx) {
					$('#' + posters[idx].id).show();
				},
				hideAllPosters: function(){
					for(var i=0; i < posterCount; i++){
						$('#' + posters[i].id).hide();
					}
				},
				renderTo: function($target) {
					var len = posters.length;
					
					$('<div/>', {'id': 'jukebox-billboard'}).appendTo($target);					
					$('<div/>', {'id': 'jukebox-posters'}).appendTo('#jukebox-billboard');
					
					for (var i=0; i < len; i++){
						posters[i].renderTo('#jukebox-posters');
					}
				}
			};
			
			return that;
		}
		
		
var poster = function(params) {
			var _id = params.id,
					_idx = params.idx,
					_url = params.url;
			
			var that = {
				id: _id,
				idx: _idx,
				url: _url,
				renderTo: function(target) {
					$('<img/>', {'id': 'poster-' + _idx, 'class': 'poster', 'src': _url, 'data-playlistIdx': _idx}).bind('click', function(e) {
							console.log('poster: ' + _id + ' gets a click');
							var clickTarget = $(e.target);
							e.stopPropagation();
							e.preventDefault();
							clickTarget.trigger('posterClick', {'idx': _idx});
						}).appendTo(target);
/*
					$('<img/>', {'id': 'poster-' + posters[i].idx, 'class': 'poster', 'src': posters[i].url, 'data-playlistIdx': posters[i].idx}).bind('click', function(e) {
							
							var clickTarget = $(e.target);
							e.stopPropagation();
							e.preventDefault();
							clickTarget.trigger('posterClick', {'idx': clickTarget.attr('data-playlistIdx')});
						}).appendTo('#jukebox-posters');
*/
				},
				show: function() {
					$('#' + _id).fadeIn(200);
					console.log("show");
				},
				hide: function() {
					console.dir($(_id));
					$('#' + _id).fadeOut(200);
				}
			}
			return that;
		}
		
		
		var tray = function(params) {
			
			var covers = params.covers;
					
			var that = {
				addPlaylist: function(playlist) {
					playlists.push(playlist);
				},
				renderTo: function($target) {
					var len = covers.length;
					var totalWidth = 0;
					$('<div/>', {'id': 'jukebox-tray'}).appendTo($target);
					
					$('<div/>', {'id': 'jukebox-tray-prev'}).bind('click', function(e) {
						var clickTarget = $(e.target);
						e.stopPropagation();
						e.preventDefault();
						clickTarget.trigger('prevClick', {'idx': clickTarget.attr('data-playlistIdx')});
					}).appendTo('#jukebox-tray');
					
					$('<div/>', {'id': 'jukebox-tray-liner'}).appendTo('#jukebox-tray');
					$('<div/>', {'id': 'jukebox-covers'}).appendTo('#jukebox-tray-liner');
					
					$('<div/>', {'id': 'jukebox-tray-next'}).bind('click', function(e) {
						var clickTarget = $(e.target);
						e.stopPropagation();
						e.preventDefault();
						clickTarget.trigger('nextClick', {'idx': clickTarget.attr('data-playlistIdx')});
					}).appendTo('#jukebox-tray');

					for (var i=0; i < len; i++){
						totalWidth += parseInt($('<a/>', {'id': 'cover-' + covers[i].idx, 'class': 'jukebox-cover', 'data-playlistIdx': covers[i].idx}).css('background-image', 'url(' + covers[i].url + ')' ).bind('click', function(e) {
							var clickTarget = $(e.target);
							e.stopPropagation();
							e.preventDefault();
							clickTarget.trigger('coverClick', {'idx': clickTarget.attr('data-playlistIdx')});
							
						}).appendTo('#jukebox-covers').css('width').replace(/[^0-9]/g, ''));
					}
					$('#jukebox-covers').css('width', function() {
						return totalWidth;
					});
				}
			};
			return that;
		}
		
		var playButton = function(){
			
			var that = {
				renderTo: function(target) { 

					$('<div/>', {'id': 'jukebox-play'}).bind('click', function(e) {
						var clickTarget = $(e.target);
						e.stopPropagation();
						e.preventDefault();
						clickTarget.trigger('play');
					}).appendTo(target);
/*
					var canvas = document.getElementById(target);
					var context = canvas.getContext('2d');
					
					
					context.fillStyle = "rgb(255,255,255)";
					context.lineWidth = 0;
					context.beginPath();
					context.moveTo(0,0);
					context.lineTo(0,60);
					context.lineTo(40,30);
					//context.lineTo(0,0);
					context.fill();
					//context.closePath();
*/
				}
			}
			return that;
		}
		
		
		var forwardButton = function(){
			
			var that = {
				renderTo: function(target) { 

					$('<div/>', {'id': 'jukebox-forward'}).bind('click', function(e) {
						var clickTarget = $(e.target);
						e.stopPropagation();
						e.preventDefault();
						clickTarget.trigger('forward');
					}).appendTo(target);
				}
			}
			return that;
		}
		
		
		var backwardButton = function(){
			
			var that = {
				renderTo: function(target) { 

					$('<div/>', {'id': 'jukebox-backward'}).bind('click', function(e) {
						var clickTarget = $(e.target);
						e.stopPropagation();
						e.preventDefault();
						clickTarget.trigger('backward');
					}).appendTo(target);
				}
			}
			return that;
		}
		
		var trackInfo = function() {
			var that = {
				renderTo: function(target){
					$(target).append('<div id="jukebox-track-info">Click an image below to listen</div>');
				},
				setText: function(text) {
					$('#jukebox-track-info').text(text);
				}
			}
			return that;
		}
		
		var player = function(){
			
			var _playButton = playButton();
			var _forwardButton = forwardButton();
			var _backwardButton = backwardButton();
			var _trackInfo = trackInfo();
			
			var that = {
				renderTo: function(target) {
					$('<div/>', {'id': 'jukebox-controls'}).appendTo(target);
					// TODO: create and append controls
					//$('<canvas id="jukebox-play">No canvas</canvas>').appendTo('#jukebox-controls');
					_playButton.renderTo('#jukebox-controls');
					_forwardButton.renderTo('#jukebox-controls');
					_backwardButton.renderTo('#jukebox-controls');
					_trackInfo.renderTo('#jukebox-controls');
				},
				setText: function(text){
					_trackInfo.setText(text);
				}
			};
			return that;
		}
		
		var jukeboxView = function(model, container) {
			var _model = model,
					$container = $(container);
			
			var _billboard = billboard({'posters': _model.getPosters()});
			var _tray = tray({'covers': _model.getCovers()});
			var _player = player();
					
			var that = {
				render: function() {
					_billboard.renderTo($container);
					_billboard.featurePosterAt(0);
					_tray.renderTo($container);
					_player.renderTo('#jukebox-billboard');
				},
				setPlayButtonState: function(isPlaying) {
					if(isPlaying){
						$('#jukebox-play').addClass('isPlaying');
					} else {
						$('#jukebox-play').removeClass('isPlaying');
					}
				},
				scrollCarousel: function(carouselX) {
					$('#jukebox-covers').animate({'left': carouselX}, 250);
				},
				setText: function(text){
					_player.setText(text);
				},
				featurePosterAt: function(idx) {
					_billboard.featurePosterAt(idx);
				}
			}
			return that;
		}
		
		/*////////////////////////////////////////////////////////////////////MODEL */
		
		var playlist = function(params) {
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
				addTrack: function(track) {
					_tracks.push(track);
				}		
			};
			return that;
		}
		
/*
		var track = function(params) {
			var id = params.id;
			
			var that = {
				id: function() {
					return id;
				}
			}
			return that;
		}
*/
		
		var track = function(params) {
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
				play: function() {
					console.log(element.canPlayType('audio/mp3'));
					element.play();
				},
				pause: function() {
					element.pause();
				},
				stop: function() {
					element.pause();
					element.currentTime = 0;
				}
			};
			
			return that;
		}
		
		
		var jukeboxModel = function($playlists){
			var _playlists = [],
					_isPlaying = false,
					_currentTrack = {};
			
			$playlists.each(function(idx, playlistData) {
				
				$playlist = $(playlistData);
				
				_audio = []; 
				
				$playlist.find('audio').each(function(audioIdx, audioElement){
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
			
			var init = function(){
				setCurrentTrack(0,0);
			}
			
			var setCurrentTrack = function(playlistIdx, trackIdx) {
				// TODO: refactor into a hasIndex function
				if(playlistIdx <= _playlists.length && trackIdx <= _playlists[playlistIdx].tracks.length){
					_currentTrack = _playlists[playlistIdx].tracks[trackIdx];
				}
			}
			
			var hasNextTrack = function() {
					if(undefined !== _playlists[_currentTrack.playlist].tracks[_currentTrack.idx + 1])
					{
						return true;
					}
					return false;
			};
			
			var hasPrevTrack = function() {
					if(undefined !== _playlists[_currentTrack.playlist].tracks[_currentTrack.idx - 1])
					{
						return true;
					}
					return false;
			};
			
			var getPageCount = function() {
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
				getCurrentTrack: function() {
					return _currentTrack;
				},
				setFirstTrackForPlaylist: function(idx) {
					setCurrentTrack(idx, 0);
				},
				getNextTrack: function() {
					if(hasNextTrack()){
						_currentTrack = _playlists[_currentTrack.playlist].tracks[_currentTrack.idx + 1];
					} else {
						_currentTrack = _playlists[_currentTrack.playlist].tracks[0];
					}
					return _currentTrack;
				},
				getPrevTrack: function() {
					if(hasPrevTrack()){
						_currentTrack = _playlists[_currentTrack.playlist].tracks[_currentTrack.idx - 1];
					}
					return _currentTrack;
				},
				getPlaylistAtIndex: function(idx) {
					return _playlists[idx];
				},
				getTrackCountForPlaylist: function(idx){
					if(undefined !== _playlists[idx]){
						return _playlists[idx].tracks.length;
					}
				},
				getPlaylistCount: function() {
					return _playlists.length;
				},
				getPosters: function() {
					var posters = [];
					var len = _playlists.length;
					for(var i=0; i < len; i++) {
						posters.push(_playlists[i].poster);
					}
					return posters;
				},
				getCovers: function() {
					var covers = [];
					var len = _playlists.length;
					for(var i=0; i < len; i++) {
						covers.push(_playlists[i].cover);
					}
					return covers;
				},
				getTracksForPlaylist: function(idx) {
					return _playlists[idx].tracks;
				},
				getTrackCountForPlaylist: function(idx) {
					return _playlists[idx].tracks.length;
				}
			};
			window.model = that;
			init();
			return that;
		}
		
		
		/*//////////////////////////////////////////////////////////////////CONTROLLER */
		
		var Jukebox = function($playlists, params) {
						
			var playingState = {
				play: function() {
					_model.getCurrentTrack().pause();
					_view.setPlayButtonState();
					_state = readyState;
				},
				stop: function() {
					console.log('playing.stop');
					var audio = _model.getCurrentTrack();
					audio.pause();
					audio.currentTime = 0;
					_state = readyState;
				},
				next: function(track) {
					console.log('playing.next');
					playingState.stop();
					_model.getNextTrack();
					_state.play(track);
				},
				prev: function(track) {
					console.log('playing.prev');
					playingState.stop();
					_model.getPrevTrack();
					_state.play(track);
				}
			}
			
			var readyState = {
				play: function() {
					_model.getCurrentTrack().play();
					_state = playingState;
				},
				stop: function() {
					// do nothing already stopped
					console.log('ready.stop');
				},
				next: function() {
					console.log('ready.next');
				},
				prev: function() {
					console.log('ready.prev');
				}
			}
			
			var loadingState = {
				play: function() {
					
				},
				pause: function() {
					
				},
				stop: function() {
					
				}
			}
			
			var initState = {
				play: function() {
				},
				pause: function() {
					
				},
				stop: function() {
					
				}
			}
			
			var _state = initState,
					_container = params.jukebox,
					_model = jukeboxModel($playlists),
					_view = jukeboxView(_model, _container);
					
			var navigate = function()
			{
				var carouselX = ((_model.carouselIdx * _model.carouselWidth) * -1) + _model.carouselLeft;
				//var navX = _model.carouselIdx * (_model.carouselWidth/_model.carouselCount);
				console.log("Navigating: " + carouselX);
				_view.scrollCarousel( carouselX );
				//view.scrollNav( navX );
			}
					
			// Event handlers
			$(window).bind('posterClick', function(e) {
			});
			
			$(window).bind('coverClick', function(e, params) {
				_state.stop();
				var track = _model.setFirstTrackForPlaylist(params.idx);
				_view.featurePosterAt(params.idx);
				_state.play();
			});
			
			$(window).bind('nextClick', function(e) {
				_model.carouselIdx = ++_model.carouselIdx % _model.carouselPages;
				navigate();
			});
			
			$(window).bind('prevClick', function(e) {
				if (_model.carouselIdx !== 0)
				{
					_model.carouselIdx = --_model.carouselIdx % _model.carouselPages;
					navigate();
				}
			});
			
			$(window).bind('play', function(e) {
				_state.play();
			});
			
			$(window).bind('forward', function(e) {
				console.log(_state === playingState);
				_state.next();
			});
			
			$(window).bind('backward', function(e) {
				console.log(_state === playingState);
				_state.prev();
			});
			
			$('audio').bind('playing', function() {
				_view.setPlayButtonState(true);
				_view.setText(_model.getCurrentTrack().title);
			});
			
			$('audio').bind('pause', function() {
				_view.setPlayButtonState(false);
				_view.setText("Click an image below to listen");
			});
			
			$('audio').bind('ended', function() {
				_view.setPlayButtonState(false);
				_view.setText("Click an image below to listen");
				console.log(_model.autoPlay);
				if(_model.autoplay){
					_state.next();
				}
			});
			
			_view.render();
			_state = readyState;
			
			// public api
			var that = {
				play: function() {
					state.play();
				}
			};
			
			return that;
		}
		
		/*////////////////////////////////////////////////////////////////// UTILS */
		
		function digits(str){
			return str.replace(/[^0-9]/g, '');
		}
		
		/*/////////////////////////////////////////////////////////////////// INIT */
		
		option = $.extend({}, $.fn.jukebox.defaults, option);
		
		var _jukebox = Jukebox(this, option);
		
		return this;
			
/*
		return this.each(function() {
			var $jukebox = Jukebox(option);
			var $playlist = $(this).children();
			//$jukebox.css('background-color', option.bgColor);
		});
*/
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