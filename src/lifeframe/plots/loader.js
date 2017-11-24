import plot from './main.plot'

/**
 * process section
 * 
 * @param {string} sectionName 
 */
function sectionProcessor (sectionName){
  sections[sectionName] = {
    name: sectionName,
    scripts: []
  }

  curSection = sections[sectionName]
}

/**
 * process dialog
 * 
 * @param {string} text 
 */
function dialogProcessor (text){
  curSection.scripts.push({
    type: 'dialog',
    text
  })
}

/**
 * process question
 * 
 * @param {string} text 
 * @param {string} choiceTextA 
 * @param {string} choiceA next section if A is selected
 * @param {string} choiceTextB 
 * @param {string} choiceB next section if B is selected
 */
function questionProcessor (text, choiceTextA, choiceA, choiceTextB, choiceB){
  curSection.scripts.push({
    type: 'question',
    text, choiceTextA, choiceA, choiceTextB, choiceB
  })
}

/**
 * process section end
 * 
 */
function sectionEndProcessor (){
  curSection = null
}

/**
 * sotres all processors
 */
const processors = {
  section: sectionProcessor,
  dialog: dialogProcessor,
  question: questionProcessor,
  sectionend: sectionEndProcessor
}

let sections = {}
let curSection = null
let curScriptIdx = 0

/**
 * initialize lodaer and load plot
 * 
 * @export
 */
export function init (){
  let lines = plot.split(/\r\n|\r|\n/)
  for (let line of lines){
    let args = line.split(/\[|\]\[|\]/)
    args = args.slice(1, -1)
    if (args.length >= 1){
      processors[args[0]](...args.slice(1))
    }
  }

  curSection = sections.main
  curScriptIdx = -1
}

/**
 * step to next script
 * 
 * @export
 * @param {number} [selection=0] 
 * @returns {Object}
 */
export function step(selection = 0){
  if (selection === 0){
    if (curScriptIdx + 1 >= curSection.length) return
    return curSection.scripts[++curScriptIdx]
  }
  else {
    let choiceA = curSection.scripts[curScriptIdx].choiceA
    let choiceB = curSection.scripts[curScriptIdx].choiceB
    let target = selection === 1 ? choiceA : choiceB
    curSection = sections[target]
    curScriptIdx = 0
    return curSection.scripts[curScriptIdx]
  }
}