import http from 'k6/http'
import {check} from 'k6'

export default function () {

    let url = 'https://run.mocky.io/v3/204813f1-696c-4abb-9d7b-44a135b6b818'
    let headerParams = {
        hraders: {
            'Content-Type': 'application/json'
        }
    }
    const response = http.get(url, headerParams)
    check(response,{
        'is status 200': (r) => r.status === 200
    })

    let body = JSON.parse(response.body)
    console.log('body is ',JSON.stringify(body))
    console.log('message : ', body.message)

    check(response, {
        'is message success': (res) => JSON.parse(res.body).message == "Data fetch successfully"
    })

}