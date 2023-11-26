import http from 'k6/http'
import { check } from 'k6'
import { Rate } from 'k6/metrics'

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
}