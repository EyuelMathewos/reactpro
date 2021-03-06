import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../../../index.css";
import { Table, Button ,Divider, Icon,message, Select } from "antd";
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
const { Option } = Select;
const children = [];

let selectedRow=[];
export class userAccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          datapro: [],
          project: []
        };
      }
    
      handleChange(value) {
        console.log(`selected ${value}`);
        console.log([value]);
        console.log(selectedRow.id);
           axios.patch('http://localhost:4000/api/Accounts/'+selectedRow.id,{"particpateIn":value==null?[]:value})
            .then(function (response) {
              console.log(response);
              window.location.reload();
            })
            .catch(function (error) {
              console.log(error);
            });
      }
      columns= [
        {
          title: "first Name",
          dataIndex: "firstName",
          key: 'firstName'
        },
        {
          title: "Email",
          dataIndex: "email",
          key: 'email'
        },
        {
          title: 'Project Partitpate In',
          dataIndex: "particpateIn",
          key: 'particpateIn',
          align: 'center',
          width: 400,
          
          
          render: (text, record) =>{
        
       //     console.log("**********this is the record data ************");
            console.log(record.particpateIn);
             let valu=null;
            return(  <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please Select a Projects The User Partitpate In"
                //onDeselect={this.handleChange}
                onChange={this.handleChange}
                value={valu!==null?valu:record.particpateIn}
                
              >
                {children}
              </Select>)
          }
          
          
        }
      ];
    
    
      componentDidMount () {
        let component = this;
        let projectSelected=JSON.parse(localStorage.getItem("projectSelected"));
        //console.log(projectSelected);
        var request = new XMLHttpRequest(); request.open('GET', '/table', true);
        request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
        // Success!
        axios.get('http://localhost:4000/api/Accounts?filter={"where":{"role": "siteEngineer"}}')
        .then(function (projectResponse) {
         component.setState({ datapro: projectResponse.data });
           //let data =projectResponse.data;

          console.log("this is the data");
          console.log(projectResponse.data);
          console.log(Array.isArray(projectResponse.data));
      
        })
        .catch(function (error) {
          console.log(error);
        });
      //}
      axios.get('http://localhost:4000/api/projects')
      .then(function (response) {
        console.log("this is the project list data");
        console.log(response.data);
        
        
        component.setState({ project: response.data });
        let data = component.state.project;
        data.forEach(function(item){
          children.push(<Option key={item.projectId}>{item.projectName}</Option>);     
        });
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
    

       return (
            <Table
            bordered
            components={this.components}
            columns={this.columns}
            dataSource={this.state.datapro}
            onRow={(record, index) => ({
              index,
              onClick: event => {
                  selectedRow=record;
              }
            })}
          />
        )
      }
     


}
