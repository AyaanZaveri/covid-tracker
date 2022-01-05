import React, { useState } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import Flag from "react-world-flags";
import { Line } from "react-chartjs-2";
import CountryPicker from "../components/CountryPicker";

const Index = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [search, setSearch] = useState("");

  const getData = () =>
    axios(
      `https://disease.sh/v3/covid-19/countries/${search.toLowerCase()}?strict=true`
    )
      .then((response) => {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  const getChartData = () =>
    axios(
      `https://disease.sh/v3/covid-19/historical/${search.toLowerCase()}?lastdays=30`
    )
      .then((response) => {
        setChartData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
    getChartData();
  };

  let labels = [];
  let dataY = [];

  if (chartData.timeline) {
    [chartData].map((item) =>
      Object.keys(item.timeline.cases).map((key) => labels.push(key))
    );
  }

  if (chartData.timeline) {
    [chartData].map((item) =>
      Object.keys(item.timeline.cases).map((key) =>
        dataY.push(item.timeline.cases[key])
      )
    );
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="flex flex-col">
      <Nav search={search} setSearch={setSearch} handleSubmit={handleSubmit} />
      {!data.country ? <CountryPicker/> : null}
      {data.country ? (
        <div className="flex flex-col gap-y-3 items-start justify-start p-8">
          <div className="flex flex-row space-x-2 justify-start items-baseline">
            <span className="inline-flex items-center gap-x-2 text-4xl font-bold text-slate-800">
              {data.country}
            </span>
            <Flag
              code={data.countryInfo.iso2}
              className="w-12 h-auto rounded-sm opacity-80"
            />
          </div>
          <div className="flex flex-col gap-y-3 mt-2">
            <span
              className="inline-flex items-end md:text-6xl text-4xl font-bold text-slate-800"
            > {numberWithCommas(data.cases)}
              <span className="text-2xl font-semibold text-slate-600 ml-1">
                cases
              </span>
            </span>

            {[
              {
                value: data.deaths,
                label: "deaths",
              },
              {
                value: data.todayCases,
                label: "cases today",
              },
              {
                value: data.todayDeaths,
                label: "deaths today",
              },
            ].map((value, index) => (
              <span
                key={index}
                className="inline-flex items-end text-3xl font-bold text-slate-800"
              >
                <span>{numberWithCommas(value.value)}</span>
                <span className="text-xl font-semibold text-slate-600 ml-1">
                  {value.label}
                </span>
              </span>
            ))}
          </div>
          <div className="md:w-1/2 w-full mt-5">
            <span className="text-slate-800 font-bold md:text-4xl text-3xl">
              Cases
            </span>
            {data.country ? (
              <Line
              className="mt-3 p-3 border rounded-lg shadow-2xl"
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: `${data.country} Cases`,
                      lineTension: 0.1,
                      data: dataY,
                      responsive: true,
                      pointRadius: 1,
                      backgroundColor: "#1e293b",
                      borderColor: "#1e293b",
                    },
                  ],
                }}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Index;
