import {
  UPDATE_EXAM_PROP,
  MERGE_EXAM_PROP,
  DELETE_EXAM_PROP
} from "../Actions/types";

import * as general from "./methods";

const INITIAL_STATE = {
  students: [],
  newName: "",
  questions: [
    {
      q: "What is the Capital of Egypt",
      answrs: ["Cairo", "Beirut", "Riyadh", "Dubai", "London"],

      correct_answer: "Cairo",
      isRender: false
    },
    {
      q: "Who won the last World Cup",
      answrs: ["France", "Brazil", "Germany", "Italy", "Austria"],
      correct_answer: "France",

      isRender: false
    },
    {
      q: "Who won the Nobel Prize",
      answrs: [
        "Naguib Mahfouz",
        "Adel Emam",
        "Amr diab",
        "Omar el-shiref",
        "Hussien El-Jasmy"
      ],
      correct_answer: "Naguib Mahfouz",

      isRender: false
    },
    {
      q: "In what year Egypt won the nations of Africa",
      answrs: ["2013", "2010", "2015", "2007", "2003"],
      correct_answer: "2010",

      isRender: false
    },
    {
      q: "Who discovered the Earth's gravity",
      answrs: ["Richard", "Newton", "Van dizl", "Da Vinci", "Einstein"],
      correct_answer: "Newton",

      isRender: false
    }
  ],

  isRenderModal: true,
  isRenderTryModal: false,

  renderedQuestion: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_EXAM_PROP: {
      return general.updateProps(state, action);
    }
    case MERGE_EXAM_PROP: {
      return general.mergeProps(state, action);
    }
    case DELETE_EXAM_PROP: {
      return general.deleteProps(state, action);
    }
    default:
      return state;
  }
};
