import './Dice.css'

interface IDiceProps {
  value: number
  rolling: boolean
  shake?: boolean
  keep?: boolean
  onClick?: Function
}

function Dice(props: IDiceProps) {
  let keep = props.keep ? " keep" : "",
    pips = props.value ? ` d${props.value}` : " blank",
    shake = props.rolling && !props.keep ? " animate" : ""
  return (
    <button className={"dice" + pips + keep + shake}>
      <div className="dice-inside">
        <div className="pip-row top-pips">
          <div className="pip"></div>
          <div className="pip"></div>
        </div>
        <div className="pip-row middle-pips">
          <div className="pip"></div>
          <div className="pip"></div>
        </div>
        <div className="pip-row bottom-pips">
          <div className="pip"></div>
          <div className="pip"></div>
        </div>
      </div>
    </button>
  )
}

export default Dice
