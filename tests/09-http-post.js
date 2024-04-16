import http from 'k6/http'

export default function () {

    let url = "https://run.mocky.io/v3/0f9196aa-6fd0-49db-9a80-24d641aaba61"
    let param = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let payload = JSON.stringify({
        email: "abc@gmail.com",
        password: "1234gwtw"
    })
    http.post(url, payload, param)

}