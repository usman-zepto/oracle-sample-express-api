'use strict'
const oracledb = require('oracledb');
const Config =  require('./config.json')
class DB {
  constructor(){
    this.config = Config.oracledb
  }
  getConnection(){
    return new Promise(async (resolve,reject)=>{
      try{
        let conn = await oracledb.getConnection(this.config);
        resolve(conn);
      }catch(err)
      {
        reject(err)
      }
    })
  }
  closConnection(conn){
    return new Promise(async(resolve,reject)=>{
      try {
        await conn.release();
        resolve(true);
      } catch (e) {
        console.error(e);
        reject(e)
      }
    })
  }
}

module.exports= new DB();
