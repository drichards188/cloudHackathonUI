import React, {useState} from 'react';
import './App.css';
import {Button, CircularProgress, Grid} from "@mui/material";
import CustomTextField from "./CustomTextField";
import axios from "axios";
import ResultsForm from "./ResultsForm";

function App() {
    const [symbol, setSymbol] = useState("");
    const [expression, setExpression] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState({
        "symbol": "symbol",
        "expression": "expression",
        "changes": "changes",
        "percent": "percent"
    });

    let loadingCircle = <></>;

    if (isLoading) {
        loadingCircle = <CircularProgress />;
    }

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center"
              style={{backgroundColor: "#282c34", height: "100vh"}}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">

                <Grid item md={6} style={{backgroundColor: "rgba(0,0,0,.2"}}>
                    <Grid container spacing={2} justifyContent="center" alignItems="space-evenly">
                        {loadingCircle}
                    <Grid item md={2}>
                        <CustomTextField
                            label="Symbol"
                            type=""
                            value={symbol.toUpperCase()}
                            setter={setSymbol}
                            autofocus={true}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <CustomTextField
                            label="Expression"
                            type=""
                            value={expression}
                            setter={setExpression}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <Button onClick={async () => {
                            setIsLoading(true);
                            let results = await sendTranscriptRequest(symbol, expression, setResults);
                            if (results) {
                                setIsLoading(false);
                                setResults(results);
                                setShowResults(true);
                            } else {
                                setIsLoading(false);
                                alert("No results found");
                            }
                        }}>Submit</Button>
                        {showResults && <Button onClick={() => {
                            setShowResults(false);
                            setSymbol("");
                            setExpression("");
                        }}>Reset</Button>}
                    </Grid>
                        {showResults && <Grid item xs={12}>
                            <ResultsForm results={results} symbol={symbol}/>
                        </Grid>}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}

async function sendTranscriptRequest(symbol: string, expression: string, setResults: any): Promise<any> {
    if (!symbol || !expression) {
        alert("Please enter a symbol and expression");
        return;
    } else {
        try {
            const apiUrl = 'http://localhost:8000/transcript';
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8'
            };
            const requestBody = {
                symbol: symbol,
                expression: expression,
            };

            const response = await axios.post(apiUrl, requestBody, {headers: headers});

            if (response.status === 200) {
                console.log('POST request successful');
                console.log('Response:', response.data);
                return response.data;
            } else {
                console.error('POST request failed with status:', response.status);
            }
        } catch (error: any) {
            console.error('Error:', error);
            let errorMessage = error.message;
            alert(errorMessage);
        }
    }
}

export default App;
