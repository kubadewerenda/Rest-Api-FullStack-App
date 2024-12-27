import React from 'react'
import { BiAddToQueue } from "react-icons/bi"
import { IoClose } from "react-icons/io5";
import { Box, Button, Container, Input, Flex, Textarea, IconButton } from '@chakra-ui/react'
import { Field } from './ui/field';
import { Radio, RadioGroup } from "./ui/radio"
import { toaster } from "./ui/toaster"
import { useState } from 'react'
import { BASE_URL } from '../App';
import isValidEmail from '../functions/validEmail'

const CreateContactModel = ({setContacts}) => {
    const [isOpen,setIsOpen]=useState(false)
    const [isLoading,setIsLoading]=useState(false)
    const [inputs,setInputs]=useState({
        name:"",
        surname:"",
        role:"",
        gender:"",
        description:"",
        email:""
    })

    const handleCreateContact = async (e) => {
        e.preventDefault();

        if(!isValidEmail(inputs.email)){
            toaster.create({
                type: "warning",
                title: "Błędny email",
                description: "Wprowadź poprawny format email!",
                duration: 4000
            })  
            return         
        }

        setIsLoading(true);
        try{
            const response=await fetch(BASE_URL+"/kontakty",{
                method: "POST",
                headers: {
                    "Content-Type": "application/JSON",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(inputs)
            })    
            const data=await response.json();
            if(!response.ok){
                throw new Error(data.error)
            }
            toaster.create({
                type: "success",
                title: "Brawo🙌",
                description: "Kontakt został utworzony.",
                duration: 2000
            })
            closePupUp();
            setContacts((prevContacts)=>[...prevContacts,data])
            setInputs({
                name:"",
                surname:"",
                role:"",
                gender:"",
                description:"",
                email:""
            })
        }catch(error){
            toaster.create({
                type: "error",
                title: "Wystąpił błąd",
                description: error.message,
                duration: 4000
            })
        }finally{
            setIsLoading(false)
        }
    }

    const openPopUp = () => setIsOpen(true)
    const closePupUp = () => setIsOpen(false)
    
    return (
        <>
            <IconButton 
                onClick={openPopUp} 
                aria-label="Dodaj kontakt"
                position={"absolute"}
                left={"46%"}
                bg="teal.800"
                color="teal.400"
                _hover={{ bg: "whiteAlpha.300",transform:"scale(1.1)"}}
                transition="all 0.2s ease-in-out"
            >
                <BiAddToQueue />
            </IconButton>

            {isOpen && (
                <>
                    <Box
                            position="fixed"
                            top="0"
                            left="0"
                            w="100vw"
                            h="100vh"
                            bg="blackAlpha.100"
                            backdropFilter="blur(8px)" 
                            zIndex={9} 
                    />
                    <form onSubmit={handleCreateContact}>
                        <Container maxW={"500px"}>
                            <Box
                                position="fixed" 
                                top="50%" 
                                left="50%" 
                                transform="translate(-50%, -50%)"
                                bgColor="whiteAlpha.300"
                                backdropFilter="blur(10px)"
                                px={8}
                                py={6}
                                borderRadius="lg"
                                boxShadow="0 8px 32px rgba(0, 0, 0, 0.2)"
                                zIndex={10}
                                maxW="500px"
                                w="full"
                                animation="scaleIn 0.3s ease-in-out"
                            >
                                <Button
                                    variant="ghost"
                                    position={"absolute"}
                                    top={4}
                                    right={4}
                                    cursor={"pointer"}
                                    onClick={closePupUp}
                                >
                                    <IoClose />                        
                                </Button>

                                <Box 
                                    textAlign="center" 
                                    mb={4}
                                >
                                    <Box 
                                        as="h2" 
                                        fontSize="35px" 
                                        fontWeight="bold" 
                                        color="yellow.200"
                                        fontFamily="Georgia"
                                    >
                                        Dodaj kontakt
                                    </Box>
                                </Box>

                                <Box
                                    pb={6}
                                >
                                    <Flex
                                        alignItems={"center"}
                                        gap={4}
                                    >
                                        <Field label="Imię" color="yellow.300">
                                            <Input 
                                                placeholder="Jakub" 
                                                value={inputs.name}
                                                onChange={(e)=>setInputs({...inputs, name: e.target.value})}
                                                borderRadius="md"
                                                bg="whiteAlpha.200"
                                                color="whiteAlpha.900"
                                            />
                                        </Field>

                                        <Field label="Nazwisko" color="yellow.300">
                                            <Input 
                                                placeholder="Dewerenda" 
                                                value={inputs.surname}
                                                onChange={(e)=>setInputs({...inputs, surname: e.target.value})}
                                                borderRadius="md"
                                                bg="whiteAlpha.200"
                                                color="whiteAlpha.900"
                                            />
                                        </Field>
                                    </Flex>
                                    <Flex
                                        alignItems={"center"}
                                        gap={4}
                                        mt={4}
                                    >
                                        <Field label="Rola" color="yellow.300">
                                            <Input 
                                                placeholder="Python" 
                                                value={inputs.role}
                                                onChange={(e)=>setInputs({...inputs, role: e.target.value})}
                                                borderRadius="md"
                                                bg="whiteAlpha.200"
                                                color="whiteAlpha.900"
                                            />
                                        </Field>
                                        <Field label="Email" color="yellow.300">
                                            <Input 
                                                placeholder="dewerenda@contact.com"
                                                value={inputs.email}
                                                onChange={(e)=>setInputs({...inputs, email: e.target.value})} 
                                                borderRadius="md"

                                                bg="whiteAlpha.200"
                                                color="whiteAlpha.900"
                                            />
                                        </Field>
                                    </Flex>

                                    <Field label="Opis" mt={4} color="yellow.300">
                                        <Textarea
                                            resize={"none"}
                                            overflowY={"hidden"}
                                            placeholder="Ważny kontakt..."
                                            value={inputs.description}
                                            onChange={(e)=>setInputs({...inputs, description: e.target.value})}
                                            borderRadius="md"
                                            bg="whiteAlpha.200"
                                            color="whiteAlpha.900"
                                        />                              
                                    </Field>

                                    <RadioGroup mt={4}>
                                        <Flex gap={5} alignItems={"center"} justifyContent={"center"}>
                                            <Radio value="male"
                                                onChange={(e)=>setInputs({...inputs, gender: e.target.value})}
                                            >
                                                Mężczyzna
                                            </Radio>
                                            <Radio value="female"
                                                onChange={(e)=>setInputs({...inputs, gender: e.target.value})}
                                            >
                                                Kobieta
                                            </Radio>
                                        </Flex>
                                    </RadioGroup>
                                </Box>

                                <Box mt={10} ml={50} mr={50}>
                                    <Flex alignItems={"center"} justifyContent={"space-between"}>
                                        <Button  
                                            bg="teal.700"
                                            color="yellow.200" 
                                            type='submit' 
                                            isLoading={isLoading}
                                            _hover={{
                                                transform:"scale(1.1)"                                                
                                            }}
                                            transition="all 0.2s ease-in-out"
                                        >
                                            Dodaj
                                        </Button>
                                        <Button  
                                            bg="yellow.200"
                                            color="teal.700" 
                                            onClick={closePupUp}
                                            _hover={{
                                                transform:"scale(1.1)"                                                
                                            }}
                                            transition="all 0.2s ease-in-out" 
                                        >
                                            Anuluj
                                        </Button>
                                    </Flex>
                                </Box>
                            </Box>
                        </Container>
                    </form>
                </>
            )}
        </>
    )
}

export default CreateContactModel