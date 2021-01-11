import {AxiosResponse} from "axios";

const axios = require('axios');

module.exports = async function (callback: (string: string) => void) {
    console.log ("*** 開始 ***")
    await axios.get('https://asia-northeast1-smartdispserver.cloudfunctions.net/SDState/get')
        .then(function (response: AxiosResponse) {
            callback(response.data.state);
            console.log ("*** 終了 ***")
        }).catch( function (error: Error) {
            callback(error.message);
        });
}
