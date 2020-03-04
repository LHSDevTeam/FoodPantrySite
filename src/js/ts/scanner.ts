const constriants = {video: true};
function update(stream)
{
    document.querySelector('video').src = stream.url;
}
function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }
  
  if (hasGetUserMedia()) {
    // Good to go!
  } else {
    alert('getUserMedia() is not supported by your browser');
  }