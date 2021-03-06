/**
 * Matrix
 * 
 * @export
 * @class Mat
 */
export class Mat {
  /**
   * build eye matrix
   * 
   * @static
   * @param {number} size 
   * @param {number} val 
   * @returns {Mat}
   * @memberof Mat
   */
  static eye (size, val){
    let mat = new Mat(size, size)
    for (let i = 0; i < size; ++i){
      mat.element(i, i, val)
    }
    return mat
  }

  /**
  * create translate matrix
  * @param {number} dx delta x
  * @param {number} dy delta y
  * @return {Mat} translate matrix
  */
  static translate (dx, dy){
    let mat = Mat.eye(4, 1)
    mat.element(0, 3, dx)
    mat.element(1, 3, dy)
    return mat
  }

  /**
  * create rotate matrix
  * @param {number} radian radian to rotate
  * @return {Mat} rotate matrix
  */
  static rotate (radian){
    let cos = Math.cos(radian)
    let sin = Math.sin(radian)

    // fix epsilon
    if (Math.abs(cos) < Number.EPSILON) cos = 0
    if (Math.abs(sin) < Number.EPSILON) sin = 0

    let mat = Mat.eye(4, 1)
    mat.element(0, 0, cos)
    mat.element(0, 1, -sin)
    mat.element(1, 0, sin)
    mat.element(1, 1, cos)
    return mat
  }

  /**
  * create scale matrix
  * @param {number} sx horizontal scale
  * @param {number} sy vertical scale
  * @return {Mat} scale matrix
  */
  static scale (sx, sy = sx){
    let mat = Mat.eye(4, 1)
    mat.element(0, 0, sx)
    mat.element(1, 1, sy)
    return mat
  }

  /**
  * get perspective matrix
  * @param {number} width width of view
  * @param {number} height height of view
  * @return {Mat} perspective matrix
  */
  static view (width, height){
    let mat = Mat.eye(4, 1)
    mat.element(0, 0, 2 / width)
    mat.element(0, 3, -1)
    mat.element(1, 1, 2 / height)
    mat.element(1, 3, -1)
    return mat
  }

  /**
   * build coordinate matrix
   * 
   * @static
   * @param {number} x 
   * @param {number} y 
   * @param {number} [z=0] 
   * @returns {Mat}
   * @memberof Mat
   */
  static coordiante(x, y, z = 0){
    let mat = new Mat(4, 1)
    mat.element(0, 0, x)
    mat.element(1, 0, y)
    mat.element(2, 0, z)
    mat.element(3, 0, 1)
    return mat
  }

  /**
   * Creates an instance of Mat.
   * @param {number} row 
   * @param {number} col 
   * @memberof Mat
   */
  constructor (row, col){
    this._row = row
    this._col = col
    this._data = new Array(row * col).fill(0)
  }

  /**
   * add 2 matrixes
   * 
   * @param {Mat} mat 
   * @returns {Mat}
   * @memberof Mat
   */
  add (mat){
    if (this._row !== mat.row || this.col !== mat.col){
      throw new Error('Mat: can not add due to unequal row and col.')
    }

    let newMat = new Mat(this.row, this.col)
    for (let row = 0; row < this.row; ++row){
      for (let col = 0; col < this.col; ++col){
        let curElem = this.element(row, col) * mat.element(row, col)
        newMat.element(row, col, curElem)
      }
    }

    return newMat
  }

  /**
   * multiply 2 matrixes
   * 
   * @param {Mat} mat 
   * @returns {Mat}
   * @memberof Mat
   */
  multiply (mat){
    let row = this.row
    let col = this.col
    if (col != mat.row){
      throw new Error('Mat: can not multiply due to unequal row and col.')
    }

    let newMat = new Mat(row, mat.col)
    for (let newCol = 0; newCol < mat.col; ++newCol){
      for (let newRow = 0; newRow < row; ++newRow){
        let curElem = 0
        for (let i = 0; i < col; ++i){
          curElem += this.element(newRow, i) * mat.element(i, newCol)
        }
        newMat.element(newRow, newCol, curElem)
      }
    }

    return newMat
  }

  /**
   * get or set element of matrix
   * 
   * @param {number} row 
   * @param {number} col 
   * @param {number} val 
   * @returns {number|undefined}
   * @memberof Mat
   */
  element (row, col, val){
    if (typeof(val) !== 'number'){
      return this._data[col * this._row + row]
    }
    else {
      this._data[col * this._row + row] = val
    }
  }

  /**
   * get row
   * 
   * @memberof Mat
   */
  get row (){
    return this._row
  }

  /**
   * set row
   * 
   * @memberof Mat
   */
  set row (val){
    throw new Error('Mat: can not modify row property.')
  }

  /**
   * get col
   * 
   * @memberof Mat
   */
  get col (){
    return this._col
  }

  /**
   * set col
   * 
   * @memberof Mat
   */
  set col (val){
    throw new Error('Mat: can not modify col property.')
  }

  /**
   * get data
   * 
   * @memberof Mat
   */
  get data (){
    return this._data
  }

  /**
   * set data
   * 
   * @memberof Mat
   */
  set data (val){
    throw new Error('Mat: can not modify data property.')
  }
}
