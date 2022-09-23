import React, {Component} from 'react';
import axios from 'axios';
import "./index.css"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      playerName: null,
      playerStats: {
        games_played: 0,
        pts: 0,
        reb:0,
        ast:0
      },
      year: null
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getPlayerID()
  }

  handleChange = (event,field) => {
    const replace = event.target.value.split(" ").join("_");
    if(replace.length > 0){
      this.setState({[field]: replace})
    }
  }

  getPlayerID = () =>{
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res =>{
      //console.log(res.data.data[0])
      if(res.data.data[0]===undefined){
        alert("This player does not exist")
      }else if(res.data.data.length > 1){
        alert("Please specify the name more")
      }else{
        await this.getPlayerStats(res.data.data[0].id)
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  getPlayerStats = (playerId) =>{
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${this.state.year}&player_ids[]=${playerId}`)
    .then(async res => {
      //console.log(res.data.data)
      if(res.data.data.length === 0){
        alert("This player did not play this year")
      }else{
        this.setState({playerStats: res.data.data[0]})
      }
    }).catch(err=> {
      console.log(err)
    })
  }

  render(){
  return (
    <div>
      <div>
        <form onSubmit={this.handleSubmit}>

          <label>
            Year:
            <input type="text" name="year" onChange={(event)=>this.handleChange(event, "year")} />
          </label>
          <br/>
          <label>
            Name:  
            <input type="text" name="playerName" onChange={(event)=>this.handleChange(event, "playerName")} />
          </label>

          <input type = "submit" value = "Submit"/>

        </form>
      </div>
        
        <br/>
        <div>
            {this.state.playerStats["games_played"]}
            {" "}GP
            <br />
            {this.state.playerStats["pts"]}
            {" "}PTS
            <br />
            {this.state.playerStats["reb"]}
            {" "}RBS
            <br />
            {this.state.playerStats["ast"]}
            {" "}AST
        </div>
    </div>
  );
}
}

export default App;
