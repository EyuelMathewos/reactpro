
import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import axios from 'axios';
import Api from "../service/Api";
import qs from 'qs'
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Button,
} from 'antd';

const { Option } = Select;



const options = [
  {
    value: "Admin",
    label: "Admin"
  },
  {
    value: "projectManager",
    label: "Project Manager"
  }
  ,
  {
    value: "siteEngineer",
    label: "Site Engineer"
  }
  ,
  {
    value: "siteCoordinator",
    label: "Site Coordinator"
  }
  ,
  {
    value: "finance",
    label: "Finance"
  }


];

 class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post('http://localhost:4000/api/Accounts',qs.stringify(values, { filter: ['firstName','lastName','email','password','role','phoneNo','username'],arrayFormat: 'comma' }))
        
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        console.log('Received values of form: ', values);
        console.log(qs.stringify(values, { filter: ['firstName','lastName','email','role','phoneNo','username','password'],arrayFormat: 'comma' }));

      }
    });
  }

  // handleSubmit = (e) =>{
  //   e.preventDefault();
  //   this.props.form.validateFieldsAndScroll((err, values) => {
  //     if (!err) {
  //         Api.create("Accounts",qs.stringify(values, { filter: ['firstName','lastName','email','password','role','phoneNo','username'],arrayFormat: 'comma' }))
  //         .then(response =>{
  //           console.log("THE RESPONSE IS ", response.data)
  //         })
  //     }
  //   });
  // }


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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '251',
    })(
      <Select style={{ width: 80 }}>
        <Option value="251">+251</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );


    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {/* this to text box have to be edited */}
        <Form.Item
        label="First Name" 
        >
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input/>
          )}
        </Form.Item>

        <Form.Item
        label="Last Name"
        >
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          label={(
            <span>
              username&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>

        
        <Form.Item
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
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
        <Form.Item
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
                 
         <Form.Item
          label="Phone Number"
        >
          {getFieldDecorator('phoneNo', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </Form.Item> 

               <Form.Item
          label="Role"
        >
          {getFieldDecorator('role', {
            initialValue: ['Admin'],
            rules: [{ type: 'array', required: true, message: 'Please select your Role !' }],
          })(
            <Cascader options={options} />
          )}
        </Form.Item>
        
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </Form.Item>
      </Form>
    );
  }
}

export const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

//ReactDOM.render(<WrappedRegistrationForm />, document.getElementById('container'));
//  const regist = props => {
//   return (
//     <div>
//       <h1>hello registeration</h1>
//     </div>
//   );
// };
 