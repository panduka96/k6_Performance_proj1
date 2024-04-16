import {Counter} from 'k6/metrics'

let myCounter = new Counter("My Counter");

export default function(){

    myCounter.add(1)
    myCounter.add(2)

}