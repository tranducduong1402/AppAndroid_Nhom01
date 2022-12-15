import { Box, FormControl, Input, ScrollView, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import Colors from "../../color";
import Buttone from "../Buttone";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Profile = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangePassword= (e) => {
    setPassword(e.target.value);
  };
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
  
  const update = (name, email, password ) => {
    axios.put(`http://localhost:5000/profile/${id}`, {
        email,
        password,
        name,
      })
      .then(res => {
          navigation.navigate("Bottom")
      })
      .catch(e => {
        console.log(`update error ${e}`);
      });
  }; 
  return (
    <Box h="full" bg={Colors.white} px={5}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={10} mt={5} pb={10}>
          <FormControl>
            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              USERNAME
            </FormControl.Label>
            <Input
              borderWidth={0.2}
              bg={Colors.subGreen}
              borderColor={Colors.main}
              py={4}
              type="text"
              color={Colors.main}
              fontSize={15}
              _focus={{
                bg: Colors.subGreen,
                borderColor: Colors.main,
                borderWidth: 1,
              }}
              onChange={onChangeName}
            />

            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              EMAIL
            </FormControl.Label>
            <Input
              borderWidth={0.2}
              bg={Colors.subGreen}
              borderColor={Colors.main}
              py={4}
              type="text"
              color={Colors.main}
              fontSize={15}
              _focus={{
                bg: Colors.subGreen,
                borderColor: Colors.main,
                borderWidth: 1,
              }}
              onChange={onChangeEmail}
            />

            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              PASSWORD
            </FormControl.Label>
            <Input
              borderWidth={0.2}
              bg={Colors.subGreen}
              borderColor={Colors.main}
              py={4}
              type="password"
              color={Colors.main}
              fontSize={15}
              _focus={{
                bg: Colors.subGreen,
                borderColor: Colors.main,
                borderWidth: 1,
              }}
              onChange={onChangePassword}
            />


            <FormControl.Label
            _text={{
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
          CONFIRM
          </FormControl.Label>
          <Input
            borderWidth={0.2}
            bg={Colors.subGreen}
            borderColor={Colors.main}
            py={4}
            type="password"
            color={Colors.main}
            fontSize={15}
            _focus={{
              bg: Colors.subGreen,
              borderColor: Colors.main,
              borderWidth: 1,
            }}
            
          />  
          </FormControl>

          <Buttone bg={Colors.main} color={Colors.white}           
          onPress={() => {update( name,email, password)}}
          >
            UPDATE PROFILE
          </Buttone>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Profile;
