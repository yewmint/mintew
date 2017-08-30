'use strict'
const { readFileSync } = require('fs')
const { resolve } = require('path')

const Mat = Mintew.Modules.Math.Mat

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
  webgl.transform(Mat.eye(4, 1))
  return webgl
}

describe('WebGL', function (){
  it('should upload correct matrixes', function (){
    let webgl = getContext()
    webgl.transform(Mat.eye(4, 1))
    webgl.clear()
    webgl.release()
    webgl = null
  })

  it('should draw correct image', function (){
    let webgl = getContext()
    let img = new Image()
    img.src = resolve(__dirname, 'test.png')
    img.onload = function (){
      let tex = webgl.loadTexture(img)
      webgl.texture(tex)

      let box = webgl.box()
      box.size(512, 512)
      box.uv(0, 0, 1, 1)

      webgl.clear()
      webgl.drawBox(box)
      webgl.release()
      webgl = null
      img = null
    }
  })

  it('should draw correct triangle', function (){
    let webgl = getContext()
    let tri = webgl.triangle()
    tri.pos(0, 0, 0)
    tri.pos(1, 200, 400)
    tri.pos(2, 200, 0)

    webgl.color([1.0, 0.6, 0.6, 0.8])
    webgl.clear()
    webgl.drawTriangle(tri)
    webgl.release()
    webgl = null
    tri = null
  })

  it('should draw correct line', function (){
    let webgl = getContext()
    let line = webgl.line()
    line.begin(0, 0)
    line.end(200, 200)

    webgl.color([1.0, 1.0, 0.0, 1.0])
    webgl.clear()
    webgl.drawLine(line)
    webgl.release()
    webgl = null
    line = null
  })
})
