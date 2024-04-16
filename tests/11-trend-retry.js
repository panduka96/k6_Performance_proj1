import { Counter } from 'k6/metrics'
import http from 'k6/http'
import { sleep } from 'k6';
import { Trend } from 'k6/metrics'

let retryCounter = new Counter("GetAPI_MAX_RETRY");
let retryTrend = new Trend("GETAPI_MAX_RETRY_TREND")

export default function () {

    let maxAttepmts = 5
    retryCounter.add(1)
    for (let retries = 5; retries > 0; retries--) {
        let numberOfAttempts = maxAttepmts - retries + 1
        retryTrend.add(numberOfAttempts)
        let response = http.get("https://run.mocky.io/v3/cc07e050-572a-452c-9626-e25418af0ed9")
        if (response.status != 404) {
            retryCounter.add(1)
            console.log(`response is not correct ${retries} VU=${__VU} IT=${__ITER}`)
            sleep(1)
        }
        else {
            break;
        }
    }

}