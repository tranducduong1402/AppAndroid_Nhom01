import React, { useEffect, useState } from "react";
import {
  Box,
  CheckIcon,
  FormControl,
  Heading,
  Select,
  Text,
  TextArea,
  VStack,
} from "native-base";
import Colors from "../color";
import Rating from "./Rating";
import Message from "./Notfications/Message";
import Buttone from "./Buttone";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { RefreshControl } from "react-native";

export default function Review( route ) {
  const [rating, setRatings] = useState("");
  const [comment, setComment] = useState("");
  const [render, setrender] =useState(false);
  const [reload, setReload] =useState(false);
  const [fail,setfail] = useState(false)

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
 useEffect(() => {
 },[render])

  const ReviewProduct = ( rating, comment ) => {
    axios.post(`http://localhost:5000/api/products/${route.data._id}/${id}/review`, {
        rating,
        comment,
      })
      .then(res => {
        setReload(true)
        setTimeout(() => {
          setReload(false)
        },10000)
      })
      .catch(e => {
        fail(true)
        console.log(`register error ${e}`);
        // setIsLoading(false);
      });
  }; 


  return (
    <Box my={9} >
      <Heading bold fontSize={15} mb={2}>
        REVIEW
      </Heading>
      {/* IF THERE IS NO REVIEW */}
      {/* <Message
        color={Colors.main}
        bg={Colors.deepGray}
        bold
        children={"NO REVIEW"}
      /> */}
      {/* REVIEW */}
      {route.data.reviews.map((review) => (
        <Box p={3} bg={Colors.deepGray} mt={5} rounded={5}  refreshControl = {
          <RefreshControl refreshing= {reload}/>
        }>
        <Heading fontSize={15} color={Colors.black}>
        {review.name}
        </Heading>
        <Rating value={review.rating} />
        <Text my={2} fontSize={11}>
         {review.createdAt}
        </Text>
        <Message
          color={Colors.black}
          bg={Colors.white}
          size={10}
          children={
            review.comment
          }
        />
      </Box>

      ))}
      
      {/* WRITE REVIEW */}
      <Box mt={6}>
        <Heading fontSize={15} bold mb={4}>
          REVIEW THIS PRODUCT
        </Heading>
        <VStack space={6}>
          <FormControl>
            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Rating
            </FormControl.Label>
            <Select
              bg={Colors.subGreen}
              borderWidth={0}
              rounded={5}
              py={4}
              placeholder="Choose Rate"
              _selectedItem={{
                bg: Colors.subGreen,
                endIcon: <CheckIcon size={3} />,
              }}
              selectedValue={rating}
              onValueChange={itemValue => setRatings(itemValue)}
            >
              <Select.Item label="1 - Poor" value="1" />
              <Select.Item label="2 - Fair" value="2" />
              <Select.Item label="3 - So Good" value="3" />
              <Select.Item label="4 - Very good" value="4" />
              <Select.Item label="4 - perfect" value="5" />
            </Select>
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Comment
            </FormControl.Label>
            <TextArea
              h={24}
              w="full"
              placeholder="This product is good ....."
              borderWidth={0}
              bg={Colors.subGreen}
              py={4}
              _focus={{
                bg: Colors.subGreen,
              }}
              value ={comment}
              onChange ={(e) => setComment(e.target.value)}
            />
          </FormControl>
          <Buttone bg={Colors.main} color={Colors.white}
          onPress={() => {ReviewProduct(rating, comment)}}
          >
            SUBMIT
          </Buttone>
          {fail ? <Message
            color={Colors.red}
            // bg={Colors.black}
            children={"Ban da review"}
          />  : ""
        }
        </VStack>
      </Box> 
    </Box>
  );
}
