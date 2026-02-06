-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2026 at 03:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blogify`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `category` enum('technology','programming','business','education','lifestyle','news') NOT NULL,
  `status` enum('draft','pending','published') DEFAULT 'draft',
  `views` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `title`, `slug`, `content`, `featured_image`, `category`, `status`, `views`, `created_at`, `updated_at`) VALUES
(1, 1, 'Elections under federal con?trol President Trump proposes nationalizing elections', 'electionsunderfederalcontrolpresidenttrumpproposesnationalizingelections', '<span style=\"color: rgb(41, 41, 41); font-family: Lora, serif; font-size: 14.4px; letter-spacing: -0.0432px;\">Washington, D.C. – With President Trump\'s signature this week, more than 95% of the federal government is funded through full-year FY26 appropriations - delivering stability, certainty, and results for the American people. This moment reflects months of deliberate, line-by-line work by House Republicans in upholding a member-driven process, prioritizing fiscal responsibility, and implementing America First policies that drive strength, security, and growth in communities nationwide.</span>', 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1VKXUS.img?w=738&h=415&q=60&m=6&f=jpg&u=t', 'news', 'published', 0, '2026-02-06 08:47:45', '2026-02-06 12:35:31'),
(2, 1, 'Elections under federal control', 'elections-under-federal-control', 'lorem ipsum dolor', 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1VKXUS.img?w=738&h=415&q=60&m=6&f=jpg&u=t', 'programming', 'pending', 0, '2026-02-06 12:10:29', '2026-02-06 12:25:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `fullName` varchar(250) NOT NULL,
  `username` varchar(250) NOT NULL,
  `proflePic` varchar(200) NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Vt3v25YczqZvo8kqRJEaW5Mz8wD91T_8Ar6U5cD9-A&s',
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `role` enum('admin','user','author') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `username`, `proflePic`, `email`, `password`, `role`) VALUES
(1, 'Prince', 'prince2k7', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Vt3v25YczqZvo8kqRJEaW5Mz8wD91T_8Ar6U5cD9-A&s', 'imbugazange1@yahoo.com', '$2b$10$SjMk9naoPn9vLl/HHPlRN.lABvz1XT0xcPD9Vrl6/ZtFgY9qBr1TS', 'author'),
(3, 'fgg', 'hhhh', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Vt3v25YczqZvo8kqRJEaW5Mz8wD91T_8Ar6U5cD9-A&s', 'imbugazange1@gmail.com', '$2b$10$83qGRtFGOldpnhxm/oRSDudV8sMKj2BuLF9sJjE2u2H6b6ZKxVAjW', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `title` (`title`,`featured_image`,`category`,`status`,`updated_at`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
