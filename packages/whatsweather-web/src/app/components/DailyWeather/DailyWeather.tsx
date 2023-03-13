import { Card } from "antd";
import React, { FC } from "react";
import "./DailyWeather.css";

interface DailyWeatherProps {
  date: string,
  maxtemp_c: number,
  mintemp_c: number,
  condition: {text: string, icon: string}
}

const DailyWeather: FC<DailyWeatherProps> = (props: DailyWeatherProps) => (
  <Card
    className="hourly-card"
    title={props.date}
    bordered={false}
    style={{ width: 300, height: 200 }}
  >
    <div className="hourly-card-content">
      <div className="hourly-card-temp">
        <p style={{ borderBottom: "1px solid #f0f0f0" }}>
          {Math.round(props.maxtemp_c)} °C
        </p>
        <p>{Math.round(props.mintemp_c)} °C</p>
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

export default DailyWeather;
