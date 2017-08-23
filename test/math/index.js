const Mat = Mintew.Modules.Math.Mat

describe('Mat', function (){
  it('should create eye matrix correctly', function (){
    let eye = Mat.eye(2, 1)
    expect(eye.element(0, 0)).to.eql(1)
    expect(eye.element(1, 1)).to.eql(1)
  })

  it('should create translate matrix correctly', function (){
    let translate = Mat.translate(0, 0)
    expect(translate.element(0, 0)).to.eql(1)
    expect(translate.element(1, 1)).to.eql(1)
    expect(translate.element(2, 2)).to.eql(1)
    expect(translate.element(3, 3)).to.eql(1)
  })

  it('should create rotate matrix correctly', function (){
    let rotate = Mat.rotate(0)
    expect(rotate.element(0, 0)).to.eql(1)
    expect(rotate.element(1, 1)).to.eql(1)
    expect(rotate.element(2, 2)).to.eql(1)
    expect(rotate.element(3, 3)).to.eql(1)
  })

  it('should create scale matrix correctly', function (){
    let scale = Mat.scale(1)
    expect(scale.element(0, 0)).to.eql(1)
    expect(scale.element(1, 1)).to.eql(1)
    expect(scale.element(2, 2)).to.eql(1)
    expect(scale.element(3, 3)).to.eql(1)
  })

  it('should create view matrix correctly', function (){
    let view = Mat.view(1, 1)
    expect(view.element(0, 0)).to.eql(2)
    expect(view.element(0, 3)).to.eql(-1)
    expect(view.element(1, 1)).to.eql(2)
    expect(view.element(1, 3)).to.eql(-1)
  })
})
