-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 25, 2016 at 09:04 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aswa2.0`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_authentication`
--

CREATE TABLE `tbl_authentication` (
  `userid` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_authentication`
--

INSERT INTO `tbl_authentication` (`userid`, `user`, `firstname`, `lastname`, `role`, `password`) VALUES
(1, 'bvattapparam', 'Bijeshkumar', 'Vattapparambath', 'admin', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_billreminders`
--

CREATE TABLE `tbl_billreminders` (
  `id` int(11) NOT NULL,
  `item` varchar(100) NOT NULL,
  `amount` float NOT NULL,
  `billdate` date NOT NULL,
  `status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_billreminders`
--

INSERT INTO `tbl_billreminders` (`id`, `item`, `amount`, `billdate`, `status`) VALUES
(1, 'Airtel broadband', 918, '2016-06-24', 0),
(2, 'Airtel mobile (Me)', 518, '2016-06-28', 0),
(4, 'BSNL broadband', 510, '2016-06-30', 0),
(5, 'Tikona broadband', 312, '2015-10-04', 1),
(7, 'Credit Card', 250, '2016-06-30', 0),
(8, 'Airtel mobile (wife)', 514, '2015-10-15', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cart`
--

CREATE TABLE `tbl_cart` (
  `id` int(11) NOT NULL,
  `orderdate` date NOT NULL,
  `deliverydate` date DEFAULT NULL,
  `cart` varchar(100) NOT NULL,
  `amount` float NOT NULL,
  `item` varchar(200) NOT NULL,
  `comment` longtext NOT NULL,
  `status` varchar(10) NOT NULL,
  `ordernum` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_cart`
--

INSERT INTO `tbl_cart` (`id`, `orderdate`, `deliverydate`, `cart`, `amount`, `item`, `comment`, `status`, `ordernum`) VALUES
(6, '2016-03-20', '2016-03-26', '3', 111111, 'Mosquito net double bed', 'Update the actual values once reach at Chennai', '3', '010101'),
(7, '2016-03-06', '2016-03-08', '3', 370, 'Gym gloves', 'fill with actual values', '3', '00000');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_fees`
--

CREATE TABLE `tbl_fees` (
  `id` int(11) NOT NULL,
  `term` varchar(25) NOT NULL,
  `paiddate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_gas`
--

CREATE TABLE `tbl_gas` (
  `id` int(11) NOT NULL,
  `month` date NOT NULL,
  `amount_paid` double NOT NULL,
  `sub_amount` double NOT NULL,
  `sub_status` varchar(50) NOT NULL,
  `order_date` date NOT NULL,
  `delivered_date` date NOT NULL,
  `bill` varchar(20) NOT NULL,
  `order_status` varchar(50) NOT NULL,
  `comment` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_gas`
--

INSERT INTO `tbl_gas` (`id`, `month`, `amount_paid`, `sub_amount`, `sub_status`, `order_date`, `delivered_date`, `bill`, `order_status`, `comment`) VALUES
(2, '2015-04-01', 615.15, 0, '2', '2015-04-08', '2015-05-04', '3143', '1', 'First cyledar order in Bharat Gas Chitlapakkam'),
(3, '2015-04-01', 615.15, 0, '2', '2015-04-08', '2015-05-04', '3142', '1', 'Second cylendar on the same day'),
(4, '2015-05-01', 610.5, 203.18, '1', '2015-05-20', '2015-05-27', '16019', '1', ''),
(5, '2015-07-01', 627.5, 222.18, '1', '2015-07-11', '2015-07-15', '31235', '1', 'First booking in Aadhi agency');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_gas_agent`
--

CREATE TABLE `tbl_gas_agent` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `customerid` varchar(25) NOT NULL,
  `phone` int(20) NOT NULL,
  `address` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_gas_agent`
--

INSERT INTO `tbl_gas_agent` (`id`, `name`, `customerid`, `phone`, `address`) VALUES
(1, 'Aadhi Bharat Gas Agency', '12345678', 999999999, 'Aadhi Bharat Gas\r\nTharamani\r\nChennai');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_home_prepayment`
--

CREATE TABLE `tbl_home_prepayment` (
  `ID` int(11) NOT NULL,
  `PAYMENT_DATE` date NOT NULL,
  `PAYMENT_MODE` varchar(50) NOT NULL,
  `CHEQUE_NO` int(11) NOT NULL,
  `AMOUNT` float NOT NULL,
  `COMMENT` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_iowe`
--

CREATE TABLE `tbl_iowe` (
  `id` int(11) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `amount` double NOT NULL,
  `description` varchar(200) NOT NULL,
  `category` int(2) NOT NULL,
  `date_owe` date NOT NULL,
  `date_paid` date NOT NULL,
  `status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_iowe`
--

INSERT INTO `tbl_iowe` (`id`, `contact`, `amount`, `description`, `category`, `date_owe`, `date_paid`, `status`) VALUES
(5, 'Pon Radhakrishnan', 25, '', 2, '2015-10-21', '0000-00-00', 1),
(6, 'Ishan Bijesh', 1000, '', 6, '2015-10-22', '0000-00-00', 1),
(7, 'Albert Virgin', 100, '', 2, '2015-10-23', '0000-00-00', 1),
(8, 'Sasi', 4600, '', 5, '2016-02-01', '0000-00-00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ksfe`
--

CREATE TABLE `tbl_ksfe` (
  `id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `month` date NOT NULL,
  `comment` longtext NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ksfe`
--

INSERT INTO `tbl_ksfe` (`id`, `amount`, `month`, `comment`, `status`) VALUES
(1, 3000, '2015-04-01', 'This is a sample comment and need to add more later', 1),
(2, 3400, '2015-10-01', 'Sample comment and something later to add more.', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_landlord`
--

CREATE TABLE `tbl_landlord` (
  `ll_id` int(11) NOT NULL,
  `ll_name` varchar(100) NOT NULL,
  `ll_type` int(11) NOT NULL,
  `ll_address` longtext NOT NULL,
  `ll_contact` varchar(100) NOT NULL,
  `ll_dop` date NOT NULL,
  `ll_comment` longtext NOT NULL,
  `ll_status` varchar(20) NOT NULL,
  `ll_code` varchar(50) NOT NULL,
  `ll_pan` varchar(50) NOT NULL,
  `ll_dov` date NOT NULL,
  `ll_advance` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_landlord`
--

INSERT INTO `tbl_landlord` (`ll_id`, `ll_name`, `ll_type`, `ll_address`, `ll_contact`, `ll_dop`, `ll_comment`, `ll_status`, `ll_code`, `ll_pan`, `ll_dov`, `ll_advance`) VALUES
(1, 'Aashritha Anand Estates', 1, 'Aashritha Aanand Estates\r\nTelephone Nagar\r\nPerungudi, Chennai,\r\nTamilnadu, India - 600 096', '95959595', '2015-05-01', 'Found this flat with the help of Vijay and Jeeva. Main office of this flat is in TNagar and given cheque for 11 months as per the process. I have to collect PAN card in December to submit it to office.', '1', 'AA1', 'AAKLPB121211', '2014-08-01', 75000),
(2, 'Mr. Aadi Narayanan', 2, 'F2 - GuruRaghavendra Flats\r\n1st Kalyanasundaram Street\r\nChitlapakkam, Chennai\r\nTamilnadu', '99999999', '2013-06-01', 'Moved from second floor to first floor. Land lord is a nice person and located i Chrompet. ', '2', 'AN1', 'VGK909011', '2015-05-01', 63000),
(3, 'Mrs. Visalakshi', 3, 'S2- Gururaghavendra flats\r\n1st Kalyanasundaram Street\r\nChitlapakkam, Chennai\r\nTamilnadu', '99999999', '2011-05-01', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2', 'V1', 'wewewe', '2016-01-03', 4555),
(4, 'Mr. Vijay', 2, '#9 - Bangaru Street,\r\nAyanavaram, Chennai\r\nTamilnadu', '99999999', '2006-01-01', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry', '2', 'VJ1', 'jhjhj', '2016-01-10', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_medicalbill`
--

CREATE TABLE `tbl_medicalbill` (
  `id` int(11) NOT NULL,
  `billno` varchar(100) NOT NULL,
  `amount` float NOT NULL,
  `billmonth` date NOT NULL,
  `user` varchar(100) NOT NULL,
  `comment` longtext NOT NULL,
  `billtype` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_medicalbill`
--

INSERT INTO `tbl_medicalbill` (`id`, `billno`, `amount`, `billmonth`, `user`, `comment`, `billtype`) VALUES
(8, 'CSP-OCS-56695', 500, '2016-01-26', '1', 'First time treatment for eye iritation', '1'),
(11, 'CSP-OCS-58444', 500, '2016-02-06', '1', 'Second time consultation because of irritation and Left eye became red after stop the drop. Dr. confirmed its Pink eye. No drops for right eye and told me to come if right eye got affected.', '1'),
(12, 'CSP-OCS-60862', 500, '2016-02-20', '1', 'Both eyes are fine now and need to follow drops for both eyes for some times. He told still pink eye is there in left eye and its expected. Recommended for cornea topography for vision issue.', '1'),
(13, 'CC0020777', 445, '2016-02-20', '1', 'New drops bought for both left and right eyes.', '2'),
(14, 'CC0020211', 276, '2016-02-11', '1', 'for right eye', '2'),
(15, 'CC0019913', 226.5, '2016-02-06', '1', '', '2'),
(16, 'CS0055390', 82.5, '2016-01-26', '1', 'First time drops', '2');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_mobile`
--

CREATE TABLE `tbl_mobile` (
  `id` int(11) NOT NULL,
  `billmonth` date NOT NULL,
  `billno` varchar(100) NOT NULL,
  `amount` float NOT NULL,
  `user` varchar(100) NOT NULL,
  `comment` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_mobile`
--

INSERT INTO `tbl_mobile` (`id`, `billmonth`, `billno`, `amount`, `user`, `comment`) VALUES
(1, '2016-01-01', '1234567', 650, 'Bijeshkumar', 'this is a test data');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_cart`
--

CREATE TABLE `tbl_ref_cart` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_cart`
--

INSERT INTO `tbl_ref_cart` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'ebay', 0),
(2, '2', 'Flipkart', 0),
(3, '3', 'Amazon', 0),
(4, '4', 'Aliexpress', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_cartstatus`
--

CREATE TABLE `tbl_ref_cartstatus` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_cartstatus`
--

INSERT INTO `tbl_ref_cartstatus` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'Ordered', 0),
(2, '2', 'Transit', 0),
(3, '3', 'Delivered', 0),
(4, '4', 'Pending', 0),
(5, '5', 'Returned', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_expensecategory`
--

CREATE TABLE `tbl_ref_expensecategory` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_expensecategory`
--

INSERT INTO `tbl_ref_expensecategory` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'Fuel', 0),
(2, '2', 'Food', 0),
(3, '3', 'Grocery', 0),
(4, '4', 'Health', 0),
(5, '5', 'Entertainment', 0),
(6, '6', 'Shopping', 0),
(7, '7', 'Cinema', 0),
(8, '8', 'Travel', 0),
(9, '9', 'Bills', 0),
(10, '10', 'Rent', 0),
(11, '11', 'Others', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_filterstatus`
--

CREATE TABLE `tbl_ref_filterstatus` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_filterstatus`
--

INSERT INTO `tbl_ref_filterstatus` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'Active', 0),
(2, '2', 'Hold', 0),
(3, '3', 'Closed', 0),
(4, '0', 'All', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_gasorderstatus`
--

CREATE TABLE `tbl_ref_gasorderstatus` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_gasorderstatus`
--

INSERT INTO `tbl_ref_gasorderstatus` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'Delivered', 0),
(2, '2', 'Pending', 0),
(3, '3', 'Bill Generated', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_gassubstatus`
--

CREATE TABLE `tbl_ref_gassubstatus` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_gassubstatus`
--

INSERT INTO `tbl_ref_gassubstatus` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'Transfered', 0),
(2, '2', 'Pending', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_genericstatus`
--

CREATE TABLE `tbl_ref_genericstatus` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_genericstatus`
--

INSERT INTO `tbl_ref_genericstatus` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'Active', 0),
(2, '0', 'Inactive', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_genericstatustwo`
--

CREATE TABLE `tbl_ref_genericstatustwo` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_genericstatustwo`
--

INSERT INTO `tbl_ref_genericstatustwo` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '0', 'Pending', 0),
(2, '1', 'Paid', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_landlordnames`
--

CREATE TABLE `tbl_ref_landlordnames` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_landlordnames`
--

INSERT INTO `tbl_ref_landlordnames` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, 'AA1', 'Aashritha Aanand Estates', 0),
(2, 'AN1', 'Adhi Narayanan', 0),
(3, 'VJ1', 'Vijaya Raghavan', 0),
(4, 'V1', 'Visalakshi', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_landlordstatus`
--

CREATE TABLE `tbl_ref_landlordstatus` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_landlordstatus`
--

INSERT INTO `tbl_ref_landlordstatus` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'Active', 0),
(2, '2', 'Closed', 0),
(3, '3', 'Hold', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_landlordtypeicon`
--

CREATE TABLE `tbl_ref_landlordtypeicon` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_landlordtypeicon`
--

INSERT INTO `tbl_ref_landlordtypeicon` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'building', 0),
(2, '2', 'female', 0),
(3, '3', 'male', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_landlordtypes`
--

CREATE TABLE `tbl_ref_landlordtypes` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_landlordtypes`
--

INSERT INTO `tbl_ref_landlordtypes` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'Company', 0),
(2, '2', 'Male', 0),
(3, '3', 'Female', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_medicalbilltypes`
--

CREATE TABLE `tbl_ref_medicalbilltypes` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_medicalbilltypes`
--

INSERT INTO `tbl_ref_medicalbilltypes` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'Consultation Fee', 0),
(2, '2', 'Medicine', 0),
(3, '3', 'Labe Fee', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_medicalbillusers`
--

CREATE TABLE `tbl_ref_medicalbillusers` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_medicalbillusers`
--

INSERT INTO `tbl_ref_medicalbillusers` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'Self', 0),
(2, '2', 'Spouse', 0),
(3, '3', 'Son', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_mobileusers`
--

CREATE TABLE `tbl_ref_mobileusers` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_mobileusers`
--

INSERT INTO `tbl_ref_mobileusers` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, 'BK', 'Bijeshkumar Vattapparambath', 0),
(2, 'SN', 'Sandhya Narayanan', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_rentreceipt`
--

CREATE TABLE `tbl_ref_rentreceipt` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_rentreceipt`
--

INSERT INTO `tbl_ref_rentreceipt` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'Received', 0),
(2, '0', 'Pending', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_rentstatus`
--

CREATE TABLE `tbl_ref_rentstatus` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_rentstatus`
--

INSERT INTO `tbl_ref_rentstatus` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'Active', 0),
(2, '2', 'Closed', 0),
(3, '3', 'Hold', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_travelicon`
--

CREATE TABLE `tbl_ref_travelicon` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_travelicon`
--

INSERT INTO `tbl_ref_travelicon` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'plane', 0),
(2, '2', 'train', 0),
(3, '3', 'car', 0),
(4, '4', 'ship', 0),
(5, '5', 'bus', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_travelstatus`
--

CREATE TABLE `tbl_ref_travelstatus` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_ref_travelstatus`
--

INSERT INTO `tbl_ref_travelstatus` (`ID`, `CODE`, `NAME`, `STATUS`) VALUES
(1, '1', 'Open', 0),
(2, '2', 'Hold', 0),
(3, '3', 'Closed', 0),
(4, '4', 'Pending', 0),
(5, '5', 'Refund', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_rent`
--

CREATE TABLE `tbl_rent` (
  `rent_id` int(11) NOT NULL,
  `rent_month` date NOT NULL,
  `rent_amount` float NOT NULL,
  `ll_code` varchar(5) NOT NULL,
  `rent_comment` longtext NOT NULL,
  `rent_status` int(11) NOT NULL,
  `receipt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_rent`
--

INSERT INTO `tbl_rent` (`rent_id`, `rent_month`, `rent_amount`, `ll_code`, `rent_comment`, `rent_status`, `receipt`) VALUES
(2, '2015-06-01', 12000, 'AA1', 'builder debited cheque.', 1, 1),
(31, '2013-08-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(32, '2013-09-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(34, '2013-10-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(35, '2013-11-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(36, '2013-12-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(37, '2014-01-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(38, '2014-02-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(39, '2014-03-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(40, '2014-04-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(41, '2014-05-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(42, '2014-06-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(43, '2014-07-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(44, '2014-08-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(45, '2014-09-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(46, '2014-10-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(47, '2014-11-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(48, '2014-12-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(49, '2015-01-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(50, '2015-02-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(51, '2015-03-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(52, '2015-04-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(53, '2015-05-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(54, '2015-06-01', 10500, 'AN1', 'amount transferred thru wire', 2, 1),
(61, '2011-06-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(62, '2011-07-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(63, '2011-08-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(64, '2011-09-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(65, '2011-10-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(66, '2011-11-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(67, '2011-12-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(68, '2012-01-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(69, '2012-02-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(70, '2012-03-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(71, '2012-04-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(72, '2012-05-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(73, '2012-06-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(74, '2012-07-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(75, '2012-08-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(76, '2012-09-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(77, '2012-10-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(78, '2012-11-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(79, '2012-12-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(80, '2013-01-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(81, '2013-02-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(82, '2013-03-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(83, '2013-04-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(84, '2013-05-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(85, '2013-06-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(86, '2013-07-01', 7500, 'V1', 'amount transferred thru wire', 2, 1),
(152, '2006-01-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(153, '2006-02-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(154, '2006-03-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(155, '2006-04-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(156, '2006-05-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(157, '2006-06-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(158, '2006-07-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(159, '2006-08-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(160, '2006-09-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(161, '2006-10-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(162, '2006-11-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(163, '2006-12-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(164, '2007-01-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(165, '2007-02-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(166, '2007-03-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(167, '2007-04-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(168, '2007-05-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(169, '2007-06-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(170, '2007-07-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(171, '2007-08-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(172, '2007-09-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(173, '2007-10-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(174, '2007-11-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(175, '2007-12-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(176, '2008-01-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(177, '2008-02-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(178, '2008-03-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(179, '2008-04-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(180, '2008-05-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(181, '2008-06-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(182, '2008-07-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(183, '2008-08-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(184, '2008-09-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(185, '2008-10-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(186, '2008-11-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(187, '2008-12-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(188, '2009-01-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(189, '2009-02-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(190, '2009-03-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(191, '2009-04-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(192, '2009-05-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(193, '2009-06-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(194, '2009-07-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(195, '2009-08-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(196, '2009-09-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(197, '2009-10-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(198, '2009-11-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(199, '2009-12-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(200, '2010-01-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(201, '2010-02-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(202, '2010-03-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(203, '2010-04-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(204, '2010-05-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(205, '2010-06-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(206, '2010-07-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(207, '2010-08-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(208, '2010-09-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(209, '2010-10-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(210, '2010-11-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(211, '2010-12-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(212, '2011-01-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(213, '2011-02-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(214, '2011-03-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(215, '2011-04-01', 1200, 'VJ1', 'amount transferred thru wire', 2, 1),
(216, '2011-05-01', 1200, 'VJ1', 'Gave rent amount to landlord. He collected both rent and EB charge.', 2, 1),
(217, '2015-07-01', 12000, 'AA1', 'Credited amount using cheque on 5th August.', 1, 1),
(218, '2015-08-01', 12000, 'AA1', 'by cheque', 1, 1),
(219, '2015-09-01', 12000, 'AA1', 'by cheque', 1, 1),
(220, '2015-10-01', 12000, 'AA1', 'by cheque', 1, 1),
(221, '2015-11-01', 12000, 'AA1', 'by cheque', 1, 1),
(222, '2015-12-01', 12000, 'AA1', 'by cheque\nReceived rent receipt.', 1, 1),
(223, '2015-05-01', 12000, 'AA1', 'by cheque.\nfirst month rent.', 1, 1),
(224, '0000-00-00', 122, '', '', 0, 0),
(225, '2016-01-01', 12000, 'AA1', 'paid by cheque.', 1, 0),
(226, '2016-02-01', 12500, 'AA1', 'by cheque', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_travel`
--

CREATE TABLE `tbl_travel` (
  `travel_id` int(11) NOT NULL,
  `travel_icon` varchar(20) NOT NULL,
  `travel_source` varchar(50) NOT NULL,
  `travel_destination` varchar(50) NOT NULL,
  `travel_pnr` varchar(50) NOT NULL,
  `travel_date` date NOT NULL,
  `travel_booked_date` date NOT NULL,
  `travel_status` varchar(20) NOT NULL,
  `travel_amount` decimal(10,0) NOT NULL,
  `travel_comment` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_travel`
--

INSERT INTO `tbl_travel` (`travel_id`, `travel_icon`, `travel_source`, `travel_destination`, `travel_pnr`, `travel_date`, `travel_booked_date`, `travel_status`, `travel_amount`, `travel_comment`) VALUES
(54, '2', 'Chennai', 'Badagara', '4308407928', '2015-06-13', '2015-06-03', '3', '2485', 'my family to Kerala due to my Singapore business trip'),
(55, '2', 'Badagara', 'Chennai', '4208524533', '2015-06-12', '2015-06-03', '3', '427', 'my father in law trip to Chennai to pick my family to Kerala on my Singapore business trip'),
(70, '2', 'Badagara', 'Chennai', '4526918197', '2016-01-03', '2015-12-02', '3', '5396', 'Return trip from Kerala after Dr. appointment'),
(71, '2', 'Chennai', 'Badagara', '4314539327', '2015-12-31', '2015-12-02', '3', '2166', 'Trip to Kerala to meet Suresh doctor.'),
(72, '2', 'Chennai', 'Badagara', '4314152489', '2015-12-13', '2015-11-20', '3', '1106', 'Mother in law return trip to Kerala.'),
(73, '1', 'Chennai', 'Badagara', '123', '2016-02-12', '2016-02-11', '3', '5000', 'Went to Kerala. Wife and Son alone.'),
(74, '2', 'Badagara', 'Chennai', '123', '2016-02-20', '2016-02-15', '3', '4000', 'Family back to Chennai'),
(75, '2', 'Chennai', 'Badagara', '1111', '2016-02-24', '2016-02-21', '5', '1500', ''),
(76, '2', 'Chennai', 'Badagara', '1111', '2016-02-28', '2016-02-22', '1', '2000', 'Father in law and Mother in law return to Badagara.'),
(77, '2', 'Chennai', 'Coimbatore', '111111', '2016-03-23', '2016-03-14', '3', '11111', 'on the way to Kerala.'),
(78, '2', 'Coimbatore', 'Calicut', '11111', '2016-03-24', '2016-03-14', '3', '1111', ''),
(79, '2', 'Calicut', 'Badagara', '1111', '2016-03-24', '2016-03-14', '3', '111', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_authentication`
--
ALTER TABLE `tbl_authentication`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `tbl_billreminders`
--
ALTER TABLE `tbl_billreminders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_fees`
--
ALTER TABLE `tbl_fees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_gas`
--
ALTER TABLE `tbl_gas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_gas_agent`
--
ALTER TABLE `tbl_gas_agent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_home_prepayment`
--
ALTER TABLE `tbl_home_prepayment`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_iowe`
--
ALTER TABLE `tbl_iowe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_ksfe`
--
ALTER TABLE `tbl_ksfe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_landlord`
--
ALTER TABLE `tbl_landlord`
  ADD PRIMARY KEY (`ll_id`);

--
-- Indexes for table `tbl_medicalbill`
--
ALTER TABLE `tbl_medicalbill`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_mobile`
--
ALTER TABLE `tbl_mobile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_ref_cart`
--
ALTER TABLE `tbl_ref_cart`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_cartstatus`
--
ALTER TABLE `tbl_ref_cartstatus`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_expensecategory`
--
ALTER TABLE `tbl_ref_expensecategory`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_filterstatus`
--
ALTER TABLE `tbl_ref_filterstatus`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_gasorderstatus`
--
ALTER TABLE `tbl_ref_gasorderstatus`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_gassubstatus`
--
ALTER TABLE `tbl_ref_gassubstatus`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_genericstatus`
--
ALTER TABLE `tbl_ref_genericstatus`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_genericstatustwo`
--
ALTER TABLE `tbl_ref_genericstatustwo`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_landlordnames`
--
ALTER TABLE `tbl_ref_landlordnames`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_landlordstatus`
--
ALTER TABLE `tbl_ref_landlordstatus`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_landlordtypeicon`
--
ALTER TABLE `tbl_ref_landlordtypeicon`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_landlordtypes`
--
ALTER TABLE `tbl_ref_landlordtypes`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_medicalbilltypes`
--
ALTER TABLE `tbl_ref_medicalbilltypes`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_medicalbillusers`
--
ALTER TABLE `tbl_ref_medicalbillusers`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_mobileusers`
--
ALTER TABLE `tbl_ref_mobileusers`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_rentreceipt`
--
ALTER TABLE `tbl_ref_rentreceipt`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_rentstatus`
--
ALTER TABLE `tbl_ref_rentstatus`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_travelicon`
--
ALTER TABLE `tbl_ref_travelicon`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_ref_travelstatus`
--
ALTER TABLE `tbl_ref_travelstatus`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_rent`
--
ALTER TABLE `tbl_rent`
  ADD PRIMARY KEY (`rent_id`);

--
-- Indexes for table `tbl_travel`
--
ALTER TABLE `tbl_travel`
  ADD PRIMARY KEY (`travel_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_authentication`
--
ALTER TABLE `tbl_authentication`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_billreminders`
--
ALTER TABLE `tbl_billreminders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tbl_fees`
--
ALTER TABLE `tbl_fees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_gas`
--
ALTER TABLE `tbl_gas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `tbl_gas_agent`
--
ALTER TABLE `tbl_gas_agent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_home_prepayment`
--
ALTER TABLE `tbl_home_prepayment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_iowe`
--
ALTER TABLE `tbl_iowe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tbl_ksfe`
--
ALTER TABLE `tbl_ksfe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_landlord`
--
ALTER TABLE `tbl_landlord`
  MODIFY `ll_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tbl_medicalbill`
--
ALTER TABLE `tbl_medicalbill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `tbl_mobile`
--
ALTER TABLE `tbl_mobile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tbl_ref_cart`
--
ALTER TABLE `tbl_ref_cart`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_cartstatus`
--
ALTER TABLE `tbl_ref_cartstatus`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_expensecategory`
--
ALTER TABLE `tbl_ref_expensecategory`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_filterstatus`
--
ALTER TABLE `tbl_ref_filterstatus`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_gasorderstatus`
--
ALTER TABLE `tbl_ref_gasorderstatus`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_gassubstatus`
--
ALTER TABLE `tbl_ref_gassubstatus`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_genericstatus`
--
ALTER TABLE `tbl_ref_genericstatus`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_genericstatustwo`
--
ALTER TABLE `tbl_ref_genericstatustwo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_landlordnames`
--
ALTER TABLE `tbl_ref_landlordnames`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_landlordstatus`
--
ALTER TABLE `tbl_ref_landlordstatus`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_landlordtypeicon`
--
ALTER TABLE `tbl_ref_landlordtypeicon`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_landlordtypes`
--
ALTER TABLE `tbl_ref_landlordtypes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_medicalbilltypes`
--
ALTER TABLE `tbl_ref_medicalbilltypes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_medicalbillusers`
--
ALTER TABLE `tbl_ref_medicalbillusers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_mobileusers`
--
ALTER TABLE `tbl_ref_mobileusers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_rentreceipt`
--
ALTER TABLE `tbl_ref_rentreceipt`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_rentstatus`
--
ALTER TABLE `tbl_ref_rentstatus`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_travelicon`
--
ALTER TABLE `tbl_ref_travelicon`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_ref_travelstatus`
--
ALTER TABLE `tbl_ref_travelstatus`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_rent`
--
ALTER TABLE `tbl_rent`
  MODIFY `rent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=227;
--
-- AUTO_INCREMENT for table `tbl_travel`
--
ALTER TABLE `tbl_travel`
  MODIFY `travel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
