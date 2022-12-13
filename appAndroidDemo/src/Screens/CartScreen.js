import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, HStack, ScrollView, Text } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import Colors from "../color";
import Buttone from "../Components/Buttone";
// import CartEmpty from "../Components/CartEmpty";
import CartIterms from "../Components/CartIterms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartEmpty from "../Components/CartEmpty";

function CartScreen({ route }) {
  const navigation = useNavigation();
  const product = route.params;
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
  },[product])
  let total = 0;
   for(var i=0 ;i < cart.length ;i++){
     total += cart[i].product.price * cart[i].qty;
   }
   console.log(total)
  return (
    <Box flex={1} safeAreaTop bg={Colors.subGreen}>
      {/* Header */}
      <Center w="full" py={5}>
        <Text color={Colors.black} fontSize={20} bold>
          Cart
        </Text>
      </Center>
     
      <ScrollView showsVerticalScrollIndicator={false}>
      {
        !cart || cart == [] ? <CartEmpty/> :<CartIterms  data = {cart}/>
      }

        {/* Total */}
        <Center mt={5}>
          <HStack
            rounded={50}
            justifyContent="space-between"
            bg={Colors.white}
            shadow={2}
            w="90%"
            pl={5}
            h={45}
            alignItems="center"
          >
            <Text>Total</Text>
            <Button
              px={10}
              h={45}
              rounded={50}
              bg={Colors.main}
              _text={{
                color: Colors.white,
                fontWeight: "semibold",
              }}
              _pressed={{
                bg: Colors.main,
              }}
            >
              {`${total}$`}
            </Button>
          </HStack>
        </Center>

        {/* Checkout */}
        <Center px={5}>
          <Buttone
            onPress={() => navigation.navigate("Shipping")}
            bg={Colors.black}
            color={Colors.white}
            mt={10}
          >
            CHECKOUT
          </Buttone>
        </Center>
      </ScrollView>
    </Box>
  );
}

export default CartScreen;
