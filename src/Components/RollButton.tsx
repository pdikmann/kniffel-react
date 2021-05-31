import './RollButton.css'
import Button from './Button'
import {IMergedContexts, TurnState} from '../Types/Common'
import MergedContexts from "./MergedContexts";

interface IRollButtonProps {
}

function RollButton(props: IRollButtonProps) {
  return (
    <MergedContexts>
      {({gameOver, currentPlayer, turnState, advanceTurn}: IMergedContexts) => {
        let label: string = '',
          inactive = turnState === TurnState.Selection,
          playerNumber = currentPlayer + 1
        switch (turnState) {
          case TurnState.FirstThrow:
            label = `Spieler ${playerNumber} - Wurf 1`
            break
          case TurnState.SecondThrow:
            label = `Spieler ${playerNumber} - Wurf 2`
            break
          case TurnState.ThirdThrow:
            label = `Spieler ${playerNumber} - Wurf 3`
            break
          case TurnState.Selection:
            label = `Spieler ${playerNumber} - Auswahl`
            break
        }
        if (gameOver) label = 'Neues Spiel'
        return (
          <Button id="reroll"
                  onClick={inactive ? undefined : advanceTurn}
                  inactive={inactive}
                  accent={gameOver}>
            {label}
          </Button>
        )
      }}
    </MergedContexts>
  )
}

export default RollButton
