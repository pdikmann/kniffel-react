import './SumRow.css'
import {StateContext} from "./StateContext";
import ScoreRow from "./ScoreRow";
import {BonusState} from "../Types/Common";

export function BonusRow() {
  return (
    <StateContext.Consumer>
      {({bonus, bonusState}) => (
        <ScoreRow label="Bonus">
          {bonus.map((bonusScore, bonusIndex) => {
            let bs: BonusState = bonusState[bonusIndex]
            let content: string
            switch (bs) {
              case BonusState.Fail:
                content = "—"
                break
              case BonusState.Success:
                content = bonusScore.toString()
                break
              default:
                content = ""
                break
            }
            return (<td key={bonusIndex} className="sum">{content}</td>)
          })}
        </ScoreRow>
      )}
    </StateContext.Consumer>
  )
}