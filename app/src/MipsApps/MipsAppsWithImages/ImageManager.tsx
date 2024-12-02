import React, { useEffect, useState } from "react";
import "./imageManager.css";
import { PopUpBase } from "./PopUpBase";
import { propsEl } from "./PopUpBase/PopUpBase";
import {
  assignInstructionVariables,
  InstructionVariables,
} from "../../utils/UtilsVariablesFuntion";

export const ImageManager = ({ image, instruction = "" }) => {
  const [vars, setVars] = useState<InstructionVariables | {}>({});
  const [variables, setVariables] = useState<propsEl[]>([]);

  useEffect(() => {
    console.log(image);
  }, [image]);

  useEffect(() => {
    const assignedVars = assignInstructionVariables(
      instruction
    ) as InstructionVariables;
    setVars(assignedVars);
    const newVariables = Object.keys(assignedVars).map((key) => ({
      label: key.toString(),
      text: assignedVars[key as keyof InstructionVariables]?.toString() || "",
    }));
    setVariables(newVariables);
    console.log(newVariables);
  }, [instruction]);

  return (
    <section className="flex flex-col pt-24 justify-center items-center">
      <section className="flex gap-4">
        {variables.map((prop) => (
          <PopUpBase key={prop.label} className="" prop={prop} />
        ))}
      </section>
      <div className="px-40">
        <img src={"/" + image} className="block" alt="" />
      </div>
    </section>
  );
};
