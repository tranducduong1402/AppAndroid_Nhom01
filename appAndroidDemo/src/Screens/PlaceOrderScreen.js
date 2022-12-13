import { Box, Heading, ScrollView, Text, View } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import Colors from "../color";
import OrderInfo from "../Components/OrderInfo";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import OrderIterm from "../Components/OrderIterm";
import PlaceOrderModel from "../Components/PlaceOrderModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

function PlaceOrderScreen({route}) {
  const [user, setuser] = useState("");
  const shippingAdress = route.params;

  useEffect (() => {
    AsyncStorage.getItem('userInfo').then((datauser)=>{
      if (datauser !== null) {
        // We have data!!
        const userinfo = JSON.parse(datauser)
        setuser(userinfo)
      }
    })
    .catch((err)=>{
      alert(err)
    })

  },[user._id])
 
  return (
    <Box bg={Colors.subGreen} flex={1} safeArea pt={6}>
      <Box>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <OrderInfo
            title="CUSTOMER"
            subTitle={user.name}
            text={user.email}
            icon={<FontAwesome name="user" size={30} color={Colors.white} />}
          />
          <OrderInfo
            title="SHIPPING INFO"
            subTitle= {`Shipping: ${route.params.city}`}
            text="Pay Method: PayPal"
            icon={
              <FontAwesome5
                name="shipping-fast"
                size={30}
                color={Colors.white}
              />
            }
          />
          <OrderInfo
            title="DELIVER TO"
            subTitle="Address:"
            text = {`${route.params.city}, ${route.params.address}, ${route.params.postalCode}`}
            icon={
              <Ionicons name="location-sharp" size={30} color={Colors.white} />
            }
          />
        </ScrollView>
      </Box>
      {/* Order Iterm */}
      <Box px={6} flex={1} pb={3}>
        <Heading bold fontSize={15} isTruncated my={4}>
          PRODUCTS
        </Heading>
        <OrderIterm  />
        {/* Total */}
        <PlaceOrderModel data ={shippingAdress}/>
      </Box>
    </Box>
  );
}

export default PlaceOrderScreen;
