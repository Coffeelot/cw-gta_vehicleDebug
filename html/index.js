window.addEventListener("message", function(event) {
	const data = event.data;
	const callback = data.callback;

	if (callback != undefined) {
		const func = window[callback.type];
		if (func != undefined) {
			func(callback.data);
		}
	}
});

function post(type, data) {
	try {
		fetch(`https://${GetParentResourceName()}/${type}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(data)
		})
	} catch {}
}

function setFocus(value) {
	document.querySelector("#handling").style.display = value ? "block" : "none";
}

function millisToTimeSpan(milli) {
    var milliseconds = milli % 1000;
    var seconds = Math.floor((milli / 1000) % 60);
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    millis = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
	if (millis == 0) {
		millis = '00'
	}

    return seconds + ":" + String(millis).slice(0,2);
}

function updateText(data) {
	for (var x in data) {
		const val = data[x];
		const element = document.querySelector(`#${x}`);

		if (element != undefined) {
			if(x == 'accel-sixty' || x == 'accel-onetwenty') {
				element.innerHTML = millisToTimeSpan(val);
			} else if (x == 'accel-good') {
				if (val == true) {
					element.innerHTML = '🟢'
				} else {
					element.innerHTML = '🔴'
				}
			} else if (x == 'top-speed' || x == 'top-accel') { 
				element.innerHTML = Math.floor(val);
			} else {
				element.innerHTML = val;
			}
		}
	}
}

function copyText(text) {
	var element = document.querySelector("#clipboard");
	
	element.value = text;
	element.select();
	element.setSelectionRange(0, 99999);
	
	document.execCommand("copy");

	element.value = undefined;
}

function copyHandling() {
	post("copyHandling")
}

function updateHandling(key, value) {
	post("updateHandling", {
		key: key,
		value: value,
	})
}