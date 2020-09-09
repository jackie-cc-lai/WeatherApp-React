import React from 'react'; 
import './App.css';
import {Main} from "./Scripts/MainContent/Main";
import { Navbar } from './Scripts/Navbar/Navbar';

interface AppState{
  name:string;
}
class App extends React.Component<{}, AppState> {
  constructor(props:any){
    super(props);
    this.state = {
      name:'Toronto'
    }
  }
  onCitySelect(cityName:string){
    console.log(cityName);
    this.setState({name:cityName});
  }

  render(){
    return (
      <div className="App">
        <Navbar callback={this.onCitySelect.bind(this)}></Navbar>
        <Main cityName={this.state.name}></Main>
      </div>
    );
  }
  
}

export default App;
