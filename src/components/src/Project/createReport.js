import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../../../index.css";
import axios from 'axios';
import qs from 'qs';
import { Form, Input, Select, Button, AutoComplete } from "antd";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class createReport extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let projectSelected=JSON.parse(localStorage.getItem("projectSelected"));
        console.log(projectSelected);
        if(projectSelected!==null){
          //http://localhost:4000/api/projects/5cdc4463b951ca03c8925000/reports
          //axios.post('http://localhost:4000/api/reports',qs.stringify(values, { filter: ['workperformed','detailedActivityDesc','actualTime','planedPrice','usedPrice'],arrayFormat: 'comma' }))
        axios.post('http://localhost:4000/api/projects/5cdc4463b951ca03c8925000/reports',qs.stringify(values, { filter: ['workperformed','detailedActivityDesc','actualTime','planedPrice','usedPrice'],arrayFormat: 'comma' }))
 
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }else{
        console.log("you have to select a project to send report")
      }

       // console.log('Received values of form: ', values);
       // console.log(qs.stringify(values, { filter: ['workperformed','detailedActivityDesc','actualTime','planedPrice','usedPrice'],arrayFormat: 'comma' }));

       
      }
    });
  };

  



  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="work performed">
          {getFieldDecorator("workperformed", {
            rules: [
              {
                message: "The input is not valid !"
              },
              {
                required: true,
                message: "Please enter task to perform!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Detail Activity Description">
          {getFieldDecorator("detailedActivityDesc", {
            rules: [
              {
                required: true,
                message: "Please Discribe detail activity performed!"
              }
            ]
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="Actual Time">
          {getFieldDecorator("actualTime", {
            rules: [
              {
                required: true,
                message: "Please enter performace per day!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="Price for the Task">
          {getFieldDecorator("planedPrice", {
            rules: [
              {
                required: true,
                message: "Please enter the planned price!"
              }
            ]
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="Price used">
          {getFieldDecorator("usedPrice", {
            rules: [
              {
                required: true,
                message: "Please enter the planned price!"
              }
            ]
          })(<Input/>)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Enter Report
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

//export const Report = Form.create({ name: "report" })(report);
export const createreport = Form.create({ name: 'create Schedule' })(createReport);