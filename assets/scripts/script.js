// Check for previously stored user preferences

let theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (theme) {
	document.documentElement.setAttribute("data-theme", theme);	
} else {
	document.documentElement.setAttribute("data-theme", "dark");
}

// Toggle light/dark theme on icon click

document.querySelector(".theme-toggle").addEventListener("click", function (e) {
	if (document.documentElement.getAttribute("data-theme") == "dark") {
		document.documentElement.setAttribute("data-theme", "light");
		localStorage.setItem("theme", "light");
	} else {
		document.documentElement.setAttribute("data-theme", "dark");
		localStorage.setItem("theme", "dark");
	}
	e.target.classList.toggle("fa-moon");
	e.target.classList.toggle("fa-sun");
});