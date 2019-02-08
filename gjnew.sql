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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `authority_id`, `propertytype`, `country`, `city`, `postcode`, `street`, `phone`, `email`, `created_at`, `updated_at`) VALUES
(2, 1, 'Office', 'UK', 'London', 'NW3 2Q', 'UCL Medical School, Royal Free Campus 9t', '02074314934', 'g.jell@ucl.ac.uk', '2019-02-06 10:02:05', '2019-02-06 10:02:05');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tcontacts`
--

INSERT INTO `tcontacts` (`id`, `authority_id`, `team_id`, `propertytype`, `country`, `city`, `postcode`, `street`, `phone`, `email`, `created_at`, `updated_at`) VALUES
(53, 1, 5, 'Office', 'UK', 'London', 'NW1', 'High Street', '02079383412', 'medina@mail.com', '2019-02-08 05:31:19', '2019-02-08 06:27:47'),
(55, 1, 6, 'Office', 'UK', 'London', 'NW5', 'High street', '02087773344', 'carolina', '2019-02-08 07:17:55', '2019-02-08 07:17:55'),
(57, 1, 7, 'Home', 'UK', 'Lonond', 'W1', 'Backer street', '02072221122', 'sherlock', '2019-02-08 08:12:13', '2019-02-08 08:12:13');

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
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `authority_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(40) NOT NULL,
  `description` text,
  `url` varchar(512) DEFAULT NULL,
  `published` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `papers`
--

INSERT INTO `papers` (`id`, `authority_id`, `title`, `description`, `url`, `published`, `created_at`, `updated_at`) VALUES
(13, 1, 'Bio project', '&lt;p&gt;An interdisciplinary scientist interested in the material &amp;ndash; biological interactions. He completed a PhD (at UCL as part of the Queen Mary IRC in Biomedical Materials) looking at the causes of aseptic loosening of&amp;nbsp;&amp;nbsp;orthopaedic implants. Using this knowledge on cell-material interactions Gavin was recruited by Prof. Larry Hench at Imperial College London investigating the use of bioactive glass for regenerative medicine. It was during this time that Gavin also developed an interest in multidisciplinary characterisation of material-cell constructs and together the Prof. Ioan Nottigher investigated the use of Raman spectroscopy for the characterising these interactions.&lt;/p&gt;\n&lt;p class=&quot;MsoNormal&quot; style=&quot;margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 12px; vertical-align: baseline; color: #222222; font-family: Arial, Helvetica, sans-serif;&quot;&gt;Gavin joined Prof. Molly Stevens group (Imperial) in 2005 to continue research on tissue engineering, publishing on a variety of topics including stem cells, tissue engineering (including the creation of&amp;nbsp; HIF stabilising materials) and nanoparticle material-biological interactions.&amp;nbsp;&lt;/p&gt;', 'bioproject.com', '2019-01-31', '2019-02-06 10:08:28', '2019-02-06 12:49:20'),
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
(14, 6),
(14, 7);

