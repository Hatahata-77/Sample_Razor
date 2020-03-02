$(function () {
	$("#BTN2").click(function () {
		var ret = $.ajaxSync("AjaxTest", { "sample": "2" });
		$("#label1").css("color", ret);
		return false;
	});
});
