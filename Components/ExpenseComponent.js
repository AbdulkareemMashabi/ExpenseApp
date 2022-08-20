import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "./PrimaryButton";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../redux/Favorites";
import { deleteExpense } from "./utilities/http";
import { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import ErrorOverlay from "./ErrorOverlay";

export default function ExpenseComponent(props) {
  const [isSubmitting,setIsSubmitting]=useState(false)
  const[error,setError]=useState()
const navigation=useNavigation()
const dispatch=useDispatch()

const onpresshandler=async()=>{
  setIsSubmitting(true); 
  try{
  await deleteExpense(props.id); setIsSubmitting(false);
    dispatch(removeFavorite(props.id))}

  catch(error)
  {
setError('Could not delete')
  }
  setIsSubmitting(false);
}
const pressHandler=()=>{
  setError()
}

if(isSubmitting)
return <LoadingOverlay/>
if(!isSubmitting && error)
return <ErrorOverlay message={error} onConfirm={pressHandler}/>
  return (
    props.isShown?(
    <View style={{flexDirection:'row', flex:1, marginHorizontal:14, marginVertical: 8}}>   
    <TouchableOpacity style={styles.preasable} onPress={()=>navigation.navigate("Edit Expense",{id:props.id, title:props.title, date:props.date, month:props.month, year:props.year, expense: props.expense})}>
      <View style={{ justifyContent: "space-between" }}>
        <Text style={{ color: "white", fontSize: 15 }}>{props.title}</Text>
        <Text style={{ color: "white", fontSize: 15 }}>{`${props.date}/${
          props.month + 1
        }/${props.year}`}</Text>
      </View>
      <View style={styles.viewExpense}>
        <Text style={{ color: "blue", fontSize: 15 }}>{`$${props.expense}`}</Text>
      </View>
    </TouchableOpacity>
    <PrimaryButton icon={'trash-outline'} color={'red'} onPress={onpresshandler} style={{backgroundColor:'gray', flex:1, borderRadius:0, borderTopRightRadius : 16,borderBottomRightRadius: 16}} isCenter={true}/>
    </View> ):
        <TouchableOpacity style={styles.preasable1} onPress={()=>!props.notNavigate?navigation.navigate("Edit Expense",{id:props.id, title:props.title, date:props.date, month:props.month, year:props.year, expense: props.expense}):null}>
        <View style={{ justifyContent: "space-between" }}>
          <Text style={{ color: "white", fontSize: 15 }}>{props.title}</Text>
          <Text style={{ color: "white", fontSize: 15 }}>{`${props.date}/${
            props.month + 1
          }/${props.year}`}</Text>
        </View>
        <View style={styles.viewExpense}>
          <Text style={{ color: "blue", fontSize: 15 }}>{`$${props.expense}`}</Text>
        </View>
      </TouchableOpacity>

  );
}
const styles = StyleSheet.create({
  viewExpense: {
    backgroundColor: "white",
    width: 75,
    height: 65,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.75,
    overflow: "hidden",
    borderColor: "red",
    borderWidth: 3,

  },
  preasable: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "blue",
    paddingVertical: 10,
    //margin: 10,
    //borderRadius: 16,
    //borderRadius: 15,
    borderTopLeftRadius:16, borderBottomLeftRadius:16,
    flex:4
  },
  preasable1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "blue",
    paddingVertical: 10,
    margin: 10,
    borderRadius: 16,
  },
});
