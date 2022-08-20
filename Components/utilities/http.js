import axios from "axios";

const URL= 'https://expense-app-1e383-default-rtdb.firebaseio.com';
const URLERROR= 'https://expense-app-1e383-default-rtdb.firebaseio'
export async function StoreExpense(data)
{
    return (await axios.post(URL+'/expenses.json',data)).data.name
}
export async function getExpense()
{
    const response =await axios.get(URL+'/expenses.json')
    const expenses=[];
    for(const key in response.data)
    {
        
expenses.push({
    id:key,
    title:response.data[key].title,
    date:response.data[key].date,
    month: response.data[key].month,
    year: response.data[key].year,
    expense: response.data[key].expense

})
    }
    return expenses
}
export async function updateExpense(data){
await axios.put(URL+`/expenses/${data.id}.json`,data)
}
export async function deleteExpense(id)
{
   await axios.delete(URL+`/expenses/${id}.json`)
}