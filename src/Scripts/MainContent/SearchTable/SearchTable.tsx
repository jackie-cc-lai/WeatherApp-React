import React from 'react'; 
import './SearchTable.css';
import { forecastWeather } from '../../../Typings/Weather';
import moment from 'moment';
import { Grid } from '@material-ui/core';


interface SearchState{
    data:Array<any>;
    selectAll:boolean;
}

interface PassedProps extends React.Props<any>{
    data:Array<any>,
    callback:any
}
export class SearchTable extends React.Component<PassedProps,SearchState>{
    constructor(props:any){
        super(props);
        this.state = {
            data:this.props.data,
            selectAll:false
        }
        console.log(this.state.data);
    };

    componentDidMount = () => {
    };

    componentDidUpdate = (prevProps:any) =>{
    }

    selectCity = async (city:any) =>{
        await this.props.callback(city);
    }
    addCity = async (city:any) =>{
        console.log(city);
        let cities = this.state.data;
        let citiesFound = cities.find(r=>r.id == city.id);
        citiesFound.isSelected = !citiesFound.isSelected;
        this.setState({data:cities});
    }

    selectAll = async () =>{
        
        let cities = this.state.data;
        cities.forEach((c)=>{
            c.isChecked = !this.state.selectAll;
        })
        this.setState({data:cities, selectAll:!this.state.selectAll});
    }

    renderTable:any = () =>{
        return this.state.data.map((r,i)=>{
            return (
                <Grid container alignItems="center" direction="row" justify="space-around" lg={12} md={12} xs={12} className="searchIndiv" key={i}>
                    <Grid item lg={12} xs={12} onClick={()=>{this.selectCity(r)}}>
                        {`${r.name}${r.state ? ',' : ''} ${r.state}, ${r.country}`}
                    </Grid>
                </Grid>
            )
        })
    }

    render(){
        return(
            <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={1} className="forecastTable">
                <Grid item lg={12} xs={12}>
                    <input type="checkbox" onClick={()=>{this.selectAll()}} />
                </Grid>
                {this.renderTable()}
            </Grid>
        )
    }
}