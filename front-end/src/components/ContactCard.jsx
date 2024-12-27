import { Box, Card, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import { Avatar } from "./ui/avatar"
import React from 'react'
import { BiTrash } from "react-icons/bi"
import EditContact from './EditContact'
import { BASE_URL } from '../App'
import { toaster } from "./ui/toaster"

const ContactCard = ({contact,setContacts}) => {
    const handleDeleteContact = async (e) => {
        try{
            const response = await fetch(BASE_URL + "/kontakty/" + contact.id,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
            })
            const data=await response.json()
            if(!response.ok){
                throw new Error(data.error)
            }
            setContacts((prevContacts)=>prevContacts.filter((c)=>c.id != contact.id))
            toaster.create({
                type: "success",
                title: "Brawo🙌",
                description: "Kontakt został usunięty.",
                duration: 2000
            })
        }catch(error){
            toaster.create({
                type: "error",
                title: "Wystąpił błąd",
                description: error.message,
                duration: 4000
            })
        }
        
    }
  return (
    <Card.Root 
        bg="teal.900" 
        bgColor="teal.900/90" 
        border="2px solid"
        borderColor="whiteAlpha.200"
        borderRadius={20}
    >
        <Card.Header>
            <Flex gap={4}>
                <Flex flex={"1"} gap={4} alignItems={"center"}>
                    <Avatar src={contact.imgUrl}/>
                    <Box>
                        <Heading
                            fontSize={"18px"}
                            color={"yellow.300"}

                        >
                            {contact.name} {contact.surname}
                        </Heading>
                        <Text
                            fontSize={"12px"}
                            color={"whiteAlpha.400"}
                        >
                            {contact.role} 
                        </Text>
                        <Text
                            fontSize={"20px"}
                            color={"yellow.200"}
                        >
                            {contact.email} 
                        </Text>
                    </Box>
                </Flex>
                <Flex>
                    <EditContact contact={contact} setContacts={setContacts} />
                    <IconButton 
                        color={"red.700"}
                        variant="ghost"
                        size={"sm"}
                        aria-label="Zobacz menu"
                        _hover={{ bg: "whiteAlpha.300", transform: "scale(1.1)" }}
                        transition="all 0.2s ease-in-out"
                        onClick={handleDeleteContact}
                    >
                        <BiTrash size={30} />
                    </IconButton>
                </Flex>
            </Flex>
        </Card.Header>
        <Card.Body>
            <Text 
                fontFamily={"Pacific"}
                fontSize={"17px"}
                color={'whiteAlpha.700'}
            >
                {contact.description}
            </Text>
        </Card.Body>
    </Card.Root>
  )
}

export default ContactCard