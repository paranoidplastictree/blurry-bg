function checkKey(e) {
    e = e || event; // I hate you, IE
	map[e.keyCode] = e.type == 'keydown';

	if (map[17] && map[38]) { // ctrl + up arrow
		incrementBlur(1);
	} else if (map[17] && map[40]) { // ctrl + down arrow
		incrementBlur(-1);
	} else if (map[38]) { // up arrow
		showInput();
    } else if (map[40]) { // down arrow
		hideInput();
    } else if (map[37]) { // left arrow
		cyclePreviousImage();
    } else if (map[39]) { // right arrow
		cycleNextImage();
    } else if (map[27]) { // esc
		hideInput();
		clearInput();
	} else if (map[13]) { // enter
		captureInput();
	} else if (map[46]) { // delete
		removeCurrentImage();
	}
}

function showInput() {
	var urlWrapper = document.getElementById('url-wrapper');
	urlWrapper.setAttribute("style", "display: block;");
	document.getElementsByTagName("input")[0].focus();
}

function hideInput() {
	var urlWrapper = document.getElementById('url-wrapper');
	urlWrapper.setAttribute("style", "display: none;");
}

function clearInput() {
	let urlInput = document.getElementsByTagName("input")[0];
	urlInput.value = "";
}

function captureInput() {
	let urlInput = document.getElementsByTagName("input")[0];
	var url = urlInput.value;
	
	if (url === '') {
		hideInput();
		return;
	}
	
	urlList.push(url);
	hideInput();
	clearInput();
	imageIndex = urlList.length - 1;
	updateBackground(urlList[imageIndex]);
}

function removeCurrentImage() {
	if (urlList.length === 0) return;
	cycleNextImage();
	urlList.splice(imageIndex, 1);
}

function incrementBlur(value) {
	blurPx = blurPx + value;
	let webKitStyle = "-webkit-backdrop-filter: blur(" + blurPx + "px);";
    let style = "backdrop-filter: blur(" + blurPx + "px);";
	let box = document.getElementsByClassName("box")[0];
	box.setAttribute("style", style + webKitStyle);
}

function updateBackground(url) {
	let bgImageStyle = "background-image: url(" + url + "), linear-gradient(rgb(219, 166, 166), rgb(0, 0, 172));";
	let bgStyles = "background-position: center center; background-repeat: no-repeat; background-size: cover; margin: 0px;"
	let style = bgImageStyle + bgStyles;
	var bod = document.getElementsByTagName("body")[0];
	bod.setAttribute("style", style);
}

function cycleNextImage() {
	if (urlList.length === 0) return;
	imageIndex = imageIndex + 1 < urlList.length ? imageIndex + 1 : 0;
	updateBackground(urlList[imageIndex]);
}

function cyclePreviousImage() {
	if (urlList.length === 0) return;
	imageIndex = imageIndex - 1 >= 0 ? imageIndex - 1 : urlList.length - 1;
	updateBackground(urlList[imageIndex]);
}

let urlList = [						
	"https://homedesignlover.com/wp-content/uploads/2016/02/12-Luxury-Apartment.jpg",
	"https://homedesignlover.com/wp-content/uploads/2016/02/7-Fuhlam-SW6.jpg",
	"https://media1.popsugar-assets.com/files/thumbor/47OzuApjQ6i0GBnPf2cXwsCpf-0/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/03/27/762/n/1922794/b2e495a617549f35_09_Gilmor_Space_684764_fin1_.RGB_color.0001/i/Gilmore-Girls-Inspired-Transitional-Living-Room.jpg"
];

let imageIndex = 0;
let blurPx = 6;
let map = {};

(function(window, document, undefined){
	window.onload = init;

	function init(){
		document.body.onkeydown = document.body.onkeyup = checkKey;

		let url = urlList[imageIndex];
		updateBackground(url);
		showInput();
	}
	
})(window, document, undefined);




