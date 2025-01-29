import React from "react";
import MIPSApp from "./MipsApps";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
function App() {
  return (
    <PrimeReactProvider>
      <MIPSApp />
    </PrimeReactProvider>
  );
}

export default App;
