import {
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import products from "../data/Products";
import Colors from "../color";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderIterm = () => {
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
  },[])
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={cart}
      keyExtractor={(item) => item.product._id}
      renderItem={({ item }) => (
        console.log(item),
        <Pressable>
          <Box mb={3}>
            <HStack
              alignItems="center"
              bg={Colors.white}
              shadow={1}
              rounded={10}
              overflow="hidden"
            >
              <Center w="25%" bg={Colors.deepGray}>
                <Image
                  source={{ uri: item.product.image }}
                  alt={item.product.name}
                  w="full"
                  h={24}
                  resizeMode="contain"
                />
              </Center>
              <VStack w="60%" px={2}>
                <Text isTruncated color={Colors.black} bold fontSize={12}>
                  {item.product.name}
                </Text>
                <Text color={Colors.lightBlack} mt={2} bold>
                  ${item.product.price}
                </Text>
              </VStack>
              <Center>
                <Button
                  bg={Colors.main}
                  _pressed={{ bg: Colors.main }}
                  _text={{
                    color: Colors.white,
                  }}
                >
                  {item.qty}
                </Button>
              </Center>
            </HStack>
          </Box>
        </Pressable>
      )}
    />
  );
};

export default OrderIterm;
