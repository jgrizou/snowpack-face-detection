  import * as faceTools from './faceDetectionControls.js';

  import * as faceapi from 'face-api.js';

  let forwardTimes = []

  function updateTimeStats(timeInMs) {
    forwardTimes = [timeInMs].concat(forwardTimes).slice(0, 30)
    const avgTimeInMs = forwardTimes.reduce((total, t) => total + t) / forwardTimes.length
    $('#time').val(`${Math.round(avgTimeInMs)} ms`)
    $('#fps').val(`${Math.round(1000 / avgTimeInMs)}`)
  }

  async function onPlay() {
    const videoEl = $('#inputVideo').get(0)

    if(videoEl.paused || videoEl.ended || !faceTools.isFaceDetectionModelLoaded())
      return setTimeout(() => onPlay())


    const options = faceTools.getFaceDetectorOptions()

    const ts = Date.now()

    const result = await faceapi.detectSingleFace(videoEl, options)

    updateTimeStats(Date.now() - ts)

    if (result) {
      const canvas = $('#overlay').get(0)
      const dims = faceapi.matchDimensions(canvas, videoEl, true)
      faceapi.draw.drawDetections(canvas, faceapi.resizeResults(result, dims))
    }

    setTimeout(() => onPlay())
  }

  async function run() {
    // load face detection model
    await faceTools.changeFaceDetector(faceTools.TINY_FACE_DETECTOR)
    faceTools.changeInputSize(128)

    // try to access users webcam and stream the images
    // to the video element
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
    const videoEl = $('#inputVideo').get(0)
    videoEl.srcObject = stream
  }

  function updateResults() {}

  window.onPlay = onPlay;

  $(document).ready(function() {
    //renderNavBar('#navbar', 'webcam_face_detection')
    faceTools.initFaceDetectionControls()
    run()
  })
