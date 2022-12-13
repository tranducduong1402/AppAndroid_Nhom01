import { Box, Button, HStack, ScrollView, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import Colors from "../../color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Orders = () => {
  const [dataOrder, setdata] = useState([]);

  useEffect (() =>{
    AsyncStorage.getItem('userInfo').then((info)=>{
      if (info !== null) {
        const infomation = JSON.parse(info)
        const response = axios.get(`http://localhost:5000/api/orders/${infomation._id}`)
        if(response.status === 200) {
          setData(response.data)
        }
  }
    })
    .catch((err)=>{
      alert(err)
    })
  },[])
 console.log(dataOrder)

  return (
    <Box h="full" bg={Colors.white} pt={5}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Paid Order */}

           
          <Pressable>
          <HStack
            space={4}
            justifyContent="space-between"
            alignItems="center"
            bg={Colors.deepGray}
            py={5}
            px={2}
          >
            <Text fontSize={9} color={Colors.blue} isTruncated>
            12
            </Text>
            <Text fontSize={12} bold color={Colors.black} isTruncated>
              PAID
            </Text>
            <Text fontSize={11} italic color={Colors.black} isTruncated>
              Dec 12 2022
            </Text>
            <Button
              px={7}
              py={1.5}
              rounded={50}
              bg={Colors.main}
              _text={{
                color: Colors.white,
              }}
              _pressed={{
                bg: Colors.main,
              }}
            >
              $456
            </Button>
          </HStack>
        </Pressable>

      
        
        {/* Not Paid */}
        <Pressable>
          <HStack
            space={4}
            justifyContent="space-between"
            alignItems="center"
            py={5}
            px={2}
          >
            <Text fontSize={9} color={Colors.blue} isTruncated>
              64645383844766557
            </Text>
            <Text fontSize={12} bold color={Colors.black} isTruncated>
              NOT PAID
            </Text>
            <Text fontSize={11} italic color={Colors.black} isTruncated>
              Jan 12 2021
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
              $23
            </Button>
          </HStack>
        </Pressable>
      </ScrollView>
    </Box>
  );
};

export default Orders;
