import React from 'react'; 
import "./Main.css";
import { ServiceParams } from '../../Typings/Params';
import { http } from "../../Service/ExternalService";
import { CurrentWeather } from './CurrentWeather/CurrentWeather';

interface MainState{
    data:Array<any>, 
    city:string, 
    service?:http
}

export class Main extends React.Component<{},MainState>{
    constructor(props:any){
        super(props);
        console.log("Hello");
        this.state = {
            data:[],
            city:''
        }
    }

    componentDidMount = async () =>{
        let service = new http();
        this.setState({service:service});
    }

    getData = async (city:string) =>{
        let params : ServiceParams = {
            method:"Get",
            url:`/Weather/Search/${city}`
            
        }
        let data = await this.state.service?.Get(params);
        this.setState({data:data});
    }

    render(){
        return(
            <div className="main">
                <CurrentWeather></CurrentWeather>
            </div>
        )
    }
}