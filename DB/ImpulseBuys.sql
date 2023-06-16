-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema impulsebuysdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `impulsebuysdb` ;

-- -----------------------------------------------------
-- Schema impulsebuysdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `impulsebuysdb` DEFAULT CHARACTER SET utf8 ;
USE `impulsebuysdb` ;

-- -----------------------------------------------------
-- Table `purchase`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `purchase` ;

CREATE TABLE IF NOT EXISTS `purchase` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `image_url` VARCHAR(2000) NULL,
  `price` DECIMAL(7,2) NULL,
  `description` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS impulsebuys@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'impulsebuys'@'localhost' IDENTIFIED BY 'easy';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'impulsebuys'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `purchase`
-- -----------------------------------------------------
START TRANSACTION;
USE `impulsebuysdb`;
INSERT INTO `purchase` (`id`, `name`, `image_url`, `price`, `description`) VALUES (1, 'labeler', 'https://m.media-amazon.com/images/I/71vb3WdOnyL._AC_SY879_.jpg', 12.73, 'purple and blue label maker that is of no use to me because I have nothing to label');
INSERT INTO `purchase` (`id`, `name`, `image_url`, `price`, `description`) VALUES (2, 'reeses ', 'https://i5.walmartimages.com/asr/892fd592-8943-49fe-88da-6e6ec25ff2ab.3de47ea5094f7014c1eaf20ff731c091.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', 1.32, 'delicious chocolate and peanut butter candy');
INSERT INTO `purchase` (`id`, `name`, `image_url`, `price`, `description`) VALUES (3, 'dog bone', 'https://s7d2.scene7.com/is/image/PetSmart/5277967?$CLEARjpg$', 5.75, 'a treat for the best boy in the world');
INSERT INTO `purchase` (`id`, `name`, `image_url`, `price`, `description`) VALUES (4, 'movie projector', 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6513/6513555_sd.jpg;maxHeight=640;maxWidth=550', 75.89, 'for watching movies outside');

COMMIT;

