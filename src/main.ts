import './style.css'

document.querySelectorAll<HTMLCanvasElement>('.renderCanvas').forEach((canvas) => {
  if (!canvas.offscreen) {
    canvas.offscreen = canvas.transferControlToOffscreen()
  }

  const worker = new Worker('/jsmpeg/jsmpeg.worker.js')
  worker.postMessage(
    {
      action: 'start',
      data: {
        rtsp: 'rtsp://192.168.0.140:554/rtp/34020000001110000001_34020000001110000001',
        canvas: canvas.offscreen,
        audio: false,
        pauseWhenHidden: false,
      },
    },
    [canvas.offscreen],
  )
})
