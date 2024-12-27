import { Container, Flex, Text, Box, IconButton } from '@chakra-ui/react'
import React from 'react'
import CreateContactModel from './CreateContactModel'
import { useNavigate } from 'react-router-dom'
import { toaster } from './ui/toaster'
import { BiLogOut } from 'react-icons/bi'
const Navbar = ({setContacts,setIsLogged,currentUser,setCurrentUser}) => {
    const navigate=useNavigate();
    return (
        <>
        <Text
            display={{base:"none",xl:"block"}}
            position={"absolute"}
            top={"17px"}
            left={"2%"}
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
        </Text>
        <Container maxW={"850px"}>
            <Box
                px={6}
                borderTopRadius={0}
                borderBottomRadius={100}
                boxShadow={"md"}
                bg={'teal.800'}
            >
                <Flex
                    h="20"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Text 
                        fontSize={"30px"}
                        color={"whiteAlpha.600"}
                        fontWeight={"bold"}
                        px={4}
                        py={2}
                    >
                        {currentUser}
                    </Text>
                    <CreateContactModel setContacts={setContacts}/>
                    <IconButton
                        variant={"link"}
                        mr={2}
                        aria-label="Wyloguj"
                        bg="teal.800"
                        color="red.400"
                        _hover={{ bg: "whiteAlpha.300",transform:"scale(1.1)"}}
                        transition="all 0.2s ease-in-out"
                        onClick={()=>{
                            localStorage.clear()
                            setIsLogged(false)
                            setContacts([])
                            setCurrentUser(null)
                            navigate("/api/login")
                            toaster.create({
                                type: 'success',
                                title: 'Wylogowano😒',
                                description: 'Wylogowano cie z konta.',
                                duration: 2000,
                            })
                        }}
                    >
                        <BiLogOut />
                    </IconButton>                   
                </Flex>
            </Box>
        </Container>
        </>
    )
}

export default Navbar