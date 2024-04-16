
import http from 'k6/http'
import { Rate } from 'k6/metrics'

let failureRate = new Rate('failed_requests')

export let options = {
    thresholds: {
        'failed_requests': ['rate<0.1'],
        'http_req_duration':['p(95)<400', 'p(99)<500']
    }
}

export default function () {

    let response = http.get("https://run.mocky.io/v3/cc07e050-572a-452c-9626-e25418af0ed9")
    failureRate.add(response.status !== 200)
    
}