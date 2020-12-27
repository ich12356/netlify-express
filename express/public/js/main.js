// JQuery Smooth Scroll Animation
$("a.nav-link").on("click", function (e) {
	if (this.hash !== "" && this.hash.charAt(0) === "#") {
		e.preventDefault();

		const hash = this.hash;

		$("html, body").animate(
			{
				scrollTop: $(hash).offset().top - 100,
			},
			1500
		);
	}
});

const amzButtons = document.querySelectorAll(".amz-btn");
amzButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		gtag("event", "view_item", {
			event_label: "Amazon Button",
			event_category: "engagement",
		});
	});
});
