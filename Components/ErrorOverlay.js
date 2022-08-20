import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function ErrorOverlay({message, onConfirm}) {
  return (
<View style={styles.container}>
    <Text style={[styles.text,styles.title]}>An error occurred!</Text>
    <Text style={styles.text}>{message}</Text>
<Button title='Okay' onPress={onConfirm}/>
</View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        padding:24,
        backgroundColor: '#2d0689'
    },
    text:{
        color:'white',
        textAlign:'center',
        marginBottom:8
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    }
})
