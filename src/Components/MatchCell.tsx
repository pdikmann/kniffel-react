import MergedContexts from "./MergedContexts";
import {TurnState} from "../Types/Common";
import {Match} from "../Logic/matches";

function formatScore(n: number) {
  switch (n) {
    case 0:
      return "—"
    case undefined:
      return ""
    default:
      return n.toString()
  }
}

interface IMatchCellProps {
  match: Match
  matchIndex: number
  playerIndex: number
  score: number
  onClick: () => void
}

function MatchCell({match: {fn}, playerIndex, matchIndex, onClick, score}: IMatchCellProps) {
  return (
    <MergedContexts>
      {({currentPlayer, rolling, turnState, diceValues, lastSelectedMatch}) => {
        let activePlayer = (playerIndex === currentPlayer
          && turnState !== TurnState.FirstThrow
          && !rolling);
        let actualScore = (activePlayer && score === undefined) ? fn(diceValues) : score
        let done = (score !== undefined)
        let className = "match"
          + (activePlayer ? (actualScore === 0 ? " zero" : " ok") : "")
          + (done ? " done" : "")
          + (lastSelectedMatch[playerIndex] === matchIndex ? " last-selected" : "")
        let content = formatScore(actualScore)
        return (
          <td className={className} onClick={activePlayer && !done ? onClick : undefined}>{content}</td>
        )
      }}
    </MergedContexts>
  )
}

export default MatchCell