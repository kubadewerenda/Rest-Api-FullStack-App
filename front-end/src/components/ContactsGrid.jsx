import { Flex, Grid, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ContactCard from './ContactCard'
import { BASE_URL } from '../App';
import { toaster } from "./ui/toaster"
import DividerLine from './DividerLine';

const ContactsGrid = ({contacts,setContacts}) => {
  const [isLoading,setIsLoading]=useState(true);

  useEffect(()=>{
    const getContacts = async () => {
      try {
        const response= await fetch(BASE_URL+"/kontakty",{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        })
        
        const data= await response.json();

        if(!response.ok){
          throw new Error(data.error);
        }

        setContacts(data);

      }catch(error){
        console.error(error)
        toaster.create({
          type: "error",
          title: "Wystąpił błąd",
          description: error.message,
          duration: 4000
      })
      }finally{
        setIsLoading(false);
      }
    }    
    getContacts();
  },[setContacts]);

  return (
      <>
          <DividerLine mt={"0px"}/>
          <Grid
              gap={4}
              ml={20}
              mr={20}
              mb={40}
              templateColumns={{
                  base: "1fr",
                  md: "repeat(2,1fr)",
                  lg: "repeat(3,1fr)"
              }}
          >
              {contacts.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} setContacts={setContacts} />
              ))}
          </Grid>
          {isLoading && (
              <Flex justifyContent="center" alignItems="center" minH="60vh">
                  <Spinner size="xl" thickness="4px" color="teal.500" speed="0.65s" />
              </Flex>
          )}
          {!isLoading && contacts.length==0 && (
              <Flex justifyContent={"center"}>
                  <Text fontSize={"xl"}>
                      <Text as={"span"} fontSize={"25px"} fontWeight={"bold"} mr={2} color={"whiteAlpha.600"}>
                        Brak kontaktów, dodaj klikając ➕ powyżej!
                      </Text>
                  </Text>
              </Flex>
          )}

      </>
    )
}

export default ContactsGrid