import {Grid} from "@mui/material";
import React from "react";

const ResultsForm = ({results}: any) => {

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={4}>
                <h1>{results.symbol}</h1>
                <h2>{results.expression}</h2>
                <h3>{results.results.volatility}</h3>
                <h3>{results.results.lag}</h3>
                <h3>{results.results.confidence}</h3>
            </Grid>
        </Grid>
    )
}

export default ResultsForm;