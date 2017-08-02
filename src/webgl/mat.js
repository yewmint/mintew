/**
 * get base matrix
 * @private
 * @return {number[]} base matrix
 */

 //TODO : refactor mat, webgl, sprite
 // 每个container有自己唯一的transform
 // 只有修改了container的属性，transform才会被重新计算
 // 每次渲染都从树根开始，计算一层层的transform相乘
const mat4 = function (){
  let mat = new Array(4 * 4).fill(0.0)

  ele(mat, 0, 0, 1.0)
  ele(mat, 1, 1, 1.0)
  ele(mat, 2, 2, 1.0)
  ele(mat, 3, 3, 1.0)

  return mat
}

/**
 * set or get value of element
 * @private
 * @return {undefined|number} value of element
 */
const ele = function (mat, row, col, val){
  if (typeof val !== 'undefined'){
    mat[col * 4 + row] = val // column major
  }
  else {
    return mat[col * 4 + row] // column major
  }
}

/**
 * @private
 * Mat provides functionality to build matrix.
 */
export class Mat {
  /**
   * get translate matrix
   * @param {number} dx delta x
   * @param {number} dy delta y
   * @return {number[]} translate matrix
   */
  static translate (dx, dy){
    let mat = mat4()

    ele(mat, 0, 3, dx)
    ele(mat, 1, 3, dy)

    return mat
  }

  /**
   * get rotate matrix
   * @param {number} radian radian to rotate
   * @return {number[]} rotate matrix
   */
  static rotate (radian){
    let cos = Math.cos(radian)
    let sin = Math.sin(radian)

    // fix epsilon
    if (Math.abs(cos) < Number.EPSILON) cos = 0
    if (Math.abs(sin) < Number.EPSILON) sin = 0

    let mat = mat4()
    ele(mat, 0, 0, cos)
    ele(mat, 0, 1, -sin)
    ele(mat, 1, 0, sin)
    ele(mat, 1, 1, cos)
    return mat
  }

  /**
   * get scale matrix
   * @param {number} sx horizontal scale
   * @param {number} sy vertical scale
   * @return {number[]} scale matrix
   */
  static scale (sx, sy = sx){
    let mat = mat4()
    ele(mat, 0, 0, sx)
    ele(mat, 1, 1, sy)
    return mat
  }

  /**
   * get perspective matrix
   * @param {number} width width of view
   * @param {number} height height of view
   * @return {number[]} perspective matrix
   */
  static view (width, height){
    let mat = mat4()
    ele(mat, 0, 0, 2 / width)
    ele(mat, 0, 3, -1)
    ele(mat, 1, 1, 2 / height)
    ele(mat, 1, 3, -1)
    return mat
  }

  /**
   * print matrix in proper format
   * @param {number[]} mat
   */
  static print (mat){
    let str = ''
    for (let row of [0, 1, 2, 3]){
      for (let col of [0, 1, 2, 3]){
        str += `${ele(mat, row, col)},\t`
      }
      str += '\n'
    }
    return str
  }

  /**
  * multiply matA by matB
  * @param {number[]} matA
  * @param {number[]} matB
  * @return {number[]}
  */
  static multiply (matA, matB){
    let answer = mat4()
    for (let row = 0; row < 4; ++row){
      for (let col = 0; col < 4; ++col){
        let element = 0
        for (let i = 0; i < 4; ++i){
          element += ele(matA, row, i) * ele(matB, i, col)
        }
        ele(answer, row, col, element)
      }
    }
    return answer
  }
}
