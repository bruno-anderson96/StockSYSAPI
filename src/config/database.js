import firebird from "node-firebird";

const dbOptions ={
    host: 'localhost',
    port: 3050,
    database: 'D:\\Projetos\\StockSYS2\\BANCO.fdb',
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys: false,
    role: null,
    pageSize: 4096
};

function execQuery(ssql, params, callback ){
    firebird.attach(dbOptions, function(err, db) {

        if (err){
            return callback(err,[]);  
        }    
        // db = DATABASE
        db.query(ssql, params, function(err, result) {
            // IMPORTANT: close the connection
            db.detach();

            if(err){
                return callback(err,[]);
            }else{
                return callback(undefined,result);
            }
        });
    
    });
}

export {execQuery};

