import { Box, Container, Flex, Text, Link } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Box 
        bg="gray.800" 
        py={4} 
        mt={10}
        position="fixed"
        bottom={0}
        left={0}
        width="100%"
        zIndex={8}
    >
      <Container maxW="container.lg">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexDirection={{ base: 'column', md: 'row' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Text fontSize="sm" color="whiteAlpha.600">
            Designed by Jakub Dewerenda 
          </Text>
          <Flex gap={4} mt={{ base: 2, md: 0 }}>
            <Text fontSize="sm" color="whiteAlpha.600">
            © {new Date().getFullYear()}
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
