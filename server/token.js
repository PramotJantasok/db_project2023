const jwt = require('jsonwebtoken');

//code by Wichai
// playload object ที่มีข้อมูลที่เราอยากใส่ในtoken key-คือรหัสที่ใช้encodeและ decode token
const createToken = async (playload, key) =>{
    try{
        const token = await jwt.sign(playload, key, {expiresIn: 60*60*1});
        console.log("Token = ",token);
        return token; // return token string
    }catch(er){
        console.log('Create Token');
        console.log(er);
    }finally{
        console.log("End Process CreateToken.")
    }
};
module.exports.createToken = createToken;

const verifyToken = async (token, key)=>{ 
    // รับ token ที่เป็น String มา
    try{
        const v_token = await jwt.verify(token, key);
        console.log(v_token);
        return {load: v_token, status: true}; // ถ้า token ยังทำงาน จะ return object ที่เก็บข้อมูลใน playload
    }catch(er){
        console.log("Token Error or Token timeOut");
        console.log(er);
        return {status:false};
    }finally{
        console.log("End Process VerifyToken");
    }
};
module.exports.verifyToken = verifyToken;