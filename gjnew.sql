-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2019 at 10:12 AM
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
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(2) NOT NULL,
  `name` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `position` varchar(40) NOT NULL,
  `about` text,
  `dob` date NOT NULL,
  `sex` varchar(6) DEFAULT 'male',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `authority`
--

INSERT INTO `authority` (`id`, `title`, `name`, `surname`, `position`, `about`, `dob`, `sex`, `created_at`, `updated_at`) VALUES
(1, 'Dr', 'Gavin', 'Jell', 'Head of Lab', '&lt;p&gt;&lt;strong&gt;I&amp;rsquo;m the Programme Director&lt;/strong&gt;/ &lt;strong&gt;course tutor for the&lt;/strong&gt; &amp;nbsp;&lt;a href=&quot;&amp;quot;&amp;quot;&amp;quot;http:/www.ucl.ac.uk/nanomed&amp;quot;&amp;quot;&amp;quot;&quot;&gt;MSc in Nanotechnology and Regenerative Medicine&amp;nbsp;&lt;/a&gt;(UCL) on which I lecture, designed modules and currently run the Tissue Engineering module. I teach/lecture on a wide range of regenerative medicine related topics including; cell-material interactions, nanotechnology in tissue engineering, bone and cartilage tissue regeneration, angiogenesis, hypoxia and stem cells. I also lecture on the role of nanotechnology in medicine (including nanotoxicity) and more generic lectures on experimental planning and critical analysis of research papers.&lt;br /&gt;&lt;br /&gt;Other teaching activities: Graduate Tutor&amp;nbsp;(taught)&amp;nbsp;for the Division of Surgery; Royal Free Division of Surgery Education Lead, Divisional Post-Graduate Teaching Assistant Coordinator on which I run a &amp;ldquo;Developing Learning and Teaching in Higher Education&amp;rdquo; course for PGs who teach.&amp;nbsp;&lt;br /&gt;&lt;br /&gt;I&amp;rsquo;m also passionate about increasing awareness and participation in science and I&amp;rsquo;m proud to have been involved in a number of schemes which encourage this including; the &amp;nbsp;In2scienceUK placement scheme&amp;nbsp;(2013-current),&amp;nbsp;Next Generation Project&amp;nbsp;&amp;nbsp;(ICL 2007-2009),&amp;nbsp;Nuffield Science bursaries,&amp;nbsp;&amp;nbsp;International Scientific Youth Forum,&lt;/p&gt;\n&lt;p&gt;STEMNET and UCL Masterclass, Outreach.&lt;/p&gt;', '1977-12-31', 'male', '2019-01-07 06:42:08', '2019-02-06 10:06:43');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `authority_id` int(10) UNSIGNED NOT NULL,
  `propertytype` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `postcode` varchar(6) NOT NULL,
  `street` varchar(40) DEFAULT NULL,
  `phone` varchar(13) DEFAULT '+994XXXXXXXXX',
  `email` varchar(249) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `authority_id`, `propertytype`, `country`, `city`, `postcode`, `street`, `phone`, `email`, `created_at`, `updated_at`) VALUES
(1, 1, 'Office', 'UK', 'London', 'NW3 2Q', 'UCL Medical School, Royal Free Campus 9t', '02074314934', 'g.jell@ucl.ac.uk', '2019-02-06 10:02:05', '2019-02-06 10:02:05');

-- --------------------------------------------------------
--
-- Table structure for table `tcontacts`
--

CREATE TABLE `tcontacts` (
  `id` int(10) UNSIGNED NOT NULL  AUTO_INCREMENT,
  `authority_id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL,
  `propertytype` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `postcode` varchar(6) NOT NULL,
  `street` varchar(40) DEFAULT NULL,
  `phone` varchar(13) DEFAULT '+994XXXXXXXXX',
  `email` varchar(249) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `contacts_team`
--

CREATE TABLE `contacts_team` (
  `tcontact_id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `papers`
--

CREATE TABLE `papers` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(40) NOT NULL,
  `description` text,
  `url` varchar(512) DEFAULT NULL,
  `published` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Table structure for table `papers_team`
--

CREATE TABLE `papers_team` (
  `paper_id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(10) UNSIGNED NOT NULL  AUTO_INCREMENT,
  `authority_id` int(10) UNSIGNED DEFAULT NULL,
  `paper_id` int(10) UNSIGNED DEFAULT NULL,
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `team_id` int(10) UNSIGNED DEFAULT NULL,
  `slide_id` int(10) UNSIGNED DEFAULT NULL,
  `image` varchar(512) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `authority_id`, `paper_id`, `project_id`, `team_id`, `image`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, NULL, NULL, '190124070130gavin.jpg', 'Dr Gavin Jell', '2019-01-11 12:27:00', '2019-01-24 06:12:30');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `authority_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(40) NOT NULL,
  `description` text,
  `url` varchar(512) DEFAULT NULL,
  `started` date DEFAULT NULL,
  `finished` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `projects_team`
--

CREATE TABLE `projects_team` (
  `project_id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------


-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `authority_id` int(10) UNSIGNED NOT NULL,
  `titlet` varchar(3) NOT NULL,
  `name` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `position` varchar(40) NOT NULL,
  `about` text,
  `dob` date NOT NULL,
  `sex` varchar(6) DEFAULT 'male',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `slides` (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `authority_id` int(10) UNSIGNED NOT NULL,
    `nameofdb` varchar(249) NOT NULL,
    `idofdb` int(10) UNSIGNED NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



CREATE TABLE `comments` (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `authority_id` int(10) UNSIGNED NOT NULL,
    `user_id` int(10) UNSIGNED NOT NULL,
    `uname` varchar(128) NOT NULL,
    `nameofdb` varchar(249) NOT NULL,
    `idofdb` int(10) UNSIGNED NOT NULL,
    `comment` varchar(8000) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD KEY `authority_id` (`authority_id`);

--
-- Indexes for table `contacts_team`
--
ALTER TABLE `contacts_team`
  ADD PRIMARY KEY (`tcontact_id`,`team_id`),
  ADD KEY `FK_tcontact_team` (`team_id`);

--
-- Indexes for table `papers`
--
ALTER TABLE `papers`
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
  ADD KEY `authority_id` (`authority_id`),
  ADD KEY `paper_id` (`paper_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `slide_id` (`team_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
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
  ADD KEY `team_ibfk_1` (`authority_id`);


  ALTER TABLE `slides`
    ADD KEY `authority_id` (`authority_id`),
    ADD KEY `idofdb` (`idofdb`);

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `contacts_team`
--
ALTER TABLE `contacts_team`
  ADD CONSTRAINT `FK_contact_team` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_tcontact` FOREIGN KEY (`tcontact_id`) REFERENCES `tcontacts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `papers`
--
ALTER TABLE `papers`
  ADD CONSTRAINT `papers_ibfk_1` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `papers_team`
--
ALTER TABLE `papers_team`
  ADD CONSTRAINT `FK_paper` FOREIGN KEY (`paper_id`) REFERENCES `papers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_paper_team` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `photos_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `photos_ibfk_3` FOREIGN KEY (`paper_id`) REFERENCES `papers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `photos_ibfk_4` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `photos_ibfk_5` FOREIGN KEY (`slide_id`) REFERENCES `slides` (`id`);


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
  ADD CONSTRAINT `FK_project_team` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `team_ibfk_1` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`) ON DELETE CASCADE;
COMMIT;

--
-- Constraints for table `slides`
--
ALTER TABLE `slides`
  ADD CONSTRAINT `slides_ibfk_1` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
