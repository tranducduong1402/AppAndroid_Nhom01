import {
  Button,
  Center,
  HStack,
  Image,
  Modal,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useState,useEffect } from "react";
import Buttone from "./Buttone";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderModel = () => {

  const [cart, setCart] = useState([]);
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

  let total = 0;
  for(var i=0 ;i < cart.length ;i++){
    total += cart[i].product.price * cart[i].qty;
  }
 
 const addDecimals =(num) => {
   return (Math.round(num *100)/100).toFixed(2);
 }
 let shippingPrice = addDecimals(total > 200 ?0 :50)
 let taxPrice = addDecimals(Number((0.1 * total).toFixed(2)))
 const totalPrice = (
   Number(total) + Number(shippingPrice) + Number(taxPrice)
 )

 const OrdersInfos = [
  {
    title: "Products",
    price: `${total}`,
    color: "black",
  },
  {
    title: "Shipping",
    price: `${shippingPrice}`,
    color: "black",
  },
  {
    title: "Tax",
    price: `${taxPrice}`,
    color: "black",
  },
  {
    title: "Total Amount",
    price: `${totalPrice}`,
    color: "main",
  },
];
  const navigation = useNavigation();
  const [showModel, setShowModel] = useState(false);
  return (
    <Center>
      <Buttone
        onPress={() => setShowModel(true)}
        bg={Colors.main}
        color={Colors.white}
        mt={5}
      >
        SHOW PAYMENT & TOTAL
      </Buttone>
      <Modal isOpen={showModel} onClose={() => setShowModel(false)} size="lg">
        <Modal.Content maxWidth={350}>
          <Modal.CloseButton />
          <Modal.Header>Order</Modal.Header>
          <Modal.Body>
            <VStack space={7}>
              {OrdersInfos.map((i, index) => (
                <HStack
                  key={index}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text fontWeight="medium">{i.title}</Text>
                  <Text
                    color={i.color === "main" ? Colors.main : Colors.black}
                    bold
                  >
                    ${i.price}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Pressable
              w="full"
              justifyContent="center"
              bg={Colors.paypal}
              h={45}
              rounded={3}
              overflow="hidden"
              onPress={() => setShowModel(false)}
            >
              <Image
                source={require("../../assets/images/paypal.png")}
                alt="paypal"
                resizeMode="contain"
                w="full"
                h={34}
              />
            </Pressable>
            <Button
              w="full"
              mt={2}
              bg={Colors.black}
              h={45}
              _text={{
                color: Colors.white,
              }}
              onPress={() => {
                navigation.navigate("Home");
                setShowModel(false);
                AsyncStorage.removeItem("cart");
              }}
              _pressed={{
                bg: Colors.black,
              }}
            >
              PAY LATER
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default OrderModel;
