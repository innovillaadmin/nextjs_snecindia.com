-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 18, 2023 at 08:39 AM
-- Server version: 5.7.43
-- PHP Version: 8.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `innovz4y_abscorp`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart_sales`
--

CREATE TABLE `cart_sales` (
  `id` bigint(255) NOT NULL,
  `csid` int(255) DEFAULT '0',
  `godownid` int(255) DEFAULT '0',
  `godown_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prodid` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prod_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prod_purchase_rate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `prod_mrp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `prod_sales_price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `prod_unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prod_qty_in_unit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `prod_qty_in_pcs` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prod_total` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `order_date` date DEFAULT NULL,
  `order_time` time DEFAULT NULL,
  `order_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart_sales`
--

INSERT INTO `cart_sales` (`id`, `csid`, `godownid`, `godown_name`, `prodid`, `prod_name`, `prod_purchase_rate`, `prod_mrp`, `prod_sales_price`, `prod_unit`, `prod_qty_in_unit`, `prod_qty_in_pcs`, `prod_total`, `order_date`, `order_time`, `order_status`) VALUES
(22, 10, 7, 'rampur', '1', 'Rud col sigil 5mm', '100', '100', '111.11', 'thaili', '05', '45', '4999.95', '2023-11-03', '19:32:35', 'closed'),
(23, 13, 7, 'rampur', '1', 'Rud col sigil 5mm', '100', '100', '111.11', 'thaili', '012', '108', '11999.88', '2023-11-03', '21:54:08', 'closed'),
(24, 13, 8, 'home 10', '3', 'Rud col sigil 6 mm', '1000', '1050', '122.22', 'darzon', '01', '12', '1466.64', '2023-11-03', '21:54:08', 'closed'),
(25, 14, 7, 'rampur', '1', 'Rud col sigil 5mm', '100', '100', '10', 'thaili', '0100', '900', '9000.00', '2023-11-03', '22:15:27', 'closed'),
(26, 14, 8, 'home 10', '3', 'Rud col sigil 6 mm', '1000', '1050', '1', 'thaili', '10', '90', '90.00', '2023-11-03', '22:15:27', 'closed'),
(27, 15, 7, 'rampur', '1', 'Rud col sigil 5mm', '100', '100', '111.11', 'thaili', '10', '90', '9999.90', '2023-11-05', '18:50:41', 'closed'),
(28, 16, 7, 'rampur', '1', 'Rud col sigil 5mm', '100', '100', '10', 'darzon', '100', '1200', '12000.00', '2023-11-06', '01:30:30', 'closed'),
(30, 0, 7, 'rampur', '5', 'Thara', '160', '180', '20.00', 'thaili', '10', '90', '1800.00', NULL, NULL, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `cart_summary`
--

CREATE TABLE `cart_summary` (
  `id` bigint(20) NOT NULL,
  `pay_mode` varchar(255) DEFAULT NULL,
  `customer_id` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_contact` varchar(255) DEFAULT NULL,
  `date_of_sale` date DEFAULT NULL,
  `description` text,
  `sale_value` varchar(255) DEFAULT '0',
  `booking` varchar(255) DEFAULT '0',
  `packing` varchar(255) DEFAULT '0',
  `other_charge` varchar(255) NOT NULL DEFAULT '0',
  `round_off` varchar(255) NOT NULL DEFAULT '0',
  `total_payable` varchar(255) NOT NULL DEFAULT '0',
  `previous_balance` varchar(255) NOT NULL DEFAULT '0',
  `paidincash` varchar(255) NOT NULL DEFAULT '0',
  `paidonline` varchar(255) NOT NULL DEFAULT '0',
  `amount_paid` varchar(255) NOT NULL DEFAULT '0',
  `current_balance` varchar(255) NOT NULL DEFAULT '0',
  `transporter_name` varchar(255) DEFAULT NULL,
  `station_name` varchar(255) DEFAULT NULL,
  `adhar_or_gst` varchar(255) DEFAULT NULL,
  `added_by` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart_summary`
--

INSERT INTO `cart_summary` (`id`, `pay_mode`, `customer_id`, `customer_name`, `customer_contact`, `date_of_sale`, `description`, `sale_value`, `booking`, `packing`, `other_charge`, `round_off`, `total_payable`, `previous_balance`, `paidincash`, `paidonline`, `amount_paid`, `current_balance`, `transporter_name`, `station_name`, `adhar_or_gst`, `added_by`, `date`, `time`) VALUES
(15, 'cash', '1', '1', '1', '2023-11-05', '', '9999.9', '', '', '', '', '9999.9', '50', '999', '9000', '9999', '50.9', 'trans', 'station', 'adhar', '82', '2023-11-05', '18:50:41'),
(16, 'credit', '1', '1', '1', '2023-11-06', '', '12000', '100', '70', '45', '', '12215', '50', '12000', '265', '12265', '', 'Vrl', 'Trichey', '12345789061', '82', '2023-11-06', '01:30:30');

-- --------------------------------------------------------

--
-- Table structure for table `category_list`
--

CREATE TABLE `category_list` (
  `id` int(255) NOT NULL,
  `category_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_category_id` int(255) DEFAULT NULL,
  `parent_category_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_path` text COLLATE utf8mb4_unicode_ci,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `cat_created_by_id` int(255) DEFAULT NULL,
  `cat_created_by_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category_list`
--

INSERT INTO `category_list` (`id`, `category_name`, `parent_category_id`, `parent_category_name`, `category_path`, `date`, `time`, `cat_created_by_id`, `cat_created_by_name`, `category_status`) VALUES
(2, 'misc', 1, 'primary', '\'primary\' >\'misc\' ', '2022-02-28', '23:06:40', 28, 'mrityunjay  pandey', 'active'),
(9, 'Jewellery & Accessories', 1, 'primary', '\'primary\'>\'Jewellery & Accessories\'', '2022-03-02', '22:23:16', 29, 'Durganandan  Vishwakarma', 'active'),
(10, 'Men', 1, 'primary', '\'primary\'>\'Men\'', '2022-03-04', '06:41:26', 29, 'Durganandan  Vishwakarma', 'active'),
(18, 'Rudraksha', 2, 'misc', NULL, '2023-06-15', '07:15:48', NULL, NULL, NULL),
(19, 'Rudraksha', 18, 'Rudraksha', NULL, '2023-06-21', '21:00:02', NULL, NULL, NULL),
(20, 'rud', 18, 'Rudraksha', NULL, '2023-07-11', '13:00:58', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contact_req`
--

