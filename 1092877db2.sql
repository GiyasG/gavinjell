-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2019 at 01:34 PM
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
-- Database: `1092877db2`
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
(1, 'Dr', 'Gavin', 'Jell', 'Head of Lab', '&lt;p&gt;&lt;strong&gt;I&amp;rsquo;m the Programme Director&lt;/strong&gt;/ &lt;strong&gt;course tutor for the&lt;/strong&gt; &amp;nbsp;&lt;a href=&quot;&amp;quot;&amp;quot;&amp;quot;&amp;quot;&amp;quot;&amp;quot;http:/www.ucl.ac.uk/nanomed&amp;quot;&amp;quot;&amp;quot;&amp;quot;&amp;quot;&amp;quot;&quot;&gt;MSc in Nanotechnology and Regenerative Medicine&amp;nbsp;&lt;/a&gt;(UCL) on which I lecture, designed modules and currently run the Tissue Engineering module. I teach/lecture on a wide range of regenerative medicine related topics including; cell-material interactions, nanotechnology in tissue engineering, bone and cartilage tissue regeneration, angiogenesis, hypoxia and stem cells. I also lecture on the role of nanotechnology in medicine (including nanotoxicity) and more generic lectures on experimental planning and critical analysis of research papers.&lt;br /&gt;&lt;br /&gt;Other teaching activities: Graduate Tutor&amp;nbsp;(taught)&amp;nbsp;for the Division of Surgery; Royal Free Division of Surgery Education Lead, Divisional Post-Graduate Teaching Assistant Coordinator on which I run a &amp;ldquo;Developing Learning and Teaching in Higher Education&amp;rdquo; course for PGs who teach.&amp;nbsp;&lt;br /&gt;&lt;br /&gt;I&amp;rsquo;m also passionate about increasing awareness and participation in science and I&amp;rsquo;m proud to have been involved in a number of schemes which encourage this including; the &amp;nbsp;In2scienceUK placement scheme&amp;nbsp;(2013-current),&amp;nbsp;Next Generation Project&amp;nbsp;&amp;nbsp;(ICL 2007-2009),&amp;nbsp;Nuffield Science bursaries,&amp;nbsp;&amp;nbsp;International Scientific Youth Forum,&lt;/p&gt;\n&lt;p style=&quot;text-align: center;&quot;&gt;STEMNET and UCL Masterclass, Outreach.&lt;/p&gt;', '1977-12-31', 'male', '2019-01-07 06:42:08', '2019-02-20 10:57:08');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `uname` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `authority_id` int(10) UNSIGNED NOT NULL,
  `nameofdb` varchar(249) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idofdb` int(10) UNSIGNED NOT NULL,
  `comment` varchar(8000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `uname`, `authority_id`, `nameofdb`, `idofdb`, `comment`, `created_at`, `updated_at`) VALUES
(132, 51, 'Admin', 0, 'projects', 0, '&lt;p&gt;ggggggggggggggg&lt;/p&gt;', '2019-02-21 10:45:53', '2019-02-21 10:45:53'),
(126, 52, 'Michael', 1, 'projects', 43, '&lt;p&gt;nnnnnnnn&lt;strong&gt; BBBBBBBBBBBBBB&lt;/strong&gt; SSSSSSSSSS&lt;/p&gt;', '2019-02-21 08:05:35', '2019-02-21 10:59:15'),
(125, 52, 'Michael', 1, 'projects', 43, '&lt;p&gt;bbbbbbbb&lt;/p&gt;', '2019-02-21 08:05:11', '2019-02-21 08:05:11'),
(131, 51, 'Admin', 0, 'projects', 0, '&lt;p&gt;fdgdfg dfgdfgdf&lt;/p&gt;', '2019-02-21 10:45:33', '2019-02-21 10:45:33'),
(130, 51, 'Admin', 1, 'projects', 43, '&lt;p style=&quot;text-align: left;&quot;&gt;&lt;strong&gt;AAAAAAAAAA&lt;/strong&gt;&lt;/p&gt;\n&lt;p&gt;AAAAAAAA&lt;/p&gt;', '2019-02-21 10:06:41', '2019-02-21 11:15:22'),
(134, 51, 'Admin', 1, 'projects', 43, '&lt;p&gt;Cxxxxxxxxxxxxxx&lt;/p&gt;', '2019-02-21 10:47:54', '2019-02-21 10:47:54'),
(135, 51, 'Admin', 1, 'projects', 43, '&lt;p&gt;bbbbbbbbbbbb&lt;/p&gt;', '2019-02-21 10:49:43', '2019-02-21 10:49:43'),
(138, 51, 'Admin', 1, 'papers', 13, '&lt;p style=&quot;text-align: center;&quot;&gt;&lt;strong&gt;Hello Kitty&lt;/strong&gt;&lt;/p&gt;', '2019-02-21 11:34:26', '2019-02-21 11:34:26'),
(139, 52, 'Michael', 1, 'papers', 13, '&lt;p&gt;&lt;em&gt;Hello darling !&lt;/em&gt;&lt;/p&gt;', '2019-02-21 11:35:11', '2019-02-21 11:35:11');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(10) UNSIGNED NOT NULL,
  `authority_id` int(10) UNSIGNED NOT NULL,
  `propertytype` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `postcode` varchar(6) NOT NULL,
  `street` varchar(40) DEFAULT NULL,
  `phone` varchar(13) DEFAULT '+994XXXXXXXXX',
  `email` varchar(249) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `authority_id`, `propertytype`, `country`, `city`, `postcode`, `street`, `phone`, `email`, `created_at`, `updated_at`) VALUES
(2, 1, 'Office', 'UK', 'London', 'NW3 2Q', 'UCL Medical School, Royal Free Campus 9t', '02074314934', 'g.jell@ucl.ac.uk', '2019-02-06 10:02:05', '2019-02-06 10:02:05');

-- --------------------------------------------------------

--
-- Table structure for table `contacts_team`
--

CREATE TABLE `contacts_team` (
  `tcontact_id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contacts_team`
--

INSERT INTO `contacts_team` (`tcontact_id`, `team_id`) VALUES
(53, 5),
(55, 6),
(57, 7);

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
(13, 1, 'Bio project', '&lt;p&gt;An interdisciplinary scientist interested in the material &amp;ndash; biological interactions. He completed a PhD (at UCL as part of the Queen Mary IRC in Biomedical Materials) looking at the causes of aseptic loosening of&amp;nbsp;&amp;nbsp;orthopaedic implants. Using this knowledge on cell-material interactions Gavin was recruited by Prof. Larry Hench at Imperial College London investigating the use of bioactive glass for regenerative medicine. It was during this time that Gavin also developed an interest in multidisciplinary characterisation of material-cell constructs and together the Prof. Ioan Nottigher investigated the use of Raman spectroscopy for the characterising these interactions.&lt;/p&gt;\n&lt;p class=\'MsoNormal\' style=\'margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 12px; vertical-align: baseline; color: #222222; font-family: Arial, Helvetica, sans-serif;\'&gt;Gavin joined Prof. Molly Stevens group (Imperial) in 2005 to continue research on tissue engineering, publishing on a variety of topics including stem cells, tissue engineering (including the creation of&amp;nbsp; HIF stabilising materials) and nanoparticle material-biological interactions.&amp;nbsp;&lt;/p&gt;', 'bioproject.com', '2019-01-31', '2019-02-06 10:08:28', '2019-02-20 11:07:48'),
(14, 1, 'Ddddddddd', '&lt;p class=\'MsoNormal\' style=\'margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 12px; vertical-align: baseline; color: #222222; font-family: Arial, Helvetica, sans-serif;\'&gt;An interdisciplinary scientist interested in the material &amp;ndash; biological interactions. He completed a PhD (at UCL as part of the Queen Mary IRC in Biomedical Materials) looking at the causes of aseptic loosening of&amp;nbsp;&lt;span style=\'margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; background-color: transparent;\'&gt;&amp;nbsp;&lt;/span&gt;orthopaedic implants. Using this knowledge on cell-material interactions Gavin was recruited by Prof. Larry Hench at Imperial College London investigating the use of bioactive glass for regenerative medicine. It was during this time that Gavin also developed an interest in multidisciplinary characterisation of material-cell constructs and together the Prof. Ioan Nottigher investigated the use of Raman spectroscopy for the characterising these interactions.&lt;/p&gt;\n&lt;p class=\'MsoNormal\' style=\'margin: 0px; padding: 0px; border: 0px; outline: none; font-size: 12px; vertical-align: baseline; color: #222222; font-family: Arial, Helvetica, sans-serif;\'&gt;Gavin joined Prof. Molly Stevens group (Imperial) in 2005 to continue research on tissue engineering, publishing on a variety of topics including stem cells, tissue engineering (including the creation of&amp;nbsp; HIF stabilising materials) and nanoparticle material-biological interactions. He returned to UCL in 2009 to develop his own research group and lead a new MSc in Nanotechnology and Regenerative Medicine.&amp;nbsp; &amp;nbsp;&lt;/p&gt;', 'Ddddddd', '2019-02-13', '2019-02-06 13:02:10', '2019-02-06 13:02:54');

-- --------------------------------------------------------

--
-- Table structure for table `papers_team`
--

CREATE TABLE `papers_team` (
  `paper_id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `papers_team`
