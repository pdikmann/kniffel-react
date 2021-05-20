import './ScoreBoard.css'
import {Score, TurnState} from '../Types/Common'
import MatchRow from './MatchRow'
import matches, {Match} from '../Logic/matches'

interface IScoreBoardProps {
  playerCount: number
  currentPlayer: number
  score: Score
  diceValues: number[]
  children: JSX.Element[]
  turnState: TurnState
  rolling: boolean
}

function ScoreBoard(props: IScoreBoardProps) {
  let headers = [(<td></td>)] // init with empty cell (sits on top of label column)
  for (let i = 0; i < props.playerCount; i++) {
    let label = `~ ${i + 1} ~`,
      className = (i === props.currentPlayer) ? "active" : ""
    headers.push(<th className={className}>{label}</th>)
  }
  return (
    <div id="scoreboard">
      <table>
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {matches.map((match: Match, matchIndex: number) => {
            let scores = []
            for (let playerIndex = 0; playerIndex < props.playerCount; playerIndex++) {
              scores.push(props.score[playerIndex][matchIndex])
            }
            return (
              <MatchRow key={matchIndex}
                match={match}
                scores={scores}
                turnState={props.turnState}                       
                rolling={props.rolling}
                currentPlayer={props.currentPlayer}
                diceValues={props.diceValues} />
            )})}
          {props.children}
        </tbody>
      </table>
    </div>
  )
}

export default ScoreBoard
