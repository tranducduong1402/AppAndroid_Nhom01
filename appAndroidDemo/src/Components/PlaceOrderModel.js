import { Button, Center, HStack, Modal, Text, Toast, VStack } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import Buttone from "./Buttone";
import Colors from "../color";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const PlaceOrderModel = ( props) => {
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

  const [id, setid] = useState("");

  useEffect (() =>{
    AsyncStorage.getItem('userInfo').then((info)=>{
      if (info !== null) {
        const infomation = JSON.parse(info)
        setid(infomation._id);  
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
  const orderItems =[];
  const shippingAddress = props.data;
  const paymentMethod= "PayPal";
  cart.map(item =>  orderItems.push({
    name: item.product.name,
    qty: item.qty,
    image:item.product.image,
    price:item.product.price,
    product:item.product._id
  }))
 console.log(orderItems)
  //ca;l api order
  const handleOrder =() => {
    axios.post(`http://localhost:5000/api/orders/${id}`, {
      user:id,
      orderItems ,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice
    })
    .then(res => {
      AsyncStorage.removeItem("cart")
        navigation.navigate("order");
        setShowModel(false);
      alert("thanhcong")
    })
    .catch(e => {
   
    });
    
  }
  return (
    <Center>
      <Buttone
        onPress={() => setShowModel(true)}
        bg={Colors.black}
        color={Colors.white}
        mt={5}
      >
        SHOW TOTAL
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
            <Button
              flex={1}
              bg={Colors.main}
              h={45}
              _text={{
                color: Colors.white,
              }}
              onPress={handleOrder}
              _pressed={{
                bg: Colors.main,
              }}
            >
              PLACE AN ORDER
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default PlaceOrderModel;
