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
-- Table `receipt`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `receipt` ;

CREATE TABLE IF NOT EXISTS `receipt` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `have_receipt` TINYINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `purchase`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `purchase` ;

CREATE TABLE IF NOT EXISTS `purchase` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `image_url` VARCHAR(2000) NULL,
  `price` DECIMAL(7,2) NULL,
  `receipt_id` INT NOT NULL,
  `description` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_purchase_receipt_idx` (`receipt_id` ASC),
  CONSTRAINT `fk_purchase_receipt`
    FOREIGN KEY (`receipt_id`)
    REFERENCES `receipt` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comment` ;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `purchase_id` INT NOT NULL,
  `content` TEXT(2000) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_purchase1_idx` (`purchase_id` ASC),
  CONSTRAINT `fk_comment_purchase1`
    FOREIGN KEY (`purchase_id`)
    REFERENCES `purchase` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
-- Data for table `receipt`
-- -----------------------------------------------------
START TRANSACTION;
USE `impulsebuysdb`;
INSERT INTO `receipt` (`id`, `have_receipt`) VALUES (1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `purchase`
-- -----------------------------------------------------
START TRANSACTION;
USE `impulsebuysdb`;
INSERT INTO `purchase` (`id`, `name`, `image_url`, `price`, `receipt_id`, `description`) VALUES (1, 'labeler', NULL, 12.73, 1, 'purple and blue label maker');

COMMIT;

