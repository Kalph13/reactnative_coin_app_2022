import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory-native";

import { coinHistoryAPI, coinInfoAPI } from "../api";
import { BLACK_COLOR } from "../components/colors";

/* Victory Native: https://formidable.com/open-source/victory/docs/native */

const Container = styled.ScrollView`
    background-color: ${BLACK_COLOR};
`;

const CoinIcon = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
`;

const Detail = ({
    navigation,
    route: {
        params: {
            id,
            symbol
        }
    }
}) => {
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <CoinIcon source={{ uri: `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}` }}/>,
        })
    }, []);

    const { isLoading: infoLoading, data: infoData } = useQuery(["coinInfo", id], coinInfoAPI);
    const { isLoading: historyLoading, data: historyData } = useQuery(["coinHistory", id], coinHistoryAPI);
    const [victoryData, setVictoryData] = useState(null);

    useEffect(() => {
        if(historyData) {
            setVictoryData(
                historyData.map(item => ({
                    x: new Date(item.timestamp).getTime(), 
                    y: item.price
                }))
            );
        }
    }, [historyData]);

    return (
        <Container>
            {victoryData ? <VictoryChart height={360}>
                <VictoryLine
                    animate
                    interpolation="monotoneX"
                    data={victoryData}
                    style={{
                        data: { stroke: "#1abc9c" }
                    }}
                />
                <VictoryScatter
                    data={victoryData}
                    style={{
                        data: { fill: "#1abc9c" }
                    }}
                />
            </VictoryChart> : null}
        </Container>
    );
};

export default Detail;
