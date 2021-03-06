import React from 'react'; 
import './ForecastTable.css';
import { forecastWeather, weatherGeneral } from '../../../Typings/Weather';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import { ForecastDay } from './ForecastDay/ForecastDay';


interface WeatherState{
    data:Array<forecastWeather>;
    staticUrl:string;
    selectedDay:boolean;
    selectedData:Array<weatherGeneral>;
}

interface PassedProps extends React.Props<any>{
    data:Array<forecastWeather>
}
export class ForecastTable extends React.Component<PassedProps,WeatherState>{
    constructor(props:any){
        super(props);
        this.state = {
            data:[],
            staticUrl:'https://openweathermap.org/img/wn',
            selectedDay:false,
            selectedData:[]
        }
    };

    componentDidMount = () => {
    };

    componentDidUpdate = (prevProps:any) =>{
        if(prevProps.data !== this.props.data){
            console.log(this.props.data);
            this.setState({data:this.props.data})
        }
    }

    setDay = (dayData:forecastWeather) => {
        this.setState({
            selectedData:dayData.daily,
            selectedDay:!this.state.selectedDay
        })
    }

    renderTable:any = () =>{
        return this.state.data.map((r,i)=>{
            return (
                <Grid container 
                      alignItems="center" 
                      direction="row" 
                      justify="space-around" 
                      lg={2} 
                      md={4} 
                      className="forecastIndiv" 
                      key={i}
                      onClick={()=>{this.setDay(r)}}>
                    <Grid item lg={12} md={6} className="forecastLarge">{moment(r.date).format('MM/DD')}</Grid>
                    <Grid item lg={3} md={6}></Grid>
                    <Grid item lg={3} md={6} className="forecastLarge">{r.temp}&deg;C</Grid>
                    <Grid item lg={3} md={6} className="forecastIcon"><img alt="" src={`${this.state.staticUrl}/${r.icon}@2x.png`} /></Grid>
                    <Grid item lg={3} md={6} ></Grid>
                    <Grid item lg={6} md={12} className="forecastTempMax">{`High: ${r.maxTemp}`}&deg; C</Grid>
                    <Grid item lg={6} md={12} className='forecastTempMin'>{`Low: ${r.minTemp}`}&deg; C</Grid>
                </Grid>
            )
        })
    }

    render(){
        return(
            <div className="futureWeather-div">
                <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={1} className="forecastTable">{this.renderTable()}</Grid>
                <ForecastDay data={this.state.selectedData}></ForecastDay>
            </div>
        )
    }
}