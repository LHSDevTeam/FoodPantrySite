let jsQR: (arg0: Uint8ClampedArray, arg1: number, arg2: number) => any = require('jsqr');

let items : {name : string, type : string, category : string}[] = [];

document.getElementById('stopbt').addEventListener("click",function(e) {
    let photo : HTMLCanvasElement = document.createElement("canvas");
    let ctx = photo.getContext("2d");
    ctx.drawImage(document.getElementById("video") as HTMLVideoElement, 0, 0, photo.width, photo.height);
    let code = jsQR(ctx.getImageData(0,0,photo.width, photo.height).data, photo.width, photo.height);

    if (code) {
      console.log(code.data);
      items.push(JSON.parse(code.data));
      console.log(items);
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
