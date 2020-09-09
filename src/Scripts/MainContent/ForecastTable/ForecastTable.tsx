import React from 'react'; 
import './ForecastTable.css';
import { forecastWeather } from '../../../Typings/Weather';
import moment from 'moment';

interface WeatherState{
    data:Array<forecastWeather>;
    staticUrl:string;
}

interface PassedProps extends React.Props<any>{
    data:Array<forecastWeather>
}
export class ForecastTable extends React.Component<PassedProps,WeatherState>{
    constructor(props:any){
        super(props);
        this.state = {
            data:[],
            staticUrl:'https://openweathermap.org/img/wn'
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

    renderTable:any = () =>{
        return this.state.data.map((r,i)=>{
            return (
                <div className="forecastIndiv" key={i}>
                    <div className="forecastDate">{moment(r.date).format('MM/DD')}</div>
                    <div className="forecastTemp">{r.temp}</div>
                    <div className="forecastIcon"><img alt="" src={`${this.state.staticUrl}/${r.icon}@2x.png`} /></div>
                    <div className="forecastTempMax">{`High: ${r.maxTemp}`}</div>
                    <div className='forecastTempMin'>{`Low: ${r.minTemp}`}</div>
                </div>
            )
        })
    }

    render(){
        return(
            <div className="forecastTable">{this.renderTable()}</div>
        )
    }
}