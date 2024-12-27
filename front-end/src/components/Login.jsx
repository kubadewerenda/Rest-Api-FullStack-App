import React, { useState } from 'react'
import { Box, Button, Container, Input, Text, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../App'
import { toaster } from './ui/toaster'
import Description from "./Description"

const Login = ({setUsername,setPassword,setIsLogged,setCurrentUser}) => {
    const [inputs,setInputs]=useState({
        user_name:"",
        password_hash:""
    })
    const [isLoading,setIsLoading]=useState(false);
    const navigate=useNavigate();

    const handleLogin= async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const response=await fetch(BASE_URL+"/login", {
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(inputs),
            })

            const data=await response.json();
            if(!response.ok){
                throw new Error(data.error)
            }

            setUsername((prevUsername)=>[...prevUsername,data]);
            setPassword((prevPassword)=>[...prevPassword,data]);

            localStorage.setItem("token",data.access_token);
            setIsLogged(true);
            setCurrentUser(inputs.user_name)
            localStorage.setItem("username",inputs.user_name)

            toaster.create({
                type:'success',
                title:'Zalogowano pomyślnie',
                description:'Zostałeś zalogowany.',
                duration: 2000,
            })
            setInputs({
                user_name:"",
                password_hash:"",
            })

            navigate("/api/kontakty");

        }catch(error){
            toaster.create({
                type:"error",
                title:"Błąd logowania",
                description:error.message,
                duration:4000
            })
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <>
            <Container maxW="1200px">
                <Box
                    justifyContent={"center"}
                    pt={10}
                >
                    <Description text={"Menadżer kontaktów"}/>
                </Box>
            </Container>
            <Container maxW="600px">  
                <Box 
                    position="fixed" 
                    top="50%" 
                    left="50%" 
                    transform="translate(-50%, -50%)" 
                    bg="teal.900" 
                    bgColor="teal.900/90" 
                    borderRadius={20} 
                    px={6}
                    py={4}
                    boxShadow="0px 4px 15px rgba(0, 0, 0, 0.4)"
                    border="2px solid"
                    borderColor="whiteAlpha.400" 
                    zIndex={10} 
                    maxW="600px"
                    w="full"
                >
                    <Text 
                        as="h2" 
                        fontSize="35px" 
                        fontWeight="bold" 
                        color="yellow.200"
                        fontFamily="Georgia"
                        textAlign={"center"}
                    >
                        Logowanie
                    </Text>
                    <form onSubmit={handleLogin}>
                        <Input 
                            placeholder="Nazwa użytkownika"
                            value={inputs.user_name}
                            onChange={(e)=>setInputs({...inputs,user_name:e.target.value})}
                            mt={4}
                            mb={4}
                            borderRadius="md"
                            bg="whiteAlpha.200"
                            color="whiteAlpha.900"
                        />

                        <Input 
                            type="password"
                            placeholder="Hasło"
                            value={inputs.password_hash}
                            onChange={(e)=>setInputs({...inputs,password_hash:e.target.value})}
                            mb={4}      
                            borderRadius="md"
                            bg="whiteAlpha.200"
                            color="whiteAlpha.900"              
                        />
                        <Flex
                            justifyContent={"center"}
                        >
                            <Button 
                                bg="yellow.200"
                                color="teal.700" 
                                type='submit' 
                                isLoading={isLoading}
                                _hover={{
                                    transform:"scale(1.1)"                                                
                                }}
                                transition="all 0.2s ease-in-out"
                            >
                                Zaloguj
                            </Button>
                        </Flex>
                    </form>
                    <Box mt={4}>
                        <Text 
                            fontFamily={"Pacific"}
                            fontSize={"15px"}
                            color="white"
                        >
                            Nie masz konta?{' '}
                            <Button variant="link" onClick={() => navigate('/api/register')} color="yellow.300">
                                Zarejestruj się
                            </Button>
                        </Text>
                    </Box>
                </Box>
            </Container>
            <Box
                position={"absolute"}
                bottom={"10%"}
                left={"50%"}
                transform="translateX(-50%)"
            >
                <Text 
                    as="span" 
                    fontSize={"32px"} 
                    fontWeight={"bold"} 
                    bgGradient="to-r" 
                    gradientFrom="whiteAlpha.500" 
                    gradientTo="whiteAlpha.200"
                    bgClip={"text"}
                >
                    Dew'sManager
                </Text>
            </Box>
        </>
    )
}

export default Login