import {
  Box,
  Flex,
  Heading,
  Image,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";
import products from "../data/Products";
import Colors from "../color";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

function HomeProducts() {
  const navigation = useNavigation();
  let prod = [];
  const [data, setData]= useState([])
  useEffect( () =>{
    getBook();
    console.log(data)
  },[])

  const getBook = async () =>{
    const response = await axios.get("http://localhost:5000/api/products")
    if(response.status === 200) {
      setData(response.data)
    }
  }
  // data.map(item => console.log(item))
  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <Flex
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        px={6}
      >
        {data.map((product) => (
          <Pressable
            onPress={() => navigation.navigate("Single", product)}
            key={product._id}
            w="47%"
            bg={Colors.white}
            rounded="md"
            shadow={2}
            pt={0.3}
            my={3}
            pb={2}
            overflow="hidden"
          >
            <Image
              source={{ uri: product.image }}
              alt={product.name}
              w="full"
              h={24}
              resizeMode="contain"
            />
            <Box px={4} pt={1}>
              <Heading size="sm" bold>
                ${product.price}
              </Heading>
              <Text fontSize={10} mt={1} isTruncated w="full">
                {product.name}
              </Text>
              <Rating value={product.rating} />
            </Box>
          </Pressable>
        ))}
      </Flex>
    </ScrollView>
  );
}

export default HomeProducts;
