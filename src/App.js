import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';
import { useState, useEffect } from 'react'
import InfoBox from './InfoBox'
import Map from './Map'

function App() {
  
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState('WorldWide');
  const [countryInfo,setCountryInfo] = useState({});

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

  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;
    
    const url =  countryCode === 'WorldWide' ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url).then((response)=>response.json()).
    then((data) =>{
      setCountry(countryCode);
      setCountryInfo(data);
    })

  }

  useEffect(()=>{
    getCountriesData();
  },[])

  useEffect(async()=>{
    await fetch('https://disease.sh/v3/covid-19/all')
    .then((response)=>response.json())
    .then((data) =>{
      setCountryInfo(data);
    })
  },[])
  


  return (
    <div className="app">
      <div className="app__left">
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
          <InfoBox title="Coronavirus Cases" total={countryInfo.todayCases} cases={countryInfo.cases}/>
          <InfoBox title="Recoverd" total={countryInfo.todayRecovered} cases={countryInfo.recovered}/>
          <InfoBox title="Death" total={countryInfo.todayDeaths} cases={countryInfo.deaths}/>
        </div>

        <Map/>
      </div>

      <Card className="app_right">
          <CardContent>
            <h3>Live Cases by country</h3>
            <h3>World wide new cases</h3>
          </CardContent>
      </Card>

    </div>
  );
}

export default App;
