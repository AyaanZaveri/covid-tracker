import React, { useEffect, useState } from "react";
import Flag from "react-world-flags";
import axios from "axios";

const CountryPicker = () => {
  const [countryPickerData, setCountryPickerData] = useState([]);
  const [countryPicked, setCountryPicked] = useState("");

  const getCountryPickerData = () =>
    axios("https://disease.sh/v3/covid-19/countries")
      .then((response) => {
        setCountryPickerData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  useEffect(() => {
    getCountryPickerData();
  }, []);

  return (
    <div className="mt-7">
      <span className="flex justify-center text-slate-800 font-bold text-4xl">Countries</span>
      <div className="flex flex-row flex-wrap justify-center gap-8 mt-7">
        {countryPickerData.map((country) => (
          <button className="flex flex-col items-center justify-center space-y-4 w-36 h-36 bg-white hover:bg-slate-50 shadow-sm border rounded-lg transition">
            <Flag
              code={country.countryInfo.iso2}
              className="w-16 h-auto rounded-md opacity-80 shadow-lg"
            />
            <span className="font-semibold text-slate-800">{country.country}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountryPicker;
