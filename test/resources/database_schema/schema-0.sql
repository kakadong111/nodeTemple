
#-------------//数据库-------------------------------------    
#mysql -uroot
#use test

#-------------//生成sequelize model-------------------------------------    
# sequelize-auto -o "./models" -d test -h localhost -u root -p 3306 -e mysql
   
#-------------//表结构-------------------------------------    
SHOW CREATE TABLE CDN_PLAY_URL_ITEM;

CREATE TABLE `CDN_PLAY_URL_ITEM` (
    `ID` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增长主键',
    `PID` VARCHAR(16) NULL DEFAULT NULL COMMENT '外键--节目ID',
    `BAND_WIDTH` VARCHAR(32) NULL DEFAULT NULL COMMENT '码率',
    `CDN_PLAY_URL` VARCHAR(256) NULL DEFAULT NULL COMMENT 'CDN服务提供商的特定码率的播放URL',
    PRIMARY KEY (`ID`)
);



