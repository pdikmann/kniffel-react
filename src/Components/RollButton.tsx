import './RollButton.css'
import Button from './Button'
import { TurnState } from '../Types/Common'
import { MouseEventHandler } from 'react'

interface IRollButtonProps {
  turnState: TurnState
  onClick: MouseEventHandler
}

function RollButton(props: IRollButtonProps) {
  let label: string = '',
      inactive = props.turnState === TurnState.Selection
  switch (props.turnState) {
    case TurnState.FirstThrow:
      label = 'Wurf 1'
      break
    case TurnState.SecondThrow:
      label = 'Wurf 2'
      break
    case TurnState.ThirdThrow:
      label = 'Wurf 3'
      break
    case TurnState.Selection:
      label = 'Auswahl'
      break
  }
  return (
    <Button id="reroll"
            onClick={inactive ? undefined : props.onClick}
            inactive={inactive}>
      {label}
    </ Button>
  )
}

export default RollButton
