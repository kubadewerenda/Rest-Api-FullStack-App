import React from 'react'
import { Container, Text } from "@chakra-ui/react"

const Description = ({text}) => {
  return (
    <Container maxW={"1200px"} my={4}>
        <Text
          fontSize={{base: "3xl" ,md: "42px"}}
          fontWeight={"bold"}
          letterSpacing={"1px"}
          borderBottom={"bold"}
          border={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          my={8}
        >
          <Text 
            as={"span"} 
            fontFamily="Georgia"
            bgGradient="to-r" 
            gradientFrom="yellow.200" 
            gradientTo="yellow.500"
            bgClip={"text"}
            textShadow="1px 1px 5px rgba(255, 255, 255, 0.2)"
          >
            {text}
          </Text>
        </Text>
    </Container>
  )
}

export default Description