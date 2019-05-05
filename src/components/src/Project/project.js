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

const { Option } = Select;

const options = [
  {
    value: "addisAbaba",
    label: "Addis Abeba"
  },
  {
    value: "adama",
    label: "adama"
  },
  {
    value: "mekele",
    label: "mekele"
  },
  {
    value: "gambela",
    label: "gambela"
  },
  {
    value: "jema",
    label: "jema"
  }
];

const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

class Demo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('http://localhost:3000/api/projects',qs.stringify(values, { filter: ['projectName','projectLifeTime','siteplace','propertyowner'],arrayFormat: 'comma' }))
        
        .then(function (response) {
          console.log(response);
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
        <Form.Item label="Project Name">
          {getFieldDecorator("projectName", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Place of the Site">
          {getFieldDecorator("siteplace", {
            initialValue: ["addisAbaba"],
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your Role !"
              }
            ]
          })(<Cascader options={options} />)}
        </Form.Item>

        <Form.Item label="The owner of the Property">
          {getFieldDecorator("propertyowner", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Project life time">
          {getFieldDecorator("projectLifeTime", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<RangePicker onChange={onChange} />)}
        </Form.Item>

        <Form.Item label="Select[multiple]">
          {getFieldDecorator("select-multiple", {
            rules: [
              {
                required: true,
                message: "Please select your favourite colors!",
                type: "array"
              }
            ]
          })(
            <Select
              mode="multiple"
              placeholder="Please select favourite colors"
            >
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="The deal made Doc">
          <div className="dropbox">
           
            {getFieldDecorator("dragger", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile
            })(
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            )}
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const project = Form.create({ name: "validate_other" })(Demo);

//ReactDOM.render(<WrappedDemo />, document.getElementById("container"));
