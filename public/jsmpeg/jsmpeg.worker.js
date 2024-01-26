const document = {
  addEventListener: (type, callback) => {
    callback()
  },
  querySelectorAll: () => {
    return []
  },
}

this.window = this

importScripts('/jsmpeg/jsmpeg.min.js')

let videoPlayer = null

this.addEventListener('message', ({ data: event }) => {
  const { action, data } = event
  const { rtsp, ...config } = data || {}

  switch (action) {
    case 'start':
      console.log({ config })
      videoPlayer = new JSMpeg.Player(`ws://127.0.0.1:9988/rtsp?url=${btoa(rtsp)}`, config)
      videoPlayer.play()
      postMessage({ action })
      break
    case 'stop':
      videoPlayer.destroy()
      videoPlayer = null
      break
    case 'play':
      if (videoPlayer?.paused) {
        videoPlayer?.play()
      }
      break
    case 'pause':
      if (!videoPlayer?.paused) {
        videoPlayer?.pause()
      }
      break
  }
})
