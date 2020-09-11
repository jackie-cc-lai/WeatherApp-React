import React from 'react'; 
import "./Main.css";
import { ServiceParams } from '../../Typings/Params';
import { http } from "../../Service/ExternalService";
import { CurrentWeather } from './CurrentWeather/CurrentWeather';
import { weatherInfo } from '../../Typings/Weather';
import { ForecastTable } from './ForecastTable/ForecastTable';
import { SearchTable } from './SearchTable/SearchTable';

interface MainState{
    data:weatherInfo, 
    city:string, 
    service?:http,
    citySearch?:Array<any>
}
interface PassedProps extends React.Props<any>{
    cityName:string
}
export class Main extends React.Component<PassedProps,MainState>{
    constructor(props:any){
        super(props);
        this.state = {
            data:{} as any,
            city:''
        }
    }

    componentDidMount = async () =>{
        await this.setService();
        await this.getData(6167865);
    }
    componentDidUpdate = async (prevProps:any) =>{
        if(prevProps.cityName != this.props.cityName){
            this.setState({city:this.props.cityName});
            const params:ServiceParams = {
                method:"Get",
                url:`api/Weather/GetCity?name=${this.props.cityName}`
            }
            console.log(params);
            let cityData = await this.state.service?.Get(params);
            this.setState({citySearch:cityData})
        }
    }

    setService = async () =>{
        let service = new http();
        this.setState({service:service});
    }

    getData = async (cityId:number) =>{
        const params: ServiceParams = {
            url: 'api/Weather',
            body:{
                cityId:cityId,
                method:"GetWeather"

            },
            method:"Post"
        }
        let data = await this.state.service?.Get(params) as unknown as weatherInfo;
        this.setState({data:data});
        console.log(this.state.data);
    }
    selectCity = async (city:any) =>{
        console.log(city);
        let data = await this.getData(city.id);
        this.setState({citySearch:[], city:city.name});
    }

    renderContent = () =>{
        if(this.state.citySearch && this.state.citySearch.length > 0){
            return(
                <div className="main">
                    <SearchTable data={this.state.citySearch} callback={this.selectCity}></SearchTable>
                </div>
            )
        }else{
            console.log("Hello!");
            return(
                <div className="main">
                    <CurrentWeather data={this.state.data.currentWeather}></CurrentWeather>
                    <ForecastTable data={this.state.data.forecastWeather}></ForecastTable>
                </div>
            )
        }
    }
    render(){
        return this.renderContent()
    }
}