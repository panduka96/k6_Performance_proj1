
import http from 'k6/http'
import { check } from 'k6'

export let options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        'checks': ['rate>0.95']
    }
}

export default function () {

    let response = http.get("https://run.mocky.io/v3/cc07e050-572a-452c-9626-e25418af0ed9")

    check(response, {
        'is response status 200': (r) => r.status === 200
    })

}