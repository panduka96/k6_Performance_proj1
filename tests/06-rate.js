
import { Trend } from 'k6/metrics'
import http from 'k6/http'
import { check } from 'k6'
import { Rate } from 'k6/metrics'

let getApiTrend = new Trend('TREND_Get_Api_Duration')
let getApiTrendWaiting = new Trend('TREND_Get_Api_Waiting')
let getApiGoogleTrend = new Trend('TREND_Get_Api__Google_Duration')
let getApiGoogleTrendWaiting = new Trend('TREND_Get_Api_Google_Waiting')

export let errorRate = new Rate('errors')

export let options = {
    thresholds: {
        errors: ['rate<0.1']
    }
}

export default function () {

    let response = http.get("https://run.mocky.io/v3/cc07e050-572a-452c-9626-e25418af0ed9")

    console.log(`response body length ${response.body.length} for VU=${__VU} ITER=${__ITER}`)
    const check1 = check(response, {
        'is response status 200': (r) => r.status === 200
    })
    errorRate.add(!check1)
    const check2 = check(response, {
        'body length is 0': (r) => r.body.length == 300
    })
    errorRate.add(!check2)

    getApiTrend.add(response.timings.duration)
    getApiTrendWaiting.add(response.timings.waiting)

    let googleResponse = http.get("https://www.google.lk/");

    getApiGoogleTrend.add(googleResponse.timings.duration)
    getApiGoogleTrendWaiting.add(googleResponse.timings.waiting)
 
    //influxdb - host on localhost:8086
    //grafana - host on localhost:3000 - credentials username - admin password - admin
    
}