-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 13, 2022 lúc 02:52 PM
-- Phiên bản máy phục vụ: 10.4.20-MariaDB
-- Phiên bản PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `food_map`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `reviewId` int(11) NOT NULL,
  `text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`id`, `userId`, `reviewId`, `text`) VALUES
(1, 3, 5, 'Quán Pizza Candle rất ngon');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `query-result-cache`
--

CREATE TABLE `query-result-cache` (
  `id` int(11) NOT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  `time` bigint(20) NOT NULL,
  `duration` int(11) NOT NULL,
  `query` text NOT NULL,
  `result` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `star` int(11) NOT NULL,
  `restaurantId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `rating`
--

INSERT INTO `rating` (`id`, `comment`, `star`, `restaurantId`, `userId`) VALUES
(1, 'Mì ngon :))', 5, 3, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `restaurant`
--

CREATE TABLE `restaurant` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `describe` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL,
  `ownerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `restaurant`
--

INSERT INTO `restaurant` (`id`, `name`, `describe`, `avatar`, `address`, `phone`, `email`, `longitude`, `latitude`, `ownerId`) VALUES
(1, 'Mì Hậu Phát', 'Mì Hậu Phát', 'static_folder/restaurants/avatars/1.jpeg', '19 Phạm Ngũ Lão, Thới Bình, Ninh Kiều, Cần Thơ, Việt Nam', '0936202519', '0936202519@email.com', 105.743, 10.0407, 3),
(2, 'Quán Viễn Lạc', '192 Phan Đình Phùng, Tân An, Ninh Kiều, Cần Thơ, Việt Nam', 'static_folder/restaurants/avatars/2.jpeg', '192 Phan Đình Phùng, Tân An, Ninh Kiều, Cần Thơ, Việt Nam', '00000000000', '00000000000@email.com', 105.786, 10.0266, 3),
(3, 'Tiệm Mì Hậu Ký', 'Tiệm Mì Hậu Ký', 'static_folder/restaurants/avatars/3.jpeg', '147 Phan Đình Phùng, Tân An, Ninh Kiều, Cần Thơ, Việt Nam', '0978274327', '0978274327@email.com', 105.787, 10.0301, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `review`
--

INSERT INTO `review` (`id`, `userId`, `title`, `text`) VALUES
(1, 3, 'Top 10 quán ăn sáng ngon ở Cần Thơ hút khách nhất', '<p>&nbsp;</p>\n<h2><strong>Mì Hậu Phát</strong></h2>\n<p>Quán&nbsp;Mì Hậu Phát là một trong những quán <strong>ăn sáng ngon ở Cần Thơ</strong> được nhiều người yêu thích nhất. Quán nổi tiếng lâu đời với món mì hoành thánh làm từ trứng rất hấp dẫn. Nước dùng được nấu từ xương hầm nhiều giờ với hương vị thơm ngon. Bên cạnh đó, bạn có thể thử thêm các món hủ tíu, nui, mì khô, mì vịt cũng đều là những món ngon ở quán được yêu thích.</p>\n<p><strong>Thông tin:</strong></p>\n<p>Địa chỉ: 19 Đường Phạm Ngũ Lão, An Hòa, Ninh Kiều, Cần Thơ.</p>\n<p>Giờ mở cửa: 8h – 22h.</p>\n<p>Giá tham khảo: 25.000đ – 50.000đ.</p>\n<p><img src=\"https://owa.bestprice.vn/images/articles/uploads/top-10-quan-an-sang-ngon-o-can-tho-hut-khach-nhat-5f8eb3f15d601.jpg\" width=\"887\" height=\"701\"/></p>\n<p>&nbsp;</p>\n<h2><strong>Quán Viễn Lạc</strong></h2>\n<p>Quán Viễn Lạc là địa chỉ ăn sáng ngon ở Cần Thơ của nhiều người dân và du khách. Quán chuyên về các món bánh mì ốp la, bánh mì xíu mại, hủ tíu, bánh bao, há cảo, hoành thánh… đều là những món ăn ngon đặc trưng gốc Trung Hoa. Không gian quán khá bình dị nhưng lại rất sáng sủa và sạch sẽ. Quán chỉ mở vào buổi sáng bán đến lúc hết hàng nên bạn cần phải dậy khá sớm để đến thưởng thức các món ngon ở đây.</p>\n<p><strong>Thông tin:</strong></p>\n<p>Địa chỉ: 209 Phan Đình Phùng, Ninh Kiều, Cần Thơ.</p>\n<p>Giờ mở cửa: 8h – 10h.</p>\n<p>Giá tham khảo: 15.000đ – 50.000đ.</p>\n<p><img src=\"https://owa.bestprice.vn/images/articles/uploads/top-10-quan-an-sang-ngon-o-can-tho-hut-khach-nhat-5f8f1352438d9.jpg\" width=\"960\" height=\"720\"/></p>\n<p>&nbsp;</p>\n<h2><strong>Quán bún thịt xào Cô Ba</strong></h2>\n<p>Quán bún thịt xào Cô Ba đã quá nổi tiếng với nhiều người dân ở đây. Quán có món bún thịt xào là “đặc sản” ngon miễn chê ở đây với bát bún trộn đầy đủ có thịt xào được tẩm ướp đậm đà, chả giò nóng hổi, một ít rau sống và sau cùng là nước mắm chua ngon rưới kèm lên trên.</p>\n<p>Ngoài món bún thịt xào ngon trứ danh, bạn còn có thể thử thêm bánh mì bò kho, bánh mì xíu mại cũng là <strong>những món ăn sáng ngon ở Cần Thơ</strong> được nhiều người yêu thích tại quán.</p>\n<p><strong>Thông tin:</strong></p>\n<p>Địa chỉ: 14 Bà Huyện Thanh Quan, Ninh Kiều, Cần Thơ.</p>\n<p>Giờ mở cửa: 7h – 10h.</p>\n<p>Giá tham khảo: 25.000đ – 50.000đ.</p>\n<p><img src=\"https://owa.bestprice.vn/images/articles/uploads/top-10-quan-an-sang-ngon-o-can-tho-hut-khach-nhat-5f8faf178ae9f.jpg\" width=\"855\" height=\"689\"/></p>\n<p>&nbsp;</p>\n<h2><strong>Bún mọc Ròm Mập</strong></h2>\n<p>Bún mọc Ròm Mập chính là thương hiệu độc quyền từ nghệ sỹ hài Hoài Linh, đảm bảo cho chất lượng dịch vụ và món ăn chắc chắn sẽ không làm bạn thất vọng. Menu quán có những món ăn sáng ngon ở Cần Thơ nổi bật như bún thịt nướng, cháo hàu, bún tiêu, bún mọc,… với giá bình dân rất hấp dẫn. Không gian ở Bún mọc Ròm Mập rất rộng và thoáng mát, có thể phục vụ được nhiều đoàn đông người thưởng thức tại đây.</p>\n<p><strong>Thông tin:</strong></p>\n<p>Địa chỉ: 110B Trần Văn Khéo, Cái Khế, Ninh Kiều, Cần Thơ.</p>\n<p>Giờ mở cửa: 9h – 11h.</p>\n<p>Giá tham khảo: Từ 35.000đ.</p>\n<p>&nbsp;</p>\n<h2><strong>Quán Hậu Ký</strong></h2>\n<p>Cũng là một quán ăn mang đậm phong cách Trung Hoa, quán Hậu Ký nổi bật với các món mỳ như mỳ xương, mỳ hoành thánh, mỳ khô, hủ tiếu,… Đây là địa chỉ ăn sáng ruột của rất nhiều người dân Cần Thơ và cả các du khách. Không gian quán không rộng nhưng vẫn xếp được nhiều bàn để sẵn sàng phục vụ khi đông khách. Bên cạnh đó, nhân viên ở đây rất thân thiện và nhanh nhẹn nên bạn sẽ cảm thấy hài lòng khi thưởng thức mì ngon tại quán Hậu Ký.</p>\n<p>Quán Hậu Ký là một trong những <strong>địa chỉ ăn sáng ngon ở Cần Thơ</strong> được khá nhiều người yêu thích, nếu bạn du lịch theo <a href=\"https://www.bestprice.vn/tour/tour-can-tho\" target=\"_blank\">tour Cần Thơ</a>&nbsp;thì chắc hẳn đây sẽ là điểm đến thú vị mà các hướng dẫn viên sẽ gợi ý cho bạn ghé đến thưởng thức bữa sáng.</p>\n<p><strong>Thông tin:</strong></p>\n<p>Địa chỉ: 147 Phan Đình Phùng, Ninh Kiều, Cần Thơ.</p>\n<p>Giờ mở cửa: 7h – 22h.</p>\n<p>Giá tham khảo: Từ 30.000đ.</p>\n<p>&nbsp;</p>\n<h2><strong>Quán phở bò Úc Quang Trung</strong></h2>\n<p>Là một trong những quán ăn sáng ngon ở Cần Thơ được yêu thích, quán phở bò Úc Quang Trung không chỉ nổi tiếng với phở mà còn có các món ăn về bò khác rất ấn tượng. Những món ngon trong menu quán phải kể đến là phở bò Úc, bò kho, bò Úc bít tết,… với chất lượng thịt bò nhập khẩu, cũng vì điều này nên giá menu ở quán sẽ có cao hơn mặt bằng chung các quán ăn sáng khác.</p>\n<p>Không gian ở quán phở bò Úc Quang Trung rất rộng và thoáng đãng, đặc biệt quán mở cửa cả ngày nên buổi tối tại đây được thắp sáng rực rỡ, bạn và gia đình có thể ghé đến thưởng thức bít tết sẽ rất thú vị.</p>\n<p><strong>Thông tin:</strong></p>\n<p>Địa chỉ: 142 Trần Văn Khéo, Cái Khế, Ninh Kiều, Cần Thơ.</p>\n<p>Giờ mở cửa: 7h – 23h.</p>\n<p>Giá tham khảo: Từ 30.000đ.</p>'),
(2, 3, 'Cần Thơ ăn gì? Top 25 món ăn ngon Cần Thơ nhất định phải thử', '<p>&nbsp;<img src=\"https://dulich9.com/wp-content/uploads/2019/05/Mon-an-ngon-Can-Tho-02.webp\" width=\"600\" height=\"444\"/></p>\n<p>Cần Thơ được ví như thủ đô của miền đồng bằng sông Cửu Long, vì vậy mà ở đây quy tụ rất nhiều nét văn hóa, ẩm thực riêng biệt của miền Tây. Vậy nên <strong>ăn gì ở Cần Thơ</strong>?&nbsp;Trong bài viết này, dulich9 sẽ giới thiệu bạn <strong>những món ăn ngon Cần Thơ</strong> nhất định phải thử để giúp bạn khám phá thêm những điều hấp dẫn về ẩm thực Cần Thơ nhé.</p>\n<h2><strong>25 món ăn đặc sản Cần Thơ ngon, nổi tiếng nhất</strong></h2>\n<p>&nbsp;</p>\n<h3><strong>Bánh xèo Cần Thơ</strong></h3>\n<p>Bánh xèo là món ăn quen thuộc của người Nam Bộ và ở Cần Thơ cũng không ngoại lệ. Cần Thơ có thương hiệu bánh bèo Cái Sơn rất nổi tiếng, bánh được chế biến kỳ công tỷ mỉ, có bí quyết riêng, nước chấm rất đặc trưng không nơi nào có được, chính vì thế bánh xèo đã trở thành một món ăn ngon Cần Thơ mà hầu như ai tới đây cũng phải ăn thử.</p>\n<p><img src=\"https://dulich9.com/wp-content/uploads/2019/05/Mon-an-ngon-Can-Tho-01.webp\" width=\"600\" height=\"430\"/></p>\n<p>&nbsp;</p>\n<p>Ăn gì ở Cần Thơ? Cần Thơ có nhiều hàng bánh xèo ngon, nhưng ngon nhất phải kể đến những quán sau:</p>\n<ul>\n  <li>Bánh xèo 7 Tới: 45 Hoàng Quốc Việt, An Bình, Ninh Kiều, Cần Thơ</li>\n  <li>Bánh xèo Đề Thám: 34 Đề Thám, Quận Ninh Kiều, Cần Thơ</li>\n  <li>Bánh Xèo Ngọc Ngân: 74 Lê Lợi, Cái Khế, Ninh Kiều, Cần Thơ</li>\n  <li>Bánh Xèo Tân Định: &nbsp;Lê Lợi, Cái Khế, Ninh Kiều, Cần Thơ</li>\n</ul>\n<h3><strong>Phở cá Cần Thơ</strong></h3>\n<p>Nhắc đến phở có lẽ bạn sẽ nghĩ tới phở bò, phở gà giống như ở Hà Nội, nhưng ở Cần Thơ lại có cả món phở cá, được tạo ra dưới bàn tay tài hoa của một người gốc Bắc và đã trở thành một món ăn đặc sản Cần Thơ ngon nhất hiện nay.</p>\n<p><img src=\"https://dulich9.com/wp-content/uploads/2019/05/Mon-an-ngon-Can-Tho-02.webp\" width=\"600\" height=\"444\"/></p>\n<p>&nbsp;</p>\n<p>Phở Cá Cần Thơ ngon lạ bởi nước dùng thanh ngọt được hầm từ xương ống, đầu cá, có vị béo vừa phải. Ngoài ra, phở cá con được điểm thêm vị ngon bởi những miếng cá lóc đã được lột bỏ xương, sau đó đem rim vàng béo ngậy. Ăn kèm với tô phở cá thơm ngon là những loại rau ưa thích như rau nhút, húng lìu, thêm một bát nước chấm ngọt cay để dùng khi cần.</p>\n<p>Nếu muốn thưởng thức món phở cá này, bạn hãy đến quán &nbsp;Làng Báo có địa chỉ ở đường Trần Văn Hoài, Quận Ninh Kiều, Cần Thơ nhé.</p>\n<h3><strong>Bánh tằm bì</strong></h3>\n<p>Cần Thơ ăn gì? Nếu bạn đến với Cần Thơ thì đừng quên nếm thử món bánh tằm bì, một món ăn ngon Cần Thơ vừa dân giã vừa độc đáo vô cùng. Tằm bì được làm từ bột nếp và bột gạo, để nóng trên xửng, khi ăn thì sẽ bày ra đĩa và phủ lên trên những lớp bì heo thái nhỏ, màu vàng ươm rất bắt mắt. Bạn sẽ ăn kèm với rau xanh, giá đỗ, lạc rang, dưa chua và mỡ hành.</p>\n<p>Bánh tằm bì là món ăn sáng Cần Thơ rất phổ biến, chỉ từ 10.000 – 20.000 đồng/xuất, được bán rất nhiều nơi, ví dụ như:</p>\n<ul>\n  <li>16B1 Ung Văn Khiêm, Thới Bình, Ninh Kiều, Cần Thơ</li>\n  <li>Hẻm 2 Phạm Ngũ Lão, phường An Hòa, Ninh Kiều, Cần Thơ.</li>\n  <li>Quán bánh tằm ở số 9 Tân Trào, Tân An, Quận Ninh Kiều</li>\n</ul>\n<h3><strong>Bún nước lèo</strong></h3>\n<p>Một bát bún nước lèo có giá rất rẻ, chỉ khoảng 15.000 – 20.000 bát nhưng lại trở thành một trong những món ăn ngon ở Cần Thơ. Nước dùng của bún được nấu từ nước dừa tươi, ăn vừa béo vừa lạ, còn trong bát bún có vô số topping, nào là thịt quay, tôm thẻ, cá lóc, mực tươi… đủ cả.</p>\n<p>&nbsp;</p>\n<p>Gợi ý một số quán bún nước lèo ngon ở Cần Thơ:</p>\n<ul>\n  <li>Quán Bà Xã: 25 Hùng Vương, Thới Bình, Ninh Kiều, Cần Thơ</li>\n  <li>Quán Xuân Yến: 41 Mậu Thân, An Hoà, Ninh Kiều, Cần Thơ</li>\n  <li>Quán bún nước lèo ở số&nbsp;107 Trần Hưng Đạo, An Phú,&nbsp;Quận Ninh Kiều</li>\n  <li>Bún nước lèo Sóc Trăng: Hẻm Chùa Đề Thám, Tân An, Ninh Kiều, Cần Thơ</li>\n  <li>Bún nước lèo An Tâm: 102 Đ. 3-2, Hưng Lợi, Ninh Kiều, Cần Thơ</li>\n</ul>\n<h3><strong>Bún quậy Cần thơ</strong></h3>\n<p>Nếu du khách nào từng du lịch Phú Quốc có lẽ sẽ biết đến món bún quậy, và ngay chính đất Cần Thơ cũng có món bún quậy này, nhưng hương vị thì độc đáo vô cùng.</p>\n<p>&nbsp;</p>\n<p>Gọi là bún quậy là bởi khi ăn, bạn phải “quậy” lên cho tất cả các nguyên liệu như bún, tôm, chả cá hòa quyện vào nhau, như vậy mọi thứ mới chín tới, vừa vặn và ăn mới ngon nhất.</p>\n<p>Địa chỉ ăn bún quậy Cần Thơ ngon nhất:</p>\n<ul>\n  <li>Bún quậy Mai Lộc: 219 Huỳnh Cương, An Cư, Ninh Kiều, Cần Thơ</li>\n  <li>Bún quậy Kiên Giang: 15 Trần Văn Hoài, Xuân Khánh, Ninh Kiều, Cần Thơ</li>\n</ul>\n<h3><strong>Bún tôm khô</strong></h3>\n<p>Ăn gì ở Cần Thơ? Nếu có thể thì hãy ăn bún tôm khô, có nước dùng được nấu từ tiết vịt và tôm khô xào nên có vị ngon ngọt mà khó có món bún nào sánh bằng. Một tô bún rất đầy đặn, có cả chả giò, thịt bò, riêu cua, tóp mỡ, cà chua, rau xanh…, khi ăn bạn cho thêm vào một chút mắm ruốc là sẽ có một bữa ăn ngon khó cưỡng rồi.</p>\n<p><br></p>'),
(3, 3, 'ĐẾN NGAY Cần Thơ để thưởng thức Top 20 món ngon Cần Thơ này!', '<p>&nbsp;<img src=\"https://diachiamthuc.vn/wp-content/uploads/2021/05/Mon-ngon-Can-Tho.png\" width=\"1080\" height=\"1080\"/></p>\n<p><strong>Món ngon Cần Thơ</strong> là một trong những yếu tố làm nên sự thu hút của Cần Thơ. Câu ca dao của cha ông xưa đã là lời khẳng định về nét quyến rũ của xứ sở <a href=\"https://vi.wikipedia.org/wiki/C%E1%BA%A7n_Th%C6%A1\" rel=\"noopener\" target=\"_blank\">Cần Thơ</a>. Miền quê sông nước hiền hoà của miền Tây tổ quốc luôn là điểm đến hấp dẫn đối với du khách. Những dòng sông, những cánh đồng, những chợ nổi…tất cả mê hoặc lòng người đến nao lòng. Hơn thế, ẩm thực Cần Thơ cũng cực kì phong phú, bạn đã biết chưa?</p>\n<p>&nbsp;Nếu còn đang phân vân không biết nên thưởng thức món ngon gì tại Cần Thơ? Hãy để <a href=\"https://diachiamthuc.vn/\" rel=\"noopener\" target=\"_blank\">Diachiamthuc.vn</a> chúng tôi cho bạn một ít gợi ý nhé! Với bài viết này, chúng tôi xin gửi tới quý bạn đọc Top 20 món ngon Cần Thơ khiến bạn phải xiêu lòng ngay lập tức!&nbsp;</p>\n<p>&nbsp;</p>\n<h3><strong>Phở Tài Hưng</strong></h3>\n<p>Đến Cần Thơ muốn ăn phở hay bún bạn đừng quên ghé ghé quán phở Tài Hưng. Đây là nơi người dân địa phương chọn làm địa điểm ăn sáng quen thuộc. Món phở và bún ở đây đều được kết hợp với nước dùng rất vừa miệng. Thực khách rất hài lòng khi đến dùng bữa sáng.</p>\n<p>&nbsp;</p>\n<h3><strong>Quán Thái Nướng</strong></h3>\n<p>Nếu là tín đồ món nướng thì quán Thái Nướng chính là sự lựa chọn hoàn hảo cho bạn. Thực đơn quán rất đa dạng các món nướng như như thịt heo nướng, cá nướng, tôm nướng, nghêu, sò nướng . Các món đều được ướp gia vị rất vừa vặn. Cách pha chế nước chấm cũng rất đặc biệt và đa dạng.</p>\n<p>&nbsp;</p>\n<h3><strong>Bánh xèo Cái Sơn</strong></h3>\n<p>Bánh xèo là món ăn quen thuộc của người miền Nam. Bạn đã ăn bánh xèo ở nhiều nơi? Nhưng đến Cần Thơ bạn đừng quên ghé bánh xèo Cái Sơn để cảm nhận sự khác biệt nhé. Quán bánh xèo này có thương hiệu từ rất lâu đời. Bánh xèo của quán được chế biến theo bí quyết rất riêng của người dân Cái Sơn.</p>\n<p>&nbsp;</p>\n<h3><strong>Phở Cá</strong></h3>\n<p>Phở bò, phở gà thì đã quen thuộc quá rồi. Nhưng phở cá thì khá lạ lẫm phải không? Phở cá chính là một trong những món đặc sản của Cần Thơ. Món này là sự kết hợp giữa tinh hoa ẩm thực của Hà Nội và Cần Thơ. Quán ra đời bởi một người gốc Bắc. Chính ý tưởng táo bạo về ý tưởng ẩm thực này đã tạo ra món phở cá đặc biệt mà bạn chỉ tìm thấy ở Cần Thơ.</p>\n<p>&nbsp;</p>\n<p>Món ăn có vị ngọt từ nước hầm từ chính xương ống heo và đầu cá. Miếng cá lóc trong tô phở đã được lọc xương và chiên vàng, rất béo. Ăn bún cá bạn sẽ ăn kèm rau nhút, rau húng. Chấm miếng cá vào bát nước chấm đậm vị cay, tha hồ xuýt xoa. Do vậy khi các bạn du lịch Cần Thơ thì nên đến đây và thưởng thức món Phở Cá để thấy sự đa dạng trong ẩm thực của miền sông nước này.</p>\n<p>&nbsp;</p>\n<h3><strong>Bún nước lèo</strong></h3>\n<p>Đến Cần Thơ có một món ngon bạn nên thử chính là bún nước lèo. Nước dùng của món bún nước lèo nấu bằng nước dừa tươi nên rất béo. Một tô bún nước lèo gồm thịt heo quay, cá lóc, tôm thẻ, mực tươi. Bạn sẽ ăn kèm bún ước lèo với các loại rau thơm, giá ống, hẹ, bắp chuối, rau muống.</p>\n<p>&nbsp;</p>\n<p>Địa chỉ quán bún nước lèo ngon ở Cần Thơ:</p>\n<ul>\n  <li>Quán bún nước lèo trên đường Mậu Thân, đối diện lotte mart, quận Ninh Kiều.</li>\n  <li>Quán bà xã ở 25 Hùng Vương, Quận Ninh Kiều.</li>\n  <li>Quán bún nước lèo ở số 107 Trần Hưng Đạo, An Phú, Quận Ninh Kiều.</li>\n</ul>\n<h3><strong>Bánh tằm bì</strong></h3>\n<p>Dạo phố Cần Thơ và muốn thưởng thức <u>món ngon Cần Thơ</u> thì bạn nhớ lựa món bánh tằm bì. Đây là món quà vặt dân giã nhưng hương vị thì bao ngon. Sợi bánh tằm bì được làm từ sự pha trộn của bột gạo và bột nếp. Bạn sẽ cảm nhận những sợi bánh vừa mịn vừa dai. Người bán để sợi bánh trong xửng hấp để bánh luôn ấm nóng.</p>\n<p>&nbsp;</p>\n<p>Quán bánh tằm bì ngon ở Cần Thơ:</p>\n<ul>\n  <li>Quán bánh tằm bì ở hẻm 2 Phạm Ngũ Lão, P. An Hòa,&nbsp;&nbsp;Quận Ninh Kiều.</li>\n  <li>Quán bánh tằm ở số 16B1 Ung Văn Khiêm, Quận Ninh Kiều.</li>\n  <li>Quán bánh tằm ở số 9 Tân Trào, Tân An, Quận Ninh Kiều.</li>\n</ul>\n<h3><strong>Quán lẩu trâu Hương Lúa</strong></h3>\n<p>Đến Cần Thơ ăn lẩu trâu bạn hãy ghé quán Hương Lúa. Đây là quán lẩu trâu, lẩu bò rất nổi tiếng tại thành phố này. Quán chuyên phục vụ lẩu trâu và lẩu bò vừa ngon, vừa rẻ. Món ruột của quán là lẩu trâu nấu mẻ.</p>\n<p>....... còn nữa ...</p>'),
(4, 3, 'Top 22 đặc sản Cần Thơ – Các món ăn ngon nhất Cần Thơ (2022)', '<p>&nbsp;<img src=\"https://nucuoimekong.com/wp-content/uploads/dac-san-can-tho-la-gi.jpg\" width=\"1280\" height=\"1280\"/></p>\n<p><strong>Đặc sản Cần Thơ</strong> mang nét ẩm thực đặc trưng của miền Tây. Vậy, <a href=\"https://nucuoimekong.com/dac-san-can-tho\"><strong>ăn gì ở Cần Thơ</strong></a><u><strong>?</strong></u> Cần Thơ có gì để thưởng thức? Cần Thơ có đặc sản, món gì ngon? Hãy cùng <strong>Nụ cười Mê Kông</strong> điểm qua <strong>top 22 món ăn đặc sản</strong> cũng như <strong>địa điểm ăn uống Cần Thơ cực ngon</strong> các bạn nhé!</p>\n<h2><strong>1. Đặc sản Cần Thơ độc đáo – Pizza hủ tiếu</strong></h2>\n<ul>\n  <li><a href=\"https://nucuoimekong.com/hu-tieu-sau-hoai\"><strong>Pizza hủ tiếu</strong></a>, nghe cái tên cứ là lạ làm sao, nhưng không, đối với người dân Cần Thơ, Pizza hủ tiếu lại vô cùng thân thuộc. Đây là món được xếp vào top những <strong>món ngon đặc sản Cần Thơ</strong> độc đáo</li>\n  <li>Cảm giác cắn một miếng pizza hủ tiếu giòn tan, cái vị béo béo mặn mặn của nước cốt dừa, mùi thơm của hành ngò phất lên, thêm cái bùi bùi của đậu phộng rang, tất cả làm nên tâm hồn của chiếc pizza miền Tây.</li>\n  <li>Pizza hủ tiếu được ví như chiếc pizza kiểu Ý với tâm hồn Việt. Một chiếc bánh hủ tiếu được chiên giòn, bên trên phủ một lớp trứng mỏng, rắc thêm đậu phộng, thịt khìa và thêm nhiều loại rau khác nhau gây cảm giác thèm ăn khi ai nhìn thấy nó.<img src=\"https://nucuoimekong.com/wp-content/uploads/dac-san-can-tho-la-gi.jpg\" width=\"1280\" height=\"1280\"/></li>\n</ul>\n<p>&nbsp;</p>\n<p>Giá pizza hủ tiếu từ <strong>35.000đ – 50.000đ</strong> tùy size khách chọn.</p>\n<p>Muốn ăn pizza hủ tiếu phải tìm đến <strong>lò hủ tiếu Sáu Hoài</strong> gần chợ nổi Cái Răng. Địa chỉ lò hủ tiếu Sáu Hoài: 476, 14 Lộ Vòng Cung, phường Anh Bình, Ninh Kiều, Cần Thơ.</p>\n<p>Xem thêm: <a href=\"https://nucuoimekong.com/nha-hang-can-tho\"><strong>Các nhà hàng nổi tiếng ở Cần Thơ</strong></a></p>\n<h2><strong>2. Lẩu vịt nấu chao Cần Thơ – Món ăn ngon Cần Thơ</strong></h2>\n<ul>\n  <li>Điều đặc biệt khi đi tìm quán ăn nấu <a href=\"https://nucuoimekong.com/lau-vit-nau-chao-can-tho\"><strong>lẩu vịt nấu chao</strong></a> này đó chính là nguyên một con đường ở hẻm 1 Lý Tự Trọng, gần khu III Đại học Cần Thơ, du khách tha hồ lựa chọn vì nguyên con hẻm đều bán món này.</li>\n  <li>Nước lẩu nấu từ chao đỏ nên có vị béo và ngọt nước. Mùi chao không quá đậm nên rất dễ ăn, thịt vịt cũng được xử lý cẩn thận nên ít bị hôi mùi. Thịt trong nồi lẩu vừa ngon vừa mềm, rau nhiều, có cả tàu hủ ky và hột vịt kèm theo. Mức giá từ <strong>45.000đ – 300.000đ</strong> cho một nồi lẩu đầy ắp đồ ăn tùy size và sở thích của mọi người. Vì các quán ăn này chủ yếu phục vụ sinh viên và du khách nên giá cả cũng rất vừa túi tiền.Điểm qua một vài thương hiệu nổi tiếng với món lẩu vịt nấu chao ngon nhất Cần Thơ nào:</li>\n  <li>Vịt nấu chao <strong>Thành Giao –</strong> Quán ăn Cần Thơ rất nổi tiếng cho món vịt nấu chao (Địa chỉ: hẻm 1 đường Lý Tự Trọng)</li>\n  <li>Vịt nấu chao <strong>Cẩm Tú.</strong></li>\n  <li>Lẩu vịt <strong>Xiêm Hương Lúa.</strong></li>\n  <li><strong>Kim Liên Quán.</strong></li>\n  <li>Vịt nấu chao <strong>Cô Minh.</strong></li>\n</ul>\n<blockquote><em>Xem thêm bài viết:&nbsp;</em><a href=\"https://nucuoimekong.com/kinh-nghiem-du-lich-mien-tay\"><em><strong>Kinh nghiệm du lịch miền Tây từ A đến Z</strong></em></a></blockquote>\n<h2><strong>3. Cơm cháy kho quẹt – Món ăn ngon dân dã ở Cần Thơ</strong></h2>\n<ul>\n  <li>Một trong những món ăn đặc sản đặc biệt tại Cần Thơ, trong cái bình dị, dân dã lại ngon vô cùng là hương vị đã níu chân du khách gần xa.</li>\n  <li>Cơm cháy được nấu từ loại gạo thơm – dẻo thượng hạng. Kho quẹt được chế biến từ tôm, thịt ba chỉ, mắm, đường, hành cháy rất cầu kỳ. Quán còn kèm theo rau củ sống để ăn kèm, tăng thêm hương vị của cơm cháy.</li>\n</ul>\n<p>&nbsp;Giá cơm cháy kho quẹt từ <strong>15.000đ – 50.000đ</strong> tùy vào cách chế biến của quán và sở thích của khách. Tìm ăn món cơm cháy kho quẹt ở Cần Thơ không khó. Du khách có thể tìm đến:</p>\n<ul>\n  <li>Địa điểm ăn vặt ở Cần Thơ: Các khu <strong>chợ đêm ở Cần Thơ</strong> như chợ đêm Tây Đô, chợ đêm Ninh Kiều, chợ đêm Trần Phú</li>\n  <li>Các con đường ăn uống như <strong>bờ kè Mạc Thiên Tích</strong>.</li>\n  <li><strong>Lô 15 chợ đêm Trần Phú</strong>, quận Ninh Kiều, Cần Thơ.</li>\n</ul>\n<h2><strong>4. Đặc sản bánh cống Cần Thơ</strong></h2>\n<ul>\n  <li>Ăn một lần nhớ mãi không quên là từ mà những người sau khi ăn bánh cống miêu tả. Vỏ bánh vàng óng, giòn rụm. Nhân bánh có đậu xanh, tôm, thịt bằm. Bánh được bày lên một lớp rau xanh, thêm chút ớt và cà chua trang trí vô cùng bắt mắt. Đây được xem như <strong>đặc sản Cần Thơ</strong> thu hút nhiều du khách nhất.</li>\n  <li>Bánh ăn giòn giòn, thơm thơm, kèm chung với rau diếp cá, đọt xoài, xà lách, húng quế, chấm lên nước mắm ớt dưa chua được làm sẵn, hương vị phải nói là khỏi chê.</li>\n</ul>\n<p>&nbsp;</p>\n<p>Giá của một phần bánh cống chỉ <strong>từ 11.000đ</strong>.</p>\n<p>Tìm ăn bánh cống không khó, nhiều địa điểm ăn uống ở Cần Thơ có bán món này</p>\n<ul>\n  <li><strong>Bánh cống Dì Út</strong>: 86/38 Lý Tự Trọng, An Cư, Ninh Kiều, Cần Thơ.</li>\n  <li><strong>Quán Bánh Cống</strong>: 134/1A Trần Phú, Ninh Kiều, Cần Thơ.</li>\n  <li>Hoặc tìm đến các khu <a href=\"https://nucuoimekong.com/cho-dem-can-tho\"><strong>chợ đêm nổi tiếng tại Cần Thơ</strong></a><u>.</u></li>\n</ul>\n<h2><strong>5.</strong> <strong>Nem nướng Cần Thơ – Món đặc sản Cần Thơ tuyệt ngon</strong></h2>\n<ul>\n  <li>Nem nướng ở Cái Răng khác với những nơi khác. Ở đây, nem được làm từ thịt lợn tươi, bằm nhuyễn, quết dẻo rồi vo tròn. Vừa nạt vừa mỡ, từng viên xiên vào một que tre nhỏ rồi đặt lên than hồng. Cách làm sáng tạo này được người phụ nữ tên Tư Khem ở Cái Răng từ nửa thế kỷ trước tìm ra. Nem nướng được xem là món ngon Cần Thơ được nhiều người yêu thích.</li>\n  <li>Nem nướng được ăn kèm với rau thơm, chuối chát, khế và dưa chua. Thêm ít bún, gói vào một miếng báng tráng. Chấm với nước mắm tỏi ớt vừa thơm, vừa cay. Chính hương vị này đã níu chân du khách.&nbsp;</li>\n</ul>\n<p>Giá một phần nem nướng Cái Răng khoảng <strong>50.000đ – 100.000đ</strong> tùy size.</p>\n<p>Nơi bán nem nướng này ở:</p>\n<ul>\n  <li>Quán <strong>Anh Mập</strong> đường Nguyễn Việt Hồng.</li>\n  <li>Quán <strong>Thanh Vân</strong>, số 17 đại lộ Hòa Bình.</li>\n  <li>Tiệm nem chả lụa đối diện ngã 3 Quang Trung.</li>\n</ul>\n<h2><strong>6.</strong> <strong>Đặc sản</strong> <strong>bánh xèo củ hủ dừa Cần Thơ</strong></h2>\n<ul>\n  <li>Bánh xèo là món ăn dân dã của con người Nam Bộ từ những ngày đi mở đất Phương Nam. Miếng bánh xèo vàng óng, vừa mỏng vừa giòn, da bánh kèm thịt, tép đồng, con hến, ngon khó cưỡng. Nhân bánh có củ hủ dừa, giá, sắn cắt sợi xào chung với thịt, chút mực và nấm. Mùi thơm của bánh xèo cùng nhân tỏa ra thơm cả một vùng. Bánh ăn kèm với xà lách, lá cách đắng đắng, thêm chút diếp cá, húng lủi. Chấm với nước nắm chua chua cay cay, phải nói rằng “ăn một lần nhớ mãi không quên”.</li>\n</ul>\n<p><br></p>'),
(5, 3, 'Danh sách 23 quán ăn ngon ở Cần Thơ mang đậm hương vị sông nước miền Tây', '<p>&nbsp;</p>\n<h2><strong>1. Nhà hàng Bún Thố – quán ăn ngon ở Cần Thơ</strong></h2>\n<p>Nhà hàng bún thố là quán ăn ngon ở Cần Thơ không thể bỏ qua khi đến đây nếu bạn muốn được thử qua các món bún ở đây. Nhà hàng này là quán ăn được mở đã nhiều năm và gây dựng được nhiều tiếng tăm vì sự đa dạng của nhiều loại bún. Từ bún cá, bún riêu cua, bún chả,… đều có cả. Giá thành của một tô bún tại quán Thố không cao. Chỉ từ 30.000 đồng – 50.000 đồng một bát. Đặc biệt khi đến đây bạn nhất định phải thử qua món bún Thố độc đáo chỉ nhà hàng này mới có. Đến đây rồi chắc chắn sẽ không làm bạn thất vọng.</p>\n<p>&nbsp;</p>\n<ul>\n  <li>Địa chỉ: tại số 149 Trần Văn Khéo, quận Ninh Kiều, thành phố Cần Thơ.</li>\n  <li>Thông tin liên lạc: 0918577233</li>\n</ul>\n<h2><strong>2. Nhà hàng Gony restaurant</strong></h2>\n<p>Gony restaurant là nhà hàng nổi tiếng tại Cần Thơ với ẩm thực đa dạng. Đây là sự hòa quyện giữa nhưng tinh hoa ẩm thực của châu Á và châu u. Đặc biệt nếu kể đến hương vi Việt Nam thì không thể bỏ qua các món ăn miền Tây. Đó là những món ăn giản dị nơi sông nước của người dân miền Tây từ bao đời. Du khách khi vào nhà hàng Gony restaurant đều quyến luyến mùi vị những món ăn này.</p>\n<p>&nbsp;</p>\n<p>Không chỉ có các món <a href=\"https://place.vn/mien-tay/\" rel=\"nofollow\"><u><strong>miền Tây</strong></u></a> hấp dẫn hay món ăn miền Bắc nổi tiếng như phở, bún chả mà trong đây còn có nhiều món ngon phương Tây. Phải kể đến như các loại Pizza hay nhiều món ăn được chế biến từ hải sản tươi ngon. Vào đây, bạn sẽ có được bầu không khí thoải mái và những nét ẩm thực phong phú.</p>\n<ul>\n  <li>Địa chỉ: số 8, 10, và 12 đường Nguyễn An Ninh, Ninh Kiều, Cần Thơ</li>\n  <li>Thông tin liên lạc: 07103810299</li>\n</ul>\n<h2><strong>3. Quán ăn ngon ở Cần Thơ – mì Chú Lường</strong></h2>\n<p>&nbsp;</p>\n<p>Quán mì chú Lường là địa chỉ yêu thích của các tín đồ của nhiều món mì các loại. Tại đây không chỉ nổi tiếng bởi nhiều loại mì mà còn ở không gian quán ăn và cách phục vụ vui vẻ, nhiệt tình của chủ quán. Chủ của quán mì này là người gốc Hoa, vì vậy những món mì ở đây có hương vị Trung hoa đậm đà. Một trong những loại mì ngon nhất ở đây phải kể đến mì vằn thắn với những miếng sủi cảo thơm ngon. Bên cạnh đó còn có bún gạo, miến, hủ tiếu,…</p>\n<ul>\n  <li>Địa chỉ: Tại số 6, đường Lý Thường Kiệt, Ninh Kiều, Cần Thơ</li>\n  <li>Thông tin liên lạc: 0710473878</li>\n</ul>\n<h2><strong>4. Quán Pizza Candle</strong></h2>\n<p>Gọi là pizza nhưng quán Pizza Candle chuyên bán các món ăn vặt lạ miệng, lạ mắt. Tại đây bạn sẽ có cơ hội thưởng thức nhiều món ăn đặc sắc với&nbsp; hương vị thơm ngon và không thể tìm lại được ở một quán ăn khác. Nổi tiếng nhất ở đây là món pizza hải sản và&nbsp; bánh sinh nhật ác ngừ, cá hồi. Nếu đã thử một lần chắc chắn bạn sẽ không thể quên được hương vị này.</p>');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `account`, `password`, `name`, `avatar`, `email`, `address`, `phone`) VALUES
(3, 'khoi1', '51874745dddafae0b91fc3b47c71738ba08c86a6c123e746bb5ebadcb0a7303e21cb2048e49d3c0b4a1d0a482c8c341012fd482c3718ff7b99d44d07a947a1fb', 'khoi1', 'static_folder/users/avatars/3.jpeg', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `victual`
--

CREATE TABLE `victual` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `describe` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `restaurantId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vote`
--

CREATE TABLE `vote` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `reviewId` int(11) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `vote`
--

INSERT INTO `vote` (`id`, `userId`, `reviewId`, `value`) VALUES
(1, 3, 1, 1),
(2, 3, 3, -1),
(3, 3, 5, 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_c0354a9a009d3bb45a08655ce3b` (`userId`),
  ADD KEY `FK_40218f262bd4fda4d92eeed0b76` (`reviewId`);

--
-- Chỉ mục cho bảng `query-result-cache`
--
ALTER TABLE `query-result-cache`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_460ba90243fec8a02467bc96282` (`restaurantId`),
  ADD KEY `FK_a6c53dfc89ba3188b389ef29a62` (`userId`);

--
-- Chỉ mục cho bảng `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_315af20ce2dd3e52d28fba79fab` (`ownerId`);

--
-- Chỉ mục cho bảng `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1337f93918c70837d3cea105d39` (`userId`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_4ab2df0a57a74fdf904e0e2708` (`account`);

--
-- Chỉ mục cho bảng `victual`
--
ALTER TABLE `victual`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d4ee92542b2ddada512bbf5885c` (`restaurantId`);

--
-- Chỉ mục cho bảng `vote`
--
ALTER TABLE `vote`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f5de237a438d298031d11a57c3b` (`userId`),
  ADD KEY `FK_50f53a55577bb829d8823adb3f9` (`reviewId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `query-result-cache`
--
ALTER TABLE `query-result-cache`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `victual`
--
ALTER TABLE `victual`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `vote`
--
ALTER TABLE `vote`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_40218f262bd4fda4d92eeed0b76` FOREIGN KEY (`reviewId`) REFERENCES `review` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `FK_460ba90243fec8a02467bc96282` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a6c53dfc89ba3188b389ef29a62` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `restaurant`
--
ALTER TABLE `restaurant`
  ADD CONSTRAINT `FK_315af20ce2dd3e52d28fba79fab` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `FK_1337f93918c70837d3cea105d39` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `victual`
--
ALTER TABLE `victual`
  ADD CONSTRAINT `FK_d4ee92542b2ddada512bbf5885c` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `vote`
--
ALTER TABLE `vote`
  ADD CONSTRAINT `FK_50f53a55577bb829d8823adb3f9` FOREIGN KEY (`reviewId`) REFERENCES `review` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f5de237a438d298031d11a57c3b` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
