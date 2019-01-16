-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2019 at 12:59 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gj`
--

-- --------------------------------------------------------

--
-- Table structure for table `authority`
--

CREATE TABLE `authority` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(2) NOT NULL,
  `name` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `position` varchar(40) NOT NULL,
  `about` text,
  `dob` date NOT NULL,
  `sex` varchar(6) DEFAULT 'male',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authority`
--

INSERT INTO `authority` (`id`, `title`, `name`, `surname`, `position`, `about`, `dob`, `sex`, `created_at`, `updated_at`) VALUES
(1, 'Dr', 'Gavin', 'Jell', 'Head of Lab', 'Welcome to the lab of the Programme Director/course tutor for the  MSc in Nanotechnology and Regenerative Medicine (UCL).Here you can find the information regarding ongoing and finished projects as well as be acquainted with the lab\'s publications. Meet our team members, become a member of our community to share new ideas.  ', '1977-12-31', 'male', '2019-01-07 06:42:08', '2019-01-16 11:20:49');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(10) UNSIGNED NOT NULL,
  `authority_id` int(10) UNSIGNED NOT NULL,
  `propertytype` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `postcode` varchar(6) NOT NULL,
  `street` varchar(40) DEFAULT NULL,
  `phone` varchar(13) DEFAULT '+994XXXXXXXXX',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `contacts_team`
--

CREATE TABLE `contacts_team` (
  `contact_id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `papers`
--

CREATE TABLE `papers` (
  `id` int(10) UNSIGNED NOT NULL,
  `authority_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(40) NOT NULL,
  `description` text,
  `url` varchar(512) DEFAULT NULL,
  `published` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `papers`
--

INSERT INTO `papers` (`id`, `authority_id`, `title`, `description`, `url`, `published`, `created_at`, `updated_at`) VALUES
(2, 1, 'Paper 2', 'About nano particles', 'www.paper2.org', '2018-12-02', '2019-01-07 08:39:03', '2019-01-07 08:39:03');

-- --------------------------------------------------------

--
-- Table structure for table `papers_team`
--

CREATE TABLE `papers_team` (
  `paper_id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(10) UNSIGNED NOT NULL,
  `authority_id` int(10) UNSIGNED DEFAULT NULL,
  `paper_id` int(10) UNSIGNED DEFAULT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `team_id` int(10) UNSIGNED DEFAULT NULL,
  `filename` varchar(512) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `authority_id`, `paper_id`, `project_id`, `team_id`, `filename`, `description`, `created_at`, `updated_at`) VALUES
(7, 1, NULL, NULL, NULL, '190116110127gavin.jpg', 'Dr Gavin Jell', '2019-01-11 12:27:00', '2019-01-16 10:35:27'),
(12, NULL, NULL, 1, NULL, '181230051234puma1.jpg', 'Project 1', '2019-01-14 13:46:17', '2019-01-14 13:46:17'),
(38, NULL, NULL, 17, NULL, '190116100144hif.jpg', 'Cell', '2019-01-16 09:52:44', '2019-01-16 09:52:44'),
(39, NULL, NULL, 18, NULL, '190116110127hif.jpg', 'A', '2019-01-16 09:54:55', '2019-01-16 10:59:27');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(10) UNSIGNED NOT NULL,
  `authority_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(40) NOT NULL,
  `description` text,
  `url` varchar(512) DEFAULT NULL,
  `started` date DEFAULT NULL,
  `finished` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `authority_id`, `title`, `description`, `url`, `started`, `finished`, `created_at`, `updated_at`) VALUES
(1, 1, 'Project 1', 'It is all about project 1', 'www.project1.org', '2019-01-01', '2019-01-06', '2019-01-07 08:25:30', '2019-01-07 08:25:30'),
(17, 1, 'Cell', 'Cell', 'cell', '2018-12-31', '2019-01-08', '2019-01-16 09:52:44', '2019-01-16 09:52:44'),
(18, 1, 'M', 'A', 'M', '2018-12-31', '2019-01-08', '2019-01-16 09:54:55', '2019-01-16 09:54:55');

-- --------------------------------------------------------

--
-- Table structure for table `projects_team`
--

CREATE TABLE `projects_team` (
  `project_id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(3) NOT NULL,
  `name` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `position` varchar(40) NOT NULL,
  `about` text,
  `dob` date NOT NULL,
  `sex` varchar(6) DEFAULT 'male',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authority`
--
ALTER TABLE `authority`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authority_id` (`authority_id`);

--
-- Indexes for table `contacts_team`
--
ALTER TABLE `contacts_team`
  ADD PRIMARY KEY (`contact_id`,`team_id`),
  ADD KEY `FK_contact_team` (`team_id`);

--
-- Indexes for table `papers`
--
ALTER TABLE `papers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authority_id` (`authority_id`);

--
-- Indexes for table `papers_team`
--
ALTER TABLE `papers_team`
  ADD PRIMARY KEY (`paper_id`,`team_id`),
  ADD KEY `FK_paper_team` (`team_id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authority_id` (`authority_id`),
  ADD KEY `paper_id` (`paper_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authority_id` (`authority_id`);

--
-- Indexes for table `projects_team`
--
ALTER TABLE `projects_team`
  ADD PRIMARY KEY (`project_id`,`team_id`),
  ADD KEY `FK_project_team` (`team_id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authority`
--
ALTER TABLE `authority`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `papers`
--
ALTER TABLE `papers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`);

--
-- Constraints for table `contacts_team`
--
ALTER TABLE `contacts_team`
  ADD CONSTRAINT `FK_contact` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`id`),
  ADD CONSTRAINT `FK_contact_team` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`);

--
-- Constraints for table `papers`
--
ALTER TABLE `papers`
  ADD CONSTRAINT `papers_ibfk_1` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`);

--
-- Constraints for table `papers_team`
--
ALTER TABLE `papers_team`
  ADD CONSTRAINT `FK_paper` FOREIGN KEY (`paper_id`) REFERENCES `papers` (`id`),
  ADD CONSTRAINT `FK_paper_team` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`);

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `photos_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `photos_ibfk_3` FOREIGN KEY (`paper_id`) REFERENCES `papers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `photos_ibfk_4` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `projects_team`
--
ALTER TABLE `projects_team`
  ADD CONSTRAINT `FK_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_project_team` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
