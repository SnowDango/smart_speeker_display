import {AxiosResponse} from "axios";
const axios = require('axios');
require('dotenv').config();

const apiUrl = process.env.API_SERVER_URL;

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

module.exports = async function (callback: (state: string,any: string) => void) {
    console.log ("*** 開始 ***")
    await delay(1000);
    await axios.get(apiUrl)
        .then(function (response: AxiosResponse) {
            callback(response.data.state,response.data.any);
            console.log ("*** 終了 ***")
        }).catch( function (error: Error) {
            callback(error.message,"");
        });
}