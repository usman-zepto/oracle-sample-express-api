'use strict';

const oracledb = require('oracledb');
const DB =  require('./db')
const Config =  require('./data.json')
class Activity{

  manageactivities (body){
    return new Promise(async (resolve, reject) =>{
      let conn;
      try {
         conn =  await DB.getConnection();
         let data = Config.data
         let sessionId = Config.sessionId
         if(body){
           data = body.data
           sessionId = body.sessionId
         }

        let bindvars = {
          sessionid: {
            val: sessionId ,
            dir: oracledb.BIND_IN
          },
          data: {
            val: JSON.stringify(data),
            dir: oracledb.BIND_IN
          },
          //................................. In
          status: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_OUT
          },
          msg: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
            maxSize: 5000
          },
          sql_error: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
            maxSize: 5000
          },
          //................................. Out
          response_data: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT,
            maxSize: 50000
          }
        };

        let sql = "DECLARE\
                   rslt   zresult   := zresult();\
                   ses    zsession   := zsession(:sessionid);\
                   crm zcrm := zcrm(rslt,:data);\
                  BEGIN\
                    crm.do(rslt, :response_data );\
                    :msg := rslt.pushLog().msg ; \
                    :status := 0; \
                    :sql_error := '' ;\
                   ses.clear(rslt);\
                  EXCEPTION WHEN OTHERS THEN\
                    :msg := rslt.pushLog().msg ; \
                    :status := 1; \
                    :sql_error := sqlerrm ;\
                    rslt.savelog();\
                   ses.clear(rslt);  \
                  END;";
        let result = await conn.execute(sql, bindvars)
        resolve(result);
      } catch (err) {
        reject(err);
      } finally {
        if (conn) {
          try{
            await DB.closConnection(conn)
          }catch(e){
              console.log(e);
          }
        }
      }
    });
  }
}

module.exports = new Activity();
