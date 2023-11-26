import http from 'k6/http'
import {check} from 'k6'

export default function(){

    //let response = http.get("https://run.mocky.io/v3/e067ed2d-aaf4-4a83-b247-97b1365ce355")

    let response = http.get("https://run.mocky.io/v3/cc07e050-572a-452c-9626-e25418af0ed9")

    console.log(`response body length ${response.body.length} for VU=${__VU} ITER=${__ITER}`)
    check(response,{
        'is response status 200':(r) => r.status === 200,
        'body length is 0':(r) => r.body.length == 30
    })

}