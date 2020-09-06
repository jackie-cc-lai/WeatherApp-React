import React from 'react'; 
import './App.css';
import {Main} from "./Scripts/MainContent/Main";
import { Navbar } from './Scripts/Navbar/Navbar';

class App extends React.Component {
  constructor(props:any){
    super(props);
    this.state = {
      
    }
  }
  render(){
    return (
      <div className="App">
        <Navbar></Navbar>
        <Main></Main>
      </div>
    );
  }
  
}

export default App;
