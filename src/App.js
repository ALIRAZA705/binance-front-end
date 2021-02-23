
  
import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Table from './Table'
// const coinNames=["DREPBTC","NAVBTC","SKYBTC","DODOBTC"]


const coinNames=["DREP/BTC","NAV/BTC","SKY/BTC","DODO/BTC"]





class App extends Component {

  // ##################################
  constructor() {
    super();

    // Initializing client state variables
    this.state = {
      Client_details: [],
      isLoading: false,
      daysPeriod: 'day',
      CoinPercentage:[],
      loading:true,
    }
    this.getCompaniesData = this.getCompaniesData.bind(this)
    this.getDataAsync = this.getDataAsync.bind(this)
    // this.getCoinData = this.getCoinData.bind(this)

  }

  // ##################################
  //Api call to get client data
  async getDataAsync() {
  
    let request=[]
    let response=[]
    let data=[]
    let coinLatestPrice=[]
    // for (var i=0;i<=coinNames.length-1 ;i++)
    // {
// console.log("coin name of btc",coinNames[i])
    
   request = 'http://localhost:3001/binance'

    console.log("request of login task:", request);

    // Api call method configuration
    let details = {
      method: 'GET',
    }

    response = await fetch(request, details)
    data = await response.json()
    console.log("request of login task:", data);

    // coinLatestPrice.push({coinNmae:coinNames[i],averageDuration:data[i].mins,averagePrice:data[i].price})
    // console.log("request of login task:", coinLatestPrice);

    // return data;
  // }
return data;
  }
  // ##################################
  // Get data based upon the interval/period selected
  getCompaniesData() {
    // let data=getTapiData()
		let difference=[]
		let array=[]
    let perdifference;
		let name2;
    let FinalOutput=[]
    try {
      this.getDataAsync()
        .then(data => {
          // if(data.length>0)
          // {
        console.log("true if ")
        
        console.log("Client Data Received get: ", Object.keys(data))

          
        Object.keys(data).map((coin)=>{
console.log("coin name ",data[coin])
        difference=data[coin]["avgPrice"]-data[coin]["bollMiddle"];
        
        perdifference=(difference/data[coin]["bollMiddle"])*100;
        console.log(`percentage differnece in ${coin}`,perdifference)
        FinalOutput.push({Coin:coin,CurrentPrice:data[coin]["avgPrice"],BolingerAverage:data[coin]["bollMiddle"],Percentage:perdifference})
        console.log(`percentage differnece in of : ${coin}`,FinalOutput)



        });
        this.setState({
          loading:false,
          CoinPercentage:FinalOutput},()=>{console.log("final output of coin ",this.state.CoinPercentage)})
            // console.log("avergae price :",element[k].averagePrice,data[k].valueMiddleBand)
        // difference=data[name2]["avgPrice"]-data[name2]["bollMiddle"];
        // console.log("avergae price :",difference,data[name2]["avgPrice"],data[name2]["bollMiddle"])
        // perdifference=(difference/data[k].valueMiddleBand)*100;
        // console.log(`percentage differnece in ${ coinNames[k]}`,element[k].averagePrice,data[k].valueMiddleBand)
        // array.push({coin:coinNames[k],avgDifference:perdifference})
        
        // }
        
        });
    }
    catch (e) {
      console.log("Data Not Returned: ", e)
     
    }
  }

 
  // ##################################
  // Function to pre-set day as period on start-up
  componentDidMount() {
 
      this.getCompaniesData()
      // this.setState({loading:false});
    
  }



  // ##################################  
  // Function to render component template
  render() {
    return (
      <div >
       <button onClick={this.getCompaniesData}>Get Binanace Data</button>
      {this.state.loading==false? <Table dataapi={this.state.CoinPercentage}/> : "data is loading from Api or Limit Exceeds"} 
     </div>
    );
  }
}
export default App;
