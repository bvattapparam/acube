-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 07, 2017 at 05:25 PM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paap`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ref_cartstatus`
--
CREATE TABLE `tbl_ref_avatar` (
  `ID` int(11) NOT NULL,
  `CODE` varchar(10) NOT NULL,
  `NAME` varchar(250) NOT NULL,
  `STATUS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_ref_cartstatus`
--
ALTER TABLE `tbl_ref_cartstatus`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_ref_cartstatus`
--
ALTER TABLE `tbl_ref_cartstatus`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
