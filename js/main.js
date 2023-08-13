; (function () {

	'use strict';

	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	var fullHeight = function () {

		if (!isMobile.any()) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function () {
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function () {
		$(window).stellar();
	};

	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						}, k * 100, 'easeInOutExpo');
					});

				}, 50);

			}

		}, { offset: '85%' });
	};



	var goToTop = function () {

		$('.js-gotop').on('click', function (event) {

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			return false;
		});

		$(window).scroll(function () {

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});

	};

	var pieChart = function () {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor: "#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function () {
		if ($('#fh5co-skills').length > 0) {
			$('#fh5co-skills').waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					setTimeout(pieChart, 400);
					$(this.element).addClass('animated');
				}
			}, { offset: '90%' });
		}

	};


	// Loading page
	var loaderPage = function () {
		$(".fh5co-loader").fadeOut("slow");
	};


	$(function () {
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});


}());

function myFunction(e) {
	var x = e.clientX - 90;
	var y = e.clientY - 90;
	document.getElementById("tooltip").style.left = x + "px";
	document.getElementById("tooltip").style.top = y + "px";
}

new kursor({
	type: 1,
	removeDefaultCursor: true,
	color: '#000'
})

const defaults = {
	spread: 360,
	ticks: 50,
	gravity: 0,
	decay: 0.94,
	startVelocity: 30,
	shapes: ["star"],
	colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
};

function shoot() {
	confetti({
		...defaults,
		particleCount: 40,
		scalar: 1.2,
		shapes: ["star"],
	});

	confetti({
		...defaults,
		particleCount: 10,
		scalar: 0.75,
		shapes: ["circle"],
	});
}

setTimeout(shoot, 0);

function shootEmojiAndUnicorns() {
	confetti({
	  ...defaults,
	  particleCount: 30,
	  scalar: 1.2,
	  shapes: ["circle", "square"],
	  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
	});
  
	confetti({
	  ...defaults,
	  particleCount: 20,
	  scalar: 2,
	  shapes: ["text"],
	  shapeOptions: {
		text: {
		  value: ["🦄", "🌈"],
		},
	  },
	});
}
  
function downloadResume() {
	const a = document.createElement('a')
	let url = "Docs/Dhaval_Resume.pdf"
	a.href = url
	a.download = url.split('/').pop()
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	shootEmojiAndUnicorns()
}
