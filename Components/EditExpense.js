import { View, StyleSheet, TextInput, Text, ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import PrimaryButton from "./PrimaryButton";
import ExpenseComponent from "./ExpenseComponent";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/Favorites";
import { updateExpense } from "./utilities/http";
import LoadingOverlay from "./LoadingOverlay";
import ErrorOverlay from "./ErrorOverlay";
export default function EditExpense({navigation, route}) {
  const [isSumbitting,setIsSubmitting]=useState(false)
  const obj=route.params
  const [date, setDate] = useState(new Date(obj.year,obj.month,obj.date));
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(true);
  const [title, setTitle] = useState(obj.title);
  const [expense, setExpense] = useState(obj.expense);
  //const elementToBeUpdated = (useSelector((state) => state.favoriteMeals.expenses)).find;
  const [error,setError]=useState()
  useEffect(()=>{
    if(date&&title&&expense)
    setReady(true)
    else
    setReady(false)
  },[date,title,expense])

  const dispatch = useDispatch();
  let changeFavoriteStatusHandler = async () => {
    //favoriteMealsCtx.addFavorite(mealId)
    // let obj= {
    //   id: Math.random(),
    //   title: title,
    //   date: date.getDate(),
    //   month: date.getMonth(),
    //   year: date.getFullYear(),
    //   expense: 3
    // }
    setIsSubmitting(true)
    try{
      console.log('BEFORE')
    await updateExpense({id:obj.id, title:title, year:date.getFullYear(), month: date.getMonth(), date:date.getDate(), expense:expense})
    console.log('AFTER')
    dispatch(
      update({id:obj.id, title:title, year:date.getFullYear(), month: date.getMonth(), date:date.getDate(), expense:expense})
    );
    navigation.pop();
    }
    catch(error)
    {
      setError('Error occurred: Could not update')
    }
    setIsSubmitting(false)


  };

  const onChange = (event, selectedDate) => {
    if(event.type!='dismissed'){
    setShow(false);
    setDate(selectedDate);

    }
   else
   setShow(false);
  };

  const showMode = () => {
    setShow(true);

  };

  const cancelButton = (isCanclePressed) => {
    if (isCanclePressed) navigation.pop();
    else if (title == "" || expense == "" || date == null) {
      ToastAndroid.show("There is a messing input", ToastAndroid.SHORT);
    } else changeFavoriteStatusHandler();
  };
  const textChange = (text, isTitle) => {
    if (isTitle) setTitle(text);
    else setExpense(text);
  };

if(isSumbitting)
{
  return <LoadingOverlay/>
}
const pressButtonHandler=()=>{
  setError()
}
if(error &&!isSumbitting)
{
  return <ErrorOverlay message={error} onConfirm={pressButtonHandler}/>
}

  return (
    <View style={styles.container}>
      <View style={styles.buttonsHoldre}>
        <PrimaryButton
          style={styles.styleForButton}
          onPress={cancelButton.bind(this, true)}
        >
          Cancel
        </PrimaryButton>
        <PrimaryButton
          style={styles.styleForButton}
          onPress={cancelButton.bind(this, false)}
        >
          Update
        </PrimaryButton>
      </View>
      <View style={{ borderBottomWidth: 10, borderBottomColor: "white" }} />
      <TextInput
        placeholder="Write the title for Expense here"
        onChangeText={(text) => textChange(text, true)}
        defaultValue={`${obj.title}`}
        placeholderTextColor="white"
        style={{
          borderWidth: 3,
          borderColor: "green",
          borderRadius: 16,
          fontSize: 20,
          margin: 15,
          color: "white",
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      />
      <TextInput
        placeholder="Write the expense here"
        onChangeText={(text) => textChange(text, false)}
        placeholderTextColor="white"
        defaultValue={`${obj.expense}`}
        keyboardType="numeric"
        style={{
          borderWidth: 3,
          borderColor: "green",
          borderRadius: 16,
          fontSize: 20,
          margin: 15,
          color: "white",
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      />
      <View style={{ flexDirection:'row',alignItems: "center", justifyContent:'space-between', paddingHorizontal:12 }}>
        <PrimaryButton
          style={styles.styleForButtonDateAndTime}
          onPress={() => showMode()}
        >
          Set Date
        </PrimaryButton>
        <Text style={{fontWeight:'bold', fontSize:18, color:'white'}}>{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</Text>
      </View>
      <View style={{ borderBottomWidth: 10, borderBottomColor: "white" }} />
      {ready && (
        <>
          <Text style={{ color: "white", fontSize: 20, margin: 10 }}>
            Your expense will be:
          </Text>
          <ExpenseComponent
            {...{
              title: title,
              date: date.getDate(),
              month: date.getMonth(),
              year: date.getFullYear(),
              expense: expense,
              notNavigate:true
            }}
          />
        </>
      )}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00008B",
    flex: 1,
  },
  buttonsHoldre: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  styleForButton: {
    marginHorizontal: 30,
    marginVertical: 10,
    height: 50,
    width: 100,
  },
  styleForButtonDateAndTime: {
    height: 50,
    width: 250,
    marginVertical: 10,
  },
});
