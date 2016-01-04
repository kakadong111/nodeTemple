/**
 * Created by billsong on 15-5-14.
 */

/**
 * 程序当前的运行环境，命令行传进来的
 * #node app_user_cluster.js DEV
 */
global.CURRENT_ENV_DEV = 'DEV';//开发环境
global.CURRENT_ENV_TEST = 'TEST';//测试环境
global.CURRENT_ENV_PROD = 'PROD';//生产环境

global.CURRENT_ENV = global.CURRENT_ENV_PROD;//默认设置成PROD
if(process.argv[2] != undefined){
    global.CURRENT_ENV = process.argv[2];
    console.log("process.argv[2]=%s", process.argv[2]);
}
console.log("[global.CURRENT_ENV]=%s", global.CURRENT_ENV);


/* 加载全局变量： */
var configFile = require('./config/config');
global.config = configFile;
//global.messageQueueClient = require('./config/messageQueueClient');//TODO::重命名：messageQueueClient
global.logger = require('./config/logs');
//require('./config/redisClient');
//require('./config/mysqlClient');
//require('./config/SequelizeClient');

var cluster = require('cluster');
var os = require('os'); //
var numCPUs = os.cpus().length;
var workers = {};
if (cluster.isMaster) {
    cluster.on('death', function (worker) {
        delete workers[worker.pid];
        worker = cluster.fork();
        workers[worker.pid] = worker;
    });
    cluster.on("listening", function(worker, address){
        console.log("[master] " + "listening: worker "+worker.id + ", pid:"+worker.process.pid + ",Address:" + address.address + ":" + address.port);
    });
    cluster.on("exit", function(worker, code, signal){
        console.log('worker ' + worker.process.pid + ' died');
    });
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
        workers[worker.pid] = worker;
    }
} else {
    require('./app.js');
}

process.on('SIGTERM', function () {
    console.log('sigterm');
    for (var pid in workers) {
        process.kill(pid);
    }
    process.exit(0);
});