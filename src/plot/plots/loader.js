import plot from './main.plot'

function sectionProcessor (sectionName){
  sections[sectionName] = {
    name: sectionName,
    scripts: []
  }

  curSection = sections[sectionName]
}

function dialogProcessor (text){
  curSection.scripts.push({
    type: 'dialog',
    text
  })
}

function questionProcessor (text, choiceTextA, choiceA, choiceTextB, choiceB){
  curSection.scripts.push({
    type: 'question',
    text, choiceTextA, choiceA, choiceTextB, choiceB
  })
}

function sectionEndProcessor (){
  curSection = null
}

const processors = {
  section: sectionProcessor,
  dialog: dialogProcessor,
  question: questionProcessor,
  sectionend: sectionEndProcessor
}

let sections = {}
let curSection = null
let curScriptIdx = 0

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