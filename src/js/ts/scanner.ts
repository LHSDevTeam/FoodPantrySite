let video : HTMLVideoElement = document.getElementById("video") as HTMLVideoElement;
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true}).then(function (stream) {
        video.srcObject = stream;
        video.play();
    }).catch(function (error) {
      console.error(error);
    });
}
