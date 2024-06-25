class OutputManager {
  #outputFn;

  constructor(outputFn) {
    this.#outputFn = outputFn;
  }

  print(value) {
    this.#outputFn(`${value}`);
  }

  printAll(values, fn) {
    values.forEach((value) => {
      const resultToPrint = fn(value);

      this.#outputFn(resultToPrint);
    });
  }

  linebreak() {
    this.#outputFn("");
  }
}

export default OutputManager;
