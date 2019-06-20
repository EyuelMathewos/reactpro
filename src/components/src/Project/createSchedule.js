import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../../../index.css";
import axios from 'axios';
import qs from 'qs';
import { Form, Input, Select, Button, AutoComplete, DatePicker } from "antd";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { RangePicker } = DatePicker;
function onChange(date, dateString) {
  console.log(date, dateString);
}
class createSchedule extends React.Component {
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
       //axios.post('http://localhost:4000/api/schedules',qs.stringify(values, { filter: ['taskToPerform','performancePerDay','actualTime','planedPrice'],arrayFormat: 'comma' }))
        axios.post('http://localhost:4000/api/projects/'+projectSelected.projectId+'/schedules',qs.stringify(values, { filter: ['taskToPerform','performancePerDay','actualTime','planedPrice','scheduleLifeTime'],arrayFormat: 'comma' }))
        
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
          }
        console.log('Received values of form: ', values);
        console.log(qs.stringify(values, { filter: ['taskToPerform','performancePerDay','actualTime','planedPrice'],arrayFormat: 'comma' }));

       
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
        <Form.Item label="Task To perform">
          {getFieldDecorator("taskToPerform", {
            rules: [
              {
                message: "The input is not valid !"
              },
              {
                required: true,
                message: "Please enter Task to perform!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Actual Time">
          {getFieldDecorator("actualTime", {
            rules: [
              {
                required: true,
                message: "Please enter actual time!"
              }
            ]
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="Perfomance Per Day">
          {getFieldDecorator("performancePerDay", {
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

        <Form.Item label="Task Life Time">
          {getFieldDecorator("scheduleLifeTime", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<RangePicker onChange={onChange} />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Enter Schedule
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

//export const Report = Form.create({ name: "report" })(report);
export const createschedule = Form.create({ name: 'create report' })(createSchedule);