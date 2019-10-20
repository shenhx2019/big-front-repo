import "reflect-metadata";
import {createConnection, getManager} from "typeorm";
// import {User} from "./entity/User";
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
import { WorkItem } from "./entity/workItem";

createConnection().then(async connection => {

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));

// start up a http server
const app = express();
const router = express.Router();

app.get('/',(req,res) => {
    res.json({promote:"hello,world"});
});

// 查询
router.get("", async (req, res, next) => {
    const workItemRepository = getManager().getRepository(WorkItem);
    try {
        const workItems = await workItemRepository.find({order: {createAt: "DESC"}});
        res.json(workItems);
    } catch (error) {
        next(error);
    }
});
// 保存
router.post("", async (req, res, next) => {
    // BUG 接收不到post过来的plain/text信息，待处理s
    const workItem = new WorkItem();
    workItem.text = "hello,error";//req.body.text;
    // console.log(workItem.text);
    const workItemRepository = getManager().getRepository(WorkItem);
    try {
        res.json(await workItemRepository.save(workItem));
    } catch (error) {
        next(error);
    }
});
// 更新
router.put('/:id', async(req,res, next) => {

    const body = req.body;
    const workItemRepository = getManager().getRepository(WorkItem);
    try {
        await workItemRepository.update(req.params.id, {isChecked: body.isChecked});
    } catch (error) {
        next(error);
    }
});
// 删除
router.delete('/:id', async(req,res, next) => {

    // const body = req.body;
    const workItemRepository = getManager().getRepository(WorkItem);
    try {
        await workItemRepository.delete(req.params.id);
    } catch (error) {
        next(error);
    }
});

app.use((req, res, next) => {
    let reqData = [];
    let size = 0;
    req.on('data',function(data){
        console.log('---> on');
        reqData.push(data);
        size += data.length;
        console.log(data);
        console.log(size);
    });
    req.on('end', function(){
        console.log('---> off');
        req.reqData = Buffer.concat(reqData,size).toString();
        console.log(req.reqData)
    })
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use("/work-items", router);
const server = http.createServer(app);
console.log('server start up success at port 3230...');
app.listen(3230);