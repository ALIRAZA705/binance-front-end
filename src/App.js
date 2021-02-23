

import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const coinNames = ["DREP/BTC", "NAV/BTC", "SKY/BTC", "DODO/BTC"]

function TableData(props) {
  console.log("CCCC", props.data)
  if (props.data) {
    return (
      <div>
        {
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">BBands Average</TableCell>
                <TableCell align="right">%</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(props.data).map((item, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {props.data[item].Coin}
                  </TableCell>
                  <TableCell align="right">{parseFloat(props.data[item].CurrentPrice).toFixed(8)}</TableCell>
                  <TableCell align="right">{parseFloat(props.data[item].BolingerAverage).toFixed(8)}</TableCell>
                  <TableCell align="right">{parseFloat(props.data[item].Percentage).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          // <Button key={i}
          //   href={props.this.state.user.social[item].link.includes("http") ? props.this.state.user.social[item].link : "https://" + props.this.state.user.social[item].link}
          //   target="_blank" size="sm"
          //   className={socialPlatformClassA(props.this.state.user.social[item].platform)}>
          //   <i className={socialPlatformClassB(props.this.state.user.social[item].platform)}></i><span>{props.this.state.user.social[item].platform}</span>
          // </Button>
          // <Button size="sm" className="btn-facebook btn-brand mr-1 mb-1"><i className="fa fa-facebook"></i><span>Facebook</span></Button>

        }
      </div>
    )
  } else {
    return (
      <div>
        <p>
          No Data
        </p>
      </div>
    )
  }

}



class App extends Component {
  constructor() {
    super();
    this.state = {
      Client_details: [],
      isLoading: false,
      daysPeriod: 'day',
      CoinPercentage: [],
      loading: true,
    }
    this.getCompaniesData = this.getCompaniesData.bind(this)
    this.getDataAsync = this.getDataAsync.bind(this)
  }

  async getDataAsync() {
    let request = []
    let response = []
    let data = []
    let coinLatestPrice = []

    request = 'http://localhost:3001/binance'
    let details = {
      method: 'GET',
    }
    response = await fetch(request, details)
    data = await response.json()
    return data;
  }

  getCompaniesData() {
    let difference = []
    let array = []
    let perdifference;
    let name2;
    let FinalOutput = []
    try {
      this.getDataAsync()
        .then(data => {
          // console.log("AAAA", Object.keys(data))


          Object.keys(data).map((coin) => {
            console.log("coin name ", data[coin])
            difference = data[coin]["avgPrice"] - data[coin]["bollMiddle"];

            perdifference = (difference / data[coin]["bollMiddle"]) * 100;
            console.log(`percentage differnece in ${coin}`, perdifference)
            FinalOutput.push({ Coin: coin, CurrentPrice: data[coin]["avgPrice"], BolingerAverage: data[coin]["bollMiddle"], Percentage: perdifference })
            console.log(`BBBB`, FinalOutput)



          });
          this.setState({
            loading: false,
            CoinPercentage: FinalOutput
          }, () => { console.log("final output of coin ", this.state.CoinPercentage) })
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

  componentDidMount() {
    this.getCompaniesData()
  }

  render() {
    return (
      <div >
        <button onClick={this.getCompaniesData}>Get Data</button>
        <TableData data={this.state.CoinPercentage} />
      </div>
    );
  }
}
export default App;
