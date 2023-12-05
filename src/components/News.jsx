import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import { Card, Col, Row, Typography, Select } from "antd";
import moment from "moment";
const { Title, Text } = Typography;

// const demoImage =
//   "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data: { data: items = [] } = {}, isFetching } = useGetCryptoNewsQuery(
    {
      newsCategory,
    }
  );

  const { data: cryptosData } = useGetCryptosQuery(100);

  if (isFetching) return <Loader />;

  let newsItems = simplified ? items.slice(0, 10) : items;

  if (newsCategory !== "Cryptocurrency") {
    newsItems = newsItems.filter((item) =>
      item.title.toLowerCase().includes(newsCategory.toLowerCase())
    );
  }

  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="items"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.items.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="Cryptocurrency">
                Cryptocurrency
              </Select.Option>
              {cryptosData?.data?.coins.map((coin) => (
                <Select.Option value={coin.name} key={coin.name}>
                  {coin.name}
                </Select.Option>
              ))}
            </Select>
            <Text>
              <em> Filter the news based on a crypto</em>
            </Text>
          </Col>
        )}

        {newsItems.map((item, index) => (
          <Col xs={24} sm={12} m={12} lg={12} key={index}>
            <Card hoverable className="news-card">
              <a href={item.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {item.title}
                  </Title>
                  <img
                    style={{
                      maxWidth: "200px",
                      maxHeight: "100px",
                      marginLeft: "3px",
                      borderRadius: "10px",
                    }}
                    src={item.thumbnail}
                    alt={item.title}
                  />
                </div>
                <p>
                  {item.description > 100
                    ? `${item.description.substring(0, 100)}...`
                    : item.description}
                </p>
                <div className="provider-container">
                  <Text>
                    <em>{moment(item.createdAt).startOf("ss").fromNow()}</em>
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
