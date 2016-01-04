///**
// * Created by putao on 15-8-1.
// */
///* require */
//var logger = require('tracer').console(),
//    Sequelize = require('sequelize'),   // sequelize
//    uuid = require('node-uuid'),        // uuid
//    mocha = require("mocha"),           // 测试框架
//    assert = require("chai").assert,    // 断言类库
//    sinon = require("sinon"),           // mocking function calls, returns
//    faker = require('faker'),           // 生成软件测试时所需要的各式各样的数据
//    request = require('supertest'),     // 测试nodejs项目中的Restful API
//    express = require('express'),
//    app = express();
//
//console.logs('console.logs');
//
//describe('--> [REST API] [POST/GET] http://localhost:3001/addCdnPlayURL?xxx，2015-08-02 13:20:40', function () {
//    var request1 = {}
//        , request_TEST = {}
//        , request_PROD = {}
//        , sequelize = {}
//        , CdnPlayUrlItemModel = {}
//        , CdnPlayUrlModel = {}
//        , genUUID = {};
//
//    before(function () {
//        // request server
//        request1 = request('http://localhost:3001');
//        request_TEST = request('http://172.16.10.56:3001');
//        request_PROD = request('http://msd.moguv.com');
//
//        // sequelize
//        /*sequelize = new Sequelize('test', 'root', '',
//         {host: '127.0.0.1', port: '3306', dialect: 'mysql'});
//         sequelize.authenticate();
//         sequelize.sync({//第六行是验证登录，相当于连接数据库，第七行创建数据库和表。
//         logging: console.logs
//         //    force: true //默认为false，生成的SQL语句是CREATE TABLE IF NOT EXISTS
//         });*/
//
//
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
//
//        // 导入数据模型
//        CdnPlayUrlItemModel = sequelize.import('../../../../models/CDN_PLAY_URL_ITEM');
//        CdnPlayUrlModel = sequelize.import('../../../../models/cdn_play_url');// 导入数据模型
//
//        genUUID = uuid.v1();//uuid
//        logger.logs("genUUID=%s;", genUUID)
//    })
//
//
//    /**
//     * 2015-08-05
//     */
//        // {'play_url': 'http://mediags.moguv.com/20150804/s9n8stjlbcab/700k/s9n8stjlbcab_700k.m3u8', 'bandwidth': 716800, 'provider': 'GoSun', 'sid': u's9n8stjlbcab'}
//        // 有码率的接口(存入子表CDN_PLAY_URL_ITEM) -- bandwidth=[700k,1300k,1800k,2500k]
//    describe('--> POST【新接口，2015-08-21】 /addCdnPlayURL? -- 【新接口格式】2015-08-06', function () {
//
//        describe('--> 【本机测试】POST /addCdnPlayURL? -- 2015-08-07', function () {
//
//            xit('POST /addCdnPlayURL 【bandwidth=700k】', function (done) {
//                var sendData = {
//                    'play_url': 'http://mediags.moguv.com/20150808/s9n8stjlbcab/700k/s9n8stjlbcab_700k.m3u8',
//                    'bandwidth': 716800,
//                    'provider': 'GoSun',
//                    //'sid': 's9n8stjlbcab'
//                    'sid': '2022'
//                }
//
//                //request1.post('/addCdnPlayURL?bandwidth=700k&provider=GoSun&play_url=http://mediags.moguv.com/20150613/' + reqSid + '/700k/' + reqSid + '_700k.m3u8' +
//                request1.post('/addCdnPlayURL').send(sendData)
//                    .expect(200, function (err) {
//                        logger.logs(err);
//                    }).end(function (err, res) {
//                        var body = res.text;
//                        logger.logs(body);
//                        if (err) throw err;
//                    });
//                done();
//            })
//
//            it('POST /addCdnPlayURL 【bandwidth=undefined】', function (done) {
//                var sendData = {
//                    'play_url': '1122',
//                    //'bandwidth': 716800,
//                    'provider': 'GoSun',
//                    //'sid': 's9n8stjlbcab'
//                    'sid': '2023'
//                }
//
//                //request1.post('/addCdnPlayURL?bandwidth=700k&provider=GoSun&play_url=http://mediags.moguv.com/20150613/' + reqSid + '/700k/' + reqSid + '_700k.m3u8' +
//                request1.post('/addCdnPlayURL').send(sendData)
//                    .expect(200, function (err) {
//                        logger.logs(err);
//                    }).end(function (err, res) {
//                        var body = res.text;
//                        logger.logs(body);
//                        if (err){
//                            logger.logs(err);
//                            throw err;
//                        }
//                    });
//                done();
//            })
//        })//end本机测试
//
//
//        xdescribe('--> 【现网测试】POST /addCdnPlayURL? -- 2015-08-07', function () {
//            it('POST 【现网】/addCdnPlayURL?bandwidth=700k', function (done) {
//                logger.logs(1)
//                var sendData = {
//                    'play_url': 'http://mediags.moguv.com/20150808/s9n8stjlbcab/700k/s9n8stjlbcab_700k.m3u8',
//                    'bandwidth': 716800,
//                    'provider': 'GoSun',
//                    //'sid': 's9n8stjlbcab'
//                    'sid': '3001'
//                }
//                var request_PROD = request('http://msd.moguv.com');
//                //var request_PROD = request('http://123.59.40.36:3001');
//                logger.logs(1)
//
//                //request1.post('/addCdnPlayURL?bandwidth=700k&provider=GoSun&play_url=http://mediags.moguv.com/20150613/' + reqSid + '/700k/' + reqSid + '_700k.m3u8' +
//                request_PROD.post('/addCdnPlayURL').send(sendData)
//                    .expect(200, function (err) {
//
//                        logger.logs(err);
//                    }).end(function (err, res) {
//                        var body = res.text;
//                        logger.logs(body);
//                        if (err) throw err;
//                    });
//                done();
//            })
//        })//end现网测试
//
//    })//end describe
//
//
//
//
//
//
//    xdescribe('--> 【老接口，现在已废弃掉，2015-08-21】GET /addCdnPlayURL?bandwidth=[700k,1300k,1800k,2500k] -- 有码率的接口(存入子表CDN_PLAY_URL_ITEM) -- ', function () {
//        var reqSid = '1011';
//
//        it('GET /addCdnPlayURL?bandwidth=undefined -- 无码率的接口(存入主表CDN_PLAY_URL) -- ', function (done) {
//            logger.logs("genUUID=%s;", genUUID)
//
//            //request1.get('/addCdnPlayURL?provider=GoSun&play_url=http://mediags.moguv.com/20150611/s9n8sto8g6tu/s9n8sto8g6tu.m3u8&sid=203').expect(200, function (err) {
//            request1.get('/addCdnPlayURL?provider=GoSun&play_url=http://mediags.moguv.com/20150611/s9n8sto8g6tu/s9n8sto8g6tu.m3u8&sid=' + genUUID).expect(200, function (err) {
//                logger.logs(err);
//            }).end(function (err, res) {
//                var body = res.text;
//                logger.logs(body);
//                if (err) {
//                    logger.logs(err);
//                    throw err;
//                }
//            });
//            done();
//        })
//
//
//        xit('GET /addCdnPlayURL?bandwidth=700k', function (done) {
//            //request1.get('/addCdnPlayURL?provider=GoSun&play_url=http://mediags.moguv.com/20150611/s9n8sto8g6tu/s9n8sto8g6tu.m3u8&sid=203').expect(200, function (err) {
//            request1.get('/addCdnPlayURL?bandwidth=700k&provider=GoSun&play_url=http://mediags.moguv.com/20150615/' + reqSid + '/700k/' + reqSid + '_700k.m3u8' +
//                '&sid=' + reqSid).expect(200, function (err) {
//                logger.logs(err);
//            }).end(function (err, res) {
//                var body = res.text;
//                logger.logs(body);
//                if (err) throw err;
//            });
//            done();
//        })
//        xit('GET /addCdnPlayURL?bandwidth=1300k', function (done) {
//            //request1.get('/addCdnPlayURL?provider=GoSun&play_url=http://mediags.moguv.com/20150611/s9n8sto8g6tu/s9n8sto8g6tu.m3u8&sid=203').expect(200, function (err) {
//            request1.get('/addCdnPlayURL?bandwidth=1300k&provider=GoSun&play_url=http://mediags.moguv.com/20150613/' + reqSid + '/1300k/' + reqSid + '_1300k.m3u8' +
//                '&sid=' + reqSid).expect(200, function (err) {
//                logger.logs(err);
//            }).end(function (err, res) {
//                var body = res.text;
//                logger.logs(body);
//                if (err) throw err;
//            });
//            done();
//        })
//        xit('GET /addCdnPlayURL?bandwidth=undefined -- 无码率的接口(存入主表CDN_PLAY_URL) -- ', function (done) {
//            //request1.get('/addCdnPlayURL?provider=GoSun&play_url=http://mediags.moguv.com/20150611/s9n8sto8g6tu/s9n8sto8g6tu.m3u8&sid=203').expect(200, function (err) {
//            request1.get('/addCdnPlayURL?provider=GoSun&play_url=http://mediags.moguv.com/20150611/' + reqSid + '/' + reqSid + '.m3u8&sid=' + reqSid).expect(200, function (err) {
//                logger.logs(err);
//            }).end(function (err, res) {
//                var body = res.text;
//                logger.logs(body);
//                if (err) throw err;
//            });
//            done();
//        })
//    })//end describe
//
//
//})
//
//
///**
// * 2015-08-03
// */
//xdescribe('--> CRUD (主表cdn_play_url, 子表CDN_PLAY_URL_ITEM) -- ', function () {
//    /**
//     *  2015-08-08
//     */
//    describe('--> CRUD (主表cdn_play_url的CDN_PLAY_URL字段有值, 向子表CDN_PLAY_URL_ITEM插入4条数据) -- ', function () {
//        it('#找出所有CDN_PLAY_URL字段有值的记录 -- ', function (done) {
//            CdnPlayUrlModel.findAll({where: {SID: 's9n8tuuvmn9v'}}).then(function (cdnPlayUrls) {//noHaveSid
//                logger.logs(cdnPlayUrls)
//                logger.logs(cdnPlayUrls.length)
//                done();//必须放在findAll()里面，放在外面会提前结束
//            });
//        })
//    })
//
//    xit('INSERT CDN_PLAY_URL_ITEM -- 单独插入一条数据，没从REST接口走 -- ', function (done) {
//        var insertSql = {
//            PID: genUUID,
//            BAND_WIDTH: '716800',//700k,1300k,1800k,2500k(716800,1331200,1843200,2560000)
//            CDN_PLAY_URL: 'http://mediags.moguv.com/20150611/s9n8sto8g6tu/700k/s9n8sto8g6tu_700k.m3u8'
//        };
//        CdnPlayUrlItemModel.create(insertSql).then(function (cdnPlayUrl) {
//            logger.logs(cdnPlayUrl)
//            done();//必须放在findAll()里面，放在外面会提前结束
//        });
//    })
//
//
//    xdescribe('--> findOrCreate() 主表无记录时就新增一条记录 --  -- ', function () {
//        var data = {
//            SID: '2015'
//        };
//        var dataNew = {
//            //SID: '2015',
//            CDN_NAME: 'GoSun5'
//        };
//
//        xit('findOrCreate() - no default', function (done) {
//            CdnPlayUrlModel.findOrCreate({where: data}).then(function () {
//                logger.logs()
//
//                //throw new Error('I should have ben rejected');
//            }).catch(function (err) {
//                //}).fail(function (err) {
//                logger.logs()
//
//                //expect(err instanceof Sequelize.UniqueConstraintError).to.be.ok;
//                //expect(err.fields).to.be.ok;
//            })
//
//            done();
//        });
//
//
//        xit('findOrCreate() - transaction', function (done) {
//            sequelize.transaction().then(function (t) {
//                CdnPlayUrlModel.findOrCreate({where: data, defaults: dataNew, transaction: t}).then(function () {
//                    logger.logs()
//
//                    //return self.User.count().then(function(count) {
//                    //    expect(count).to.equal(0);
//                    t.commit().then(function () {
//                        logger.logs()
//
//                        //return self.User.count().then(function(count) {
//                        //    expect(count).to.equal(1);
//                        //});
//                    });
//                    //});
//                    logger.logs()
//                    done();
//
//                });
//            });
//
//
//            done();
//        });
//
//
//        it('findOrCreate() - transaction2', function (done) {
//            sequelize.transaction().then(function (t) {
//                CdnPlayUrlModel.findOrCreate({where: data, defaults: dataNew, transaction: t}).then(function (t) {
//                    logger.logs()
//
//                    //return self.User.count().then(function(count) {
//                    //    expect(count).to.equal(0);
//                    t.commit().then(function () {
//                        logger.logs()
//
//                        //return self.User.count().then(function(count) {
//                        //    expect(count).to.equal(1);
//                        //});
//                    });
//                    //});
//                    logger.logs()
//                    done();
//
//                });
//            });
//
//
//            done();
//        });
//
//
//        xit('findOrCreate() - have default', function (done) {
//            CdnPlayUrlModel.findOrCreate({where: data, defaults: dataNew}).then(function () {
//                logger.logs()
//
//                //throw new Error('I should have ben rejected');
//            }).catch(function (err) {
//                //}).fail(function (err) {
//                logger.logs()
//
//                //expect(err instanceof Sequelize.UniqueConstraintError).to.be.ok;
//                //expect(err.fields).to.be.ok;
//            })
//
//            done();
//        });
//
//
//    });
//
//
//    xdescribe('--> INSERT 根据主表更新子表 --  -- ', function () {
//        var haveSid = {},
//            noHaveSid = {},
//            reqCdnName = {},
//            reqPlayUrl = {};
//
//        before(function () {
//            haveSid = '201';
//            noHaveSid = '2012';
//            reqCdnName = 'GoSun';
//            reqPlayUrl = 'http://mediags.moguv.com/20150611/s9n8sto8g6tu/#s9n8sto8g6tu.m3u8'
//        })
//
//        it('SELECT CDN_PLAY_URL -- 查询主表是否有记录 -- 1条记录', function (done) {
//            CdnPlayUrlModel.findAll({where: {SID: haveSid, CDN_NAME: reqCdnName}}).then(function (cdnPlayUrls) {//haveSid
//                logger.logs(cdnPlayUrls)
//                logger.logs(cdnPlayUrls.length)
//                done();//必须放在findAll()里面，放在外面会提前结束
//            });
//        })
//
//        it('SELECT CDN_PLAY_URL -- 查询主表是否有记录 -- 0条记录', function (done) {
//            CdnPlayUrlModel.findAll({where: {SID: noHaveSid, CDN_NAME: reqCdnName}}).then(function (cdnPlayUrls) {//noHaveSid
//                logger.logs(cdnPlayUrls)
//                logger.logs(cdnPlayUrls.length)
//                done();//必须放在findAll()里面，放在外面会提前结束
//            });
//        })
//
//
//        it('SELECT CDN_PLAY_URL -- 查询主表有0条记录 -- 新增一条记录', function (done) {
//            CdnPlayUrlModel.findAll({where: {SID: noHaveSid, CDN_NAME: reqCdnName}}).then(function (cdnPlayUrls) {//noHaveSid
//                logger.logs(cdnPlayUrls)
//                logger.logs(cdnPlayUrls.length)
//
//                if (cdnPlayUrls.length === 0) {//add row
//                    logger.logs()
//
//                    /*var insertSql = {
//                     SID: noHaveSid,
//                     CDN_NAME: reqCdnName,
//                     CDN_PLAY_URL: reqPlayUrl,
//                     SOURCE: 'moguv'
//                     };
//                     CdnPlayUrlModel.create(insertSql).then(function (cdnPlayUrl) {
//                     logger.logs(cdnPlayUrl);
//                     done();//必须放在findAll()里面，放在外面会提前结束
//                     });*/
//
//                    //it('create() --  -- ', function (done) {
//                    var insertSql = {
//                        SID: noHaveSid,
//                        CDN_NAME: 'GoSun',
//                        CDN_PLAY_URL: 'http://mediags.moguv.com/20150611/s9n8sto8g6tu/#s9n8sto8g6tu.m3u8',
//                        SOURCE: 'moguv1'
//                    };
//                    //CdnPlayUrlModel.create(insertSql).then(function (cdnPlayUrlModels) {
//                    CdnPlayUrlModel.create(insertSql).then(function () {
//                        logger.logs()
//                        logger.logs(cdnPlayUrlModels)
//
//                        CdnPlayUrlModel.findAll({
//                            where: {
//                                SID: noHaveSid,
//                                CDN_NAME: reqCdnName
//                            }
//                        }).then(function (playUrl) {
//                            logger.logs(playUrl)
//                            logger.logs(playUrl[0].dataValues)
//                            logger.logs(playUrl[0].dataValues.ID)
//                        });
//                    });
//                    //})
//
//
//                } else {
//                    logger.logs(cdnPlayUrls[0].dataValues)
//                    logger.logs(cdnPlayUrls[0].dataValues.ID)
//
//                }
//
//
//                done();//必须放在findAll()里面，放在外面会提前结束
//            });
//        })
//    })//end describe INSERT
//
//
//})
//
///* logger */
//logger.logs();
//logger.logs("-- =%s", 'a');
//logger.logs("======//xxx，2015-7-10 17:34:01======");
//logger.logs("==========================================//end==========================================");
//
