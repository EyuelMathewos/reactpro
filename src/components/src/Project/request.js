import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../../../index.css";
import { Table, Button ,Divider, Icon,message } from "antd";
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
function disapproveAction(data){
  console.log(data);
  axios.get('http://localhost:4000/api/approvals?filter={"where": {"approvalRequestId": '+data+'}}')
  .then(function (response) {
    console.log(response.data[0].approvalid);
    if(response.data[0].approved){
      console.log('http://localhost:4000/api/approvals/'+response.data[0].approvalid);
        axios.patch('http://localhost:4000/api/approvals/'+response.data[0].approvalid,{"approved": false})
        .then(function (response) {
          message.success("You Disapproved This Request");
          console.log(response.data)
           })
        .catch(function (error) {
      console.log(error);
       });
    }else{
      message.error("You Already Disapproved It"); 
      console.log("you already disapproved it")
    }
  })
  .catch(function (error) {
    console.log(error);
  });

  console.log("you clicked a button")
  console.log(data)

}


export class request extends React.Component {
  constructor(props) {
    super(props);
    let approved;

    this.state = {
      datapro: []
      
    };
  }

  
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
          window.approved=response.data[0].approvals.approved;
         // console.log("this is the value"+approved)
          console.log("*********this is the end*************");
          
        })
        .catch(function (error) {
          console.log(error);
        });
        //console.log("this is the window test"+approved)//.replace("\"", "")
        if(true){return(<Button type="primary" onClick={()=>{approveAction(JSON.stringify(record.RequestId))}}>Approve</Button>) }
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
        let value;
        let component=this;
     

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
          //let approved;
          //global.approved=response.data[0].approvals.approved;       
        //  approved=true;
          //  if(approved){
          //   // component.setState({approved: false})
          //   ()=>{component.setState({approved: false})
          //   }
       
            
            
          
          //let approveds=component.approved;
        
          console.log("*********this is the end*************");
          
        })
        .catch(function (error) {
          console.log(error);
        });
       
        //console.log("is this data is /"+window.approved);
        
        if(true){
          return(<Button type="danger" onClick={()=>{disapproveAction(JSON.stringify(record.RequestId))}}>Disapprove</Button>)
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