// COMMENTED OUT FOR POPUP
// $(window).load(function(){
// 	     $('.load').hide();
// });

$(document).ready(function() {


	var herotext = $('.hero-text'),
	top = $('.top'),
	p = $('p'),
	pbold = $('p'),
	motto = $('.motto'),
	body = $('body'),
	mid = $('.mid'),
	offset = herotext.offset(),
	tagline = $('.tagline'),
	learnMore = $('.learnLink'),
	playBtn = $('.play'),
	container = $('.container'),
	videoBackground = $('#videoBackground'),
	involveBackground = $('#involveBackground'),
	newsletterForm = $('.newsletterForm'),
	newsletter = $('.newsletter'),
	involveWrap = $('.involveWrap'),
	involvedBtn = $('#involvedBtn'),
	involveClose = $('.involveClose'),
	close = $('.close'),
	isHeroTextVisible = false;
	isVideoPlaying = false;
	isPopupShowing = false;
	isSocialVisible = false;
	var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    var is_safari = navigator.userAgent.indexOf("Safari") > -1;
    var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
    if ((is_chrome)&&(is_safari)) {is_safari=false;}
    if ((is_chrome)&&(is_opera)) {is_chrome=false;}
	window = $('window');

	var heroTextModule = {
		show: function(){
			herotext.hide().fadeIn(1500);
			isHeroTextVisible = true;
		}
	};

	var containerModule = {
		show: function(){
			container.animate({
				opacity: 1
			}, 1000)
		},

		hide: function(){
			container.animate({
				opacity: 0
			}, 100)
		}
	}

	var videoBackgroundModule = {
		show: function(){
			videoBackground.fadeIn('slow');
			close.fadeIn('slow');
			document.getElementById('video').play();
			document.getElementById('full').pause();
			event.preventDefault();
		},

		hide: function(){
			videoBackground.fadeOut(1000,function(){
				isVideoPlaying = false;
				document.getElementById('video').currentTime = 0;
			});
			close.fadeIn('slow');
			document.getElementById('video').pause();
			document.getElementById('full').play();
			event.preventDefault();
		}
	}

	var getInfoModule = {
		show: function(){
			newsletterForm.fadeOut(100);
			involveBackground.fadeIn(300);
			involveWrap.fadeIn(300);
			document.getElementById('full').pause();
		},

		hide: function(){
			involveBackground.fadeOut(100);
			top.show();
			container.show();
		}
	}

	var formModule = {
		show: function(){
			involveBackground.fadeIn(300);
			newsletterForm.fadeIn(300);
			involveWrap.hide();
		},

		hide: function(){
			involveBackground.fadeOut(300);
			newsletterForm.fadeOut(00);
			top.show();
			container.show();
			involveWrap.show();
		}
	}

	var involvedOption = {
		animate: function(one){
			one.animate({
				marginTop: 0
			})
		},
		inactive: function(){
			$('#involveBackground h3').animate({
				marginTop: 100
			})
		}
	}


	heroTextModule.show();

	learnMore.bind('click touchstart',function(){
		$('html,body').animate({
			scrollTop: mid.offset().top - 30
		}, 800);
	});

	involvedBtn.bind('click touchstart',function(){
		getInfoModule.show();
		event.preventDefault();
	});

	newsletter.bind('click touchstart',function(){
		formModule.show();
	});

	involveClose.bind('click touchstart',function(){
		getInfoModule.hide();
		document.getElementById('full').play();
	});

	body.bind('click touchstart',function(){
		if(isVideoPlaying == true){
			videoBackgroundModule.hide();
			close.hide();
			isVideoPlaying = false;
		}
	});

	$('#ideas').bind('click touchstart',function(){
		getInfoModule.show(function(){
			container.click(function(){
				getInfoModule.hide();
			});
		});
	});

	$('.play').bind("click touchstart",function(){
		videoBackgroundModule.show();
		close.show();

	});

	close.bind("click touchstart",function(){
		videoBackgroundModule.hide();
		close.hide();
	});

	$('.position').hover(function() {

		$(this).children('h3').animate({
			marginTop: 0
		},300)
		$(this).children('p').fadeIn(200);
		var image = $(this).find('img');
		image.css('opacity','0.3');

	}, function() {

		$(this).children('h3').animate({
			marginTop: 100
		},300)
		$(this).children('p').fadeOut(200);
		$('.involveTablePic').css('opacity','1');
	});

	setInterval(function(){
		var videoTime = document.getElementById('video');
		if(videoTime.currentTime > 1){
			isVideoPlaying = true;
		}
	});

	 document.getElementById('full').addEventListener('loadedmetadata', function() {
	     this.currentTime = 155;
	 });

	 setInterval(function(){
	     var full = document.getElementById('full');
	     if(full.currentTime > 170){
		 full.currentTime = 155;
	     }
	 },100);

	 $('.newsletterForm').submit(function(e) {
		 e.preventDefault();
		 $.ajax({
		     url: 'https://api.optimizemi.org/newsletter',
		     dataType: 'json',
		     type: 'POST',
		     data: {
			 name: $(".newsletterForm input[name=name]").val(),
			 email: $(".newsletterForm input[name=email]").val()
		     }
		 }).done(function(response) {
		     if (response.status === 'success') {
			 	$('form h1').text("Thanks! You've been added!");
		     }
		 }).fail(function(response) {
		     if (response.status === 409) {
			 alert('This email is already on the mailing list.');
		     }
		     else if (response.status === 500) {
			 alert('Unknown server error; please try again later.');
		     }
		 });
	    });

	$(window).scroll(function(event){

		if($(window).scrollTop() > 450){
			containerModule.show();
		}

		var windowTop = $(window).scrollTop();
		if(windowTop < 400){
			var newPos = (windowTop * 0.2 + 'px');
			$('.parallax').css({
				transform: 'translateY('+ newPos +')',
				MozTransform: 'translateY('+ newPos +')',
				webkitTransform: 'translateY('+ newPos +')',
				msTransform: 'translateY('+ newPos +')'
			})
		}

		var contactTop = $('.contact').offset().top / 1.4;

		if(windowTop >= contactTop) {
			$('.contact h1').fadeIn('slow',function(){
				$('#facebook').css({
					transform: 'scale(100,100)',
					MozTransform: 'scale(100,100)',
					webkitTransform: 'scale(100,100)',
					msTransform: 'scale(100,100)'
				},500);
				$('#twitter').css({
					transform: 'scale(100,100)',
					MozTransform: 'scale(100,100)',
					webkitTransform: 'scale(100,100)',
					msTransform: 'scale(100,100)'
				},500);

				$('#instagram').css({
					transform: 'scale(100,100)',
					MozTransform: 'scale(100,100)',
					webkitTransform: 'scale(100,100)',
					msTransform: 'scale(100,100)'
				},500);

				$('#medium').css({
					transform: 'scale(100,100)',
					MozTransform: 'scale(100,100)',
					webkitTransform: 'scale(100,100)',
					msTransform: 'scale(100,100)'
				},500);
			});

		}

		if ($(window).width() <= 414){

			$('#facebook').css({
				transform: 'scale(60,60)',
				MozTransform: 'scale(60,60)',
				webkitTransform: 'scale(60,60)',
				msTransform: 'scale(60,60)'
			},500);
			$('#twitter').css({
				transform: 'scale(60,60)',
				MozTransform: 'scale(60,60)',
				webkitTransform: 'scale(60,60)',
				msTransform: 'scale(60,60)'
			},500);

			$('#instagram').css({
				transform: 'scale(60,60)',
				MozTransform: 'scale(60,60)',
				webkitTransform: 'scale(60,60)',
				msTransform: 'scale(60,60)'
			},500);

			$('#medium').css({
				transform: 'scale(60,60)',
				MozTransform: 'scale(60,60)',
				webkitTransform: 'scale(60,60)',
				msTransform: 'scale(60,60)'
			},500);

		}
	});

});
