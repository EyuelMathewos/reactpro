
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../../index.css';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import axios from 'axios';
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
  dataIndex: 'workperformed',
  width: 200,
}, {
  title: 'Time Monitoring',
  dataIndex: 'actualTime',
  width: 100,
}, {
  title: 'Price to the task',
  dataIndex: 'usedPrice',
  width: 100,
}, {
  title: 'Detail Description',
  dataIndex: 'detailedActivityDesc',
  width: 100,
}, 
// {
//   title: 'Action',
//   key: 'action',
//   render: () => (
//     <a href="javascript:;">Edit</a>
//   ),
// }
]
export class editReport extends React.Component {
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
    
    axios.get('http://localhost:4000/api/reports')
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
      />
    );
  }
}

//export default  Demo;
//ReactDOM.render(<Demo />, document.getElementById('container'));
          