import {Grid} from "@mui/material";
import React from "react";
import TradingViewWidget from "./TradingViewChart";

const ResultsForm = ({results}: any) => {
    const datesList: any[] = [];
    for (let date in results.dates.expression_count) {
        let item: any[] = [date, results.dates[date]];
        datesList.push(item);
    }

    return (
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item xs={12} md={2}>
                <h2 style={{color: "grey"}}>Symbol</h2>
                <h1 style={{color: "wheat"}}>{results.symbol.toUpperCase()}</h1>
                <h2 style={{color: "grey"}}>Query Expression</h2>
                <h2 style={{color: "wheat"}}>{results.expression}</h2>
            </Grid>
            <Grid item md={2}>
                <h2 style={{color: "grey"}}>Transcript date  & query count</h2>
                {datesList.map((change: any) => (<h3 style={{color: "wheat"}}>{change[0]} | {change[1]} hits</h3>)
                )}
            </Grid>
                <Grid item md={2}>
                    <h2 style={{color: "grey"}}>Change on earnings call</h2>
                    {results.changes.map((change: any) => (<h3 style={{color: "wheat"}}>$ {change}</h3>)
                    )}
                </Grid>
                <Grid item md={2}>
                    <h2 style={{color: "grey"}}>Percent change on earnings call</h2>
                    {results.percent.map((change: any) => (<h3 style={{color: "wheat"}}>{change}%</h3>)
                    )}
                </Grid>

            <Grid item sm={12} style={{minWidth: "50vh", height: "100%"}}>
                <TradingViewWidget symbol={results.symbol}/>
            </Grid>
        </Grid>
    )
}

export default ResultsForm;