import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Grid} from "@mui/material";
import CustomTextField from "./CustomTextField";
import axios from "axios";
import ResultsForm from "./ResultsForm";

function App() {
    const [symbol, setSymbol] = useState("");
    const [expression, setExpression] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState({
        "symbol": "symbol",
        "expression": "expression",
        "results": {
            "volatility": "0%",
            "lag": "0",
            "confidence": "0%"
        }
    });

    let resultDiv = <div></div>

    return (
        <div className="App">
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} style={{backgroundColor: "#282c34", height: "100vh"}}>
                    <Grid item xs={12} md={4}
                          style={{marginTop: "25%", marginLeft: "25%", backgroundColor: "rgba(0,0,0,.2"}}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <Grid item md={4}>
                                <CustomTextField
                                    label="Symbol"
                                    type=""
                                    value={symbol}
                                    setter={setSymbol}
                                    autofocus={true}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <CustomTextField
                                    label="Expression"
                                    type=""
                                    value={expression}
                                    setter={setExpression}
                                />
                            </Grid>

                            {showResults && <Grid item xs={12}>
                                <ResultsForm results={results}/>
                            </Grid>}

                            <Grid item xs={12} md={4}>
                                <Button onClick={async () => {
                                    let results = await sendTranscriptRequest(symbol, expression, setResults);
                                    if (results) {
                                        setResults(results);
                                        setShowResults(true);
                                    } else {
                                        alert("No results found");
                                    }
                                }}>Submit</Button>
                                {showResults && <Button onClick={() => {
                                    setShowResults(false);
                                    setSymbol("");
                                    setExpression("");
                                }}>Reset</Button>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

async function sendTranscriptRequest(symbol: string, expression: string, setResults: any): Promise<any> {
    if (!symbol || !expression) {
        alert("Please enter a symbol and expression");
        return;
    } else {
        try {
            const apiUrl = 'https://lpqj6fl9l8.execute-api.us-east-2.amazonaws.com/dev/transcript';
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            };
            const requestBody = {
                symbol: symbol,
                expression: expression,
            };

            const response = await axios.post(apiUrl, requestBody, {headers: headers});

            if (response.status === 200) {
                console.log('POST request successful');
                console.log('Response:', response.data);
                // alert(JSON.stringify(response.data));
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
