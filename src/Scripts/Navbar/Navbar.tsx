import React from 'react'; 
import "./Navbar.css";
import { TextField, Button } from '@material-ui/core';

interface PassedProps{
    callback:any;
}
interface NavbarState{
    cityName:string;
    callback:any;
}
export class Navbar extends React.Component<PassedProps,NavbarState>{
    constructor(props:any){
        super(props);
        this.state = {
            cityName:"",
            callback:this.props.callback
        }
    }
    sendSearch = async () =>{
        console.log("Calling back");
        let cityName = this.state.cityName.split("");
        cityName[0] = cityName[0].toUpperCase();
        this.setState({cityName:cityName.join("")})
        this.state.callback(cityName.join(""));
    }
    changeCityValue = (e:any) =>{
        this.setState({
            cityName: e.target.value
        })
    }
    render(){
        return (
            <div className="navbar">
                <div className="form-input-control">
                    <TextField value={this.state.cityName} onChange={this.changeCityValue} id="standard-basic" label="Search City" inputProps={{'aria-label':'description'}} />
                </div>
                <div className="form-input-control">
                     <Button variant="contained" color="primary" onClick={() => this.sendSearch()}>Search</Button>
                </div>
            </div>
        )
    }
}