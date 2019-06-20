import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import "./styles.css";

import {
  Chart,
  Axis,
  Tooltip,
  Geom,
  Coord,
  Legend,
  Label,
  setTheme
} from "bizcharts";
setTheme("light");
let value;
const data = [
  {
    task: localStorage.getItem("schduel"),
    startTime: "2018-01-01 01:17:12",
    endTime: "2018-02-01 01:19:10",
    status: 0
  },
  {
    task: "task01",
    startTime: "2018-01-11 01:18:15",
    endTime: "2018-02-21 01:19:20",
    status: 1
  },
  {
    task: "task02",
    startTime: "2018-01-31 02:11:32",
    endTime: "2018-02-28 02:18:50",
    status: 2
  },
  {
    task: "task03",
    startTime: "2018-02-11 02:18:50",
    endTime: "2018-03-11 03:16:38",
    status: 3
  },
  {
    task: "task04",
    startTime: "2018-02-21 02:19:48",
    endTime: "2018-04-15 02:21:57",
    status: 4
  },
  {
    task: "task05",
    startTime: "2018-02-28 03:16:38",
    endTime: "2018-04-16 03:19:38",
    status: 5
  },
  {
    task: "task06",
    startTime: "2018-03-16 03:19:38",
    endTime: "2018-04-18 03:27:49",
    status: 6
  },
  {
    task: "task07",
    startTime: "2018-03-19 07:29:37",
    endTime: "2018-04-20 07:33:01",
    status: 0
  },
  {
    task: "task08",
    startTime: "2018-03-20 03:27:49",
    endTime: "2018-04-25 04:26:05",
    status: 1
  },
  {
    task: "task09",
    startTime: "2018-03-25 04:26:05",
    endTime: "2018-04-29 06:06:36",
    status: 2
  },
  {
    task: "task10",
    startTime: "2018-05-01 06:06:36",
    endTime: "2018-05-23 06:15:15",
    status: 3
  },
  {
    task: "task11",
    startTime: "2018-05-02 03:27:49",
    endTime: "2018-05-25 03:34:50",
    status: 4
  },

  {
    task: "task12",
    startTime: "2018-05-03 03:27:49",
    endTime: "2018-05-30 03:34:50",
    status: 5
  }
];

const values = [
  "hello",
  "whats up",
  "what are you doing",
  "已购买",
  "已购买",
  "已排期",
  "已完成"
];
const colors = [
  "#9e9e9e",
  "#009688",
  "#F04864",
  "#cddc39",
  "#2196f3",
  "#00bcd4",
  "#2FC25B"
];
data.forEach(obj => {
  obj.range = [obj.startTime, obj.endTime];
  obj.status = values[obj.status];
});

const scale = {
  range: {
    alias: "日期范围",
    type: "time",
    min: "2018-01-01",
    max: "2018-05-31"
  }
};
export class frontChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: []
    };
  }
  
  componentDidMount () {
    let component = this;
    axios.get('http://localhost:4000/api/schedules')
    .then(function (projectResponse) {
      component.setState({ schedule: projectResponse.data });
      console.log(component.state.schedule)
      value=projectResponse.data[0];
      localStorage.setItem("schduel",JSON.stringify(value))

    })
    .catch(function (error) {
      console.log(error);
    });
    console.log("this is the value");
    console.log(value);
  }
 
  render() {
    return (
    
        <Chart
          theme="light"
          padding="auto"
          height={400}
          data={data}
          forceFit
          scale={scale}
        >
          <Coord transpose scale={[1, -1]} />
          <Axis />
          <Tooltip />
          <Legend />
          <Geom
            type="interval"
            position="task*range"
            color={["status", colors]}
          >
            {/* <Label
              content={[
                'startTime*endTime',
                (startTime, endTime) => `${startTime} 至 ${endTime}`,
              ]}
            /> */}
          </Geom>
        </Chart>
        
      
    );
  }
}
export default frontChart;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Demo />, rootElement);
