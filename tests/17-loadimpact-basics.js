import http from 'k6/http'
import { check, group } from 'k6'
import { Rate, Trend } from 'k6/metrics'

export let errorRate = new Rate('errors')
let groupDuration = Trend("groupDuration")
let getUserTrend = Trend("getUserApiTrend")
let getGroupTrend = Trend("getGroupApiTrend")

export let options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        errors: ['rate<0.1'],
        'groupDuration{groupName:groupGetUsers}': ['avg < 300'],
        'groupDuration{groupName:groupGetGroups}': ['avg < 200'],
        'http_req_duration{type:GETUSERTAG}': ['p(95) < 100'],
        'http_req_duration{type:GETGROUPTAG}': ['p(95) < 100'],
        "http_req_duration{loadZone: 'amazon:us:ashburn'}":['p(95) < 500'],
        "http_req_duration{loadZone: 'amazon:ie:dublin'}":['p(95) < 500']
    },
    ext: {
        loadimpact: {
            // Project: MyK6Project
            projectID: 3676150,
            // Test runs with the same name groups test runs together.
            name: 'Learn basics 2',
            distribution: {
                distributionLabel1: { loadZone: 'amazon:us:ashburn', percent: 50 },
                distributionLabel2: { loadZone: 'amazon:ie:dublin', percent: 50 }
            }
        }
    }
}

function groupWithMetrics(nameOfGroup, groupFunction) {

    let start = new Date();
    group(nameOfGroup, groupFunction)
    let end = new Date()

    groupDuration.add(end - start, { groupName: nameOfGroup })
}

export default function () {

    groupWithMetrics("groupGetUsers", function () {
        const response1 = http.get('https://run.mocky.io/v3/cc07e050-572a-452c-9626-e25418af0ed9', { tags: { 'type': 'GETUSERTAG' } })
        const checkApi1 = check(response1, {
            "Is response of API is 200 :": r => r.status === 200,
            tags: {
                type: "GETUSERTAG"
            }
        })
        errorRate.add(!checkApi1)
        getUserTrend.add(response1.timings.duration, { type: "GETUSERTAG" })
    })

    groupWithMetrics("groupGetGroups", function () {
        const response2 = http.get('https://run.mocky.io/v3/204813f1-696c-4abb-9d7b-44a135b6b818', { tags: { 'type': 'GETGROUPTAG' } })
        const checkApi2 = check(response2, {
            "Is response of API is 200 :": r => r.status === 200,
            tags: {
                type: "GETGROUPTAG"
            }
        })
        errorRate.add(!checkApi2)
        getGroupTrend.add(response2.timings.duration, { type: "GETGROUPTAG" })
    })

}