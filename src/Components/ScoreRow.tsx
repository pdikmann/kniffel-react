import './ScoreRow.css'

interface IScoreRowProps {
  label: string
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

export default ScoreRow
