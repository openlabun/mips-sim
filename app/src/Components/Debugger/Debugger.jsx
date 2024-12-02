import React from "react";
import "./Debugger.css";
import ControlButtons from "./utils/controlButtons";
import DebuggerInfo from "./utils/debuggerInfo";

const Debugger = ({
  PC,
  mipsInput,
  stepMIPS,
  stepBackMIPS,
  resetMIPS,
  start,
}) => {
  const instructions = mipsInput.trim().split("\n");

  return (
    <div id="debugger" className="debugger">
      <h2>Debugger</h2>
      <ControlButtons
        stepMIPS={stepMIPS}
        stepBackMIPS={stepBackMIPS}
        resetMIPS={resetMIPS}
        start={start}
      />
      <DebuggerInfo PC={PC} instructions={instructions} />
    </div>
  );
};

export default Debugger;