CREATE TABLE `contact_req` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contactnumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emailaddress` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purpose` text COLLATE utf8mb4_unicode_ci,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_req`
--

INSERT INTO `contact_req` (`id`, `fullname`, `contactnumber`, `emailaddress`, `purpose`, `date`, `time`) VALUES
(1, '1', '1', '1', '1', '2023-06-01', '17:05:12'),
(2, '1', '1', '1', '1', '2023-06-01', '17:06:47'),
(3, '1', '1', '1', '1', '2023-06-01', '17:07:19');

-- --------------------------------------------------------

--
-- Table structure for table `customer_base`
--

CREATE TABLE `customer_base` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pincode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_balance` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer_base`
--

INSERT INTO `customer_base` (`id`, `name`, `address`, `city`, `state`, `pincode`, `contact`, `email`, `company_name`, `current_balance`, `date`, `time`) VALUES
(1, '1', '1', '1', 'uttar pradesh', '1', '1', 'lkjl@gmail.com', '1', '50', '2023-06-16', '15:35:27'),
(2, 'Csp', 'Chennai', 'Varanasi', 'uttar pradesh', '222100', '453678926', '', '', NULL, '2023-07-11', '06:12:23'),
(3, 'Csp', 'Chennai', 'Varanasi', 'uttar pradesh', '222100', '453678926', 'abscorp@gmail.com', 'No', NULL, '2023-07-11', '06:12:38'),
(4, 'ram', 'madauli', 'varanasi', 'uttar pradesh', '221001', '8786857458', '', '', NULL, '2023-07-14', '22:04:34'),
(5, 'ram', 'madauli', 'varanasi', 'uttar pradesh', '221001', '8786857458', 'xyz@gmail.com', 'tree', NULL, '2023-07-14', '22:05:27'),
(6, 'ram', 'madauli', 'varanasi', 'uttar pradesh', '221001', '8786857458', 'xyz@gmail.com', 'tree', NULL, '2023-07-14', '22:05:27'),
(7, 'ram', 'madauli', 'varanasi', 'uttar pradesh', '221001', '8786857458', 'xyz@gmail.com', 'tree', NULL, '2023-07-14', '22:05:27'),
(8, 'ram', 'madauli', 'varanasi', 'uttar pradesh', '221001', '8786857458', 'xyz@gmail.com', 'tree', NULL, '2023-07-14', '22:05:27'),
(9, 'ram', 'madauli', 'varanasi', 'uttar pradesh', '221001', '8786857458', 'xyz@gmail.com', 'tree', NULL, '2023-07-14', '22:05:27');

-- --------------------------------------------------------

--
-- Table structure for table `godown_list`
--

CREATE TABLE `godown_list` (
  `id` bigint(20) NOT NULL,
  `godown_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `godown_address` text COLLATE utf8mb4_unicode_ci,
  `city` text COLLATE utf8mb4_unicode_ci,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pincode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `godown_list`
