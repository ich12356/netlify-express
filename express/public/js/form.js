const form = document.querySelector("#email-form");
const input = document.querySelector("#email-input");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	if (input.value.trim() == "") return;

	const XHR = new XMLHttpRequest();
	XHR.addEventListener("error", (e) => {
		console.log(e);
	});
	XHR.open("POST", "/.netlify/functions/server/addEmail");
	XHR.setRequestHeader("Content-Type", "application/json");
	XHR.send(JSON.stringify({ email: input.value.trim() }));
	XHR.abort();

	input.value = "";
});
