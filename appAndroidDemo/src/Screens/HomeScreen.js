import { Box, Text, View } from "native-base";
import React from "react";
import Colors from "../color";
import HomeProducts from "../Components/HomeProducts";
import HomeSearch from "../Components/HomeSearch";
import SliderScreen from "./SliderScreen";

function HomeScreen() {
  return (
    <Box flex={1} bg={Colors.subGreen}>
      <HomeSearch />
      <HomeProducts />
    </Box>
  );
}

export default HomeScreen;
