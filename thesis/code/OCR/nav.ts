navigator.mediaDevices
  .getUserMedia({
    video: { facingMode: "environment" },
    audio: false,
  })
  .then(this.link)
  .catch(this.error);
