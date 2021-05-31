import './RollButton.css'
import Button from './Button'
import {IMergedContexts, TurnState} from '../Types/Common'
import {MouseEventHandler} from 'react'
import MergedContexts from "./MergedContexts";

interface IRollButtonProps {
}

function RollButton(props: IRollButtonProps) {
  return (
    <MergedContexts>
      {({turnState, advanceTurn} : IMergedContexts) => {
        let label: string = '',
          inactive = turnState === TurnState.Selection
        switch (turnState) {
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
                  onClick={inactive ? undefined : advanceTurn}
                  inactive={inactive}>
            {label}
          </ Button>
        )
      }}
    </MergedContexts>
  )
}

export default RollButton
