import React from 'react';
import './App.css';
import './DiceContainer.css'
import './Dice.css'
import './Button.css'
import './RollButton.css'
import './ScoreBoard.css'
import './ScoreRow.css'
import './Match.css'
import matches, {Match} from './matches'


interface IDiceProps {
  value: number
  shake?: boolean
  keep?: boolean
  onClick?: Function
}

function Dice(props: IDiceProps) {
  let keep = props.keep ? " keep" : "",
    pips = props.value ? ` d${props.value}` : " blank",
    shake = props.shake ? " animate" : ""
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

function DiceContainer(props: { children: JSX.Element[] }) {
  return (
    <div id="dice-container">
      {props.children}
    </div>
  )
}

function Button(props: {
  children: string,
  id?: string
  inactive?: boolean
}) {
  return (
    <button className={"button" + (props.inactive ? " inactive" : "")}
      id={props.id ? props.id : ""}>
      {props.children}
    </button>
  )
}

function RollButton(props: { label: string }) {
  return (
    <Button id="reroll">
      {props.label}
    </Button>
  )
}

interface IScoreRowProps {
  label: string,
  children: JSX.Element | JSX.Element[]
}

function ScoreRow(props: IScoreRowProps) {
  return (
    <tr>
      <td className="row-label">{props.label}</td>
      {props.children}
    </tr>
  )
}

interface IMatchRowProps {
  match: Match
  scores: number[]
}

function MatchRow(props: IMatchRowProps) {
  return (
    <ScoreRow label={props.match.label}>
      {props.scores.map((playerScore) =>
        <td className="match">{playerScore}</td>
      )}
    </ScoreRow>
  )
}

function ScoreBoard(props: {children: JSX.Element[]}) {
  return (
    <div id="scoreboard">
      <table>
        <tr>
        </tr>
        {props.children}
      </table>
    </div>
  )
}

interface IAppProps { }

type Score = number[][]

interface IAppState {
  hidden: boolean
  playerCount: number
  score: Score
}

class App extends React.Component<IAppProps, IAppState> {
  emptyScore(playerCount : number) {
    let score = []
    for (let i = 0; i < playerCount; i++) score.push([])
    return score
  }
  constructor(props: IAppProps) {
    super(props)
    this.state = {
      hidden: true,
      playerCount: 3,
      score: this.emptyScore(3)
    }
  }
  componentDidMount() {
    setTimeout(() => this.setState({ hidden: false }), 1000)
  }
  render() {
    return (
      <div id="wrapper" className={this.state.hidden ? "hidden" : ""}>
        <DiceContainer>
          <Dice value={1} />
          <Dice value={2} keep />
          <Dice value={0} />
          <Dice value={6} shake />
          <Dice value={5} shake />
        </DiceContainer>
        <RollButton label="Würfeln" />
        <div id="bottom-wrapper">
          <ScoreBoard>
            {matches.map((match : Match, matchIndex : number) => {
              let scores = []
              for (let playerIndex = 0; playerIndex < this.state.playerCount; playerIndex++) {
                scores.push(this.state.score[playerIndex][matchIndex])
              }
              return (<MatchRow match={match} scores={scores}/>)
            })}
          </ScoreBoard>
        </div>
      </div>
    )
  }
}

export default App;
