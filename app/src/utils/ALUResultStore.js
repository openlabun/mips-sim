let aluResult = 0;

export function setAluResult(result) {
    console.log("aluResult en ALUResultStore", result);
    aluResult = result;
}

export function getAluResult() {
  return aluResult;
}