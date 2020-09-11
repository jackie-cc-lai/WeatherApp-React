import React from 'react'; 
import './CurrentWeather.css';
import { currentWeather } from '../../../Typings/Weather';
import moment from 'moment';
import { Grid } from '@material-ui/core';

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
            <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={1} className={`weather-header ${this.state.background}`}>
                <Grid item xs={4}></Grid>
                <Grid item xs={2} className="Grid-info">
                    <Grid className="weather-icon">
                        <img alt="" src={`${this.state.staticUrl}/${this.state.icon}@4x.png`}/>
                    </Grid>
                </Grid>
                <Grid item xs={2} className="Grid-info">
                    <Grid className="weather-temp">
                        {this.state.temp} &deg;C
                    </Grid>
                    <Grid className="weather-wind">
                        {`${this.state.wind}km/h ${this.state.direction}`} 
                    </Grid>
                    <Grid className="weather-sun">
                        {`Sunrise: ${this.state.sunrise}`}<br/>
                        {`Sunset: ${this.state.sunset}`}
                    </Grid>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        )
    }
}