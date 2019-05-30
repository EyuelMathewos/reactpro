import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../../../index.css";
import { Table, Button ,Divider, Icon,Popconfirm } from "antd";
import { Resizable } from "react-resizable";
import axios from 'axios';
import qs from 'qs';

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
let approved;

const dataSource = []
function hello(data){
  console.log("you clicked a button"+data)
}

export class request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datapro: [],
      approved:true
    };
  }
  // check(){
  //   this.setState({
  //     approved:false
  //   })
  // }
  
  columns= [
    {
      title: "Request",
      dataIndex: "AboutRequest"
    },
    {
      title: "Detail about the request",
      dataIndex: "Detail"
    },
    {
      title: 'Approve',
      align: 'center',
      width:100,
      
      render: (text, record) =>{
        console.log("**********this is the record data ************");
        console.log(JSON.stringify(record.requestProjectId));
        let requestId=JSON.stringify(record.RequestId);
        console.log(''+requestId+'');
        console.log("this is inside the button");
        
        axios.get('http://localhost:4000/api/Requests?filter={"where": {"RequestId": '+requestId+'},"include": {"relation": "approvals", "where": {"approvalRequestId": '+requestId+' } }}')
        .then(function (response) {
          console.log("*********this is include feched data*************");
          console.log(response.data);
          //console.log(response.data[0].approvals.approved);
          approved=response.data[0].approvals.approved;
          console.log("this is the value"+approved)
          console.log("*********this is the end*************");
          
        })
        .catch(function (error) {
          console.log(error);
        });
  
        if(!(this.state.approved)){return(<Button type="primary" onClick={()=>{hello(JSON.stringify(record))}}>Approve</Button>) }
        else{
          return(<Button disabled type="primary">Approved</Button>)
        }
      }
      
      
    },
    {
      title: 'Disapprove',
      align: 'center',
      width:100,
      render: (text, record) =>{
        let component = this;
        function check (){
          if(component.state.approved){
            component.setState(function(prevState, props){
              return {approved: !prevState.approved}
              });
          }
          //component.setState({approved: false})
        }
        console.log("**********this is the record data ************");
        console.log(JSON.stringify(record.requestProjectId));
        let requestId=JSON.stringify(record.RequestId);
        console.log(''+requestId+'');
        
  //axios.get('http://localhost:4000/api/projects?filter={"where": {"projectId": "5cdc436eb951ca03c8924ffe"},"include": {"relation": "requests", "where": {"requestProjectId": "5cdc436eb951ca03c8924ffe" } }}')
  //axios.get('http://localhost:4000/api/projects?filter={"where": {"projectId": '+projectid+'},"include": {"relation": "requests", "where": {"requestProjectId": '+projectid+' } }}')
        axios.get('http://localhost:4000/api/Requests?filter={"where": {"RequestId": '+requestId+'},"include": {"relation": "approvals", "where": {"approvalRequestId": '+requestId+' } }}')
        .then(function (response) {
          console.log("*********this is include feched data*************");
          console.log(response.data);
          //console.log(response.data[0].approvals.approved);
          approved=response.data[0].approvals.approved;

        //  approved=true;
          //  if(approved){
          //   // component.setState({approved: false})
          //   ()=>{component.setState({approved: false})
          //   }
          //component.check.bind(this);
          if(approved){
          
          }else{
           // check();
          }
        
          console.log("this is the value"+approved)
          console.log("*********this is the end*************");
          
        })
        .catch(function (error) {
          console.log(error);
        });
        console.log("is this data is /"+this.state.approved);
        if(this.state.approved){
          return(<Button type="danger" onClick={()=>{hello(JSON.stringify(record))}}>Disapprove</Button>)
         }
        else{
          return(<Button disabled type="primary">Disapproved</Button>)
        }
      }
      
      
    }
  ];


  componentDidMount () {
    let component = this;
    var request = new XMLHttpRequest(); request.open('GET', '/table', true);
    request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
    // Success!
    
    axios.get('http://localhost:4000/api/Requests')
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
      <Table
        bordered
        components={this.components}
        columns={this.columns}
        dataSource={this.state.datapro}
      />
    );
  }
}

//ReactDOM.render(<Demo />, document.getElementById("container"));
//export const request = DragDropContext(HTML5Backend)(Demo);