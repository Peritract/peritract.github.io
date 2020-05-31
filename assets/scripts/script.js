// Check for previously stored user preferences

let theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (theme) {
	document.body.setAttribute("data-theme", theme);	
} else {
	document.body.setAttribute("data-theme", "dark");
}

// Toggle light/dark theme on icon click

document.querySelector(".theme-toggle").addEventListener("click", function (e) {
	if (document.body.getAttribute("data-theme") == "dark") {
		document.body.setAttribute("data-theme", "light");
		e.target.classList.remove("fa-moon");
		e.target.classList.add("fa-sun");
		localStorage.setItem("theme", "light");
	} else {
		document.body.setAttribute("data-theme", "dark");
		e.target.classList.add("fa-moon");
		e.target.classList.remove("fa-sun");
		localStorage.setItem("theme", "dark");
	}
});

// Display each section if the relevant button is clicked

let controls = document.querySelectorAll(".tab-control");

controls.forEach(control => control.addEventListener("click", function(e) {

	// Hide all tabs

	tabs = document.querySelectorAll(".content-tab");
	tabs.forEach(tab => tab.classList.add("tab-hidden"));

	// Display the correct one
	
	id = e.target.getAttribute("data-target");
	tab = document.querySelector("#" + id);
	tab.classList.remove("tab-hidden");

	// Remove styling from all controls

	controls = document.querySelectorAll(".tab-control");
	controls.forEach(control => control.classList.remove("control-active"));

	// Add styling to the correct one

	e.target.classList.add("control-active");

}));