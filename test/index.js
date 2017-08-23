'use strict'

require('../dist/mintew.js')

describe('Mintew', function (){
  it('should exists a global object', function (){
    expect(Mintew).to.be.an('object')
  })
  require('./math')
  require('./webgl')
  require('./utils')
  require('./sound')
  require('./video')
})
