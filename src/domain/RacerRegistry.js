import { RACER_ENTITY_TYPES } from "../constants/index.js";
import { inputManager } from "../service/index.js";
import Racer from "./Racer.js";

class RacerRegistry {
  static #SEPARATOR = ",";
  #entityType;

  async selectEntityType() {
    const typeNumber = await inputManager.retryScan(
      `원하시는 레이서의 유형을 선택해서 번호를 입력해주세요.\n${RacerRegistry.#stringifyRacerEntityTypes()}\n`,
      {
        processFn: (inputValue) => {
          RacerRegistry.#validateTypeNumber(inputValue);

          return inputValue;
        },
        errorMessageQuery: "다시 입력해주세요.\n",
      }
    );

    this.#entityType = RACER_ENTITY_TYPES[typeNumber];
  }

  async register() {
    const racers = await inputManager.retryScan(
      `경주할 ${this.#entityType} 이름을 입력하세요(이름은 쉼표(${
        RacerRegistry.#SEPARATOR
      })를 기준으로 구분).\n`,
      {
        processFn: (inputValue) => {
          const racerNameList = inputValue.split(RacerRegistry.#SEPARATOR);

          return racerNameList.map((name) => new Racer(name));
        },
        errorMessageQuery: "다시 입력해주세요.\n",
      }
    );

    return racers;
  }

  static #stringifyRacerEntityTypes() {
    return Object.entries(RACER_ENTITY_TYPES)
      .map(([number, type]) => `${number}. ${type}`)
      .join("\n");
  }

  static #isCorrectTypeNumber(typeNumber) {
    return typeNumber in RACER_ENTITY_TYPES;
  }

  static #validateTypeNumber(typeNumber) {
    if (!RacerRegistry.#isCorrectTypeNumber(typeNumber)) {
      throw new Error("올바른 유형의 번호가 아닙니다.");
    }
  }
}

export default RacerRegistry;
