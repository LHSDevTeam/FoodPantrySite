document.getElementById('stopbt').addEventListener("click",function(e) {
    console.log("Button has been pressed.");
});

console.log(navigator.mediaDevices.getSupportedConstraints());
 
let deviceId: string;
navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
  devices.forEach(function(device) {
    if (device.label.toLowerCase().includes("world")) {
      deviceId = device.deviceId;
    }
    console.log(device.label + " : " + device.deviceId + " : " + device.kind + " : " + device.groupId);
  });
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});

let video : HTMLVideoElement = document.getElementById("video") as HTMLVideoElement;
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: {facingMode: "environment"}, audio: false}).then(function (stream) {
        video.srcObject = stream;
        video.play();
    }).catch(function (error) {
      console.error(error);
    });
}
