import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../../../index.css";
import axios from 'axios';
import qs from 'qs'
import {
  Form,
  Select,
  Button,
  Upload,
  Icon,
  Input,
  Cascader,
  DatePicker
} from "antd";


const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

class createReq extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let component = this;
        let projectSelected=JSON.parse(localStorage.getItem("projectSelected"));
        console.log(projectSelected);
        axios.post('http://localhost:4000/api/projects/'+projectSelected.projectId+'/requests',qs.stringify(values, { filter: ['AboutRequest','Detail'],arrayFormat: 'comma' }))
        
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          // console.log('http://localhost:4000/api/projects/'+projectSelected.projectId+'/approvals'+JSON.stringify({
          //   "ProjectId": 0,
          //   "projectName": projectSelected.projectName,
          //   "approvalDate": "2019-06-14T09:59:18.709Z",
          //   "approvalProjectId": response.data.requestProjectId,
          //   "approvalRequestId": response.data.RequestId,
          //   "approved": ""
          // }))
          axios.post('http://localhost:4000/api/projects/'+projectSelected.projectId+'/approvals',qs.stringify({
            "ProjectId": 0,
            "projectName": "whats up hello world",
            "approvalDate": "2019-06-14T09:59:18.709Z",
            "approvalProjectId": "test",
            "approvalRequestId": "test",
            "approved": ""
          }))
        
          .then(function (response) {
            console.log(response);
            
          })
          .catch(function (error) {
            console.log(error);
          });     
        })
        .catch(function (error) {
          console.log(error);
        });
        console.log("Received values of form: ", values);
        console.log(qs.stringify(values, { filter: ['projectName','projectLifeTime','siteplace','propertyowner'],arrayFormat: 'comma' }));
      }
    });
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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


        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Create Request
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const createreq = Form.create({ name: "validate_other" })(createReq);

//ReactDOM.render(<WrappedDemo />, document.getElementById("container"));
