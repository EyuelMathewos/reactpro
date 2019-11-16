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

    var results=JSON.parse(sessionStorage.getItem('userData'));
    console.log("****this view project console result***")
    console.log(results.particpateIn);
    let value=[];
    results.particpateIn.forEach(function(item){
     value.push({"project": item});
      console.log(value);
    });

    //console.log('http://localhost:4000/api/projects?filter={"where":{"or":['+value+']}}');
    axios.get('http://localhost:4000/api/projects')
    .then(function (projectResponse) {
       component.setState({ datapro: projectResponse.data });
       //let data =projectResponse.data;
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

