import { Image, Flex, Spacer, Heading, Input, Text } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"

const NavHeader = () => {
    return (
        <Flex w='full' alignItems='center' bg='gray.700' color='#F7FAFC' px={['2', '4', '8']} py={['2', '4', '4']}>
            <NavLink to='/'>
                <Flex gap={['1', '1', '2']} alignItems='center'>
                    <Image htmlHeight='28px' htmlWidth='28px' src="/chat-balloons.png" alt="Logo" />
                    <Heading display={['none', 'block', 'block']} fontSize={['md', '2xl', '3xl']}>TechTorum</Heading>
                </Flex>
            </NavLink>

            <Spacer />
            <Flex alignItems='center'>
                <Input
                    size={['sm', 'md', 'md']} type='text' variant='filled' color='black' _focus={{ bg: 'gray.100' }}
                    focusBorderColor='gray.500' borderRadius='24' placeholder='Search Title' />
            </Flex>
            <Spacer />

            <Flex gap={['2', '4', '4']} alignItems='center'>
                <NavLink to='/new-post' style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : '' })}>
                    <Text fontSize={['xs', 'sm', 'md']}>Write</Text>
                </NavLink>

                <NavLink to='/profile' style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : '' })}>

                    <Text fontSize={['xs', 'sm', 'md']}>Profile</Text>
                </NavLink>
            </Flex>
        </Flex>
    )
};

export default NavHeader;
