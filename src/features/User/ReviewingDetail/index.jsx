import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import USER_BACKGROUND from '~/assets/images/reviewingDetail-profile.png';
import DEFAULT_AVATAR from '~/assets/images/default-avatar.png';
import { useParams } from 'react-router-dom';
import axiosInstance from '~/app/api';
import { API_PATH } from '~/constants';

const ReviewingDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [author, setAuthor] = useState();

  const fetchData = async () => {
    try {
      const { code, review } = await axiosInstance.get(API_PATH.reviewing.getDetail, {
        params: { _id: id },
      });

      if (+code === 200) {
        const { data } = await axiosInstance.get(API_PATH.user.getProfile, {
          params: { _id: review.belongTo },
        });
        setData(review);
        setAuthor(data);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="container" mt="70px">
      <Flex justify="center" align="center" direction="column" mb="70px">
        <Text
          fontWeight="600 !important"
          fontSize="96px !important"
          lineHeight="106px !important"
          color="green.500 !important"
        >
          ỐC CHÚT CHÍT
        </Text>
        <Text
          fontWeight="600 !important"
          fontSize="48px !important"
          lineHeight="53px !important"
          color="green.500 !important"
        >
          Quán ốc chất lượng, giá cả hợp lý
        </Text>
      </Flex>

      <Flex gap="30px" justify="flex-start" align="flex-start">
        <Box
          flex="0.7"
          bg="white"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        ></Box>
        <Flex flex="0.3">
          <Box
            w="100%"
            minH="490px"
            background="#fff"
            boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            position="relative"
          >
            <Box h="50%" bg="red">
              <Image src={USER_BACKGROUND} w="100%" h="100%" />
            </Box>

            <Flex
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%,-50%)"
              direction="column"
              justify="center"
              align="center"
            >
              <Avatar
                src={author?.avatar}
                name={`${author?.firstName} ${author?.lastName}`}
                minW="253px"
                minH="253px"
              />
              <Text fontWeight="700" fontSize="36px" lineHeight="41px" color="green.500">
                {`${author?.firstName} ${author?.lastName}`}
              </Text>
              <Text color="green.500">{author?.email}</Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ReviewingDetail;
