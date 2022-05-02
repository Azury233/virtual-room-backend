const express = require("express");
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const db = require("./db.js");

// const getdb= async()=>{
//   const res =await db.findMemo('notes',{})
//   return res

// }

// db.addMemo('notes',{
//   user:'test',
//   data:[3,4,5]
// })

// 获取笔记
app.get("/note", async (req, res) => {
  const user = req.query["user"];
  const data = await db.findMemo("notes", { user: user });
  res.send(data);
});

// 添加笔记
app.post("/note/add_note_item", async (req, res) => {
  const name = req.body.name;
  const user = req.body.user;
  const data = await db.findMemo("notes", { user: user });

  if (data.length) {
    const res = data[0].data;
    if (!res.includes(name)) {
      res.push(name);
      db.updateMemo('notes',{user:user},{$set:{"data":res}})
    }
  } else {
    db.addMemo("notes", {
      user: user,
      data: [name],
    });
  }
  res.send();
});

app.post("/note/change_note_item", async(req, res) => {
  const body = req.body;
  const user = body.user;
  const originName = body.originName;
  const name = body.name;
  console.log(originName, name);

  const data = await db.findMemo("notes", { user: user });
  const nodeList = data[0].data;
  if (nodeList.includes(originName)) {
    let i = nodeList.indexOf(originName);
    console.log(i);
    nodeList.splice(i, 1, name);
  }
  db.updateMemo('notes',{user:user},{$set:{"data":nodeList}})
  res.send();
});

app.post("/note/delete_note_item",async (req, res) => {
  const body = req.body;
  const user = body.user;
  const name = body.name;
  const data = await db.findMemo("notes", { user: user });
  const nodeList = data[0].data;
  let i = nodeList.indexOf(name);
  nodeList.splice(i, 1);
  db.updateMemo('notes',{user:user},{$set:{"data":nodeList}})
  res.send();
});

const nodeDetail = [
  {
    tag: 2,
    time: "2022-04-19 10:50",
    value: "语文第一条",
    master: "语文",
  },
  {
    tag: 4,
    time: "2022-04-16 10:50",
    value: "语文第二条",
    master: "语文",
  },
  {
    tag: 0,
    time: "2022-04-19 10:50",
    value: "语文第一条",
    master: "语文",
  },
  {
    tag: 1,
    time: "2022-04-16 10:50",
    value: "语文第二条",
    master: "语文",
  },
  {
    tag: 2,
    time: "2022-04-19 10:50",
    value: "语文第一条",
    master: "语文",
  },
  {
    tag: 4,
    time: "2022-04-16 10:50",
    value: "语文第二条",
    master: "语文",
  },
  {
    tag: 3,
    time: "2022-04-19 10:50",
    value: "语文第一条",
    master: "语文",
  },
  {
    tag: 4,
    time: "2022-04-16 10:50",
    value: "语文第二条",
    master: "语文",
  },
  {
    tag: 1,
    time: "2022-04-11 10:50",
    value: "数学第一条",
    master: "数学",
  },
  {
    tag: 2,
    time: "2022-04-18 10:50",
    value: "数学第二天",
    master: "数学",
  },
  {
    tag: 1,
    time: "2022-04-11 10:50",
    value: "物理第一条",
    master: "物理",
  },
  {
    tag: 2,
    time: "2022-04-18 10:50",
    value: "物理第二天",
    master: "物理",
  },
];
app.post("/note/get_note_detail", (req, res) => {
  const body = req.body;
  const user = body.user;
  const name = body.name;
  const arr = [];
  nodeDetail.forEach((item) => {
    if (item.master === name) {
      arr.push(item);
    }
  });
  // res.send(JSON.stringify(req))
  res.send(arr);
});

app.listen(db.servePort, (req, res) => {
  console.log("on"+db.servePort);
});

// const mongoose = require('mongoose')
// const DB_URL = 'mongodb://127.0.0.1:27017/database'
// mongoose.connect(DB_URL)
// mongoose.connection.on('connected', function(){
//     console.log('mongo connect success') //连接成功后输出
// })

// // 类似于mysql的表 MongoDB里有文档、字段的概念
// const User = mongoose.model('test', new mongoose.Schema({
//   user: {type: String, required: true},
//   age: {type: Number, required: true}
// }))
// // 新建数据，执行一次后可注释掉(执行一次就会插入一条数据)
// User.create({
//    user: 'imooc22',
//    age: 20
// }, function(err, doc){
//    if (!err) {
//        console.log(doc)
//    } else {
//        console.log(err)
//    }
// })
