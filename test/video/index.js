/**
 * build a mock canvas
 */
const getContext = function (){
  let canvas = document.createElement('canvas')
  canvas.width = 100
  canvas.height = 100
  document.body.appendChild(canvas)
  let webgl = new window.Mintew.WebGL(canvas)
  webgl.init()
  webgl.view(700, 700)
  webgl.clear()
  return webgl
}

window.videoMocks = {
  webgl: getContext(),
  vwebgl: getContext()
}

require('./texture-loader')
require('./texture')
require('./sprite')
require('./container')
