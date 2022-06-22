import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPassword] = useState("");
  // const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  function handleClick() {
    setShow(!show);
  }

  async function submitHandler() {
    setLoading(true);
    if (!name || !email || !password || !confirmPass) {
      toast({
        title: "Please Enter all Fields",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPass) {
      toast({
        title: "Confirm Password do not match ",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const randomNumber = Math.round(Math.random() * 1000);

      // const pic = `https://api.multiavatar.com/4645646/${randomNumber}`;
      // console.log("Pic ", pic);
      const { data } = await axios.post(
        "/api/user",
        { name, email, password },
        config
      );

      toast({
        title: "SignUp Successful",
        status: "success",
        duration: 2000,
        isClosable: false,
        position: "top",
      });

      //  we store the data of user in localStorage for later use
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/chats");
      window.location.reload();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: false,
        position: "top",
      });
      setLoading(false);
    }
  }

  return (
    <VStack spacing={5}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></Input>
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></Input>
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></Input>
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        SignUp
      </Button>
    </VStack>
  );
};

export default SignUp;
