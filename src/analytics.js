(function() {
	'use strict';
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = 'https://ssl.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-44998061-1']);
_gaq.push(['_trackEvent', 'bookmarklet', 'clicked']);

// ga('create', 'UA-44998061-1', 'shanti2530.github.io');
// ga('send', 'pageview');