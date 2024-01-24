-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 22, 2024 at 02:16 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

-- Tạo cơ sở dữ liệu nếu nó chưa tồn tại
CREATE DATABASE IF NOT EXISTS manager_student;

-- Sử dụng cơ sở dữ liệu manager_student
USE manager_student;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `docker`
--

-- --------------------------------------------------------

--
-- Table structure for table `class_study`
--

CREATE TABLE `class_study` (
  `id` int NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `class_study`
--

INSERT INTO `class_study` (`id`, `name`) VALUES
(1, 'DA21TTA'),
(2, 'DA21TTB'),
(3, 'DA21TTC');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int NOT NULL,
  `class_id` int NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `sex` enum('male','female','other') NOT NULL,
  `birthday` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `class_id`, `full_name`, `sex`, `birthday`) VALUES
(1, 2, 'Lý Nam Tiến', 'male', '2003-11-27'),
(2, 1, 'Trần Ngọc An', 'female', '2003-01-14'),
(3, 3, 'Trần Thị Hương', 'female', '2003-06-03'),
(4, 1, 'Nguyễn Văn Toàn', 'female', '2003-10-19'),
(5, 2, 'Lê Văn Minh', 'male', '2003-12-31'),
(6, 3, 'Lê Tú Nguyên', 'male', '2003-11-11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class_study`
--
ALTER TABLE `class_study`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class_study`
--
ALTER TABLE `class_study`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class_study` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
