export {}

declare global {
  interface HTMLCanvasElement {
    offscreen?: OffscreenCanvas
  }
}
