import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Pressable,
  Text,
  View,
  VStack,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "../color";
import axios from "axios";

function RegisterScreen({ navigation }) {
 const [email, setEmail] = useState(null)
 const [password, setPassword] = useState(null)
 const [name, setName] = useState(null)

 const register = ( name, email, password ) => {
  axios.post(` https://e289-113-191-232-148.ap.ngrok.io/api/users`, {
      name,
      email,
      password,
    })
    .then(res => {
      let userInfo = res.data;
      navigation.navigate("Bottom")
      console.log(userInfo);
    })
    .catch(e => {
      console.log(`register error ${e}`);
      // setIsLoading(false);
    });
}; 
const onChangeName = (e) => {
  setName(e.target.value);
};
const onChangeEmail = (e) => {
  setEmail(e.target.value);
};
const onChangePassword = (e) => {
  setPassword(e.target.value);
};

console.log(name)
  return (
    <Box flex={1} bg={Colors.black}>
      <Image
        flex={1}
        alt="Logo"
        resizeMode="cover"
        size="lg"
        w="full"
        source={require("../../assets/cover.png")}
      />
      <Box
        w="full"
        h="full"
        position="absolute"
        top="0"
        px="6"
        justifyContent="center"
      >
        <Heading>SIGN UP</Heading>
        <VStack space={5} pt="6">
          {/* USERNAME */}
          <Input
            InputLeftElement={
              <FontAwesome name="user" size={20} color={Colors.main} />
            }
            variant="underlined"
            placeholder="John Doe"
            w="70%"
            pl={2}
            type="text"
            color={Colors.main}
            borderBottomColor={Colors.underline}
            value={name}
            onChange ={onChangeName}
          />
          {/* EMAIL */}
          <Input
            InputLeftElement={
              <MaterialIcons name="email" size={20} color={Colors.main} />
            }
            variant="underlined"
            placeholder="user@gmail.com"
            w="70%"
            pl={2}
            type="text"
            color={Colors.main}
            borderBottomColor={Colors.underline}
            value={email}
            onChange ={onChangeEmail}
          />
          {/* PASSWORD */}
          <Input
            InputLeftElement={
              <Ionicons name="eye" size={20} color={Colors.main} />
            }
            variant="underlined"
            placeholder="*********"
            w="70%"
            type="password"
            pl={2}
            color={Colors.main}
            borderBottomColor={Colors.underline}
            value={password}
            onChange = {onChangePassword}
          />
        </VStack>
        <Button
          _pressed={{
            bg: Colors.main,
          }}
          my={30}
          w="40%"
          rounded={50}
          bg={Colors.main}
          onPress={() => {register(name, email, password)}}
          // onPress={() => navigation.navigate("Bottom")}

        >
          SIGN UP
        </Button>
        <Pressable mt={4} onPress={() => navigation.navigate("Login")}>
          <Text color={Colors.deepestGray}>LOGIN</Text>
        </Pressable>
      </Box>
    </Box>
  );
}

export default RegisterScreen;
