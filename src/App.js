import { FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';
import { useState, useEffect } from 'react'
import InfoBox from './InfoBox'

function App() {
  
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState('WorldWide');

  const getCountriesData = async ()=>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response)=>response.json())
      .then((data)=>{
        const contries = data.map((country)=>(
          {
            name: country.country,
            value: country.countryInfo.iso2,
          }
        ));
        setCountries(contries);
      })

  }

  const onCountryChange = (event)=>{
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  useEffect(()=>{
    getCountriesData();
  },[])

  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid 19 Tracker</h1>
        <FormControl>
          <Select
            onChange={onCountryChange}
            variant="outlined"
            value={country}
          >
            <MenuItem value="WorldWide">WorldWide</MenuItem>
            {
              countries.map((country)=>
                <MenuItem value={country.value}>{country.name}</MenuItem>
              )
            }
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" total="202" cases="11"/>
        <InfoBox title="Recoverd" total="100" cases="12"/>
        <InfoBox title="Death" total="41" cases="11"/>
      </div>

      
    </div>
  );
}

export default App;
