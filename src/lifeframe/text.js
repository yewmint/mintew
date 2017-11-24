/**
 * create text entity
 * 
 * @export
 * @param {Game} app 
 * @param {string} text 
 * @returns {Entity}
 */
export function create (app, text){
  let textEnt = app.entity()
  textEnt.attach('text', text)
  textEnt.text.setOption('width', 400)
  textEnt.text.setOption('size', 18)
  textEnt.text.setOption('font', 'microsoft yahei')
  textEnt.text.setOption('fontType', 'bold')
  textEnt.text.setOption('color', '#525252')
  return textEnt
}