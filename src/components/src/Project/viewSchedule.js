
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../../index.css';
import { Table, Modal, message } from 'antd';
import { Resizable } from 'react-resizable';
import axios from 'axios';
import qs from 'qs';
const ResizeableTitle = (props) => {
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
const columns =  [{
  title: 'Task To perform',
  dataIndex: 'taskToPerform',
  width: 200,
}, {
  title: 'Actual Time',
  dataIndex: 'actualTime',
  width: 100,
}, 
 {
  title: 'Performace Per Day',
  dataIndex: 'performancePerDay',
  width: 100,
},
{
  title: 'Price to the task',
  dataIndex: 'planedPrice',
  width: 100,
}]

export default function DataModal(displayableData,data) {
  


  Modal.info({
      title: 'Schedule',
      content: (
       
          <div className="modal_data_wrapper">
          <h4>Task To Perform</h4>
          <p>{data.taskToPerform}</p>
          <h4>Actual Time</h4>
          <p>{data.actualTime}</p>
          <h4>Performace Per Day</h4>
          <p>{data.performancePerDay}</p>
         </div>
      ),
       style: { top: 100, height: '83vh' },
       centered:"true",
      onOk() { 

      },
  });
}


export class viewSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount () {
    let component = this;
    var request = new XMLHttpRequest(); request.open('GET', '/table', true);
    request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
    // Success!
    
    axios.get('http://localhost:4000/api/schedules')
    .then(function (reportResponse) {
     // this.setState({ datapro: projectResponse.data[0]  });
     component.setState({ data: reportResponse.data });
      //console.log(proresponse);
      //console.log(JSON.stringify({ x: 5, y: 6 }));
       let data =reportResponse.data;
      // console.log(proResponse[0]);
     // this.setState({data: projectResponse.data});
      
      //console.log(JSON.stringify({data}));
      //console.log("this is it"+proResponse);
      console.log("this is the data");
      console.log(reportResponse.data);
      console.log(Array.isArray(reportResponse.data));
      if(Array.isArray(reportResponse.data)){
        //dataSource.push(projectResponse.data)
       
      }
  
      console.log("this is the pushed data");
      //console.log(dataSource[0]);
     // console.log(dataSource[0][5]);
      console.log("***********this is state value***********");
      console.log(component.state.datapro);
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
      cell: ResizeableTitle,
    },
  };


  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  render() {
    // const columns = this.state.columns.map((col, index) => ({
    //   ...col,
    //   onHeaderCell: column => ({
    //     width: column.width,
    //     onResize: this.handleResize(index),
    //   }),
    // }));

    return (
      <Table
        bordered
        components={this.components}
        columns={columns}
        dataSource={this.state.data}
        onRow={(record, index) => ({
          index,
          onClick: event => {
              console.log(record);
             
              DataModal( qs.stringify(record, { filter: ['projectName','propertyowner','siteplace'],arrayFormat: 'comma' }),record);
          }
        })}
      />
    );
  }
}

//export default  Demo;
//ReactDOM.render(<Demo />, document.getElementById('container'));
          