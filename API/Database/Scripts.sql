CREATE SCHEMA IF NOT EXISTS `APIMadera` DEFAULT CHARACTER SET utf8_general_ci ;
USE `APIMadera` ;

-- -----------------------------------------------------
-- Table `APIMadera`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `APIMadera`.`user` ;

CREATE TABLE IF NOT EXISTS `APIMadera`.`user` (
  `user_id` INT(70) NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(45) NOT NULL,
  `user_password` VARCHAR(45) NULL,
  `user_join_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC))
ENGINE = InnoDB;