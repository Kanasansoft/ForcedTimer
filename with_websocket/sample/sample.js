var initialize = function() {

	var timeoutButton  = document.getElementById("timeout_button");
	var intervalButton = document.getElementById("interval_button");
	var timeoutOutput    = document.getElementById("timeout_output");
	var intervalOutput   = document.getElementById("interval_output");

	var ms = 100;
	var timerIds = {};

	var getDate = function() {
		var dtm = new Date();
		var result =
			("0000" + (dtm.getFullYear()     + 0)).slice(-4) + "/" +
			(  "00" + (dtm.getMonth()        + 1)).slice(-2) + "/" +
			(  "00" + (dtm.getDate()         + 0)).slice(-2) + " " +
			(  "00" + (dtm.getHours()        + 0)).slice(-2) + ":" +
			(  "00" + (dtm.getMinutes()      + 0)).slice(-2) + ":" +
			(  "00" + (dtm.getSeconds()      + 0)).slice(-2) + "." +
			( "000" + (dtm.getMilliseconds() + 0)).slice(-3) + ""  ;
		return result;
	};

	var timeout = function() {
		timeoutOutput.value = getDate() + "\n" + timeoutOutput.value;
		timerIds["timeout"] = ForcedTimer.setTimeout(timeout, ms);
	};

	var interval = function() {
		intervalOutput.value = getDate() + "\n" + intervalOutput.value;
	};

	timeoutButton.addEventListener(
		"click",
		function() {
			if ("timeout" in timerIds) {
				var timerId = timerIds["timeout"];
				ForcedTimer.clearTimeout(timerId);
				delete timerIds["timeout"];
			} else {
				timerIds["timeout"] = ForcedTimer.setTimeout(timeout, ms);
			}
		},
		false
	);

	intervalButton.addEventListener(
		"click",
		function() {
			if ("interval" in timerIds) {
				var timerId = timerIds["interval"];
				ForcedTimer.clearInterval(timerId);
				delete timerIds["interval"];
			} else {
				timerIds["interval"] = ForcedTimer.setInterval(interval, ms);
			}
		},
		false
	);
};

window.addEventListener("load", initialize, false);
