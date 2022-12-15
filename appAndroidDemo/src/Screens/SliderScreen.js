import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  FormControl,
  Input,
  Text,
  View,
  VStack,
  ScrollView,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { nativeEvent,Dimensions, SafeAreaView ,Image, StyleSheet} from "react-native";
import Colors from "../color";

const image = [
    "https://www.tutofox.com/wp-content/uploads/2019/12/app-food.png",
    "https://www.tutofox.com/wp-content/uploads/2019/12/app-food.png",
    "https://www.tutofox.com/wp-content/uploads/2019/12/app-food.png"
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


function SliderScreen() {

    const styles = StyleSheet.create({
        contanier :{
            flex :1
        },
        wrap :{
            width: WIDTH,
            height: HEIGHT*0.4
        },
        wrapDot :{
            position:'absolute',
            bottom:0,
            flexDirection:'row',
            alignSelf:'center'
        },
        dotActive:{
            margin:3,
            color: 'black', 
        },
        dot :{
            margin:3,
            color:'white'
        }

    })
    const [imgActive,setimgActive] = useState(0);
   onchange = (nativeEvent) => {
     if(nativeEvent){
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide!= imgActive){
            setimgActive(slide)
        }
     }
   }
  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
    <SafeAreaView style ={styles.contanier}>
    <View style= {styles.wrap} >
      <ScrollView onScroll={({nativeEvent}) => onchange(nativeEvent)}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      horizontal
      style ={styles.wrap}
      >
       {
        image.map((e,index) => 
         <Image 
         key = {e}
         resizeMode ='stretch'
         style ={styles.wrap}
         source = {{uri:e}}
         />
        )
       }
      </ScrollView>

      <View style= {styles.wrapDot}>
      {
        image.map((e,index) => 
        <Text key={e}
         style={imgActive == index ? styles.dotActive: styles.dot}
        >
        ●
        </Text>
        )
      }
      </View>
    </View>
    </SafeAreaView>
    </ScrollView>

  );
}

export default SliderScreen;
