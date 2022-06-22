import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import { useEffect } from "react";

import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) history.push("/chats"); // is user already logged in redirect to chats page
  }, [history]);

  return (
    <div className="section-wrapper">
      <Container className="main-container" maxWidth="xl">
        <Box
          d="flex"
          justifyContent="center"
          p={2}
          m={"100px 0 15px 0"}
          // bg="#3182ce"
          color="black"
          fontWeight="bold"
          fontFamily="Work sans"
          borderRadius={10}
          // borderWidth="3px"
          borderColor={"gray"}
        >
          <Text fontSize="4xl" fontFamily="Worsk sans">
            Hangouts 📱
          </Text>
        </Box>
        <Box
          bg="rgb(255 255 255 / 92%);"
          w="100%"
          p={4}
          color="black"
          borderRadius="10"
          borderWidth="2px"
          borderColor={"gray"}
        >
          <Tabs variant="soft-rounded">
            <TabList mb="1em">
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
