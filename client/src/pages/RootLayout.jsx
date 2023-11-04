import React from "react";
import { Outlet } from "react-router-dom";

import { Flex } from "@chakra-ui/react";
import NavHeader from "../components/NavHeader";

const RootLayout = () => {
    return (
        <Flex className="root-layout" direction='column' align='center' w='full'>
            <NavHeader />

            <Flex mb='10' p={['4', '4', '8']}>
                <Outlet />
            </Flex>

        </Flex>
    )
};

export default RootLayout;
