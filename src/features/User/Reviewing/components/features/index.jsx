import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from '~/constants';

const Features = ({ title, route, data, ...passProps }) => {
  const navigate = useNavigate();

  return (
    <Box {...passProps}>
      <Flex color="green.500" justify="space-between" align="flex-end">
        <Text as="h3" fontWeight="700" fontSize="40px" lineHeight="55px">
          {title}
        </Text>

        <Link to={route}>
          <Text
            as="span"
            fontWeight="400"
            fontSize="20px"
            color="green.500"
            mb="30px"
            lineHeight="1"
            _hover={{
              textDecoration: 'underline',
            }}
          >
            Xem thêm
          </Text>
        </Link>
      </Flex>

      <Flex gap="20px" mt="20px">
        {data.slice(0, 3).map((item, idx) => (
          <Flex direction="column" key={idx} w="100%">
            <Image
              cursor="pointer"
              width="100%"
              height="554px"
              src={item.img}
              borderRadius="31px"
              onClick={() => navigate(ROUTES_PATH.user.reviewingDetail.replace(':id', item._id))}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = 'https://www.tibs.org.tw/images/default.jpg';
              }}
            />
            <Text
              fontWeight="500"
              fontSize="18px"
              p="15px 0"
              _hover={{ textDecoration: 'underline' }}
              onClick={() => navigate(ROUTES_PATH.user.reviewingDetail.replace(':id', item.id))}
            >
              {item.title}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default Features;
