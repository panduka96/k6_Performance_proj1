import { check } from 'k6'
import { Rate } from 'k6/metrics'
import http from 'k6/http'
import { Trend } from 'k6/metrics'

let failureRate = new Rate("failure_rate")

let createCourseTrend = new Trend("Trend_CreateCourse");
let getCourseTrend = new Trend("Trend_GetCourse");
let deleteCourseTrend = new Trend("Trend_DeleteCourse");

export function logger(endPoint, token, response) {
    console.log(`Logger started VU=${__VU} ITER=${__ITER}`)
    console.log(`Endpoint is ${endPoint} & token is ${token} VU=${__VU} ITER=${__ITER}`)
    console.log(`Response is ${response} VU=${__VU} ITER=${__ITER}`)
    console.log(`Body is ${JSON.stringify(JSON.parse(response.body))}`)
    try {
        console.log(`Correlation id is ${JSON.stringify(JSON.parse(response.header))[x - correlation - Id]}`)
    }
    catch (ex) {

    }
}

export const setHeader = () => {
    return {
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
}

function generateUUID() {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charsetLength = charset.length;
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * charsetLength);
        result += charset[randomIndex];
    }
    return result;
}

export const route_createCourse = (endPoint, token) => `${endPoint}?wstoken=${token}&moodlewsrestformat=json&wsfunction=core_course_create_courses&courses[0][fullname]=mycourses&courses[0][shortname]=${generateUUID()}&courses[0][categoryid]=1&courses[0][visible]=1&courses[0][summary]=text&courses[0][enablecompletion]=0&courses[0][summaryformat]=1&courses[0][format]=topics&courses[0][numsections]=0`
export const route_getCourse = (endPoint, token, courseId) => `${endPoint}?wstoken=${token}&wsfunction=core_course_get_courses&options[ids][0]=${courseId}&moodlewsrestformat=json`
export const route_deleteCourse = (endPoint, token, courseId) => `${endPoint}?wstoken=${token}&moodlewsrestformat=json&wsfunction=core_course_delete_courses&courseids[0]=${courseId}`


export function createCourse(endPoint, token) {
    console.log(`Inside createCourse token=${token}`)
    let postResponse = http.post(route_createCourse(endPoint, token), null, setHeader())

    createCourseTrend.add(postResponse.timings.duration)

    let checkPostResponse = check(postResponse, {
        "Create Course status 200 :": r => r.status === 200
    })

    failureRate.add(!checkPostResponse)

    logger(endPoint, token, postResponse)

    let createResponseBody = JSON.parse(postResponse.body)

    try {
        var id = createResponseBody[0].id;
        console.log(`course id is ${id}`)
        console.log(`Create course body is ${JSON.stringify(createResponseBody)}`)
        if (createResponseBody[0].id == "undefined") {
            let checkPostResponseError1 = check(postResponse, {
                "Create Course returns undefined Id": r => r.status === 999
            })
            failureRate.add(!checkPostResponseError1)
        }
    }
    catch (ex) {
        let checkPostResponseError2 = check(postResponse, {
            "Create Course does not return valid data": r => r.status === 999
        })
        failureRate.add(!checkPostResponseError2)
    }
    return createResponseBody

}

export function getCourse(endPoint, token, courseId) {

    const getResponse = http.get(route_getCourse(endPoint, token, courseId), null)

    let checkGetResponse = check(getResponse, {
        "Get Course status is 200": r => r.status === 200
    })

    failureRate.add(!checkGetResponse)

    logger(endPoint, token, getResponse)

    getCourseTrend.add(getResponse.timings.duration)

    let getResponseBody = JSON.parse(getResponse.body)

    try {
        if (getResponseBody[0].id == "undefined") {
            let checkGetResponseError1 = check(getResponse, {
                "Get Course returns undefined Id": r => r.status === 999
            })
            failureRate.add(!checkGetResponseError1)
        }
        console.log(`Get course body is ${JSON.stringify(getResponseBody)}`)
        console.log(`Course id is ${getResponseBody[0].id}`)
    }
    catch (ex) {
        let checkGetResponseError2 = check(getResponse, {
            "Get Course does not return valid data": r => r.status === 999
        })
        failureRate.add(!checkGetResponseError2)
    }
    return getResponseBody
}

export function deleteCourse(endPoint, token, courseId) {

    console.log(`Delete course id is ${courseId}`)

    let deleteResponse = http.del(route_deleteCourse(endPoint, token, courseId), null, setHeader())

    let checkDeleteResponse = check(deleteResponse, {
        "Delete course status is 200": r => r.status === 200
    })

    failureRate.add(!checkDeleteResponse)

    logger(endPoint, token, deleteResponse)

    deleteCourseTrend.add(deleteResponse.timings.duration)

}