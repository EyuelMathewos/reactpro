import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../../../index.css";
import { Table, Button ,Divider, Icon,message, Modal,Form,Input,Drawer } from "antd";
import { Resizable } from "react-resizable";
import axios from 'axios';
import qs from 'qs';
import {CollectionsPage} from "./createRequestComp";
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

//const { getFieldDecorator } = this.props.form;
//let getFieldDecorator;
//const { getFieldDecorator } = this.props.form;
// let selectedRow=[];
// function hellow (){
//   console.log("this is the data");
//   console.log(selectedRow);
//   //window.location.reload();
// }
export class createrequest extends React.Component {
  constructor(props) {
    super(props);
    let approved;

    this.state = {
      datapro: [],
      visible: false,
    };
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

   
  
  columns= [
    {
      title: "Request",
      dataIndex: "AboutRequest"
    },
    {
      title: "Detail about the request",
      dataIndex: "Detail"
    }
    // ,
    // {
    //   title: 'Delete',
    //   align: 'center',
    //   dataIndex:'RequestId',
      
    //   render: (text, record) =>{
       
    //     return(

    //     <Button type="danger" onClick={()=>{hellow()}}>Delete</Button>)
        
    //   }
    // }
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
    if(projectSelected!==null){
    axios.get('http://localhost:4000/api/projects/'+projectSelected.projectId+'/requests?filter={"include": {"relation": "approvals"}}')
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
     // console.log(Array.isArray(projectResponse.data));
      // if(Array.isArray(projectResponse.data)){
      //   dataSource.push(projectResponse.data)
       
      // }
  
      console.log("this is the pushed data");
      // console.log(dataSource[0]);
      // console.log(dataSource[0][5]);
      // console.log("***********this is state value***********");
      // console.log(component.state.datapro);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
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
  //  const { getFieldDecorator } = this.props.form;
  // const {
  //   form: { getFieldDecorator },
  // } = this.props;
  
  //const { getFieldDecorator } = form;
    return (       
      <div>
        <CollectionsPage/>
      {/* <Button type="primary" onClick={this.showDrawer}>
      <Icon type="plus" /> Create Request
      </Button>
      <Drawer
     title="Create a new account"
     width={720}
     onClose={this.onClose}
     visible={this.state.visible}>
        <Form layout="vertical">
             <Form.Item label="About The Request">
               { getFieldDecorator('about', {
                    rules: [{ required: true, message: 'Please enter user name' }],
                  })(<Input />)}
             </Form.Item>
             <Form.Item label="Detail About the Request">
               {(<Input />)}
             </Form.Item>
             <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

          </Form>
     </Drawer> */}

     <Table
        bordered
        components={this.components}
        columns={this.columns}
        dataSource={this.state.datapro}
        onRow={(record, index) => ({
          index,
          onClick: event => {
              //selectedRow=record;
             //console.log(selectedRow);
          }
        })}
      />
      </div>     
    );
  }
}

//ReactDOM.render(<Demo />, document.getElementById("container"));
//export const request = DragDropContext(HTML5Backend)(Demo);