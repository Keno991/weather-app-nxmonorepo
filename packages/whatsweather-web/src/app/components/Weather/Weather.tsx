import { Form, Button, Input, Card, Select } from "antd";
import { Option } from "antd/es/mentions";
import axios, { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { DailyWeatherDto } from '@whatsweather/dtos'

import WeatherToday from "../WeatherToday/WeatherToday.lazy";
import DailyWeather from "../DailyWeather/DailyWeather.lazy";

import "./Weather.css";

interface WeatherProps {}

const Weather: FC<WeatherProps> = () => {
  const [data, setData] = useState([] as any);
  const [location, setLocation] = useState({} as any);
  const [day, setDay] = useState({} as any);
  const [days, setDays] = useState("1");
  const [isMultipleDays, setIsMultipleDays] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getData();
  }, []);

  const getData = async (city?: string) => {
    const {
      data: {
        result: { forecast, location },
      },
    } = (await axios.get(
      `http://localhost:3000/api/v1/weather/daily/${city ?? "sarajevo"}/${days}`
    )) as AxiosResponse<{result: DailyWeatherDto}>;

    setLocation(location);
    setDay(forecast.forecastday[0]?.day);
    setIsMultipleDays(forecast.forecastday.length > 1);
    setData(
      forecast.forecastday.length > 1
        ? forecast.forecastday?.map((fd: any) => {
            const today = new Date(fd.date);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();

            const formattedToday = dd + "." + mm + "." + yyyy;

            fd.date = formattedToday;
            return fd;
          })
        : forecast.forecastday[0].hour
            ?.filter(
              (h: any) => new Date(h.time).getTime() >= new Date().getTime()
            )
            ?.map((h: any) => {
              const time = new Date(h.time);
              h.time = time.toLocaleString("en-US", {
                hour: "numeric",
                hour12: true,
              });
              return h;
            })
    );
  };

  return (
    <div className="WeatherToday">
      <div className="flex">
        <Form
          layout={isMobile ? "vertical" : "inline"}
          form={form}
          onFinish={(data) => getData(data.city)}
        >
          <Form.Item
            label="city"
            name="city"
            rules={[{ required: true, message: "Please enter city" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="days"
            name="days"
            rules={[{ required: true, message: "Please select days" }]}
          >
            <Select defaultValue="1" style={{ width: 120 }} onChange={setDays}>
              <Option value="1">1</Option>
              <Option value="3">3</Option>
              <Option value="7">7</Option>
              <Option value="15">15</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              What's the Weather?
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="flex">
        {!isMobile && (
          <div className="location-weather">
            <Card
              title={`${location.name}, ${location.country}`}
              bordered={false}
              style={{ width: 500, height: 300 }}
            >
              <div className="daily-card-content">
                <div className="daily-card-temp">
                  <p>average temp: {Math.round(day.avgtemp_c)}°C</p>
                  <p style={{ borderBottom: "1px solid #f0f0f0" }}>
                    humidity: {day.avghumidity}%
                  </p>
                  <p>sunrise: {day.sunrise}</p>
                  <p>sunset: {day.sunset}</p>
                </div>
                <div className="daily-card-condition">
                  <p>{day.condition?.text}</p>
                  <p>
                    <img src={day.condition?.icon} />
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
        <div className="hourly-weather">
          {isMultipleDays
            ? data.map((forecastDay: any) => (
                <DailyWeather
                  {...forecastDay.day}
                  date={forecastDay.date}
                ></DailyWeather>
              ))
            : data.map((hour: any) => <WeatherToday {...hour}></WeatherToday>)}
        </div>
      </div>
    </div>
  );
};

export default Weather;
