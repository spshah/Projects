-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: libmanagesys
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BOOK`
--

DROP TABLE IF EXISTS `BOOK`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BOOK` (
  `Name` varchar(30) DEFAULT NULL,
  `publisher` varchar(30) DEFAULT NULL,
  `ISBN` varchar(15) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `available` int(11) DEFAULT NULL,
  PRIMARY KEY (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BOOK`
--

LOCK TABLES `BOOK` WRITE;
/*!40000 ALTER TABLE `BOOK` DISABLE KEYS */;
INSERT INTO `BOOK` VALUES ('1','1','1 ',NULL,1),('123','123','123',123,123),('SHASHI','PRAKASH','123456',69,2),('Shashi','prakash','123456789',15,1),('2','2','2 ',NULL,1),('254','252','247',254,1),('36','54','25 ',NULL,1),('5621','252','2569',265,1),('3','3','3 ',NULL,1),('4','4','4 ',NULL,1),('5','5','5 ',NULL,1),('25','25','65',65,1),('2','3','85 ',NULL,1),('1','2','88 ',NULL,1),('algorithm','universities','9788173716126',10,1),('sps','sps','999',2,1);
/*!40000 ALTER TABLE `BOOK` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DEPOSIT`
--

DROP TABLE IF EXISTS `DEPOSIT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DEPOSIT` (
  `ISBN` varchar(15) NOT NULL,
  `Name` varchar(30) DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  PRIMARY KEY (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DEPOSIT`
--

LOCK TABLES `DEPOSIT` WRITE;
/*!40000 ALTER TABLE `DEPOSIT` DISABLE KEYS */;
/*!40000 ALTER TABLE `DEPOSIT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FINE`
--

DROP TABLE IF EXISTS `FINE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FINE` (
  `Name` varchar(30) NOT NULL,
  `fine` int(11) DEFAULT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FINE`
--

LOCK TABLES `FINE` WRITE;
/*!40000 ALTER TABLE `FINE` DISABLE KEYS */;
INSERT INTO `FINE` VALUES ('1',25),('23',25),('258',50),('cse1665',0);
/*!40000 ALTER TABLE `FINE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ISSUE`
--

DROP TABLE IF EXISTS `ISSUE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ISSUE` (
  `ISBN` varchar(15) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `issue_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `fine` int(11) DEFAULT NULL,
  `Returned_date` date DEFAULT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ISSUE`
--

LOCK TABLES `ISSUE` WRITE;
/*!40000 ALTER TABLE `ISSUE` DISABLE KEYS */;
INSERT INTO `ISSUE` VALUES ('12','123','2018-07-16','2018-07-30',50,NULL),('12','125','2018-07-16','2018-07-31',50,NULL),('12','14','2018-07-16','2018-07-30',50,NULL),('123456','2','2018-07-16','2018-07-30',50,NULL),('999999','25','2018-07-16','2018-07-31',50,NULL),('1234569','258741','2018-07-16','2018-07-30',50,NULL),('123456','2589','2018-07-16','2018-07-30',50,NULL),('999','258963','2018-07-17','2018-07-31',50,NULL),('123456','3','2018-07-16','2018-07-30',50,NULL),('9788173716126','cse1692','2018-07-22','2018-08-05',0,NULL),('9788173716126','cse1693','2018-07-22','2018-08-05',0,NULL);
/*!40000 ALTER TABLE `ISSUE` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-22 14:47:15
