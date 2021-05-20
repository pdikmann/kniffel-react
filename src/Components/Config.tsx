import './Config.css'
import Button from './Button'

function Config(props: {}) {
  return (
    <div className="config">
      <Button id='reset'>Neues Spiel</Button>
      <div className="row">
        <Button id='less-players'>Weniger Spieler</Button>
        <Button id='more-players'>Mehr Spieler</Button>
      </div>
      <input type="text" id="session" value="Session" />
      <div className="row">
        <Button id='host'>Host</Button>
        <Button id='join'>Gast</Button>
        <Button id='leave'>Online Verlassen</Button>
      </div>
    </div>
  )
}

export default Config
