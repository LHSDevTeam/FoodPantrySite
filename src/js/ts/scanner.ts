let jsQR = require('jsqr');

document.getElementById('stopbt').addEventListener("click",function(e) {
    let photo : HTMLCanvasElement = document.createElement("canvas");
    let ctx = photo.getContext("2d");
    ctx.drawImage(document.getElementById("video") as HTMLVideoElement, 0, 0, photo.width, photo.height);
    let code = jsQR(ctx.getImageData(0,0,photo.width, photo.height).data, photo.width, photo.height);

    if (code) {
      console.log(code);
    }
});

// Need to check if facingMode: "environment" works on mobile devices
let video : HTMLVideoElement = document.getElementById("video") as HTMLVideoElement;
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: {facingMode: "environment"}, audio: false}).then(function (stream) {
        video.srcObject = stream;
        video.play();
    }).catch(function (error) {
      console.error(error);
    });
}
