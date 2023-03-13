import { Card } from "antd";
import { FC } from "react";
import "./WeatherToday.css";

interface WeatherTodayProps {
  time: string,
  temp_c: number,
  condition: {text: string, icon: string}
}

const WeatherToday: FC<WeatherTodayProps> = (props: WeatherTodayProps) => (
  <Card
    className="hourly-card"
    title={props.time}
    bordered={false}
    style={{ width: 300, height: 200 }}
  >
    <div className="hourly-card-content">
      <div className="hourly-card-temp">
        <p>{Math.round(props.temp_c)} °C</p>
      </div>
      <div className="hourly-card-condition">
        <p>{props.condition?.text}</p>
        <p>
          <img src={props.condition?.icon} />
        </p>
      </div>
    </div>
  </Card>
);

export default WeatherToday;
