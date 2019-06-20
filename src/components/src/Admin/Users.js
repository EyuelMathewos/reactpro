import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../../../index.css";
import { Table, Button ,Form, Modal,message,Input,Icon,Tooltip } from "antd";
import { Resizable } from "react-resizable";
import axios from 'axios';
import qs from 'qs';
let selectedRow=[];
const UserCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        console.log("this is the value"),
        console.log(selectedRow),
        <Modal
          visible={visible}
          title="update user"
          okText="update"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
          <Form.Item label="First Name">
          {getFieldDecorator("firstname", {
            rules: [{message: "Please input your First name!" }]
          })(<Input />)}
        </Form.Item>


        <Form.Item label="Last Name">
          {getFieldDecorator("lastName", {
            rules: [{ message: "Please input your Last name!" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="username">
          {getFieldDecorator("username", {
            rules: [{ message: "Please input your username!" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
                message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Phone Number"
        >
          {getFieldDecorator('phoneNo', {
            rules: [{ message: 'Please input your phone number!' }],
          })(
            <Input/>
          )}
        </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);
const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};
let value=[];
const dataSource = []
function hello(data){
  console.log("you clicked a button"+data)
}

function approveAction(data){
  axios.get('http://localhost:4000/api/approvals?filter={"where": {"approvalRequestId": '+data+'}}')
  .then(function (response) {
    if(response.data[0].approved){
      //console.log(data);
      message.error("You Already Approved It"); 
      console.log("you already approved it")
    }else{

      console.log('http://localhost:4000/api/approvals/'+response.data[0].approvalid);
      axios.patch('http://localhost:4000/api/approvals/'+response.data[0].approvalid,{"approved": true})
      .then(function (response) {
        message.success("You Approve This Request");
        console.log(response.data)
        console.log("ehh hello world")
         })
      .catch(function (error) {
    console.log(error);
     });

    }
    console.log(response.data[0].approved); 
  })
  .catch(function (error) {
    console.log(error);
  });

  //console.log("you clicked a button")
  //console.log(data)

}
function deleteUser(data){
  console.log(data);
  console.log('http://localhost:4000/api/Accounts/'+data);
  //http://localhost:4000/api/Accounts/8383838
  //  axios.get('http://localhost:4000/api/approvals?filter={"where": {"approvalRequestId": '+data+'}}')
  axios.delete('http://localhost:4000/api/Accounts/'+data)
  .then(function (response) {
   console.log("you deleted an account");
   window.location.reload();
  })
  .catch(function (error) {
    console.log(error);
  });

  console.log("you clicked a button")
 
}


export class users extends React.Component {
  constructor(props) {
    super(props);
    let approved;

    this.state = {
      datapro: [],
      visible: false,
      
    };
  }
  showModal (data){
    this.setState({ visible: true });
    this.formRef.props.form.setFieldsValue({
      firstname: data.firstName,
    });
    this.formRef.props.form.setFieldsValue({
      lastName: data.lastName,
    });
    this.formRef.props.form.setFieldsValue({
      username: data.username,
    });
    this.formRef.props.form.setFieldsValue({
      email: data.email,
    });
    this.formRef.props.form.setFieldsValue({
      phoneNo: data.phoneNo,
    });
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
      // let projectSelected=JSON.parse(localStorage.getItem("projectSelected"));
      // console.log(projectSelected);
      // console.log("this is the value form handle create");
      // console.log(selectedRow.id);
      console.log('Received values of form: ', values);
      axios.patch('http://localhost:4000/api/Accounts/'+selectedRow.id,qs.stringify(values, { filter: ['firstName','lastName','email','role','phoneNo','username'],arrayFormat: 'comma' }))
        
      .then(function (response) {
        console.log(response);
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

//  DataModal(data) {
//   let comp=this


//     Modal.confirm({
//         title: 'Update User Data',
//         content: (
         
//             <div className="modal_data_wrapper">
//             {/* {data} */}
//             <Form>
//             <Form.Item
//             label="First Name">      
//               <Input/>
//             </Form.Item>
//             <Form.Item
//             label="Last Name">      
//               <Input/>
//             </Form.Item>
//             <Form.Item
//             label="Email">      
//               <Input/>
//             </Form.Item>
//             <Form.Item
//             label="Role">      
//               <Input/>
//             </Form.Item>
//             <Form.Item
//             label="Phone Number">      
//               <Input/>
//             </Form.Item>
//             <Form.Item
//             label="User Name">      
//               <Input/>
//             </Form.Item>
//             </Form>
//            </div>
//         ),
//         okText:"Update User Data",
//          style: { top: 100, height: '83vh' },
//         width: '50%',
//         onOk() { 
//           message.success("you selected a project");
//           window.location.reload();
//         //comp.setState({   datapro: []});
//         },
//     });
//   }
  
  columns= [
    {
      title: "First Name",
      dataIndex: "firstName"
    },
    {
      title: "Last Name",
      dataIndex: "lastName"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Role",
      dataIndex: "role"
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNo"
    },
    {
      title: "User Name",
      dataIndex: "username"
    },    
    {
      title: 'Update',
      align: 'center',
      width:100,
      
      render: (text, record) =>{
      
        console.log("**********this is the record data ************");
        console.log(record);
        console.log(record.requestProjectId);
        console.log(JSON.stringify(record.requestProjectId));
        let requestId=JSON.stringify(record.RequestId);
       // console.log(''+requestId+'');
        console.log("this is inside the button");
        
        // axios.get('http://localhost:4000/api/Requests?filter={"where": {"RequestId": '+requestId+'},"include": {"relation": "approvals", "where": {"approvalRequestId": '+requestId+' } }}')
        // .then(function (response) {
        //   console.log("*********this is include feched data*************");
        //   console.log(response.data);
        //   //console.log(response.data[0].approvals.approved);
        //   window.approved=response.data[0].approvals.approved;
        //  // console.log("this is the value"+approved)
        //   console.log("*********this is the end*************");
          
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
        //console.log("this is the window test"+approved)//.replace("\"", "")
        return(<Button type="primary" icon="edit" onClick={()=>{this.showModal(record)}}/>) 

      }
      
      
    },
    {
      title: 'delete',
      align: 'center',
      width:100,
      render: (text, record) =>{
        let component=this;
     
     
        console.log("**********this is the record data ************");
        console.log(JSON.stringify(record))
        console.log(JSON.stringify(record.id));
        let requestId=JSON.stringify(record.id);
        let userId=JSON.stringify(record.id);
        console.log(''+requestId+'');
  //axios.get('http://localhost:4000/api/projects?filter={"where": {"projectId": "5cdc436eb951ca03c8924ffe"},"include": {"relation": "requests", "where": {"requestProjectId": "5cdc436eb951ca03c8924ffe" } }}')
  //axios.get('http://localhost:4000/api/projects?filter={"where": {"projectId": '+projectid+'},"include": {"relation": "requests", "where": {"requestProjectId": '+projectid+' } }}')
  //axios.get('http://localhost:4000/api/Requests?filter={"where": {"RequestId": '+requestId+'},"include": {"relation": "approvals", "where": {"approvalRequestId": '+requestId+' } }}')
        // axios.get('http://localhost:4000/api/Accounts/8383838')
        // .then(function (response) {
        //   console.log("*********this is include feched data*************");
        //   console.log(response.data);
        //   //console.log(response.data[0].approvals.approved);
        //   //let approved;
        //   //global.approved=response.data[0].approvals.approved;       
        // //  approved=true;
        //   //  if(approved){
        //   //   // component.setState({approved: false})
        //   //   ()=>{component.setState({approved: false})
        //   //   }
       
            
            
          
        //   //let approveds=component.approved;
        
        //   console.log("*********this is the end*************");
          
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
       
        //console.log("is this data is /"+window.approved);
        
        
      return(<Button type="danger" icon="user-delete" onClick={()=>{deleteUser(record.id)}}/>)
         
      }
      
      
    }
  ];


  componentDidMount () {
    let component = this;
    let projectSelected=JSON.parse(localStorage.getItem("projectSelected"));
    console.log(projectSelected);
    var request = new XMLHttpRequest(); request.open('GET', '/table', true);
    request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
    // Success!
    //axios.get('http://localhost:4000/api/Requests')
    //axios.get('http://localhost:4000/api/projects/5cdc43bab951ca03c8924fff/requests')
    //if(projectSelected!==null){
    axios.get('http://localhost:4000/api/Accounts')
    .then(function (projectResponse) {
     // this.setState({ datapro: projectResponse.data[0]  });
     component.setState({ datapro: projectResponse.data });
      //console.log(proresponse);
      //console.log(JSON.stringify({ x: 5, y: 6 }));
       let data =projectResponse.data;
      // console.log(proResponse[0]);
     // this.setState({data: projectResponse.data});
      
      //console.log(JSON.stringify({data}));
      //console.log("this is it"+proResponse);
      console.log("this is the data");
      console.log(projectResponse.data);
      console.log(Array.isArray(projectResponse.data));
      if(Array.isArray(projectResponse.data)){
        dataSource.push(projectResponse.data)
       
      }
  
      console.log("this is the pushed data");
      // console.log(dataSource[0]);
      // console.log(dataSource[0][5]);
      // console.log("***********this is state value***********");
      // console.log(component.state.datapro);
    })
    .catch(function (error) {
      console.log(error);
    });
  //}
    this.setState({someData: request.responseText}) } else {
            // We reached our target server, but it returned an error
            // Possibly handle the error by changing your state.
    } };
    request.onerror = () => {
    // There was a connection error of some sort.
    // Possibly handle the error by changing your state.
    };
        request.send();
       } 


  

  

  components = {
    header: {
      cell: ResizeableTitle
    }
  };

  // data = [
  //   {
  //     key: 0,
  //     date: "2018-02-11",
  //     amount: 120,
  //     type: "income",
  //     note: "transfer"
  //   },
  //   {
  //     key: 1,
  //     date: "2018-03-11",
  //     amount: 243,
  //     type: "income",
  //     note: "transfer"
  //   },
  //   {
  //     key: 2,
  //     date: "2018-04-11",
  //     amount: 98,
  //     type: "income",
  //     note: "transfer"
  //   }
  // ];

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return { columns: nextColumns };
    });
  };

  render() {
    // const columns = this.state.columns.map((col, index) => ({
    //   ...col,
    //   onHeaderCell: column => ({
    //     width: column.width,
    //     onResize: this.handleResize(index)
    //   })
    // }));

    return (
      <div>
      <Table
        bordered
        components={this.components}
        columns={this.columns}
        dataSource={this.state.datapro}
        onRow={(record, index) => ({
          index,
          onClick: event => {
              selectedRow=record;
             //console.log(selectedRow);
          }
        })}
      />
      <UserCreateForm
      wrappedComponentRef={this.saveFormRef}
      visible={this.state.visible}
      onCancel={this.handleCancel}
      onCreate={this.handleCreate}
    />
    </div>
    );
  }
}

//ReactDOM.render(<Demo />, document.getElementById("container"));
//export const request = DragDropContext(HTML5Backend)(Demo);