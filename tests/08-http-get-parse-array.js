import http from 'k6/http'
import { check } from 'k6'

export default function () {

    const response = http.get("https://run.mocky.io/v3/c71f938c-54c3-4ca6-bcfb-b164081d3229")

    let body = JSON.parse(response.body)
    body.forEach(element => {
        console.log('Name', element.name)
        console.log('address', element.address)
    });

}