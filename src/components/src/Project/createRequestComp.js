import React from "react";
import { Button, Modal, Form, Input, Radio } from 'antd';
import axios from 'axios';
import qs from 'qs'
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create Request"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
          <Form.Item label="About Request">
          {getFieldDecorator("AboutRequest", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input />)}
        </Form.Item>


        <Form.Item label="Detail about the request">
          {getFieldDecorator("Detail", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input />)}
        </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

export class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let projectSelected=JSON.parse(localStorage.getItem("projectSelected"));
      console.log(projectSelected);

      console.log('Received values of form: ', values);
      axios.post('http://localhost:4000/api/projects/'+projectSelected.projectId+'/requests',qs.stringify(values, { filter: ['AboutRequest','Detail'],arrayFormat: 'comma' }))
        
      .then(function (response) {
        console.log(response);
        //approval input
        axios.post('http://localhost:4000/api/approvals',qs.stringify(  {
          "projectName": projectSelected.projectName,
          "approvalProjectId": response.data.requestProjectId,
          "approvalRequestId": response.data.RequestId,
          "approved": ""
        }))
        
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
        //approval input end
        //window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });

      //form.resetFields();
      //this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" shape="round" icon="plus" size="large" onClick={this.showModal}>
        Create Request
        </Button>

        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

// ReactDOM.render(<CollectionsPage />, mountNode);