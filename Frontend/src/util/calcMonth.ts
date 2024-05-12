export default function calcMonth(state:number = 0){
    const date = new Date();
    if(state !== 0){
        date.setMonth(date.getMonth() - state);
    }
    return date.toISOString().split("T")[0];
}