-- --------------------------------------------------------

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `authority_id`, `paper_id`, `project_id`, `team_id`, `image`, `description`, `created_at`, `updated_at`) VALUES
(7, 1, NULL, NULL, NULL, '190124070130gavin.jpg', 'Dr Gavin Jell', '2019-01-11 12:27:00', '2019-01-24 06:12:30'),
(78, NULL, NULL, 40, NULL, '1901231101181.jpg', 'Bio', '2019-01-23 10:58:18', '2019-01-24 05:38:23'),
(79, NULL, NULL, 41, NULL, '190123120138bio2.jpg', 'Tech', '2019-01-23 11:16:07', '2019-01-24 06:27:48'),
(90, NULL, 13, NULL, NULL, '190206110228bio3.jpg', 'Bio project', '2019-02-06 10:08:28', '2019-02-06 10:08:28'),
(94, NULL, 14, NULL, NULL, '190206020210hif.jpg', 'Ddddddddd', '2019-02-06 13:02:10', '2019-02-06 13:02:10'),
(95, NULL, NULL, NULL, 5, '190208060224Medina_Guliyeva.jpg', 'Ms Medina Guliyev', '2019-02-08 05:22:25', '2019-02-08 05:22:25'),
(96, NULL, NULL, NULL, 6, '190208060216Carolina_Ramos.jpg', 'Ms Carolina Vamos', '2019-02-08 05:27:16', '2019-02-08 05:27:16'),
(97, NULL, NULL, NULL, 7, '190208080214man1.jpg', 'Mr Sherlock Holmes', '2019-02-08 07:31:14', '2019-02-08 07:31:14');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `authority_id`, `title`, `description`, `url`, `started`, `finished`, `created_at`, `updated_at`) VALUES
(40, 1, 'Bio', '&lt;p class=&quot;MsoNormal&quot; style=&quot;margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 12px; vertical-align: baseline; color: #222222; font-family: Arial, Helvetica, sans-serif;&quot;&gt;An interdisciplinary scientist interested in the material &amp;ndash; biological interactions. He completed a PhD (at UCL as part of the Queen Mary IRC in Biomedical Materials) looking at the causes of aseptic loosening of&amp;nbsp;&lt;span style=&quot;margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; background-color: transparent;&quot;&gt;&amp;nbsp;&lt;/span&gt;orthopaedic implants. Using this knowledge on cell-material interactions Gavin was recruited by Prof. Larry Hench at Imperial College London investigating the use of bioactive glass for regenerative medicine. It was during this time that Gavin also developed an interest in multidisciplinary characterisation of material-cell constructs and together the Prof. Ioan Nottigher investigated the use of Raman spectroscopy for the characterising these interactions.&lt;/p&gt;\n&lt;p class=&quot;MsoNormal&quot; style=&quot;margin: 0px; padding: 0px; border: 0px; outline: none; font-size: 12px; vertical-align: baseline; color: #222222; font-family: Arial, Helvetica, sans-serif;&quot;&gt;Gavin joined Prof. Molly Stevens group (Imperial) in 2005 to continue research on tissue engineering, publishing on a variety of topics including stem cells, tissue engineering (including the creation of&amp;nbsp; HIF stabilising materials) and nanoparticle material-biological interactions. He returned to UCL in 2009 to develop his own research group and lead a new MSc in Nanotechnology and Regenerative Medicine.&amp;nbsp; &amp;nbsp;&lt;/p&gt;', 'bio.org', '2018-12-31', '2019-01-10', '2019-01-23 10:58:18', '2019-02-06 13:01:24'),
(41, 1, 'Tech', '&lt;p class=&quot;MsoNormal&quot; style=&quot;margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 12px; vertical-align: baseline; color: #222222; font-family: Arial, Helvetica, sans-serif;&quot;&gt;An interdisciplinary scientist interested in the material &amp;ndash; biological interactions. He completed a PhD (at UCL as part of the Queen Mary IRC in Biomedical Materials) looking at the causes of aseptic loosening of&amp;nbsp;&lt;span style=&quot;margin: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; background-color: transparent;&quot;&gt;&amp;nbsp;&lt;/span&gt;orthopaedic implants. Using this knowledge on cell-material interactions Gavin was recruited by Prof. Larry Hench at Imperial College London investigating the use of bioactive glass for regenerative medicine. It was during this time that Gavin also developed an interest in multidisciplinary characterisation of material-cell constructs and together the Prof. Ioan Nottigher investigated the use of Raman spectroscopy for the characterising these interactions.&lt;/p&gt;\n&lt;p class=&quot;MsoNormal&quot; style=&quot;margin: 0px; padding: 0px; border: 0px; outline: none; font-size: 12px; vertical-align: baseline; color: #222222; font-family: Arial, Helvetica, sans-serif;&quot;&gt;&amp;nbsp;&lt;/p&gt;', 'tech.org', '2018-12-31', '2019-01-10', '2019-01-23 11:16:07', '2019-02-06 13:00:51');

-- --------------------------------------------------------

--
-- Table structure for table `projects_team`
--

CREATE TABLE `projects_team` (
  `project_id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `authority_id`, `titlet`, `name`, `surname`, `position`, `about`, `dob`, `sex`, `created_at`, `updated_at`) VALUES
(5, 1, 'Ms', 'Medina', 'Guliyev', 'phD student', '&lt;p&gt;An interdisciplinary scientist interested in the material &amp;ndash; biological interactions. He completed a PhD (at UCL as part of the Queen Mary IRC in Biomedical Materials) looking at the causes of aseptic loosening of&amp;nbsp;&amp;nbsp;orthopaedic implants. Using this knowledge on cell-material interactions Gavin was recruited by Prof. Larry Hench at Imperial College London investigating the use of bioactive glass for regenerative medicine. It was during this time that Gavin also developed an interest in multidisciplinary characterisation of material-cell constructs and together the Prof. Ioan Nottigher investigated the use of Raman spectroscopy for the characterising these interactions.&lt;/p&gt;', '2019-01-31', 'female', '2019-02-08 05:22:24', '2019-02-08 05:22:24'),
(6, 1, 'Ms', 'Carolina', 'Vamos', 'Student', '&lt;p&gt;&lt;strong&gt;Carolina Vamos&lt;/strong&gt;&lt;/p&gt;', '2019-01-31', 'female', '2019-02-08 05:27:16', '2019-02-08 05:27:16'),
(7, 1, 'Mr', 'Sherlock', 'Holmes', 'Detective', '&lt;p&gt;Detective he is&lt;/p&gt;', '2019-01-31', 'male', '2019-02-08 07:31:14', '2019-02-08 07:31:14');


CREATE TABLE `slides` (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `authority_id` int(10) UNSIGNED NOT NULL,
    `dname` varchar(249) NOT NULL,
    `dname_id` int(10) UNSIGNED NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     PRIMARY KEY(`id`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8;
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
    ADD KEY `dname_id` (`dname_id`);

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
