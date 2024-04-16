import http from 'k6/http'

export default function(){
    http.get("https://run.mocky.io/v3/cc07e050-572a-452c-9626-e25418af0ed9")
}

//k6 run 15-fixed-rps.js --vus 5 --duration 5s --rps 6 