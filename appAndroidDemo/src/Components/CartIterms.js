import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import Colors from "../color";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Swiper = (props) => (
  <SwipeListView
    rightOpenValue={-50}
    previewRowKey="0"
    previewOpenValue={-40}
    previewOpenDelay={3000}
    data={props.item.data}
    renderItem={renderitem}
    renderHiddenItem={hiddenItem}
    showsVerticalScrollIndicator={false}
  />
);

const renderitem = (data) => (
  <Pressable>
    <Box ml={6} mb={3}>
      <HStack
        alignItems="center"
        bg={Colors.white}
        shadow={1}
        rounded={10}
        overflow="hidden"
      >
        <Center w="25%" bg={Colors.deepGray}>
          <Image
            source={{ uri: data.item.product.image }}
            alt='{data.item.name}'
            w="full"
            h={24}
            resizeMode="contain"
          />
        </Center>
        <VStack w="60%" px={2} space={2}>
          <Text isTruncated color={Colors.black} bold fontSize={10}>
            {data.item.product.name}
          </Text>
          <Text bold color={Colors.lightBlack}>
            ${data.item.product.price}
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
            {data.item.qty}
          </Button>
        </Center>
      </HStack>
    </Box>
  </Pressable>
);

// Hidden
const hiddenItem = (dataitem) => (

  <Pressable
    w={50}
    roundedTopRight={10}
    roundedBottomRight={10}
    h="88%"
    ml="auto"
    justifyContent="center"
    bg={Colors.red}
  >
    <Button  onPress={() =>  
      AsyncStorage.getItem('cart').then((cart)=>{
        if (cart !== null) {
          const cartItem = JSON.parse(cart)
         const a = cartItem.filter(item =>  item.product._id !== dataitem.item.product._id)
         AsyncStorage.setItem('cart',JSON.stringify(a));
        }
      })
      .catch((err)=>{
        alert(err)
      })
    }>
      <Center alignItems="center" space={2}>
        <FontAwesome name="trash" size={24} color={Colors.white} />
      </Center>
    </Button>
  </Pressable>
);

const CartIterms = (props) => {
  
  return (
    <Box mr={6}>
      <Swiper item={props} />
    </Box>
  );
};

export default CartIterms;
