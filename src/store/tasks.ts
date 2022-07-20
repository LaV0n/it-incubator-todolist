export const sum =(salary:number,n:number)=> salary + n;
export const sub =(salary:number,n:number)=> salary - n;
export const div =(salary:number,n:number)=> salary /n;
export const mult =(salary:number,n:number)=> salary * n;

export type ActionType ={
    type:"SUM" |"TEST" |"SUB"|"DIV"|"MULT",
        n:number
}
export const salaryReducer = (state:number,action:ActionType)=>{
    switch (action.type){
        case "SUM":
            return state+action.n
        case "SUB":
            return state-action.n
        case "DIV":
            return state/action.n
        case "MULT":
            return state*action.n
        default:
            return state
    }
}