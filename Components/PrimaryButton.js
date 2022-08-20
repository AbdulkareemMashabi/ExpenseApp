import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function PrimaryButton({
  style,
  onPress,
  children,
  icon,
  color,
  isCenter
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.ButtonOuterContainer, ...style }}
    >
      {/* <Pressable style={({pressed})=> pressed? [styles.pressed,styles.ButtonInnercontainer]:styles.ButtonInnercontainer}  onPress={Ok} android_ripple={{color: 'white'}}> */}

      {children && (
        <Text style={{ color: "white", fontSize: 17 }}>{children}</Text>
      )}
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color={color}
          style={{ marginRight: isCenter?0:8 }}
        />
      )}

      {/* </Pressable> */}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  ButtonOuterContainer: {
    // margin:4,
    //borderRadius:28,
    //overflow:'hidden'
    backgroundColor: "blue",
    //width:50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },

  ButtonInnercontainer: {
    backgroundColor: "blue",
    paddingHorizontal: 12,
    //elevation:2,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  buttonText: {
    textAlign: "center",
    //paddingVertical: 4
  },
  pressed: {
    opacity: 0.75,
  },
});
