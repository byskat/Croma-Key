var video = document.getElementById("video");

var canvas = document.getElementById("canvas");

var context = canvas.getContext("2d");

var hiddenCanvas = document.getElementById("hiddenCanvas");
var hiddenContext = hiddenCanvas.getContext("2d");

video.addEventListener('play', function(){checker()});

function checker(){

	if (video.paused || video.ended) {
		return;
	}

	frameConversion();

	if(requestAnimationFrame){
		requestAnimationFrame(checker);
	}

	setTimeout(checker, 0);
}

function frameConversion(){

	hiddenContext.drawImage(video,0,0,video.videoWidth,video.videoHeight);

	var frame = hiddenContext.getImageData(0,0,video.videoWidth,video.videoHeight);
	var length = frame.data.length;

	for(var i=0; i<length/4; i++){
		var r=frame.data [i*4 + 0];
		var g=frame.data [i*4 + 1];
		var b=frame.data [i*4 + 2];
	
		if(r < 210 && r > 0 && 
		   g < 255 && g > 170 &&
		   b < 160 && b > 0){

			frame.data[i*4+3]=0;
		}
	}
	context.putImageData(frame,0,0);
	return;
}