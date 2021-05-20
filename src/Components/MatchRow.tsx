import './MatchRow.css'
import ScoreRow from './ScoreRow'
import {Match} from '../Logic/matches'
import {TurnState} from '../Types/Common'

interface IMatchRowProps {
  match: Match
  scores: number[]
  currentPlayer: number
  diceValues: number[]
  turnState: TurnState
  rolling: boolean
}

function MatchRow(props: IMatchRowProps) {
  return (
    <ScoreRow label={props.match.label}>
      {props.scores.map((playerScore, i) => {
        let active = (i === props.currentPlayer && props.turnState !== TurnState.FirstThrow && !props.rolling),
          score = (active && playerScore === undefined) ? props.match.fn(props.diceValues) : playerScore,
          className = "match"
            + (active ? (score === 0 ? " zero" : " ok") : "")
            + (!active && playerScore !== undefined ? " done" : ""),
          content = active ? (score > 0 ? score : "—") : ""
        return (
          <td className={className}>{content}</td>
        )
      })}
    </ScoreRow>
  )
}

export default MatchRow
