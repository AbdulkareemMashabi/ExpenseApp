import { Text, StyleSheet, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ExpenseComponent from "./ExpenseComponent";
import { useLayoutEffect } from "react";
import PrimaryButton from "./PrimaryButton";
export default function AllExpenses({navigation}) {
 // const [total, setTotal] = useState(0);
  const expense = useSelector((state) => state.favoriteMeals.expenses);
  const totalExpense= useSelector((state) => state.favoriteMeals.totalExpenses);

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
    return <ExpenseComponent {...{...item,isShown}} />;
  };

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
