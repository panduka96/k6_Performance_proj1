import http from 'k6/http'

export let options = {
    stages: [
        { duration: '10s', target: 3 },
        { duration: '10s', target: 5 },
        { duration: '10s', target: 0 }
    ]
}

export default function () {

    http.get("https://www.google.lk/")

}

