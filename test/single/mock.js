
window.getContext = function (){
  let canvas = document.createElement('canvas')
  canvas.width = 300
  canvas.height = 300
  document.body.appendChild(canvas)
  let webgl = new window.Mintew.WebGL(canvas)
  webgl.init()
  webgl.view(300, 300)
  webgl.clear()
  return webgl
}
