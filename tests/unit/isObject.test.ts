import { isObject } from "../../src/utils/functions";

describe('Testing isObject function', ()=> {
    it('Identify correctly that a string argument is not an Object', ()=>{
        const argument = 'string'
        const expected = false
        expect(isObject(argument)).toEqual(expected)
    })

    it('Identify correctly if the argument is object', ()=>{
        const argument = {name: 'john', age: 34}
        const expected = true
        expect(isObject(argument)).toEqual(expected)
    })

    it('Identify correctly if the argument is object', ()=>{
        const argument = ['']
        const expected = false
        console.log('how about the array ->', isObject(argument))
        expect(isObject(argument)).toEqual(expected)
    })
})