--

INSERT INTO `papers_team` (`paper_id`, `team_id`) VALUES
(13, 5),
(13, 7),
(14, 6),
(14, 7);

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
  `slide_id` int(10) UNSIGNED DEFAULT NULL,
  `image` varchar(512) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `authority_id`, `paper_id`, `project_id`, `team_id`, `slide_id`, `image`, `description`, `created_at`, `updated_at`) VALUES
(7, 1, NULL, NULL, NULL, NULL, '190124070130gavin.jpg', 'Dr Gavin Jell', '2019-01-11 12:27:00', '2019-01-24 06:12:30'),
(90, NULL, 13, NULL, NULL, NULL, '190206110228bio3.jpg', 'Bio project', '2019-02-06 10:08:28', '2019-02-06 10:08:28'),
(94, NULL, 14, NULL, NULL, NULL, '190206020210hif.jpg', 'Ddddddddd', '2019-02-06 13:02:10', '2019-02-06 13:02:10'),
(95, NULL, NULL, NULL, 5, NULL, '190208060224Medina_Guliyeva.jpg', 'Ms Medina Guliyev', '2019-02-08 05:22:25', '2019-02-08 05:22:25'),
(96, NULL, NULL, NULL, 6, NULL, '190208060216Carolina_Ramos.jpg', 'Ms Carolina Vamos', '2019-02-08 05:27:16', '2019-02-08 05:27:16'),
(97, NULL, NULL, NULL, 7, NULL, '190208080214man1.jpg', 'Mr Sherlock Holmes', '2019-02-08 07:31:14', '2019-02-08 07:31:14'),
(98, NULL, NULL, 42, NULL, NULL, '190219020222hif.jpg', 'Tech', '2019-02-19 13:18:22', '2019-02-19 13:18:22'),
(99, NULL, NULL, 43, NULL, NULL, '190220060222bio2.jpg', 'BioBio', '2019-02-20 05:57:22', '2019-02-20 05:57:22');

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
(42, 1, 'Tech', '&lt;p style=\'text-align: left;\'&gt;&lt;span style=\'color: #5a5a5a;\'&gt;&lt;span style=\'text-decoration: underline;\'&gt;An interdisciplinary scientist interested&lt;/span&gt; in the material &amp;ndash; biological interactions. He completed a PhD (at UCL as part of the Queen Mary IRC in Biomedical Materials) looking at the causes of aseptic loosening of&amp;nbsp;&amp;nbsp;orthopaedic implants. Using this knowledge on cell-material interactions Gavin was recruited by Prof. Larry Hench at Imperial College London investigating the use of bioactive glass for regenerative medicine. It was during this time that Gavin also developed an interest in multidisciplinary characterisation of material-cell constructs and together the Prof. Ioan Nottigher investigated the use of Raman spectroscopy for the characterising these interactions.&lt;/span&gt;&lt;/p&gt;', 'tech.cc', '1987-12-31', '2019-01-31', '2019-02-19 13:18:22', '2019-02-21 05:37:50'),
(43, 1, 'BioBio', '&lt;p&gt;&lt;span style=\'color: #2f4f4f;\'&gt;An interdisciplinary scientist interested in the material &lt;strong&gt;&lt;em&gt;&amp;ndash; biological&lt;/em&gt; &lt;/strong&gt;interactions. He completed a PhD (at UCL as part of the Queen Mary IRC in Biomedical Materials) looking at the causes of aseptic loosening of&amp;nbsp;&amp;nbsp;orthopaedic implants. &lt;/span&gt;&lt;/p&gt;\n&lt;p&gt;&lt;span style=\'color: #2f4f4f;\'&gt;Using this knowledge on cell-material interactions Gavin was recruited by Prof. Larry Hench at Imperial College London investigating the use of bioactive glass for regenerative medicine. It was during this time that Gavin also developed an interest in multidisciplinary characterisation of material-cell constructs and together the Prof. Ioan Nottigher investigated the use of Raman spectroscopy for the characterising these interactions.&lt;/span&gt;&lt;/p&gt;', 'bbb', '2019-02-06', '2019-02-13', '2019-02-20 05:57:22', '2019-02-21 05:37:58');

