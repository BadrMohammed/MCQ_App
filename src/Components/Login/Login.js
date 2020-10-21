import React, { Component } from "react";
import * as actions from "../../Redux/Actions/Index";
import { connect } from "react-redux";
import { MERGE_EXAM_PROP, UPDATE_EXAM_PROP } from "../../Redux/Actions/types";
import { Modal, Input } from "antd";
import toast from "toasted-notes";

class Login extends Component {
  handleSave = e => {
    const { newName, general } = this.props;
    e.preventDefault();

    if (newName === "") {
      toast.notify("Please Enter your Name", {
        position: "top-right",
        duration: 2000
      });
    } else {
      general([{ prop: "isRenderModal", value: false }], UPDATE_EXAM_PROP);
    }
  };

  onChaneName = value => {
    const { general } = this.props;

    general([{ prop: "newName", value: value }], UPDATE_EXAM_PROP);
    general([{ prop: "students", value: value }], MERGE_EXAM_PROP);
  };
  afterClose = () => {
    const { history } = this.props;
    history.push("/mcq");
  };
  render() {
    const { newName } = this.props;
    const { isRenderModal } = this.props;
    return (
      <Modal
        centered={true}
        closable={false}
        title="Enter your Name"
        visible={isRenderModal}
        onOk={this.handleSave}
        cancelButtonProps={{ disabled: true }}
        afterClose={this.afterClose}
        okText="Save"
      >
        <Input
          placeholder="input placeholder"
          style={{ padding: "10px", borderRadius: "10px" }}
          value={newName}
          onChange={e => this.onChaneName(e.target.value)}
        />
      </Modal>
    );
  }
}

const mapStateToProps = ({ ExamR }) => {
  return {
    isRenderModal: ExamR.isRenderModal,
    newName: ExamR.newName
  };
};

export default connect(mapStateToProps, actions)(Login);
