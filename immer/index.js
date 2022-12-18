


let obj1 = {
    prop1: 5,
    prop2: 'hello'
}

let obj2 = {...obj1}

obj2.prop2 = 'world'

console.log(obj1)
console.log(obj2)