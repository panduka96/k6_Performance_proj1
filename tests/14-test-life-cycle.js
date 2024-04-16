// Init
// Initilize variables, define options (VU, duration, Threasholds)
// Call only once
let counter = 1

// Setup
// Called once defore load test starts
export function setup(){
    console.log(`Inside setup - ${counter}`)
    return "My name is ABCD"
}

// Default
// Main function. Entry point for virtual users, virtual user keeps on calling APIs defined here
// It's VU code. It gets called till your test is running
export default function(data){
    console.log(`Inside defult - ${counter} VU=${__VU} ITER=${__ITER} DATA is ${data}`)
    counter = counter + 1
}

// Teardown
// Gets called only once when the default function is over
export function teardown(data){
    console.log(`Inside teardown - ${counter} DATA is ${data}`)
}