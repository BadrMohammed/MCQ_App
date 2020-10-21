import React, { Component } from "react";
import * as actions from "../../Redux/Actions/Index";
import { connect } from "react-redux";
import Question from "./Question";
import toast from "toasted-notes";
import { Card, Button, Modal } from "antd";
import { UPDATE_EXAM_PROP } from "../../Redux/Actions/types";

class Exam extends Component {
  componentDidMount() {
    // in case of page refresh and current page is mcq so will automitcally go to login page
    if (this.props.newName === "") {
      toast.notify(
        "your Name is Empty due to page refresh ,  please disply it again",
        {
          position: "top-right",
          duration: 3000
        }
      );
      this.props.history.push("/");
    }
  }
  tryAgain = e => {
    //to open modal that ask you to use same name or another
    const { general } = this.props;
    e.preventDefault();
    general([{ prop: "isRenderTryModal", value: true }], UPDATE_EXAM_PROP);
  };
  renderQuestions = () => {
    const { renderedQuestion, questions, general } = this.props;
    var items = 5;

    while (items >= 0) {
      items = items - 1;

      let ques = questions[Math.floor(Math.random() * questions.length)];

      let index = questions
        .map(function(e) {
          return e.correct_answer;
        })
        .indexOf(ques.correct_answer);
      if (ques.isRender === false) {
        return (
          <Question
            questionTitle={"Question " + (+renderedQuestion.length + 1)}
            ques={ques}
            general={general}
            index={index}
          />
        );
      }
    }
    if (renderedQuestion.length === 5) {
      items = 5;
      let item = renderedQuestion.filter(qu => qu === true);
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
              <h2>{"your result is " + item.length}</h2>
              <Button className="btn-try" onClick={e => this.tryAgain(e)}>
                Try Again
              </Button>
              <Button
                className="btn-try"
                onClick={e => this.tryAgain(e)}
              ></Button>
            </div>
          </Card>
        </div>
      );
    }
  };
  handleYes = () => {
    const { general, questions } = this.props;
    questions.map((qu, index) => {
      general(
        [{ prop: "questions." + index + ".isRender", value: false }],
        UPDATE_EXAM_PROP
      );
    });
    general(
      [
        { prop: "renderedQuestion", value: [] },
        { prop: "isRenderTryModal", value: false }
      ],
      UPDATE_EXAM_PROP
    );
  };

  handleNo = () => {
    const { history, general } = this.props;
    this.handleYes();
    general(
      [
        { prop: "newName", value: "" },
        { prop: "isRenderModal", value: true }
      ],
      UPDATE_EXAM_PROP
    );

    history.push("/");
  };
  render() {
    const { newName, isRenderTryModal } = this.props;
    return (
      <center>
        {newName !== "" ? this.renderQuestions() : null}

        <Modal
          centered={true}
          closable={false}
          title="Enter your Name"
          visible={isRenderTryModal}
          onOk={this.handleYes}
          onCancel={this.handleNo}
          okText="Yes"
          cancelText="No"
        >
          <h3>try with Same Name</h3>
        </Modal>
      </center>
    );
  }
}

const mapStateToProps = ({ ExamR }) => {
  return {
    questions: ExamR.questions,

    students: ExamR.students,
    renderedQuestion: ExamR.renderedQuestion,
    newName: ExamR.newName,
    isRenderTryModal: ExamR.isRenderTryModal
  };
};

export default connect(mapStateToProps, actions)(Exam);
