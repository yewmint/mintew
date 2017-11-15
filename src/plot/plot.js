import { LifeFrame } from './life-frame'

let frame = new LifeFrame

frame.run(async () => {
  await frame.dialog('Nothing to talk.')
})
