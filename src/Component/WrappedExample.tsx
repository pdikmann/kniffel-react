import React from "react";

interface IExampleProps {
  data: {
    target: string
  }
}

interface IExampleState {
}

class ExampleComponent extends React.Component<IExampleProps, IExampleState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    console.log("ExampleComponent mounted.")
  }

  render() {
    return (
      <h1>Halli Hallo {this.props.data.target}</h1>
    )
  }
}

interface AtLeastData {
  data: any
}

function ExampleWrapper(WrappedComponent: React.ComponentType<AtLeastData>) {
  class McGuffin extends React.Component<unknown, unknown> {
    static displayName = "Hey Boy"

    constructor(props: any) {
      super(props);
    }

    componentDidMount() {
      console.log("ExampleWrapper mounted.")
    }

    render() {
      return (
        <div className="wrapper">
          <WrappedComponent data={{target: "Beppo"}} {...this.props}/>
        </div>
      )
    }
  }

  return McGuffin
}

export const WrappedExample = ExampleWrapper(ExampleComponent)