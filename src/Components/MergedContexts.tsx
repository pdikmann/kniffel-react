import React from "react";
import {StateContext} from "./StateContext";
import {InteractionContext} from "./InteractionContext";
import {IMergedContexts} from "../Types/Common";

interface IMergedContextsProps {
  children: (ctx: IMergedContexts) => JSX.Element
}

function MergedContexts(props: IMergedContextsProps) {
  return (
    <StateContext.Consumer>
      {appState => (
        <InteractionContext.Consumer>
          {appInteractions =>
            props.children({...appState, ...appInteractions})
          }
        </InteractionContext.Consumer>
      )}
    </StateContext.Consumer>
  );
}

export default MergedContexts