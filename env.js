var SERVER_INT_URL = "http://127.0.0.1:83/webservice/rest/server.php"
var SERVER_DEV_URL = "http://127.0.0.1:84/webservice/rest/server.php"
var SERVER_PROD_URL = "http://www.moodle.com/webservice/rest/server.php"

export let intEnvironment = {
    SERVER_ENDPOINT: SERVER_INT_URL
}

export let devEnvironment = {
    SERVER_ENDPOINT: SERVER_DEV_URL
}

export let prodEnvironment = {
    SERVER_ENDPOINT: SERVER_PROD_URL
}

export let int = "int"
export let dev = "dev"
export let prod = "prod"

