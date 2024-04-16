import * as courseService from '../utility/courseService.js'
import * as env from '../../env.js'
import * as testData from '../testdata/testData.js'

export let options = {
    vus: testData.VUS,
    duration: testData.DURATION,
    teardownTimeout: "20s"
}

let environment;
let token;

if (`${__ENV.ENVIRONMENT}` == env.int) {
    environment = env.intEnvironment;
    token = `${__ENV.INT_TOKEN}`
}
else if (`${__ENV.ENVIRONMENT}` == env.dev) {
    environment = env.devEnvironment;
    token = `${__ENV.DEV_TOKEN}`
}

export function setUp() {

}

export default function () {
    try {
        let responseBody = courseService.createCourse(`${environment.SERVER_ENDPOINT}`, token)
        courseService.getCourse(environment.SERVER_ENDPOINT, token, responseBody[0].id)
        courseService.deleteCourse(environment.SERVER_ENDPOINT, token, responseBody[0].id)
    }
    catch (ex) {
        console.log(`error occured in execution ${ex}`)
    }
}