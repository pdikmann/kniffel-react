import ScoreRow from './ScoreRow'
import {Match} from '../Logic/matches'
import MergedContexts from "./MergedContexts";
import MatchCell from "./MatchCell";

interface IMatchRowProps {
  match: Match
  scores: number[]
  matchIndex: number
}

function MatchRow({matchIndex, match, match: {fn, label}, scores}: IMatchRowProps) {
  return (
    <MergedContexts>
      {({dice, selectMatch}) => {
        return (
          <ScoreRow label={label}>
            {scores.map((playerScore, playerIndex) => (
                <MatchCell
                  key={playerIndex}
                  match={match}
                  score={playerScore}
                  onClick={() => selectMatch(matchIndex, playerIndex)}
                  {...{matchIndex, playerIndex}}
                />
              )
            )}
          </ScoreRow>
        )
      }}
    </MergedContexts>
  )
}

export default MatchRow