-- --------------------------------------------------------

--
-- Table structure for table `projects_team`
--

CREATE TABLE `projects_team` (
  `project_id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects_team`
--

INSERT INTO `projects_team` (`project_id`, `team_id`) VALUES
(42, 5),
(42, 6),
(43, 7);

-- --------------------------------------------------------

--
-- Table structure for table `slides`
--

CREATE TABLE `slides` (
  `id` int(10) UNSIGNED NOT NULL,
  `authority_id` int(10) UNSIGNED NOT NULL,
  `nameofdb` varchar(249) NOT NULL,
  `idofdb` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `slides`
--

INSERT INTO `slides` (`id`, `authority_id`, `nameofdb`, `idofdb`, `created_at`, `updated_at`) VALUES
(22, 1, 'papers', 14, '2019-02-19 07:26:08', '2019-02-19 07:26:08'),
(23, 1, 'projects', 42, '2019-02-21 06:13:07', '2019-02-21 06:13:07'),
(24, 1, 'papers', 13, '2019-02-21 06:13:12', '2019-02-21 06:13:12'),
(25, 1, 'projects', 43, '2019-02-21 06:13:15', '2019-02-21 06:13:15');

-- --------------------------------------------------------

--
-- Table structure for table `tcontacts`
--

CREATE TABLE `tcontacts` (
  `id` int(10) UNSIGNED NOT NULL,
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
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tcontacts`
--

INSERT INTO `tcontacts` (`id`, `authority_id`, `team_id`, `propertytype`, `country`, `city`, `postcode`, `street`, `phone`, `email`, `created_at`, `updated_at`) VALUES
(53, 1, 5, 'Office', 'UK', 'London', 'NW1', 'High Street', '02079383412', 'medina@mail.com', '2019-02-08 05:31:19', '2019-02-08 06:27:47'),
(55, 1, 6, 'Office', 'UK', 'London', 'NW5', 'High street', '02087773344', 'carolina', '2019-02-08 07:17:55', '2019-02-08 07:17:55'),
(57, 1, 7, 'Home', 'UK', 'Lonond', 'W1', 'Backer street', '02072221122', 'sherlock', '2019-02-08 08:12:13', '2019-02-08 08:12:13');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(10) UNSIGNED NOT NULL,
  `authority_id` int(10) UNSIGNED NOT NULL,
  `titlet` varchar(3) NOT NULL,
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

INSERT INTO `teams` (`id`, `authority_id`, `titlet`, `name`, `surname`, `position`, `about`, `dob`, `sex`, `created_at`, `updated_at`) VALUES
(5, 1, 'Ms', 'Medina', 'Guliyev', 'phD student', '&lt;p&gt;An interdisciplinary scientist interested in the material &amp;ndash; biological interactions. He completed a PhD (at UCL as part of the Queen Mary IRC in Biomedical Materials) looking at the causes of aseptic loosening of&amp;nbsp;&amp;nbsp;orthopaedic implants. Using this knowledge on cell-material interactions Gavin was recruited by Prof. Larry Hench at Imperial College London investigating the use of bioactive glass for regenerative medicine. It was during this time that Gavin also developed an interest in multidisciplinary characterisation of material-cell constructs and together the Prof. Ioan Nottigher investigated the use of Raman spectroscopy for the characterising these interactions.&lt;/p&gt;', '2019-01-31', 'female', '2019-02-08 05:22:24', '2019-02-08 05:22:24'),
(6, 1, 'Ms', 'Carolina', 'Vamos', 'Student', '&lt;p&gt;&lt;strong&gt;Carolina Vamos&lt;/strong&gt;&lt;/p&gt;', '2019-01-31', 'female', '2019-02-08 05:27:16', '2019-02-08 05:27:16'),
(7, 1, 'Mr', 'Sherlock', 'Holmes', 'Detective', '&lt;p&gt;Detective he is&lt;/p&gt;', '2019-01-31', 'male', '2019-02-08 07:31:14', '2019-02-08 07:31:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authority`
--
ALTER TABLE `authority`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
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
  ADD KEY `team_id` (`team_id`),
  ADD KEY `slide_id` (`team_id`),
  ADD KEY `photos_ibfk_5` (`slide_id`);

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
-- Indexes for table `slides`
--
ALTER TABLE `slides`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authority_id` (`authority_id`),
  ADD KEY `idofdb` (`idofdb`);

--
-- Indexes for table `tcontacts`
--
ALTER TABLE `tcontacts`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `papers`
--
ALTER TABLE `papers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `slides`
--
ALTER TABLE `slides`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `tcontacts`
--
ALTER TABLE `tcontacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

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
-- Constraints for table `slides`
--
ALTER TABLE `slides`
  ADD CONSTRAINT `slides_ibfk_1` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`);

--
-- Constraints for table `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `team_ibfk_1` FOREIGN KEY (`authority_id`) REFERENCES `authority` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
