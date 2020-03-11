document.getElementById('stopbt').addEventListener("click",function(e) {
    console.log("Button has been pressed.");
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
