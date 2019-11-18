import React, {Component} from 'react';
import './App.css';
import Form from './Form.js'
import ReactDOM from 'react-dom';

const API_KEY = "c59cde06ad0bf67173d304612d8fc65c";
global.city_country = localStorage.getItem("city, country").split(";");
class App extends Component {
  constructor(props) {
  super(props);
  this.clearInput = this.clearInput.bind(this);

  }
  state = {
    city: undefined,
    date: [],
    temp_max: [],
    temp_min: [],
    humidity: [],
    weather_ID: [],
    weather_Description: []        
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value + "," + e.target.elements.country.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (city && country) {
      this.setState({
        city: data.city.name,
        date: [data.list[0].dt_txt.split(" ", 1).toString(),
               data.list[9].dt_txt.split(" ", 1).toString(),
               data.list[16].dt_txt.split(" ", 1).toString(),
               data.list[23].dt_txt.split(" ", 1).toString(),
               data.list[31].dt_txt.split(" ", 1).toString()],
        temp_max: [data.list[0].main.temp_max,
                   data.list[9].main.temp_max,
                   data.list[16].main.temp_max,
                   data.list[23].main.temp_max,
                   data.list[31].main.temp_max],
        temp_min: [data.list[0].main.temp_min,
                   data.list[9].main.temp_min,
                   data.list[16].main.temp_min,
                   data.list[23].main.temp_min,
                   data.list[31].main.temp_min],
        humidity: [data.list[0].main.humidity,
                   data.list[9].main.humidity,
                   data.list[16].main.humidity,
                   data.list[23].main.humidity,
                   data.list[31].main.humidity],
        weather_ID: [data.list[0].weather[0].icon,
                     data.list[9].weather[0].icon,
                     data.list[16].weather[0].icon,
                     data.list[23].weather[0].icon,
                     data.list[31].weather[0].icon],
        weather_Description: [data.list[0].weather[0].description,
                              data.list[9].weather[0].description,
                              data.list[16].weather[0].description,
                              data.list[23].weather[0].description,
                              data.list[31].weather[0].description]                     
      })
     if (localStorage.getItem('city, country') != "") {
        let city_country = localStorage.getItem('city, country');
        localStorage.setItem('city, country', city + ";" +city_country);        
     }
     else {
        localStorage.setItem('city, country', city);
     }
    }
    console.log(data);

  }

  clearInput() {
    console.log(global.city_country[0]);
    let city= global.city_country[0].split(",");
    ReactDOM.findDOMNode(this.refs.city).value = city[0];
    ReactDOM.findDOMNode(this.refs.country).value = city[1];
 }


  render() {
    const url = ["http://openweathermap.org/img/w/" + this.state.weather_ID[0] + ".png",
                 "http://openweathermap.org/img/w/" + this.state.weather_ID[1] + ".png",
                 "http://openweathermap.org/img/w/" + this.state.weather_ID[2] + ".png",
                 "http://openweathermap.org/img/w/" + this.state.weather_ID[3] + ".png",
                 "http://openweathermap.org/img/w/" + this.state.weather_ID[4] + ".png"];
    let city_country = localStorage.getItem("city, country").split(";");
    //<Form getWeather = {this.getWeather}/>
    return (
      <div class = "container">
        <h1>Weather Forecast</h1>
        <div class = "container">
        <form class ="form-horizontal" onSubmit = {this.getWeather}>
        
        <div class="form-group">
          <label class="control-label col-sm-2" for="pwd">Enter City name:</label>
          <div class="col-sm-5">          
            <input type="text" class="form-control" ref = "city" id="city" placeholder="Enter City name" name="city"/>
          </div>
        </div>
        <div class="form-group">
        <label class="control-label col-sm-2" for="pwd">Enter Country code:</label>
          <div class="col-sm-5">          
            <input type="text" class="form-control" ref = "country" id="country" placeholder="Enter Country name" name="country"/>
          </div>

        </div>
        <div class="form-group">        
          <div class="col-sm-offset-2 col-sm-5">
            <button type="submit" class="btn btn-default">Submit</button>
          </div>
        </div>
      </form>
      </div>
        <div class = "container">
          <table class="table table-darktable table-dark table-striped">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"><img src = {url[0]} alt = ""/></th>
                <th scope="col"><img src = {url[1]} alt = ""/></th>
                <th scope="col"><img src = {url[2]} alt = ""/></th>
                <th scope="col"><img src = {url[3]} alt = ""/></th>
                <th scope="col"><img src = {url[4]} alt = ""/></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Date</th>
                <td>{this.state.date[0]}</td>
                <td>{this.state.date[1]}</td>
                <td>{this.state.date[2]}</td>
                <td>{this.state.date[3]}</td>
                <td>{this.state.date[4]}</td>
              </tr>
              <tr>
                <th scope="row">Forecast</th>
                <td>{this.state.weather_Description[0]}</td>
                <td>{this.state.weather_Description[1]}</td>
                <td>{this.state.weather_Description[2]}</td>
                <td>{this.state.weather_Description[3]}</td>
                <td>{this.state.weather_Description[4]}</td>
              </tr>
              <tr>
                <th scope="row">Max Temperature</th>
                <td>{this.state.temp_max[0]}</td>
                <td>{this.state.temp_max[1]}</td>
                <td>{this.state.temp_max[2]}</td>
                <td>{this.state.temp_max[3]}</td>
                <td>{this.state.temp_max[4]}</td>
              </tr>
              <tr>
                <th scope="row">Min Temperature</th>
                <td>{this.state.temp_min[0]}</td>
                <td>{this.state.temp_min[1]}</td>
                <td>{this.state.temp_min[2]}</td>
                <td>{this.state.temp_min[3]}</td>
                <td>{this.state.temp_min[4]}</td>
                </tr>
              <tr>
                <th scope="row">Humidity (in %)</th>
                <td>{this.state.humidity[0]}</td>
                <td>{this.state.humidity[1]}</td>
                <td>{this.state.humidity[2]}</td>
                <td>{this.state.humidity[3]}</td>
                <td>{this.state.humidity[4]}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class = "container">
          <h3>Previous Search</h3>
          <button onClick = {this.clearInput} class="btn btn-default">{city_country[0]}</button>
          <h3>Search history </h3>    
            {city_country.join(' | ')}
        </div>
      </div>
    );
  }

}

export default App;
