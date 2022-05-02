const baseUrl = '192.168.49.71'
const servePort = 8080

const res = require('express/lib/response');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://" + baseUrl +":27017/database";
const database = 'database'
//database--数据库名，table--表名， data--数据，updateStr--修改后的数据

/*这里是查找数据*/
const findMemo = function (table,data) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db) {
            if (err) {
                console.log(err);
                resolve(err)
            } else {
                var dbo = db.db(database);
                dbo.collection(table).find(data).toArray((err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        // console.log(result)
                        resolve(result)
                    }
                    db.close();
                });
            }
        });
    })
};
/*这里是插入数据*/
const addMemo = function (table, data) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) {
                console.log(err);
                resolve(err)
            } else {
                var dbo = db.db(database);
                dbo.collection(table).insertOne(data, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                    db.close();
                });
            }
        });
    })
};

/*这里是修改数据*/
const updateMemo = function (table, data, updateStr) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) {
                db.getCollection("notes").update( { _id: ObjectId("626fde9685000000dc003258") }, { $set: { data: "3443" } } )
                console.log(err);
                resolve(err)
            } else {
                var dbo = db.db(database);
                dbo.collection(table).updateOne(data, updateStr, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                    db.close();
                });
            }
        });
    })
};
/*这里是删除数据*/
const delMemo = function (table,data) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url,{ useNewUrlParser: true },  function (err, db) {
            if (err) {
                console.log(err);
                resolve(err)
            } else {
                var dbo = db.db(database);
                dbo.collection(table).removeOne(data, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                    db.close();
                });
            }
        });
    })
};

module.exports = {
    findMemo, addMemo, updateMemo, delMemo,servePort
};
