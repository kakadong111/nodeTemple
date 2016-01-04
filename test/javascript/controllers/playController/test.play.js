///**
//* Created by putao on 15-8-5.
//*/
//// require
//var logger = require('tracer').console()
//    , mocha = require("mocha")           // 测试框架
//    , assert = require("chai").assert    // 断言类库
//    , sinon = require("sinon")           // mocking function calls, returns
//
//    , uuid = require('node-uuid')        // uuid
//    , faker = require('faker')           // 生成软件测试时所需要的各式各样的数据
//
//    , _ = require("lodash")               //util
//
//    , Sequelize = require('sequelize')   // sequelize
//    , request = require('supertest')     // 测试nodejs项目中的Restful API
//    , express = require('express')
//    , app = express()
//
//
//xdescribe('--> [REST API/] http://localhost:3001/play/:sid?xxx，2015-08-05 14:17:32', function () {
//    var request1 = request('http://localhost:3001');
//    before(function () {
//
//    })
//
//
//    describe('--> GET /play?format=json -- 返回json数据格式 -- ', function () {
//        //var reqSid = 's9n8stjlbcab';//数据库里有的记录
//        var reqSid = '11111';//数据库里没有的记录
//        //http://msd.moguv.com/play/1002?format=json&cts=1435652745&ctoken=862153bf65fcdd970585fec594f9da0c&version=2.5.7
//        it('invoke playReturnJson() --  -- ', function (done) {
//            request1.get('/play/' + reqSid + '?format=json&cts=1435652745&ctoken=862153bf65fcdd970585fec594f9da0c&version=2.5.7')
//                .expect(200, function (err) {
//                    logger.logs(err);
//                }).end(function (err, res) {
//                    var body = res.text;
//                    logger.logs(body);
//                    if (err) throw err;
//                });
//            done();
//
//
//        })
//    });//end describe
//
//
//    //http://msd.moguv.com/play/1002?cts=1435652745&ctoken=862153bf65fcdd970585fec594f9da0c&version=2.5.7
//    xdescribe('--> GET /play? -- 302跳转 -- ', function () {
//        it('invoke playOld() --  -- ', function (done) {
//            request1.get('/play/1002?cts=1435652745&ctoken=862153bf65fcdd970585fec594f9da0c&version=2.5.7')
//                .expect(200, function (err) {
//                    logger.logs(err);
//                    sequelize
//                }).end(function (err, res) {
//                    var body = res.text;
//                    logger.logs(body);
//                    if (err) throw err;
//                });
//            done();
//        })
//    });//end describe
//
//
//});
//
//
//describe('--> [func] --  -- ', function () {
//    describe('--> [func.service] --  -- ', function () {
//        require('../../../../config/configLoadToGlobal');// 加载全局变量： moguv_smart_delivery/config/xxx
//        var Promise = require("bluebird");
//        var redisPromise = Promise.promisifyAll(redisClient);
//
//
//        var playService = require('../../../../services/PlayService');//TODO:放到文件开头
//
//        //var reqSid = '4003'
//
//        var reqSid = '1005'
//        //var reqSid = 's9n8stjlbcab'
//
//        //var reqProvider = 'GoSun'
//        var reqProvider = 'FastWeb'
//
//
//        before(function () {
//
//        })
//
//
//        describe('--> 从数据库里捞出--redis所需要的数据结构 --  -- ', function () {
//
//            xit('PlayService.loadCdnProviderBySid() --  -- ', function () {
//                playService.loadCdnProviderBySid(reqSid, function (err, retFormatAndStreamArray) {//TODO:错误处理
//                    logger.logs(err)
//                    logger.logs(retFormatAndStreamArray)//['GoSun', 'FashWeb', 'Ucloud']
//
//                    redisPromise.saddAsync(reqSid, retFormatAndStreamArray).then(function (v) {//1 # 新添加单个元素
//                        logger.logs(v)
//                    }).catch(function (e) {
//                        logger.logs(e)
//                    })
//                })
//            })
//
//
//            it('PlayService.loadPlayUrl_ByCdnProviderID() -- 设置到redis里去 -- ', function () {
//                playService.loadPlayUrl_ByCdnProviderID(reqSid, reqProvider, function (err, retFormatAndStreamArray) {//TODO:错误处理
//                    logger.logs(err)
//                    logger.logs(retFormatAndStreamArray)
//                    logger.logs(retFormatAndStreamArray.length)
//
//
//                    // 设置到redis里去
//                    var bandwidthKeys = {
//                            "bandwidth_700k": 716800, "bandwidth_1300k": 1331200
//                            , "bandwidth_1800k": 1843200, "bandwidth_2500k": 2560000
//                        }
//                        , hmset_key = reqSid + '_' + reqProvider//'4001_GoSun'
//
//
//                    var hmset_fieldValue = {};
//                    retFormatAndStreamArray.forEach(function (i) {
//
//                        logger.logs(i)
//                        logger.logs(i.dataValues.BAND_WIDTH)
//                        logger.logs(i.dataValues.CDN_PLAY_URL)
//
//                        hmset_fieldValue[i.dataValues.BAND_WIDTH + ''] = i.dataValues.CDN_PLAY_URL
//
//                    });
//
//
//                    //hmset_fieldValue.bandwidth_700k = 'http://mediags.moguv.com/20150611/4001/700k/4001_700k.m3u8';
//                    //hmset_fieldValue.bandwidth_1300k = 'http://mediauc.moguv.com/20150611/4001/1300k/4001_1300k.m3u8';
//                    //hmset_fieldValue.bandwidth_1800k = 'http://mediauc.moguv.com/20150611/4001/1800k/4001_1800k.m3u8';
//                    //hmset_fieldValue.bandwidth_2500k = 'http://mediauc.moguv.com/20150611/4001/2500k/4001_2500k.m3u8';
//                    logger.logs(hmset_fieldValue);
//
//                    redisPromise.hmsetAsync(hmset_key, hmset_fieldValue).then(function (v) {//1 # 新添加单个元素
//                        logger.logs(v)
//                    }).catch(function (e) {
//                        logger.logs(e)
//                    })
//                })
//            })
//
//            xit('从mysql里捞上来什么数据结构？ --  -- ', function () {
//                var cdnProviderArray = ['GoSun', 'FashWeb', 'Ucloud']
//                    , cdnProviderItem = {
//                        "bandwidth_700k": "http://mediags.moguv.com/20150611/1005/700k/1005_700k.m3u8"
//                        , "bandwidth_1300k": "http://mediags.moguv.com/20150612/1005/1300k/1005_1300k.m3u8"
//                    }
//
//                var hmset_fieldValue = {};
//                hmset_fieldValue.bandwidth_700k = 'http://mediags.moguv.com/20150611/4001/700k/4001_700k.m3u8';
//                hmset_fieldValue.bandwidth_1300k = 'http://mediauc.moguv.com/20150611/4001/1300k/4001_1300k.m3u8';
//                hmset_fieldValue.bandwidth_1800k = 'http://mediauc.moguv.com/20150611/4001/1800k/4001_1800k.m3u8';
//                hmset_fieldValue.bandwidth_2500k = 'http://mediauc.moguv.com/20150611/4001/2500k/4001_2500k.m3u8';
//                //info.FastWeb = 'http://mediafw.moguv.com/20150611/4001/700k/4001_700k.m3u8';
//                logger.logs(hmset_fieldValue);
//            })
//        })
//
//
//        xit('PlayService.getFormatAndStreamBySid() --  -- ', function () {
//            playService.getFormatAndStreamBySid(reqSid, function (err, retFormatAndStreamArray) {//TODO:错误处理
//                logger.logs(err)
//                logger.logs(retFormatAndStreamArray)
//
//                var retJson = {
//                    "format": retFormatAndStreamArray[0],//'m3u8'
//                    "duration": 0,//TODO:先空着
//                    "head": 0,//TODO:先空着
//                    "tail": 0,//TODO:先空着
//                    "stream": retFormatAndStreamArray[1]
//                    //, "token": genToken
//                    //, "ts": ts,//TODO:是TS还是CTS？
//                };
//                logger.logs(retJson)
//            })
//        })
//    })
//
//    xdescribe('--> [func.Controller] --  -- ', function () {
//        // 加载全局变量： moguv_smart_delivery/config/xxx
//        require('../../../../config/configLoadToGlobal');
//        var reqSid = '4003'
//            , playController = require('../../../../controllers/refect_playController');//TODO:放到文件开头
//
//        before(function () {
//
//        })
//
//        it('refect_playController.genRetJson() --  -- ', function () {
//            playController.genRetJson(reqSid, function (retJson) { //TODO:错误处理
//                logger.logs(retJson)
//            })
//        })
//    })
//})
//
//
//xdescribe('--> [redis] 从redis里取数据', function () {
//    // 加载全局变量： moguv_smart_delivery/config/xxx
//    global.config = require('../../../../config/config').configParm;
//    require('../../../../config/redisClient');
//
//    // 加载本地变量：
//    //var redis   = require('redis');
//    //var redisClient  = redis.createClient('6379', '127.0.0.1');
//    //// redis 链接错误
//    //redisClient.on("error", function(error) {
//    //    console.logs(error);
//    //});
//
//
//    before(function () {
//    })
//
//
//    describe('--> [bluebird Promisify] redis --  -- ', function () {
//        var Promise = require("bluebird");
//        //Promise.promisifyAll(require("redis"));
//        var redisPromise = Promise.promisifyAll(redisClient);
//        var path = require('path');
//        var reqSid = '4003'
//            , sadd_members = ['GoSun', 'FastWeb', 'Ucloud']
//            , bandwidthKeys = {
//                "bandwidth_700k": 716800, "bandwidth_1300k": 1331200
//                , "bandwidth_1800k": 1843200, "bandwidth_2500k": 2560000
//            }
//            , hmset_key = reqSid + '_' + sadd_members[0]//'4001_GoSun'
//        //    , hmset_key = reqSid + '_' + sadd_members[1]//'4001_FastWeb'
//            , ts = Date.now()
//            , genToken = 'fakerToken'//generateToken(key, ts)
//
//        describe('--> [smembersAsync & hgetallAsync] --  -- ', function () {
//            it('[SADD] -- sid: GoSun/FastWeb/Ucloud -- ', function () {
//                function getFormatAndStream_FromRedisData(parmArray, callback) {
//                    logger.logs(parmArray)
//                    //logger.logs(parmArray[0]) //-> undefined
//
//                    var retArray = []
//                        , retFormat = {}
//
//                    _.forEach(parmArray, function (value, key) {
//                        logger.logs(value, key);
//                        var retArrayItem = {
//                            "bandwidth": bandwidthKeys[key],
//                            "url": value
//                        }
//                        retArray.push(retArrayItem);
//                        retFormat = path.extname(value).substr(1);
//                    });
//                    logger.logs(retArray)
//
//                    callback([retFormat, retArray])
//                }
//
//                function getFormatAndStreamBySid(reqSid, callback) {
//                    redisPromise.smembersAsync(reqSid).then(function (v) {
//                        logger.logs(v)
//                        logger.logs(v.length)
//
//                        // redis里没有-[GoSun, FastWeb,Ucloud]
//                        if (v.length == 0) {
//                            logger.logs(v)
//                            // TODO: load from mysql
//
//                            // TODO: 改成哈希算法随机分配CDN服务商
//                            hmset_key = reqSid + '_' + 'GoSun'//'4001_GoSun'
//                        }
//                        // redis里有-[GoSun, FastWeb,Ucloud]
//                        else {
//                            // TODO: 改成哈希算法随机分配CDN服务商
//                            hmset_key = reqSid + '_' + 'GoSun'//'4003_GoSun'
//
//                            redisPromise.hgetallAsync(hmset_key).then(function (v) {
//                                logger.logs(v)
//
//                                // redis里没有
//                                if (v === null) {
//                                    logger.logs(v)
//                                    // TODO: load from mysql
//                                }
//                                // redis里有
//                                else {
//                                    logger.logs(v)
//                                    //logger.logs(v[0])//=>undefined
//                                    //logger.logs(v.length) //=>undefined
//                                    getFormatAndStream_FromRedisData(v, function (formatAndStreamArray) {
//                                        logger.logs(formatAndStreamArray[0])
//                                        logger.logs(formatAndStreamArray[1])
//
//                                        callback(formatAndStreamArray)
//                                    })
//                                }
//                            }).catch(function (e) {
//                                logger.error(e);
//                            })
//                        }
//                    }).catch(function (e) {
//                        logger.error(e)
//                    })
//                }//end getFormatAndStream_FromRedisData()
//
//
//                getFormatAndStreamBySid(reqSid, function (formatAndStreamArray) {
//                    var retJson = {
//                        "format": formatAndStreamArray[0],//'m3u8'
//                        "duration": 0,//TODO:先空着
//                        "head": 0,//TODO:先空着
//                        "tail": 0,//TODO:先空着
//                        "stream": formatAndStreamArray[1],
//                        "token": genToken,
//                        "ts": ts,//TODO:是TS还是CTS？
//                    };
//                    logger.logs(retJson)
//                })
//
//            })
//        })
//
//        xdescribe('--> [SADD & SMEMBERS] --  -- ', function () {
//            it('[SADD] -- sid: GoSun/FastWeb/Ucloud -- ', function () {
//                //redisPromise.saddAsync('bbs', "discuz1.net").then(function (v){//0, # 添加重复元素
//                redisPromise.saddAsync(reqSid, sadd_members).then(function (v) {//1 # 新添加单个元素
//                    logger.logs(v)
//                }).catch(function (e) {
//                    logger.logs(e)
//                })
//            })
//
//            it('[SMEMBERS] -- sid: GoSun/FastWeb/Ucloud -- ', function () {
//                //redisPromise.saddAsync('bbs', "discuz1.net").then(function (v){//0, # 添加重复元素
//                redisPromise.smembersAsync(reqSid).then(function (v) {//1 # 新添加单个元素
//                    //redisPromise.smembersAsync('xxx').then(function (v) {//空数组 []
//                    logger.logs(v)
//                    logger.logs(v.length)
//                    if (v.length == 0) {
//                        logger.logs(v)
//                    }
//                }).catch(function (e) {
//                    logger.logs(e)
//                })
//            })
//        })
//
//
//        xdescribe('--> [HMSET & HGETALL] --  -- ', function () {
//            it('[HMSET] -- sid+cdn: bandwidth_700k/1300k/1800k/2500k -- ', function () {
//                var hmset_fieldValue = {};
//                hmset_fieldValue.bandwidth_700k = 'http://mediags.moguv.com/20150611/4001/700k/4001_700k.m3u8';
//                hmset_fieldValue.bandwidth_1300k = 'http://mediauc.moguv.com/20150611/4001/1300k/4001_1300k.m3u8';
//                hmset_fieldValue.bandwidth_1800k = 'http://mediauc.moguv.com/20150611/4001/1800k/4001_1800k.m3u8';
//                hmset_fieldValue.bandwidth_2500k = 'http://mediauc.moguv.com/20150611/4001/2500k/4001_2500k.m3u8';
//                //info.FastWeb = 'http://mediafw.moguv.com/20150611/4001/700k/4001_700k.m3u8';
//                logger.logs(hmset_fieldValue);
//
//                //redisPromise.saddAsync('bbs', "discuz1.net").then(function (v){//0, # 添加重复元素
//                redisPromise.hmsetAsync(hmset_key, hmset_fieldValue).then(function (v) {//1 # 新添加单个元素
//                    logger.logs(v)
//                }).catch(function (e) {
//                    logger.logs(e)
//                })
//            })
//
//            it('[HGETALL] -- sid+cdn: bandwidth_700k/1300k/1800k/2500k -- ', function () {
//                redisPromise.hgetallAsync(hmset_key).then(function (v) {//value
//                    //redisPromise.hgetallAsync("xx_GoSun").then(function (v) {//null
//                    //redisPromise.hgetallAsync("").then(function(v){//null
//                    //redisPromise.hgetallAsync("","").then(function(v){//error
//                    logger.logs(v)
//                    if (v === null) {
//                        logger.logs(v)
//                    }
//                    if (v != null) {
//                        logger.logs(v)
//                    }
//                }).catch(function (e) {
//                    logger.logs(e);//Error: ERR wrong number of arguments for 'hgetall' command
//                })
//            })
//        })
//    })//end bluebird
//
//
//    xdescribe('--> SET/ADD redis  --  -- ', function () {
//        xit('[SADD] -- sid: GoSun/FastWeb/Ucloud -- ', function () {
//            redisClient.sadd('bbs', "discuz1.net", function (error, resRedisClient) {
//                logger.logs(error);
//                logger.logs(resRedisClient);
//            })
//        })
//
//        xit('[HMSET] -- sid+cdn: bandwidth_700k/1300k/1800k/2500k -- ', function (done) {
//            var reqSid = '4001_GoSun'
//                , info = {};
//            info.bandwidth_700k = 'http://mediags.moguv.com/20150611/4001/700k/4001_700k.m3u8';
//            info.bandwidth_1300k = 'http://mediauc.moguv.com/20150611/4001/1300k/4001_1300k.m3u8';
//            info.bandwidth_1800k = 'http://mediauc.moguv.com/20150611/4001/1800k/4001_1800k.m3u8';
//            info.bandwidth_2500k = 'http://mediauc.moguv.com/20150611/4001/2500k/4001_2500k.m3u8';
//            //info.FastWeb = 'http://mediafw.moguv.com/20150611/4001/700k/4001_700k.m3u8';
//            logger.logs(info);
//
//            redisClient.hmset(reqSid, info, function (error, resRedisClient) {
//                if (error) {
//                    logger.logs(error);
//                } else {
//                    logger.logs("--hmset SUCCES!");
//                    logger.logs(resRedisClient);
//
//                    redisClient.end(); // 关闭连接
//                }
//            });
//            done();
//        })//end it
//
//    });
//})//end redis
//
//
//xdescribe('--> [database] (一对多关系的查找)根据主表的主键 到子表查找记录', function () {
//    var sequelize = {},
//        CdnPlayUrlItemModel = {},
//        CdnPlayUrlModel = {};
//
//    before(function () {
//        sequelize = new Sequelize('test', 'root', null, {
//            dialect: "mysql",
//            port: 3306,
//            define: {
//                underscored: true,
//                timestamps: false
//            },
//            sync: {force: false},
//            omitNull: true
//        })
//        sequelize.sync({//第六行是验证登录，相当于连接数据库，第七行创建数据库和表。
//            logging: console.logs
//            //    force: true //默认为false，生成的SQL语句是CREATE TABLE IF NOT EXISTS
//        });
//        // 导入数据模型
//        CdnPlayUrlItemModel = sequelize.import('../../../../models/CDN_PLAY_URL_ITEM');
//        CdnPlayUrlModel = sequelize.import('../../../../models/cdn_play_url');// 导入数据模型
//    })
//
//
//    //it('#findOne()/findAll()--sequelize的一般方法', function () {//这个没有done
//    xit('#findAll()--sequelize的一般方法', function (done) {//TODO:有done
//        logger.logs()
//
//        //CdnPlayUrlModel.findOne({where: {SID: 's9n8stjlbcab', CDN_NAME: 'GoSun'}}).then(function (cdnPlayUrl) {
//        CdnPlayUrlModel.findAll({where: {SID: 's9n8stjlbcab', CDN_NAME: 'GoSun'}}).then(function (cdnPlayUrl) {
//            logger.logs(cdnPlayUrl)
//            done();//TODO:有done时findAll()的then()才能调进来, 必须放在findAll()里面，放在外面会提前结束
//
//            //expect(cdnPlayUrlItems.length).to.be.equal(2);
//            //expect(cdnPlayUrlItems[0].title).to.be.equal('fight empire');
//            //expect(cdnPlayUrlItems[1].title).to.be.equal('stablish republic');
//        });
//    });
//
//    describe('--> findOne()--sequelize的一般方法', function () {
//        xit('#findOne()--have数据', function (done) {//TODO:有done
//            logger.logs()
//            CdnPlayUrlModel.findOne({where: {SID: 's9n8stjlbcab', CDN_NAME: 'GoSun'}}).then(function (cdnPlayUrl) {
//                //logger.logs(cdnPlayUrl)
//                logger.logs(cdnPlayUrl.dataValues)
//                done();//TODO:有done时findAll()的then()才能调进来, 必须放在findAll()里面，放在外面会提前结束
//
//                //expect(cdnPlayUrlItems.length).to.be.equal(2);
//                //expect(cdnPlayUrlItems[0].title).to.be.equal('fight empire');
//                //expect(cdnPlayUrlItems[1].title).to.be.equal('stablish republic');
//            });
//        });
//
//        xit('#findOne()--null数据', function (done) {//TODO:有done
//            logger.logs()
//            CdnPlayUrlModel.findOne({where: {SID: '111', CDN_NAME: 'GoSun'}}).then(function (cdnPlayUrl) {
//                logger.logs(cdnPlayUrl)
//                logger.logs(cdnPlayUrl === null)//true
//                logger.logs(cdnPlayUrl === undefined)//false
//                logger.logs(cdnPlayUrl.dataValues)//Cannot read property 'dataValues' of null
//                done();//TODO:有done时findAll()的then()才能调进来, 必须放在findAll()里面，放在外面会提前结束
//
//                //expect(cdnPlayUrlItems.length).to.be.equal(2);
//                //expect(cdnPlayUrlItems[0].title).to.be.equal('fight empire');
//                //expect(cdnPlayUrlItems[1].title).to.be.equal('stablish republic');
//            });
//        });
//
//
//        xit('#findOne()之后findAll()', function (done) {
//            logger.logs()
//            var reqSid = 's9n8stjlbcab'
//            //var reqSid = '1111'
//            CdnPlayUrlModel.findOne({where: {SID: reqSid, CDN_NAME: 'GoSun'}}).then(function (cdnPlayUrl) {
//                if (cdnPlayUrl === null) {
//                    logger.logs()
//                    throw new Error('Whoops');
//                } else {
//                    logger.logs(cdnPlayUrl.dataValues)
//                    logger.logs(cdnPlayUrl.dataValues.ID)
//                    return cdnPlayUrl.dataValues.ID;
//                }
//                //done();
//            }).then(function (masterTableID) {
//                logger.logs(masterTableID)
//                CdnPlayUrlItemModel.findAll({where: {PID: String(masterTableID)}}).then(function (items) {
//                    logger.logs(items)
//                    logger.logs(items.length)//4
//                    //logger.logs(cdnPlayUrlItems.CDN_PLAY_URL)
//
//                    var array = [];
//                    //TODO:没找到记录的情况如何处理？
//                    items.forEach(function (i) {
//                        logger.logs(i)
//                        logger.logs(i.dataValues.CDN_PLAY_URL)
//                        logger.logs(i.dataValues.BAND_WIDTH)
//
//                        var arrayItem = {
//                            "bandwidth": parseInt(i.dataValues.BAND_WIDTH),
//                            "url": i.dataValues.CDN_PLAY_URL
//                        }
//                        array.push(arrayItem)
//                    });
//                    logger.logs(array)
//
//
//                    done();
//                });
//            })
//                /*//TODO:捕获具体类型的Error
//                 .catch(new Error('Whoops'), function (err) {
//                 logger.logs(err)
//                 logger.logs(err.fields)//undefined
//                 //expect(err instanceof Sequelize.UniqueConstraintError).to.be.ok;
//                 //expect(err.fields).to.be.ok;
//                 })*/
//                .catch(function (err) {
//                    logger.logs(err)
//                    logger.logs(err.message)//'Whoops'
//                    logger.logs(err.fields)//undefined
//                    //expect(err instanceof Sequelize.UniqueConstraintError).to.be.ok;
//                    //expect(err.fields).to.be.ok;
//                })
//        });
//    });
//
//
//    xit('#belongsTo()/hasMany()--sequelize的优雅方法', function () {
//        CdnPlayUrlItemModel.belongsTo(CdnPlayUrlModel);
//        CdnPlayUrlModel.hasMany(CdnPlayUrlItemModel);
//
//        CdnPlayUrlItemModel.findAll({
//            include: [
//                {model: CdnPlayUrlModel, where: {SID: 's9n8stjlbcab', CDN_NAME: 'GoSun'}}
//                /*{
//                 model: Project, include: [
//                 {model: User, where: {username: 'leia'}}
//                 ]
//                 }*/
//            ]
//        }).then(function (cdnPlayUrlItems) {
//            logger.logs(cdnPlayUrlItems)
//            //expect(cdnPlayUrlItems.length).to.be.equal(2);
//            //expect(cdnPlayUrlItems[0].title).to.be.equal('fight empire');
//            //expect(cdnPlayUrlItems[1].title).to.be.equal('stablish republic');
//        });
//    });
//})//end describe