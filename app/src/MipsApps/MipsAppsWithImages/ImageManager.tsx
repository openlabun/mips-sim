import React, { useEffect, useState } from "react";
import "./ImageManager.css";
import { PopUpBase } from "./PopUpBase";
import { propsEl } from "./PopUpBase/PopUpBase";
import {
  assignInstructionVariables,
  InstructionVariables,
} from "../../utils/UtilsVariablesFuntion";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { FloatLabel } from "primereact/floatlabel";
export const ImageManager = ({ image, instruction = ""}) => {
  const [vars, setVars] = useState<InstructionVariables | {}>({});
  const [variables, setVariables] = useState<propsEl[]>([]);
  const [value, setValue] = useState<string[]>([]);
  const [variablesShown, setVariablesShown] = useState<propsEl[]>([]);

  useEffect(() => {
    const filteredVariables =
      value.length === 0
        ? variables // Si value está vacío, muestra todas las variables
        : variables.filter((prop) =>
            value.some((word) =>
              prop.label.toLowerCase().includes(word.toLowerCase())
            )
          );
    setVariablesShown(filteredVariables);
  }, [value, variables]);

  useEffect(() => {}, [image]);

  useEffect(() => {
    const assignedVars = assignInstructionVariables(
      instruction,
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
    <section className="flex flex-col justify-center items-center">
      <div className="px-40">
        <img src={`/${image}`} className="block" alt="MIPS Stage" />
      </div>
      <div className="card p-fluid pb-10">
        <FloatLabel>
          <Chips
            id="search"
            value={value}
            onChange={(e: ChipsChangeEvent) => setValue(e.value!)}
            className=" shadow-md shadow-black/40"
          />
          <label htmlFor="search">Filtrar variables</label>
        </FloatLabel>
      </div>
      <section
        className="flex gap-2 overflow-x-auto whitespace-nowrap max-w-full"
        style={{ maxWidth: "100%", overflowX: "auto" }}
      >
        {variablesShown.map((prop) => (
          <PopUpBase key={prop.label} className=" shadow-2xl" prop={prop} />
        ))}
      </section>
    </section>
  );
};
