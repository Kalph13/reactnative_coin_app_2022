import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useQuery } from "react-query";
import { ActivityIndicator } from "react-native";

import Coin from "../components/Coin.js";
import { coinsAPI } from "../api.js";
import { BLACK_COLOR } from "../components/colors.js";

const Container = styled.View`
    flex: 1;
    background-color: ${BLACK_COLOR};
    padding: 15px;
`;

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${BLACK_COLOR};
`;

const CoinList = styled.FlatList`
    padding: 20px 10px;
    width: 100%;
`;

const Separator = styled.View`
    height: 15px;
`;

const Home = () => {
    const [cleanedData, setCleanedData] = useState([]);
    const { isLoading, data } = useQuery("coins", coinsAPI);

    useEffect(() => {
        if (data) {
            setCleanedData(data.filter(coin => coin.rank !== 0 && coin.is_active && !coin.is_new))
        };
    }, [data]);

    if (isLoading) {
        return (
            <Loader>
                <ActivityIndicator color="#ffffff" size="large" />
            </Loader>
        );
    }

    return (
        <Container>
            <CoinList 
                data={cleanedData}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                keyExtractor={item => item.id}
                renderItem={item => <Coin index={item.index} id={item.item.id} symbol={item.item.symbol} />}
                ItemSeparatorComponent={Separator}
            />
        </Container>
    );
};

export default Home;