import { Center, Heading, Image, Text } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import Colors from "../color";
import Tabs from "../Components/Profile/Tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileScreen() {
const [profile, setProfile] = useState("");

  useEffect (() =>{
    AsyncStorage.getItem('userInfo').then((info)=>{
      if (info !== null) {
        const infomation = JSON.parse(info)
        setProfile(infomation);  
      }
    })
    .catch((err)=>{
      alert(err)
    })
  },[])

  return (
    <>
      <Center bg={Colors.main} pt={10} pb={6}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/zpune/image/upload/v1645429478/random/user_u3itjd.png",
          }}
          alt="profile"
          w={24}
          h={24}
          resizeMode="cover"
        />
        <Heading bold fontSize={15} isTruncated my={2} color={Colors.white}>
        {profile.name}
         </Heading>
        <Text italic fontSize={10} color={Colors.white}>
        {profile.email}
        </Text>
      </Center>
      {/* TABS */}
      <Tabs />
    </>
  );
}

export default ProfileScreen;
