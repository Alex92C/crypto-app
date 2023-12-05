import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ data, currentPrice, coinName }) => {
  const [coinPrice, setCoinPrice] = useState([]);

  useEffect(() => {
    if (data?.data?.coin?.sparkline) {
      const newCoinPrice = data.data.coin.sparkline
        .filter((price) => price !== null)
        .map((price) => Number(price));

      setCoinPrice(newCoinPrice);
    }
  }, [data]);

  const coinTimestamp = Array.from({ length: coinPrice.length }, (_, i) => i);

  const chartData = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {data?.data?.coin?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={chartData} options={options} />
    </>
  );
};

export default LineChart;
