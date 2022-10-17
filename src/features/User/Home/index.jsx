import { Box, Button, Circle, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import ACTION1 from '~/assets/images/action-1.png';
import BANNER from '~/assets/images/home-banner.png';
import NEWS1 from '~/assets/images/home-news1.png';
import MANAGE2 from '~/assets/images/manage-2.jpg';
import { HOME_FEATURES, ROUTES_PATH } from '~/constants';
import Features from './components/Features';

const MOCK_DATA = {
  _marginTop: '80px',
  news: [
    { label: 'Thành phố không bao giò ngủ: Sài Gòn về đêm từng lung linh đến thế', src: NEWS1 },
    {
      label: 'Bật mí 15 địa điểm du lịch ngắn ngày gần TPHCM',
      src: 'https://cdn.tuoitre.vn/thumb_w/980/2022/10/15/logo-tempimage7irvnz-16658115954051052847467.jpg',
    },
    {
      label: 'Những xu hướng du lịch mới của thế giới và Việt Nam',
      src: 'https://cdn.tuoitre.vn/thumb_w/980/2022/10/9/logo-nam02461-16652884254322020483545.jpg',
    },
    {
      label: 'Thành phố không bao giò ngủ: Sài Gòn về đêm từng lung linh đến thế',
      src: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/11/tan-huong-khong-gian-trong-xanh-tai-ho-tram.png',
    },
  ],
  rating: [
    {
      label: 'TOP 16 Địa Điểm Du Lịch HẤP DẪN Nhất Việt Nam: Bạn Đã Đi Được Những Nơi Nào?',
      src: 'https://cuongdulich.com/assets/posts/1568111506-du-lich-ha-giang00015.jpg',
    },
    {
      label: 'Khách quốc tế ấn tượng khi du lịch Mỹ Sơn, Hội An',
      src: 'https://cuongdulich.com/assets/posts/1568111614-du-lich-ha-long00006.jpg',
    },
    {
      label: 'Du lịch tăng trưởng ấn tượng',
      src: 'https://danviet.mediacdn.vn/zoom/200_125/296231569849192448/2022/10/14/nhung-cay-cau-vi-dai-nhat-trong-lich-su-nga-hinh-2-1665738572836-1665738572991176419758-1-0-641-1024-crop-1665738897954929567656.jpg',
    },
    {
      label: 'Thành phố không bao giò ngủ: Sài Gòn về đêm từng lung linh đến thế',
      src: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/11/tan-huong-khong-gian-trong-xanh-tai-ho-tram.png',
    },
  ],
  categories: [
    { src: MANAGE2, label: 'Cà phê Bar/Pub' },
    { src: MANAGE2, label: 'Địa điểm/địa danh' },
    { src: MANAGE2, label: 'Nhà hàng/khách sạn' },
  ],
};
const Home = () => {
  const { news, rating, categories, _marginTop } = MOCK_DATA;
  return (
    <Box>
      <Box className="container">
        <Image src={BANNER} />

        {/* content */}
        <Flex
          direction="column"
          position="absolute"
          zIndex="1"
          top="50%"
          left="50%"
          transform="translate(-50%,-50%)"
          color="white"
          justify="center"
          align="center"
          maxW="639px"
        >
          <Text
            as="h2"
            fontWeight={600}
            fontSize="40px"
            lineHeight="53px"
            textAlign="center"
            maxW="610px"
          >
            Lên Kế Hoạch Cho Chuyến Đi Sắp Tới
          </Text>
          <Text as="h1" fontWeight={600} fontSize="85px" lineHeight="106px">
            NGAY NÀO!!!
          </Text>
          <Text as="p" fontWeight="400" fontSize="20px" lineHeight="23px" mt="14px">
            Thiết lập một lộ trình hoàn hảo dành riêng cho bạn cùng với Tarebo
          </Text>
          <Button mt="26px" bg="green.500" borderRadius="100rem">
            Kế hoạch
          </Button>
        </Flex>
      </Box>

      <Features
        title="Hôm nay có gì nào?"
        desc="Cùng Tarebo tìm hiểu những thông tin du lịch mới nhất!"
        data={news}
        route={ROUTES_PATH.user.type.replace(':type', HOME_FEATURES.news)}
        mt={_marginTop}
      />

      <Features
        isCentered
        title="Cảm nhận cá nhân/Đánh giá"
        desc="Nơi bạn có thể tìm thấy nnhững bài viết, bình luận đánh giá về các địa điểm, địa danh, chất lượng dịch vụ v..v... của mọi người."
        data={rating}
        route={ROUTES_PATH.user.type.replace(':type', HOME_FEATURES.news)}
        mt={_marginTop}
      />

      {/* future plan */}
      <Flex className="container" maxW="50%" m={`${_marginTop} auto 0`} justify="space-between">
        {categories.map((item, idx) => (
          <Flex
            key={idx}
            justify="center"
            align="center"
            direction="column"
            gap="20px"
            maxW="181px"
          >
            <Circle bg="rgba(253, 228, 208, 1)" w="120px" h="120px">
              <Flex w="60%" h="60%" justify="center" align="center">
                <Image src={item.src} />
              </Flex>
            </Circle>
            <Text
              fontWeight="700"
              fontSize="32px"
              lineHeight="37px"
              textAlign="center"
              color="green.500"
            >
              {item.label}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Flex className="container" mt={_marginTop} paddingX="50px">
        <Box position="relative" flex="0.6">
          <Image src={ACTION1} borderRadius="17px" w="100%" h="100%" />
          <Image
            src={ACTION1}
            w="289px"
            h="259px"
            borderRadius="17px"
            position="absolute"
            top="50%"
            right="0"
            transform="translateX(50%) translateY(-50%)"
          />
        </Box>
        <Flex justify="flex-end" flex="0.4" color="green.500" pl="200px">
          <Box maxW="468px">
            <Text fontWeight="700" fontSize="64px" lineHeight="74px">
              Bạn Cảm Thấy Thế Nào?
            </Text>
            <Text fontWeight="400" fontSize="20px" lineHeight="23px" my="30px">
              Hãy chia sẻ những trải nghiệm cũng như đánh giá của bạn về những nơi bạn đã đến trong
              chuyến đi tại đây nhé!
            </Text>
            <Button variant="outline-default" borderColor="#00C0A6" borderRadius="100px">
              Đăng Bài
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Home;
