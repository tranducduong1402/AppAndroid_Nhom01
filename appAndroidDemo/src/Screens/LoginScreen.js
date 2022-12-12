import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useContext, useState } from "react";
import Colors from "../color";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
function LoginScreen({ navigation }) {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [userInfo, setUserInfo] = useState({});
 
  const login = ( email, password ) => {
   axios.post('http://localhost:5000/api/users/login', {
       email,
       password,
     })
     .then(res => {
       let userInfo = res.data;
       setUserInfo(userInfo);
         navigation.navigate("Bottom")
       AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
       // setIsLoading(false);
       console.log(userInfo);
     })
     .catch(e => {
       console.log(`login error ${e}`);
       // setIsLoading(false);
     });
 }; 

 const onChangeEmail = (e) => {
   setEmail(e.target.value);
 };
 const onChangePassword = (e) => {
  console.log(e.target.name)
   setPassword(e.target.value);
 };
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
        <Heading>LOGIN</Heading>
        <VStack space={5} pt="6">
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
            value ={email}
            onChange= {onChangeEmail}
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
            value={password}
            borderBottomColor={Colors.underline}
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
          // onPress={() => navigation.navigate("Bottom")}
          onPress={() => {login( email, password)}}

        >
          LOGIN
        </Button>
        <Pressable mt={4} onPress={() => navigation.navigate("Register")}>
          <Text color={Colors.deepestGray}>SIGN UP</Text>
        </Pressable>
      </Box>
    </Box>
  );
}

export default LoginScreen;
