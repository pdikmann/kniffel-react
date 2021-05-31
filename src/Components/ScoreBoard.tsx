import './ScoreBoard.css'
import {Score, TurnState} from '../Types/Common'
import MatchRow from './MatchRow'
import matches, {Match} from '../Logic/matches'
import {BonusRow} from "./BonusRow";

interface IScoreBoardProps {
  playerCount: number
  currentPlayer: number
  score: Score
  children: JSX.Element[]
  turnState: TurnState
  rolling: boolean
}

function ScoreBoard(props: IScoreBoardProps) {
  let headers = [(<td key={-1}/>)] // init with empty cell (sits on top of label column)
  for (let i = 0; i < props.playerCount; i++) {
    let label = `~ ${i + 1} ~`,
      className = (i === props.currentPlayer) ? "active" : ""
    headers.push(<th key={i} className={className}>{label}</th>)
  }
  let matchRows = matches.map((match: Match, matchIndex: number) => {
    let scores = []
    for (let playerIndex = 0; playerIndex < props.playerCount; playerIndex++) {
      scores.push(props.score[playerIndex][matchIndex])
    }
    return (
      <MatchRow key={matchIndex}
                matchIndex={matchIndex}
                match={match}
                scores={scores}/>
    )
  })
  return (
    <div id="scoreboard">
      <table>
        <thead>
        <tr>
          {headers}
        </tr>
        </thead>
        <tbody>
        {matchRows.slice(0, 6)}
        <BonusRow/>
        {matchRows.slice(6)}
        {/*<ScoreRow label="Summe Oben"></ScoreRow>*/}
        {/*<ScoreRow label="Summe Unten"></ScoreRow>*/}
        {/*<ScoreRow label="Summe Gesamt"></ScoreRow>*/}
        {props.children}
        </tbody>
      </table>
    </div>
  )
}

export default ScoreBoard
