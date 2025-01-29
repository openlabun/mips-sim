import React, { useState } from "react";
import "./Debugger.css";
import ControlButtons from "./utils/controlButtons";
import DebuggerInfo from "./utils/debuggerInfo";

import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";
const Debugger = ({
  PC,
  mipsInput,
  stepMIPS,
  stepBackMIPS,
  resetMIPS,
  start,
  time,
  setTime,
}) => {
  const instructions = mipsInput.trim().split("\n");
  const [value, setValue] = useState(1);

  return (
    <div id="debugger" className="debugger flex flex-col gap-5">
      <h2 className=" text-2xl font-bold">Debugger</h2>
      <ControlButtons
        stepMIPS={stepMIPS}
        stepBackMIPS={stepBackMIPS}
        resetMIPS={resetMIPS}
        start={start}
      />
      <DebuggerInfo PC={PC} instructions={instructions} />
      <div className="card flex justify-content-center">
        <div className="w-14rem">
          <p>Segundos por imagen</p>
          <InputText
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full"
          />
          <Slider
            value={value}
            onChange={(e) => {
              setValue(e.value);
              setTime(e.value * 1000);
            }}
            className="w-full"
            max={5}
            min={1}
          />
        </div>
      </div>
    </div>
  );
};

export default Debugger;
