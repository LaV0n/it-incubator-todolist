import {ActionType, div, mult, salaryReducer, sub, sum} from "./tasks";

test('summing',()=>{
    const salary:number = 900;
    const n:number = 200;

    const result =sum(salary,n)

    expect(result).toBe(1100)
})
test('sub',()=>{
    const salary:number = 900;
    const n:number = 200;

    const result =sub(salary,n)

    expect(result).toBe(700)
})
test('div',()=>{
    const salary:number = 800;
    const n:number = 200;

    const result =div(salary,n)

    expect(result).toBe(4)
    expect(div(100,200)).toBe(0.5)
})
test("mult",()=>{
    const salary:number = 800;
    const n:number = 200;

    const result =mult(salary,n)

    expect(result).toBe(160000)
    expect(mult(0,200)).toBe(0)
})

test("some case",()=>{
    const salary:number = 800;
    const action:ActionType = {
        type:'SUM',
        n:200
    }
    const actionTest:ActionType = {
        type:'TEST',
        n:200
    }

    const result =salaryReducer(salary,action);

    expect(result).toBe(1000)
    expect(salaryReducer(salary,actionTest)).toBe(salary)
})
test("sub case",()=>{
    const salary:number = 800;
    const action:ActionType = {
        type:'SUB',
        n:200
    }

    const result =salaryReducer(salary,action);

    expect(result).toBe(600)
})
test("div case",()=>{
    const salary:number = 800;
    const action:ActionType = {
        type:'DIV',
        n:200
    }

    const result =salaryReducer(salary,action);

    expect(result).toBe(4)
})
test("mult case",()=>{
    const salary:number = 800;
    const action:ActionType = {
        type:'MULT',
        n:200
    }

    const result =salaryReducer(salary,action);

    expect(result).toBe(160000)
})