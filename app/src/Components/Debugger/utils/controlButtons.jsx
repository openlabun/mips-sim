import React from "react";

import { Button } from "primereact/button";
import "./controlButtons.css";

const ControlButtons = ({ stepMIPS, stepBackMIPS, resetMIPS, start }) => {
  return (
    <div className="card">
      <Button onClick={stepBackMIPS} icon="pi pi-step-backward" />
      <Button icon="pi pi-play" onClick={start} />
      <Button onClick={stepMIPS} icon="pi pi-step-forward" />
      <Button icon="pi pi-refresh" onClick={resetMIPS} />
    </div>
  );
};

export default ControlButtons;
