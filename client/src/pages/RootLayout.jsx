import React, { useContext} from "react";
import { Outlet } from "react-router-dom";

import { Flex } from "@chakra-ui/react";
import NavHeader from "../components/NavHeader";
import { SearchContext } from "../context/SearchContext";

const RootLayout = () => {
    const {searchInput, setSearchInput} = useContext(SearchContext);

    return (
        <Flex className="root-layout" direction='column' align='center' w='full'>
            <NavHeader searchInput={searchInput} onSearchInputChange={setSearchInput} />

            <Flex mb='10' p={['4', '4', '8']}>
                <Outlet />
            </Flex>

        </Flex>
    )
};

export default RootLayout;
