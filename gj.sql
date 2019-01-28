-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2019 at 02:06 PM
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
(1, 'Dr', 'Gavin', 'Jell', 'Head of Lab', '&lt;p&gt;&lt;strong&gt;I&amp;rsquo;m the Programme Director&lt;/strong&gt;/ &lt;strong&gt;course tutor for the&lt;/strong&gt; &amp;nbsp;&lt;a href=&quot;&amp;quot;&amp;quot;http:/www.ucl.ac.uk/nanomed&amp;quot;&amp;quot;&quot;&gt;MSc in Nanotechnology and Regenerative Medicine&amp;nbsp;&lt;/a&gt;(UCL) on which I lecture, designed modules and currently run the Tissue Engineering module. I teach/lecture on a wide range of regenerative medicine related topics including; cell-material interactions, nanotechnology in tissue engineering, bone and cartilage tissue regeneration, angiogenesis, hypoxia and stem cells. I also lecture on the role of nanotechnology in medicine (including nanotoxicity) and more generic lectures on experimental planning and critical analysis of research papers.&lt;br /&gt;&lt;br /&gt;Other teaching activities: Graduate Tutor&amp;nbsp;(taught)&amp;nbsp;for the Division of Surgery; Royal Free Division of Surgery Education Lead, Divisional Post-Graduate Teaching Assistant Coordinator on which I run a &amp;ldquo;Developing Learning and Teaching in Higher Education&amp;rdquo; course for PGs who teach.&amp;nbsp;&lt;br /&gt;&lt;br /&gt;I&amp;rsquo;m also passionate about increasing awareness and participation in science and I&amp;rsquo;m proud to have been involved in a number of schemes which encourage this including; the &amp;nbsp;In2scienceUK placement scheme&amp;nbsp;(2013-current),&amp;nbsp;Next Generation Project&amp;nbsp;&amp;nbsp;(ICL 2007-2009),&amp;nbsp;Nuffield Science bursaries,&amp;nbsp;&amp;nbsp;International Scientific Youth Forum,&lt;/p&gt;\n&lt;p&gt;STEMNET andUCL Masterclass, Outreach.&lt;/p&gt;', '1977-12-31', 'male', '2019-01-07 06:42:08', '2019-01-25 09:55:10');

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
(12, 1, 'Zzzzzzz', '&lt;p&gt;&lt;em&gt;ZZZZZzz&lt;/em&gt;&lt;/p&gt;\n&lt;p&gt;&lt;em&gt;z&lt;/em&gt;&lt;/p&gt;\n&lt;p&gt;&lt;strong&gt;&lt;span style=\'text-decoration: underline;\'&gt;&lt;em&gt;XXXXXXXXX&lt;/em&gt;&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;', 'Zzzzzz', '2018-12-31', '2019-01-25 09:25:17', '2019-01-25 09:54:46');

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
  `image` varchar(512) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `authority_id`, `paper_id`, `project_id`, `team_id`, `image`, `description`, `created_at`, `updated_at`) VALUES
(7, 1, NULL, NULL, NULL, '190124070130gavin.jpg', 'Dr Gavin Jell', '2019-01-11 12:27:00', '2019-01-24 06:12:30'),
(42, NULL, NULL, NULL, 1, '190125060136Medina_Guliyeva.jpg', 'Ms Medina Guliyeva', '2019-01-16 12:27:23', '2019-01-25 05:38:36'),
(78, NULL, NULL, 40, NULL, '1901231101181.jpg', 'Bio', '2019-01-23 10:58:18', '2019-01-24 05:38:23'),
(79, NULL, NULL, 41, NULL, '190123120138bio2.jpg', 'Tech', '2019-01-23 11:16:07', '2019-01-24 06:27:48'),
(84, NULL, NULL, 44, NULL, '190125080101bio1.jpg', 'z', '2019-01-25 07:48:01', '2019-01-25 07:48:01'),
(85, NULL, 12, NULL, NULL, '190125110149hif.jpg', 'Zzzzzzz', '2019-01-25 09:25:17', '2019-01-25 10:09:49'),
(87, NULL, NULL, NULL, 5, '190125110138woman4.jpg', 'D D D', '2019-01-25 10:01:31', '2019-01-25 10:09:38');

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
(40, 1, 'Bio', '&lt;p&gt;&lt;strong&gt;&lt;span style=&quot;text-decoration: underline;&quot;&gt;&lt;em&gt;Lorem ipsum&lt;/em&gt;&lt;/span&gt;&lt;/strong&gt; dolor &lt;em&gt;sit amet&lt;/em&gt;, consectetur adipiscing elit. Aliquam pulvinar dapibus lectus, vitae gravida metus. Vestibulum rutrum dui nec suscipit iaculis.&lt;/p&gt;\n&lt;p style=&quot;padding-left: 30px;&quot;&gt;&lt;strong&gt;&lt;em&gt;Vivamus eget metus ut nisi fermentum aliquam.&lt;/em&gt;&lt;/strong&gt;&lt;/p&gt;', 'bio.org', '2018-12-31', '2019-01-10', '2019-01-23 10:58:18', '2019-01-25 09:28:45'),
(41, 1, 'Tech', '&lt;p style=&quot;text-align: center;&quot;&gt;&lt;strong&gt;Lorem ipsum&lt;/strong&gt; dolor sit amet, consectetur adipiscing elit. &lt;strong&gt;Aliquam pulvinar ...&lt;/strong&gt;&lt;/p&gt;', 'tech.org', '2018-12-31', '2019-01-10', '2019-01-23 11:16:07', '2019-01-25 09:14:16'),
(44, 1, 'z', '&lt;p&gt;&lt;strong&gt;HHHHHHHHHHHHHHHHHH&lt;/strong&gt;&lt;/p&gt;\n&lt;p&gt;&lt;strong&gt;yyyyyyyy&lt;/strong&gt;&lt;/p&gt;', 'z', '2019-01-01', '2019-01-15', '2019-01-25 07:48:01', '2019-01-25 09:54:58');

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
  `authority_id` int(10) UNSIGNED NOT NULL,
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
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `authority_id`, `title`, `name`, `surname`, `position`, `about`, `dob`, `sex`, `created_at`, `updated_at`) VALUES
(1, 1, 'Ms', 'Medina', 'Guliyeva', 'phD student', '&lt;p&gt;&lt;strong&gt;Lorem ipsum dolor sit amet,&lt;/strong&gt;&lt;/p&gt;\n&lt;p&gt;consectetur adipiscing elit. Aliquam pulvinar dapibus lectus, vitae gravida metus. Vestibulum rutrum dui nec suscipit iaculis. Vivamus eget metus ut nisi fermentum aliquam. Nulla facilisi. Vestibulum dapibus quam nisi. Nam blandit tortor eget convallis blandit. Aenean vitae neque in lorem consequat &lt;strong&gt;semper. Quisque sodales at magna in viverra.&lt;/strong&gt;&lt;/p&gt;', '1998-08-10', 'female', '2019-01-16 12:25:51', '2019-01-25 10:00:20'),
(5, 1, 'D', 'D', 'D', 'D', '&lt;p&gt;Dddddddd&lt;/p&gt;', '2018-12-31', 'female', '2019-01-25 10:01:31', '2019-01-25 10:04:45');

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_ibfk_1` (`authority_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authority`
--
ALTER TABLE `authority`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `papers`
--
ALTER TABLE `papers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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

--
-- Constraints for table `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `team_ibfk_1` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
