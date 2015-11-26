function redirect() {
	var form = document.forms[0];
	var radius = form.elements["radius"].value;
	var stars = form.elements["stars"].value
	var n_url = window.location.href.split('/');
	n_url = n_url.slice(0,n_url.length-1).join('/');
	window.location.href = n_url + "/constellations.html?radius="+radius+"&stars="+stars;
}