import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';

let FinalOutput = []
const columns = [
    { field: 'Coin', width: 100 },
    { field: 'Percentage', type: 'number', width: 160 },
    { field: 'CurrentPrice', type: 'number', width: 160 },
    { field: 'BolingerAverage', type: 'number', width: 130, },
    
];

const sortModel = [
    {
        field: 'Percentage',
        sort: 'asc',
    },
];

export default function EnhancedTable() {

    const [data, setData] = React.useState([])
    const [smallCoins, setSmallCoins] = React.useState(true);

    React.useEffect(() => {
        setTimeout(getCompaniesData, 10000);
    }, [FinalOutput]);

    const handleChangeSmallCoins = (event) => {
        setSmallCoins(event.target.checked);
    };

    async function getDataAsync() {
        let request = []
        let response = []
        let data = []
        let coinLatestPrice = []
        // request = 'http://localhost:3001/data'
        request = 'https://trading-305915.df.r.appspot.com/data'
        let details = {
            method: 'GET',
        }
        response = await fetch(request, details)
        data = await response.json()
        return data;
    }

    function getCompaniesData() {
        let difference = []
        let perdifference;

        FinalOutput = []
        try {
            getDataAsync()
                .then(data => {
                    Object.keys(data).map((coin) => {
                        difference = data[coin]["avgPrice"] - data[coin]["bollMiddle"];
                        perdifference = (difference / data[coin]["bollMiddle"]) * 100;
                        if (smallCoins && parseFloat(data[coin]["avgPrice"]) < 0.00000099) { }
                        else {
                            FinalOutput.push({ id: coin, Coin: coin, CurrentPrice: data[coin]["avgPrice"], BolingerAverage: data[coin]["bollMiddle"], Percentage: parseFloat(perdifference) })
                        }
                    });
                    setData(FinalOutput)
                    console.log(`Data`, FinalOutput)
                });
        }
        catch (e) {
            console.log("Data Not Returned: ", e)
        }
    }

    return (
        <div>
            <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid container item xs={12} md={4} spacing={3}>
                    <h1>Max Capital</h1>
                </Grid>
            </Grid>

            <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid container item xs={12} md={4} spacing={3}>
                    <Button variant="contained" color="primary" onClick={getCompaniesData}>Refresh Data</Button>
                </Grid>
                <Grid container item xs={12} md={4} spacing={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={smallCoins}
                                onChange={handleChangeSmallCoins}
                                name="smallcoins"
                                color="primary"
                            />
                        }
                        label="Hide Small Coins"
                    />
                </Grid>
            </Grid>
            <br />
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    sortModel={sortModel}
                    rows={data}
                    columns={columns}
                >
                </DataGrid>
            </div>
        </div>
    );
}
