import './Dice.css'
import MergedContexts from "./MergedContexts";
import {IMergedContexts, TurnState} from "../Types/Common";

interface IDiceProps {
  n: number
  value: number
  shake?: boolean
  keep?: boolean
  onClick?: Function
}

function Dice(props: IDiceProps) {
  return (
    <MergedContexts>
      {({rolling, turnState, keepDice}: IMergedContexts) => {
        let keep = props.keep ? " keep" : "",
          pips = (props.value && turnState !== TurnState.FirstThrow) ? ` d${props.value}` : " blank",
          shake = rolling && !props.keep ? " animate" : ""
        return (
          <button className={"dice" + pips + keep + shake}
                  onClick={() => keepDice(props.n)}>
            <div className="dice-inside">
              <div className="pip-row top-pips">
                <div className="pip"/>
                <div className="pip"/>
              </div>
              <div className="pip-row middle-pips">
                <div className="pip"/>
                <div className="pip"/>
              </div>
              <div className="pip-row bottom-pips">
                <div className="pip"/>
                <div className="pip"/>
              </div>
            </div>
          </button>
        );
      }}
    </MergedContexts>
  )
}

export default Dice
