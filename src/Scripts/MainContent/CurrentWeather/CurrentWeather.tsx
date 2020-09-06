import React, { Component } from 'react'; 
import './CurrentWeather.css';

interface WeatherState{
    icon:string;
    background:string;
    temp:number;
    wind:number;
    direction:number;
    staticUrl:string;
}
export class CurrentWeather extends React.Component<{},WeatherState>{
    constructor(props:any){
        super(props);
        this.state = {
            icon:'04n',
            background:'background-dark-blue',
            temp:20,
            wind:20,
            direction:0,
            staticUrl:'https://openweathermap.org/img/wn'
        }
    }

    render(){
        return(
            <div className={`weather-header ${this.state.background}`}>
                <div className="div-info">
                    <div className="weather-icon">
                        <img src={`${this.state.staticUrl}/${this.state.icon}@4x.png`}/>
                    </div>
                </div>
                <div className="div-info">
                    <div className="weather-temp">
                        {this.state.temp} &deg;C
                    </div>
                    <div className="weather-wind">
                        {`${this.state.wind} kph at ${this.state.direction}`} 
                    </div>
                </div>
            </div>
        )
    }
}