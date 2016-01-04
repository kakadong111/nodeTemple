///**
// * Created by putao on 15-8-19.
// */
//var Promise = require("bluebird")
//    , redisPromise = Promise.promisifyAll(redisClient)
//    , logger = require('tracer').console()
//    , _ = require("lodash")               //util
//    , Sequelize = require('sequelize')   // sequelize
//    , path = require('path');
//
////TODO:重构到config里去
//var reqSid = '4003'
//    , sadd_members = ['GoSun', 'FastWeb', 'Ucloud']
//    , bandwidthKeys = {
//        "bandwidth_700k": 716800, "bandwidth_1300k": 1331200
//        , "bandwidth_1800k": 1843200, "bandwidth_2500k": 2560000
//    }
//
//
//// 导入数据模型
//var CdnPlayUrlItemModel = sequelizeClient.import('../models/CDN_PLAY_URL_ITEM');
//var cdnPlayUrlModel = sequelizeClient.import('../models/cdn_play_url');
//
//
///**
// *
// * @param parmArray
// * @param callback
// */
//function getFormatAndStream_FromRedisData(parmArray, callback) {
//    logger.logs(parmArray)
//    //logger.logs(parmArray[0]) //-> undefined
//
//    var retArray = []
//        , retFormat = {}
//
//    _.forEach(parmArray, function (value, key) {
//        logger.logs(value, key);
//        var retArrayItem = {
//            "bandwidth": bandwidthKeys[key],
//            "url": value
//        }
//        retArray.push(retArrayItem);
//        retFormat = path.extname(value).substr(1);
//    });
//    logger.logs(retArray)
//
//    callback([retFormat, retArray])
//}
//
///**
// * 查某一个si的所有CDN服务商列表--['GoSun', 'FashWeb', 'Ucloud']
// * @param reqSid
// * @param callback
// */
//function loadCdnProviderBySid(reqSid, callback) {
//    cdnPlayUrlModel.findAll({where: {SID: reqSid}}).then(function findAllBySid(items) {
//        logger.logs(reqSid)
//        logger.logs(items.length)
//
//        var retArray = []
//        items.forEach(function (i) {
//            logger.logs(i)
//            logger.logs(i.dataValues.CDN_NAME)
//
//            retArray.push(i.dataValues.CDN_NAME)
//        });
//
//        logger.logs(retArray)
//        //logger.logs(items[1].dataValues)
//
//        callback(null, retArray)
//    })
//}
//
//
//
//
//
///**
// * 从数据源（首先从redis取，否则从mysql里延迟加载）里取得FormatAndStream
// *
// *
// * {
//        sid_GoSun: {
//            "bandwidth_700k": "http://mediags.moguv.com/20150611/1005/700k/1005_700k.m3u8"
//            , "bandwidth_1300k": "http://mediags.moguv.com/20150612/1005/1300k/1005_1300k.m3u8"
//        }
//        ,sid_FastWeb: {
//            "bandwidth_700k": "http://mediags.moguv.com/20150611/1005/700k/1005_700k.m3u8"
//            , "bandwidth_1300k": "http://mediags.moguv.com/20150612/1005/1300k/1005_1300k.m3u8"
//        }
//    }
//
// * @param reqSid:
// * @param reqCdnProvider: GoSun/FastWeb/Ucloud
// * @param callback
// */
//function loadPlayUrl_ByCdnProviderID(reqSid, reqCdnProvider, callback) {
//    logger.logs(reqSid)
//    logger.logs(reqCdnProvider)
//
//
//    // load from mysql
//    //TODO：改成哈希算法随机分配CDN服务商
//    cdnPlayUrlModel.findOne({where: {SID: reqSid, CDN_NAME: reqCdnProvider}}).then(function queryParentID(cdnPlayUrl) {
//        // 查询主表ID->then()
//        if (cdnPlayUrl === null) {
//            logger.logs()
//            throw new Error('Whoops');
//        } else {
//            logger.logs(cdnPlayUrl.dataValues)
//            logger.logs(cdnPlayUrl.dataValues.ID)
//            return cdnPlayUrl.dataValues.ID;
//        }
//    }).then(function queryChildren2Format2Response(parentID) {
//        // 查询子表记录->格式化成json->返回
//        logger.logs(parentID)
//        CdnPlayUrlItemModel.findAll({where: {PID: String(parentID)}}).then(function generateArrayAndFormat(items) {
//            // 格式化子表查询记录->then()
//            logger.logs(items)
//            logger.logs(items.length)
//
//            //var retArray = []
//            //    , retFormat = {};
//            ////TODO:没找到记录的情况如何处理？
//            //items.forEach(function (i) {
//            //    logger.logs(i)
//            //    logger.logs(i.dataValues.CDN_PLAY_URL)
//            //    logger.logs(i.dataValues.BAND_WIDTH)
//            //
//            //    var arrayItem = {
//            //        "bandwidth": parseInt(i.dataValues.BAND_WIDTH),
//            //        "url": i.dataValues.CDN_PLAY_URL
//            //    }
//            //    retArray.push(arrayItem)
//            //    retFormat = path.extname(arrayItem.url).substr(1); //'http://xxx.m3u8' -> 'm3u8'
//            //});
//            //logger.logs(retArray)
//            //logger.logs(retFormat)
//
//            //return retArray
//            //return (retArray,retFormat)
//
//            callback(null, items)
//        })
//    }).catch(function (err) {
//        // 异常处理 TODO:测试异常情况的返回值
//        logger.logs(err)
//        logger.logs(err.message)//'Whoops'
//        logger.logs(err.fields)//undefined
//
//        callback(err)
//    })
//}
//
//function getFormatAndStreamBySid(reqSid, callback) {
//    // load可用的CDN服务商列表: [GoSun, FastWeb,Ucloud]
//    redisPromise.smembersAsync(reqSid).then(function loadCdnProviderList(cdnProviderList) {
//        logger.logs(cdnProviderList)
//        logger.logs(cdnProviderList.length)
//
//        var hmset_key = '' // =>'4001_GoSun'
//
//
//        // redis里没有-[GoSun, FastWeb,Ucloud]
//        if (cdnProviderList.length == 0) {
//            logger.logs(cdnProviderList)
//
//            // TODO: load from mysql
//            // TODO: 没有数据就抛出error
//
//
//            // TODO： 有数据就填到redis里---重新走一边redis取数据流程
//            // TODO：return cdnProviderList
//
//        }
//        // redis里有-[GoSun, FastWeb,Ucloud]
//        else {
//            return cdnProviderList
//        }
//    }).then(function loadCdnPlayUrlArray(cdnProviderList) {
//        // load可用的CDN播放地址： $hmset '4003_GoSun' "bandwidth_700k" "http://mediags.moguv.com/20150611/4001/700k/4001_700k.m3u8"
//
//        hmset_key = reqSid + '_' + 'GoSun'//'4003_GoSun' // TODO: 改成哈希算法随机分配CDN服务商
//        logger.logs(hmset_key)
//        logger.logs(cdnProviderList)
//
//
//        redisPromise.hgetallAsync(hmset_key).then(function (v) {
//            logger.logs(v)
//
//            // redis里没有
//            if (v === null) {// TODO: load from mysql
//                logger.logs(v)
//
//            }
//            // redis里有
//            else {
//                logger.logs(v)
//                //logger.logs(v[0])//=>undefined
//                //logger.logs(v.length) //=>undefined
//                getFormatAndStream_FromRedisData(v, function (formatAndStreamArray) {
//                    logger.logs(formatAndStreamArray)//formatAndStreamArray[0], formatAndStreamArray[1]
//                    callback(null, formatAndStreamArray)//TODO:error时的返回
//                })
//            }
//        }).catch(function (e) {
//            logger.error(e);
//        })
//    }).catch(function (e) {
//        logger.error(e)
//    })
//}//end getFormatAndStream_FromRedisData()
//
//
//module.exports.getFormatAndStreamBySid = getFormatAndStreamBySid;
//module.exports.loadCdnProviderBySid = loadCdnProviderBySid;//TODO: only test
//module.exports.loadPlayUrl_ByCdnProviderID =loadPlayUrl_ByCdnProviderID //TODO: only test
//
