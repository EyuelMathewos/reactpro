
import React from 'react';
//import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import axios from 'axios';
import qs from 'qs'
import {
  Form, Input, Button, 
} from 'antd';





class login extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post('http://localhost:4000/api/Accounts/login',qs.stringify(values))
    .then(function (response) {
    console.log(response);

   

    
  })
  .catch(function (error) {
    
    console.log(error);
  });
        console.log('Received values of form: ', values);
      // let valu="values";
       console.log(qs.stringify(values));
       //console.log(<Stringify value={values} />);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };



    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {/* this to text box have to be edited */}
        <Form.Item
        label="UserName" 
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input/>
          )}
        </Form.Item>

 

        <Form.Item
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>

        

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Login</Button>
        </Form.Item>
      </Form>
    );
  }
}

export const Login = Form.create({ name: 'Login' })(login);

