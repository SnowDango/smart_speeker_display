import {AxiosResponse} from "axios";

const axios = require('axios');

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

module.exports = async function (callback: (state: string,any: string) => void) {
    console.log ("*** 開始 ***")
    await delay(1000);
    await axios.get('https://asia-northeast1-smartdispserver.cloudfunctions.net/SDState/get')
        .then(function (response: AxiosResponse) {
            callback(response.data.state,response.data.any);
            console.log ("*** 終了 ***")
        }).catch( function (error: Error) {
            callback(error.message,"");
        });
}
