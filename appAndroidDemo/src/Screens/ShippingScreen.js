import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  FormControl,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import Colors from "../color";
import Buttone from "../Components/Buttone";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ShippingInputs = [
  {
    label: "ENTER CITY",
    type: "text",
  },
  {
    label: "ENTER COUNTRY",
    type: "text",
  },
  {
    label: "ENTER POSTAL CODE",
    type: "text",
  },
  {
    label: "ENTER ADDRESS",
    type: "text",
  },
];

function ShippingScreen() {
  const navigation = useNavigation();

  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [postalCode, setPostal] = useState(null);
  const [address, setAddress] = useState(null);

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };
  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const onChangePostal= (e) => {
    setPostal(e.target.value);
  };
  const onChangeAddress= (e) => {
    setAddress(e.target.value);
  };
  
  const handleShipping = () => {
    AsyncStorage.getItem('shipping').then(()=>{
      const shippingAdres  = []
      shippingAdres.push({city,country,postalCode,address})
      AsyncStorage.setItem('shipping',JSON.stringify(shippingAdres));
  })
  .catch((err)=>{
    alert(err)
  })
    navigation.navigate("Checkout")
  }
  
  return (
    <Box flex={1} safeAreaTop bg={Colors.main} py={5}>
      {/* Header */}
      <Center pb={15}>
        <Text color={Colors.white} fontSize={14} bold>
          DELIVERY ADDRESS
        </Text>
      </Center>
      {/* Inputs */}
      <Box h="full" bg={Colors.white} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>

              <FormControl>
                <FormControl.Label
                  _text={{
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                ENTER CITY
                </FormControl.Label>
                <Input
                  borderWidth={0.2}
                  borderColor={Colors.main}
                  bg={Colors.subGreen}
                  py={4}
                  type="text"
                  color={Colors.main}
                  _focus={{
                    bg: Colors.subGreen,
                    borderWidth: 1,
                    borderColor: Colors.main,
                  }}
                  onChange={onChangeCity}

                />
               
                <FormControl.Label
                _text={{
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
              ENTER COUNTRY
              </FormControl.Label>
              <Input
                borderWidth={0.2}
                borderColor={Colors.main}
                bg={Colors.subGreen}
                py={4}
                type="text"
                color={Colors.main}
                _focus={{
                  bg: Colors.subGreen,
                  borderWidth: 1,
                  borderColor: Colors.main,
                }}
                onChange={onChangeCountry}

              />

              <FormControl.Label
                  _text={{
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                ENTER POSTAL CODE
                </FormControl.Label>
                <Input
                  borderWidth={0.2}
                  borderColor={Colors.main}
                  bg={Colors.subGreen}
                  py={4}
                  type="text"
                  color={Colors.main}
                  _focus={{
                    bg: Colors.subGreen,
                    borderWidth: 1,
                    borderColor: Colors.main,
                  }}
                  onChange={onChangePostal}

                />

                <FormControl.Label
                  _text={{
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                ENTER ADDRESS
                </FormControl.Label>
                <Input
                  borderWidth={0.2}
                  borderColor={Colors.main}
                  bg={Colors.subGreen}
                  py={4}
                  type="text"
                  color={Colors.main}
                  _focus={{
                    bg: Colors.subGreen,
                    borderWidth: 1,
                    borderColor: Colors.main,
                  }}
                  onChange={onChangeAddress}

                />

              </FormControl>
            <Buttone
              onPress={ handleShipping}
              bg={Colors.main}
              color={Colors.white}
              mt={5}
            >
              CONTINUE
            </Buttone>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

export default ShippingScreen;
