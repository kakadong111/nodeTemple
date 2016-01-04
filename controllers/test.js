/**
 * Created by billsong on 16/1/4.
 */

/**
 * @doc
 * @return
 * @Params
 * */
exports.test = function(req,res) {
    var isShowTest = req.body.isShowTest;
    if(isShowTest) {
        res.send(200,{errcode:0,errmsg:'success'});
    }
    res.send(200,{errcode:-1,errmsg:'error'});
};


/**
 * @doc
 * @return
 * @Params
 * */
function isShowTest(isShowTest) {
    return isShowTest;
}
