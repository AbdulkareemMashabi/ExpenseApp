import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function LoadingOverlay() {
  return (
<View style={styles.view}>
    <ActivityIndicator size={'large'} color="white"/>
</View>
  )
}

const styles= StyleSheet.create({
   view:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:24,
    backgroundColor:'#2d0689'
   } 
})
