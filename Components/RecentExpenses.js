import { Text, StyleSheet, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpenseComponent from "./ExpenseComponent";
import { useLayoutEffect } from "react";
import PrimaryButton from "./PrimaryButton";
import { getExpense } from "./utilities/http";
import { addFavorite } from "../redux/Favorites";
import LoadingOverlay from "./LoadingOverlay";
import ErrorOverlay from "./ErrorOverlay";
export default function RecentExpenses({navigation}) {
 // const [total, setTotal] = useState(0);
 const [isFitching,setIsFitching]=useState(true)
 const[error,setError]=useState()
const dispatch= useDispatch()
useEffect(()=>{
  async function temp()
  {
    setIsFitching(true)
    try{
 const response= await getExpense()
 for(let i=0;i<response.length;i++)
 dispatch(addFavorite(response[i]))
    }
    catch(error)
    {
      setError('could not get data')
    }
 setIsFitching(false)


  }
  temp()
},[])

  const expense = useSelector((state) => state.favoriteMeals.expensesForLast7Days);
  const totalExpense= useSelector((state) => state.favoriteMeals.totalExpensesForLast7Days);
  
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight: () => {
        return (
          <PrimaryButton
            onPress={() => navigation.navigate("Add Expense")}
            icon="add-outline"
            color="white"
          />
        );
      },
    });
  },[])
  // useEffect(()=>{
  //   let temp = 0;

  //   for (let i = 0; i < expense.length; i++) {
  //     temp = temp + expense[i].expense;
  //   }
  //   setTotal(temp);
  // },[expense]);
  const isShown=true
  
  const renderExpense = ({ item }) => {
    return <ExpenseComponent {...{...item,isShown}}/>;
  };

  const onpressHandler=()=>{
    return setError()
  }
  if(error && !isFitching)
  {
    return <ErrorOverlay message={error} onConfirm={onpressHandler}/>
  }

if(isFitching)
{
  return <LoadingOverlay/>
}
console.log(expense)


  return (
    <View style={styles.container}>
      <View style={styles.summaryView}>
        <Text style={styles.textLeft}>Total</Text>
        <Text style={{ fontWeight: "bold", color: "blue" }}>{`$${totalExpense}`}</Text>
      </View>
      <FlatList data={expense} renderItem={renderExpense} keyExtractor={(item)=>item.id} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00008B",
    flex: 1,
  },
  summaryView: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#b8c3d4",
    padding: 8,
    margin: 16,
    height: 35,
    borderRadius: 12,
  },
  textLeft: {
    color: "blue",
    opacity: 0.5,
  },
});
