document.querySelector(".theme-toggle").addEventListener("click", function (e) {
	// Toggle light/dark theme on icon click
	if (document.body.getAttribute("data-theme")) {
		document.body.removeAttribute('data-theme');
		e.target.classList.remove("fa-moon");
		e.target.classList.add("fa-sun");
	} else {
		document.body.setAttribute('data-theme', 'dark');
		e.target.classList.add("fa-moon");
		e.target.classList.remove("fa-sun");
	}
});