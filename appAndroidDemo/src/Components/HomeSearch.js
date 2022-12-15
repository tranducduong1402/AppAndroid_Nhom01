import { Box, HStack, Input } from "native-base";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import Colors from "../color";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeSearch() {

  const navigation = useNavigation();
  const [cart, setCart] = useState("");

  useEffect (() =>{
    AsyncStorage.getItem('cart').then((cart)=>{
      if (cart !== null) {
        const cartItem = JSON.parse(cart)
         setCart(cartItem);  
      }
    })
    .catch((err)=>{
      alert(err)
    })
  },[cart.length])
  
  return (
    <HStack
      space={3}
      w="full"
      px={6}
      bg={Colors.main}
      py={4}
      alignItems="center"
      safeAreaTop
    >
      <Input
        placeholder="Camera,Loudspeaker, headphone ...."
        w="85%"
        bg={Colors.white}
        type="search"
        variant="filled"
        h={12}
        borderWidth={0}
        _focus={{
          bg: Colors.white,
        }}
      />
      <Pressable ml={3} onPress={() => navigation.navigate("Cart")}>
        <FontAwesome5 name="shopping-basket" size={24} color={Colors.white} />
        <Box
          px={1}
          rounded="full"
          position="absolute"
          top={-13}
          left={2}
          bg={Colors.red}
          _text={{
            color: Colors.white,
            fontSize: "11px",
          }}
        >
          {cart.length}
        </Box>
      </Pressable>
    </HStack>
  );
}

export default HomeSearch;
