import React from 'react'; 
import './CurrentWeather.css';
import { currentWeather } from '../../../Typings/Weather';
import moment from 'moment';

interface WeatherState{
    icon:string;
    background:string;
    temp:number;
    wind:number;
    direction:string;
    staticUrl:string;
    sunrise:string;
    sunset:string
}

interface PassedProps extends React.Props<any>{
    data:currentWeather
}
export class CurrentWeather extends React.Component<PassedProps,WeatherState>{
    constructor(props:any){
        super(props);
        this.state = {
            icon:'04n',
            background:'background-blank',
            temp:20,
            wind:20,
            direction:"N",
            staticUrl:'https://openweathermap.org/img/wn',
            sunrise:"",
            sunset:""
        }
    };

    componentDidMount = () => {
    };

    componentDidUpdate = (prevProps:any) =>{
        if(prevProps.data !== this.props.data){
            this.setState({icon:this.props.data.icon,
                temp:this.props.data.temp,
                wind:this.props.data.wind,
                direction:this.props.data.windDir,
                sunrise:moment(new Date(this.props.data.sunrise*1000)).format("hh:mm A"),
                sunset:moment(new Date(this.props.data.sunset*1000)).format("hh:mm A")
            })
        }
    }
    render(){
        return(
            <div className={`weather-header ${this.state.background}`}>
                <div className="div-info">
                    <div className="weather-icon">
                        <img alt="" src={`${this.state.staticUrl}/${this.state.icon}@4x.png`}/>
                    </div>
                </div>
                <div className="div-info">
                    <div className="weather-temp">
                        {this.state.temp} &deg;C
                    </div>
                    <div className="weather-wind">
                        {`${this.state.wind}km/h ${this.state.direction}`} 
                    </div>
                    <div className="weather-sun">
                        {`Sunrise: ${this.state.sunrise}`}<br/>
                        {`Sunset: ${this.state.sunset}`}
                    </div>
                </div>
            </div>
        )
    }
}