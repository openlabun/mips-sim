import React, { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import "./PopUpBase.css";
export interface propsEl {
  label: string;
  text: string;
}
export const PopUpBase = ({
  className,
  prop,
}: {
  className: string;
  prop: propsEl;
}) => {
  const op = useRef(null);

  return (
    <div className={className}>
      <Button
        type="button"
        label={prop.label}
        onClick={(e) => (op.current! as OverlayPanel).toggle(e)}
      />
      <OverlayPanel ref={op}>
        <section dangerouslySetInnerHTML={{ __html: prop.text }}></section>
      </OverlayPanel>
    </div>
  );
};
