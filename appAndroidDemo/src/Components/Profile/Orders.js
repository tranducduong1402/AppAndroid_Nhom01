import { Box, Button, HStack, ScrollView, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import Colors from "../../color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from 'moment';

const Orders = () => {
  const [dataOrder, setdata] = useState([]);
  
  useEffect (() =>{
    AsyncStorage.getItem('userInfo').then((info)=>{
   
        const infomation = JSON.parse(info)
        const response = axios.get(`http://localhost:5000/api/orders/${infomation._id}`).then((relust) => {
          setdata(relust.data)
        })
         
      
    })
    .catch((err)=>{
      alert(err)
    })
  },[])
  // console.log(dataOrder)

  return (
    <Box h="full" bg={Colors.white} pt={5}>
      <ScrollView showsVerticalScrollIndicator={false}>
      
      
        { dataOrder.map((item) =>  
          <Pressable>
          <HStack
            space={4}
            justifyContent="space-between"
            alignItems="center"
            py={5}
            px={2}
          >
            <Text fontSize={9} color={Colors.blue} isTruncated>
            {item.user}
            </Text>
            <Text fontSize={12} bold color={Colors.black} isTruncated>
             {item.isPaid ? "PAID": "NOT PAID"}
            </Text>
            <Text fontSize={11} italic color={Colors.black} isTruncated>
             {moment(item.createdAt).format("DD/MM/YY")}
            </Text>
            <Button
              px={7}
              py={1.5}
              rounded={50}
              bg={Colors.red}
              _text={{
                color: Colors.white,
              }}
              _pressed={{
                bg: Colors.red,
              }}
            >
              {`${item.totalPrice}$`}
            </Button>
          </HStack>
        </Pressable>
          
          )}
        {/* Not Paid */}
        
      </ScrollView>
    </Box>
  );
};

export default Orders;
