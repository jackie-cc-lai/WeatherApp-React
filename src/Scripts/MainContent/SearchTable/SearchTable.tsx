import React from 'react'; 
import './SearchTable.css';
import { forecastWeather } from '../../../Typings/Weather';
import moment from 'moment';
import { Grid } from '@material-ui/core';


interface SearchState{
    data:Array<any>;
}

interface PassedProps extends React.Props<any>{
    data:Array<any>,
    callback:any
}
export class SearchTable extends React.Component<PassedProps,SearchState>{
    constructor(props:any){
        super(props);
        this.state = {
            data:this.props.data
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

    renderTable:any = () =>{
        return this.state.data.map((r,i)=>{
            return (
                <Grid item alignItems="center" direction="row" justify="space-around" lg={12} md={12} xs={12} className="searchIndiv" key={i}>
                    <div onClick={()=>{this.selectCity(r)}}>
                        {`${r.name}${r.state ? ',' : ''} ${r.state}, ${r.country}`}
                    </div>
                </Grid>
            )
        })
    }

    render(){
        return(
            <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={1} className="forecastTable">{this.renderTable()}</Grid>
        )
    }
}