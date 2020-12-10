// JQuery Smooth Scroll Animation
$("a").on("click", function (e) {
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
