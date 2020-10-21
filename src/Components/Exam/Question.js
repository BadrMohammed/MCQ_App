import React, { memo } from "react";
import { MERGE_EXAM_PROP, UPDATE_EXAM_PROP } from "../../Redux/Actions/types";
import Checkbox from "rc-checkbox";
import { Card } from "antd";

const saveAnswer = (answer, correct_answer, general, index) => {
  general(
    [{ prop: "questions." + index + ".isRender", value: true }],
    UPDATE_EXAM_PROP
  );
  if (answer === correct_answer) {
    general([{ prop: "renderedQuestion", value: true }], MERGE_EXAM_PROP);
  } else {
    general([{ prop: "renderedQuestion", value: false }], MERGE_EXAM_PROP);
  }
};
const renderAnswer = (answers, correct_answer, general, index) => {
  if (answers !== undefined) {
    answers.sort(() => Math.random() - 0.5); // arrange array randomly

    return answers.map((answer, indexes) => {
      return (
        <div className="form-check" key={indexes} style={{ display: "inline" }}>
          <p style={{ display: "inline" }}>
            <label>
              <Checkbox
                checked={false}
                onChange={e =>
                  saveAnswer(answer, correct_answer, general, index)
                }
                value={answer}
              />
              &nbsp; {answer}
            </label>
            &nbsp;&nbsp;
          </p>
        </div>
      );
    });
  }
};
const Question = memo(props => {
  const { questionTitle, ques, general, index } = props;
  return (
    <div className="text-align mt-5  ml-5 mr-5 wrapperDiv">
      <Card
        className="mt-5"
        title="Select Correct Answer"
        style={{
          marginLeft: "20%",
          marginRight: "20%"
        }}
      >
        <div>
          <h2>{questionTitle}</h2>
          <p style={{ fontWeight: "bold" }}>{ques.q}</p>
          {renderAnswer(ques.answrs, ques.correct_answer, general, index)}
        </div>
      </Card>
    </div>
  );
});

export default Question;
