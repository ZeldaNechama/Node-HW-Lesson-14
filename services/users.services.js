const { Router } = require('express');
const app = Router();

const fsPromises = require('fs').promises;
const config = require('../config/config');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt'); 


const getData = async () => {
    try {
        const data = await fsPromises.readFile('./data/users.json');
        return JSON.parse(data);

    } catch (error) {
        console.log(error.message);
    }
};

const updateData = async (data) => {

    try {
        await fsPromises.writeFile('./data/users.json', JSON.stringify(data));
    } catch (error) {
        console.log(error.message);

    }

};


const createUser =async(userId, userName, userPhone, userEmail)=>{
    const users = await getData();
    if (users) {
        const user = { userId, userName, userPhone, userEmail };
        const _user = await createUser1(user);
        users.push(_user);
        await updateData(users);
        return _user.password;
     }
};

const createUser1 = async (user) => {
    console.log('user',user);
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(user.userId, salt);
    user.password = hasPassword;
    return user;
};

const login=async(userId,userName,password,type)=>{
    const users= await getData();
    const user=users.find(u=> u.userId==userId && u.userName==userName);
    if(user){
        const vailedPassword=await bcrypt.compare(user.password,password);
        if(vailedPassword){
            const token=jwt.sign({id:user.userId,type:user.type},config.SECRET_TOKEN);
            return token.toString();
        }     
    } 
};

module.exports={
createUser,
login
};