--

INSERT INTO `godown_list` (`id`, `godown_name`, `godown_address`, `city`, `state`, `pincode`, `date`, `time`) VALUES
(7, 'rampur', 'bhadaini', 'vns', 'uttar pradesh', '555555', '2023-07-14', '22:06:22'),
(8, 'home 10', 'Varanasi', 'Varanasi', 'Uttar Pradesh', '221108', '2023-07-14', '22:07:02');

-- --------------------------------------------------------

--
-- Table structure for table `product_inventory_master`
--

CREATE TABLE `product_inventory_master` (
  `id` bigint(255) NOT NULL,
  `prod_full_name` text COLLATE utf8mb4_unicode_ci,
  `barcode` text COLLATE utf8mb4_unicode_ci,
  `purchase_rate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `prod_mrp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `sale_price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `sale_price_piece` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `unit_list_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `unit_list_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `unit_value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int(255) DEFAULT NULL,
  `category_name` text COLLATE utf8mb4_unicode_ci,
  `category_id_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_name_2` text COLLATE utf8mb4_unicode_ci,
  `cat_path` text COLLATE utf8mb4_unicode_ci,
  `batch_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `godownid` bigint(20) DEFAULT NULL,
  `godownname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prod_image_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prod_image_link_2` text COLLATE utf8mb4_unicode_ci,
  `prod_image_link_3` text COLLATE utf8mb4_unicode_ci,
  `prod_image_link_4` text COLLATE utf8mb4_unicode_ci,
  `prod_image_link_5` text COLLATE utf8mb4_unicode_ci,
  `prod_image_link_6` text COLLATE utf8mb4_unicode_ci,
  `prod_stock_qty` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stock_in_pcs` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `prod_creation_date` date DEFAULT NULL,
  `prod_creation_time` time DEFAULT NULL,
  `prod_created_by_id` int(255) DEFAULT NULL,
  `prod_created_by_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prod_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_inventory_master`
--

INSERT INTO `product_inventory_master` (`id`, `prod_full_name`, `barcode`, `purchase_rate`, `prod_mrp`, `sale_price`, `sale_price_piece`, `unit_list_id`, `unit_list_name`, `unit_value`, `category_id`, `category_name`, `category_id_2`, `category_name_2`, `cat_path`, `batch_no`, `godownid`, `godownname`, `prod_image_link`, `prod_image_link_2`, `prod_image_link_3`, `prod_image_link_4`, `prod_image_link_5`, `prod_image_link_6`, `prod_stock_qty`, `stock_in_pcs`, `prod_creation_date`, `prod_creation_time`, `prod_created_by_id`, `prod_created_by_name`, `prod_status`) VALUES
(1, 'Rud col sigil 5mm', '', '100', '100', '1000', '111.11111111111111', '3', 'thaili', '9', 2, 'misc', '1', 'primary', NULL, '', 7, 'rampur', '', '', NULL, NULL, NULL, NULL, '50', '450', '2023-10-14', '15:55:20', 0, NULL, 'active'),
(2, 'Rud col sigil 11 mm', '', '250', '260', '260', '28.88888888888889', '3', 'thaili', '9', 20, 'rud', '18', 'Rudraksha', NULL, '', 7, 'rampur', '', '', NULL, NULL, NULL, NULL, '9', '81', '2023-10-20', '01:10:00', 0, NULL, 'active'),
(3, 'Rud col sigil 6 mm', '', '1000', '1050', '1100', '122.22222222222223', '3', 'thaili', '9', 2, 'misc', '1', 'primary', NULL, '', 8, 'home 10', 'prod-31dd411e07ca6b9f3e35ec4d87365d9a.jpg', 'prod-c2326bd9b48d39a055bdecf20a1f0d65.jpg', NULL, NULL, NULL, NULL, '50', '450', '2023-10-23', '05:02:35', 0, NULL, 'active'),
(4, 'test', '', '50', '90', '90', '10', '3', 'thaili', '9', 19, 'Rudraksha', '18', 'Rudraksha', NULL, '', 7, 'rampur', 'prod-b5943c715ace1cd322b09e536dd65881.jpg', '', NULL, NULL, NULL, NULL, '5', '45', '2023-10-30', '09:37:59', 0, NULL, 'active'),
(5, 'Thara', '', '160', '180', '180', '20', '3', 'thaili', '9', 2, 'misc', '1', 'primary', NULL, '', 7, 'rampur', 'prod-095cb9da791e6b657ba1ead1a77df75e.jpg', '', NULL, NULL, NULL, NULL, '9', '81', '2023-11-06', '01:33:28', 0, NULL, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `unit_list`
--

CREATE TABLE `unit_list` (
  `id` int(11) NOT NULL,
  `unit_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qty_in_pack` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `unit_list`
--

INSERT INTO `unit_list` (`id`, `unit_name`, `qty_in_pack`, `date`, `time`) VALUES
(3, 'thaili', '9', NULL, NULL),
(4, 'darzon', '12', NULL, NULL),
(5, 'kilo', '12', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userdata`
--

CREATE TABLE `userdata` (
  `id` int(255) NOT NULL,
  `fname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `father_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mother_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alt_num` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pincode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `landmark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ac_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ifsc_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `branch_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ac_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `useremail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usercontact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userrole` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userpassword` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userstatus` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_activation_date` date DEFAULT NULL,
  `user_activation_time` time DEFAULT NULL,
  `user_activated_by` int(255) DEFAULT NULL,
  `user_activated_by_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `userdata`
--

INSERT INTO `userdata` (`id`, `fname`, `mname`, `lname`, `dob`, `father_name`, `gender`, `mother_name`, `alt_num`, `address`, `city`, `district`, `state`, `pincode`, `landmark`, `whatsapp_no`, `bank_name`, `ac_no`, `ifsc_code`, `branch_address`, `ac_type`, `useremail`, `usercontact`, `userrole`, `userpassword`, `userstatus`, `user_activation_date`, `user_activation_time`, `user_activated_by`, `user_activated_by_name`) VALUES
(82, 'test', 'm', 'pandey', NULL, NULL, NULL, NULL, NULL, 'ajdj', 'hkj', 'hkjh', 'kj', '221009', 'hkjh', NULL, NULL, NULL, NULL, NULL, NULL, 'jssjsakda@ksjdkjsadklas.com', '6393409431', 'admin', '81dc9bdb52d04dc20036dbd8313ed055', 'active', '2023-01-14', '22:19:56', 28, NULL),
(83, 'j', 'j', 'j', '2023-01-17', 'bbj', NULL, NULL, NULL, 'jhkj', 'hkjh', 'kjhk', 'jhkj', '87987', '98798', '7987', NULL, NULL, NULL, NULL, NULL, 'jhsjadkjs@jkahdajshka', '687686876876', 'customer', '74987398379', 'active', '2023-01-14', '22:21:24', NULL, NULL),
(86, 'g', 'g', 'g', NULL, NULL, NULL, NULL, NULL, 'jiiu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'g@g', 'g', 'godown-manager', '1234', 'active', '0000-00-00', '00:00:00', NULL, NULL),
(87, 'sanjay', '', '', NULL, NULL, NULL, NULL, NULL, 'hkjhkj', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'sanjay@gmail.com', '6393409432', 'godown-manager', '1234', 'active', '0000-00-00', '00:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `id` int(255) NOT NULL,
  `userid` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pincode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `landmark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locality` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`id`, `userid`, `address`, `city`, `state`, `pincode`, `landmark`, `locality`, `date`, `time`) VALUES
(3, '28', '1', '1', '1', '1', '1', '1', '2021-10-13', '12:19:14'),
(4, '28', '1', '1', '1', '1', '1', '1', '2021-10-13', '12:21:10'),
(5, '28', '1', '1', '1', '1', '1', '1', '2021-10-13', '12:30:48'),
(6, '28', 'dghasjdhajsh', 'jhgsjhdgjshgdjh', 'jhgsjdhgjshdg', 'jhgdjhdgjshgd', 'djhgdjhgdjh', 'shgdjhsgdjhs', '2021-10-13', '13:40:02'),
(7, '28', 'plot no 116 mahamanapuri colony karaundi suswahi road', 'varanasi', 'uttar pradesh', '221005', 'new aata chakki', 'nasirpur', '2021-10-13', '13:42:06'),
(8, '84', '1', '1', '1', '1', '1', '1', '2021-10-13', '23:41:11'),
(9, '91', '1', '1', '1', '1', '1', '1', '2021-10-13', '23:48:30'),
(10, '28', '1', '1', '1', '1', '1', '1', '2021-10-14', '12:08:35'),
(11, '28', '1', '1', '1', '1', '1', '1', '2021-10-14', '12:08:41'),
(12, '28', '1', '1', '1', '1', '1', '1', '2021-10-14', '12:08:47'),
(13, '115', 'test', 'test', 'test', 'test', 'test', '156654', '2021-10-14', '13:18:33'),
(14, '116', '1', '1', '1', '1', '1', '1', '2021-10-14', '13:21:30'),
(15, '113', '1', '1', '1', '1', '1', '1', '2021-10-14', '13:30:22'),
(16, '161', 'lahurabir', 'Varanasi', 'uttar Pradesh', '221001', 'crossing', 'Ramkatora', '2021-10-23', '19:02:54'),
(17, '162', 'Mahmoorganl', 'Varanasi', 'uttar Pradesh', '221001', 'Near Akashwani', 'Mahmoorganj', '2021-10-23', '19:15:12'),
(18, '160', 'Ranipur', 'Varanasi', 'uttar Pradesh', '221002', 'Opp Railway Station', 'Ranipur', '2021-10-23', '19:25:42'),
(19, '159', 'Ranipur', 'Varanasi', 'uttar Pradesh', '221002', 'crossing', 'Ranipur', '2021-10-23', '19:31:07'),
(20, '158', 'Mahmoorganj', 'Varanasi', 'uttar Pradesh', '221001', 'Opp Railway Station', 'Ramkatora', '2021-10-23', '19:39:49'),
(21, '157', '12455', 'Varanasi', 'uttar Pradesh', '221002', 'kathary', 'kathaty', '2021-10-23', '19:44:09'),
(22, '157', '12455', 'Varanasi', 'uttar Pradesh', '221002', 'afsh', 'shsdk', '2021-10-23', '19:44:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_sales`
--
ALTER TABLE `cart_sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_summary`
--
ALTER TABLE `cart_summary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category_list`
--
ALTER TABLE `category_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_req`
--
ALTER TABLE `contact_req`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_base`
--
ALTER TABLE `customer_base`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `godown_list`
--
ALTER TABLE `godown_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_inventory_master`
--
ALTER TABLE `product_inventory_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unit_list`
--
ALTER TABLE `unit_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userdata`
--
ALTER TABLE `userdata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_sales`
--
ALTER TABLE `cart_sales`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `cart_summary`
--
ALTER TABLE `cart_summary`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `category_list`
--
ALTER TABLE `category_list`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `contact_req`
--
ALTER TABLE `contact_req`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customer_base`
--
ALTER TABLE `customer_base`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `godown_list`
--
ALTER TABLE `godown_list`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `product_inventory_master`
--
ALTER TABLE `product_inventory_master`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `unit_list`
--
ALTER TABLE `unit_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `userdata`
--
ALTER TABLE `userdata`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
