import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BANNER from '~/assets/images/reviewing-banner.png';
import NEWS1 from '~/assets/images/home-news1.png';
import { BiSearch } from 'react-icons/bi';
import Features from './components/features';
import axiosInstance from '~/app/api';
import { API_PATH } from '~/constants';
import _ from 'lodash';

const MOCK_DATA = {
  _margin: '75px',
  data: [
    {
      label: 'Thành phố không bao giò ngủ: Sài Gòn về đêm từng lung linh đến thế',
      src: NEWS1,
      id: 123,
    },
    {
      label: 'Thành phố không bao giò ngủ: Sài Gòn về đêm từng lung linh đến thế',
      src: NEWS1,
      id: 456,
    },
    {
      label: 'Thành phố không bao giò ngủ: Sài Gòn về đêm từng lung linh đến thế',
      src: NEWS1,
      id: 789,
    },
    {
      label: 'Thành phố không bao giò ngủ: Sài Gòn về đêm từng lung linh đến thế',
      src: NEWS1,
      id: 'abc',
    },
  ],
};

const Reviewing = () => {
  const { _margin } = MOCK_DATA;
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const { listReview } = await axiosInstance.get(API_PATH.reviewing.getList);

      setData(_.groupBy(listReview, (o) => o.category));
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="container">
      <Box position="relative">
        <Image src={BANNER} />

        <Flex position="absolute" direction="column" bottom="10%" left="10%" color="white">
          <Text textTransform="uppercase" fontWeight="600" fontSize="96px" lineHeight="106px">
            ỐC CHÚT CHÍT
          </Text>
          <Text fontWeight="600" fontSize="48px" lineHeight="53px">
            Quán ốc chất lượng, giá cả hợp lý{' '}
          </Text>
        </Flex>
      </Box>

      {/* search */}
      <Flex
        m={`${_margin} auto`}
        maxW="80%"
        minH="156px"
        border="2px solid #32A071"
        borderRadius="20px"
        justify="space-between"
        align="center"
        padding="40px"
      >
        <Input
          flex="0.8"
          placeholder="Nhập địa điểm bạn muốn đến"
          fontSize="24px"
          p="24px 20px"
          borderRadius="8px"
        />

        <Button
          leftIcon={<BiSearch />}
          borderRadius="8px"
          bg="rgba(255, 186, 0, 0.44)"
          color="green.500"
        >
          Tìm kiếm
        </Button>
      </Flex>

      {_.toPairs(data)
        .slice(0, 3)
        .map(([key, value]) => {
          return (
            <Features
              title={key}
              route={`\${key}`}
              data={Array.isArray(value) ? value : [value]}
              my={_margin}
            />
          );
        })}

      <Button
        variant="outline-default"
        borderColor="green.500"
        borderRadius="20px"
        color="green.500"
        position="relative"
        left="50%"
        transform="translateX(-50%)"
      >
        Xem thêm
      </Button>
    </Box>
  );
};

export default Reviewing;
