const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'classe',
    password: 'postdba',
    port: 5432,
});

pool.connect((err, client, release) => {
    if(err){
        return console.error("Erro ao se conectar no banco", err.message);
    }

    console.log("Conexão bem-sucedida");
    
}); 

module.exports = pool;