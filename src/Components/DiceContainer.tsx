import './DiceContainer.css'

function DiceContainer(props: { children: JSX.Element[] }) {
  return (
    <div id="dice-container">
      {props.children}
    </div>
  )
}

export default DiceContainer
