
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
//import './index.css';
import { Table, Modal, message } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import axios from 'axios';
import qs from 'qs';
import * as session from 'browser-session-store';
import {TopHeader} from '../Header/topHeader'
import { isArray } from 'util';
let dragingIndex = -1;
 let  proResponse;
export class BodyRow extends React.Component {
  


  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let className = restProps.className;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr
          {...restProps}
          className={className}
          style={style}
        />
      )
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget(
  'row',
  rowTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }),
)(
  DragSource(
    'row',
    rowSource,
    (connect) => ({
      connectDragSource: connect.dragSource(),
    }),
  )(BodyRow),
);

const columns = [
{
  title: 'Project Name',
  dataIndex: 'projectName',
  key: 'projectName',
}, {
  title: 'Site Place',
  dataIndex: 'siteplace',
  key: 'siteplace',
},
{
  title: 'Property Owner',
  dataIndex: 'propertyowner',
  key: 'propertyowner',
}
, {
  title: 'Project Life Time',
  dataIndex: 'projectLifeTime',
  key: 'projectLifeTime',
}
];
const dataSource = []
function setProject(event) {
  console.log(event);

}
export default function DataModal(displayableData,data) {
  


  Modal.confirm({
      title: 'Do you want to select this project',
      content: (
       
          <div className="modal_data_wrapper">
          {displayableData}
         </div>
      ),
      okText:"Set Project",
       style: { top: 100, height: '83vh' },
      width: '100%',
      onOk() { 
        localStorage.setItem("projectSelected",data);
        message.success("you selected a project");
        window.location.reload();
        
      },
  });
}


class DragSortingTable extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = {
      datapro: [],
      projectName: "",
      

    };
  }
  
 
  componentDidMount () {
    let component = this;
    var request = new XMLHttpRequest(); request.open('GET', '/table', true);
    request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
    // Success!
    //var results=["the","following","data"];
    var results=JSON.parse(sessionStorage.getItem('userData'));
    console.log("****this view project console result***")
    console.log(results.particpateIn);
    let value=[];
    results.particpateIn.forEach(function(item){
      //valuese.push(item.projectName,item.projectId]);

     // value.push(`{"project": ${item}}`);
     value.push({"projectId": item});
      //return console.log(`{"project": ${item}}`);
      console.log(value);
      //children.push(<Option key={item.projectId}>{item.projectName}</Option>);
      //children.push(<Option key={1234}>some value</Option>);
    });

    console.log('http://localhost:4000/api/projects?filter={"where":{"or":'+JSON.stringify(value)+'}}');
    //axios.get('http://localhost:4000/api/projects?filter={"where":{"or":[{"projectId":"5cdc43bab951ca03c8924fff"},{"projectId":"5cdc4463b951ca03c8925000"},{"projectId":"5ce19fe31062ff0695225bdd"}}']}}')
    //axios.get('http://localhost:4000/api/projects')
    axios.get('http://localhost:4000/api/projects?filter={"where":{"or":'+JSON.stringify(value)+'}}')
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
      console.log(dataSource[0]);
      console.log(dataSource[0][5]);
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
       // componentDidMount () {
    
      //   var request = new XMLHttpRequest(); request.open('GET', '/table', true);
      //   request.onload = () => {
      //   if (request.status >= 200 && request.status < 400) {
      //   // Success!
      //   axios.get('http://localhost:4000/api/projects')
      //   .then(function (projectResponse) {
      //     //console.log(proresponse);
      //     //console.log(JSON.stringify({ x: 5, y: 6 }));
      //     // proResponse =projectResponse.data;
      //     // console.log(proResponse[0]);
         
          
      //     console.log(qs.stringify(projectResponse.data[5]);
      //    // console.log("this is value"+proResponse.data[5]);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      //   this.setState({someData: request.responseText}) } else {
      //           // We reached our target server, but it returned an error
      //           // Possibly handle the error by changing your state.
      //   } };
      //   request.onerror = () => {
      //   // There was a connection error of some sort.
      //   // Possibly handle the error by changing your state.
      //   };
      //       request.send();
      //     }
  
  // state = {
  //   
  //   data: [{
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   }, {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   }, {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //   }]
  // }

  components = {
    body: {
      row: DragableBodyRow,
    },
  }

  moveRow = (dragIndex, hoverIndex) => {
    const { datapro } = this.state;
    const dragRow = datapro[dragIndex];

    this.setState(
      update(this.state, {
        datapro: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      }),
    );
  }
 

  render() {
    
    return (
     
      <Table
        columns={columns}
        dataSource={this.state.datapro}
        components={this.components}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow,
          onClick: event => {
              console.log(record);
             
              DataModal( qs.stringify(record, { filter: ['projectName','propertyowner','siteplace'],arrayFormat: 'comma' }),JSON.stringify(record));
          }
        })}
      />
      
    );
      }
}

export const table = DragDropContext(HTML5Backend)(DragSortingTable);

//ReactDOM.render(<Demo />, document.getElementById('container'));
          