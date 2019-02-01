const env = require('dotenv').config()
const mysqlDBConfig = require('mysql2')

function connection() {
    return mysqlDBConfig.createConnection({
        host: process.env._HOST,
        user: process.env._USER,
        password: process.env._PASSWORD,
        multipleStatements: true
    })
}

var executeQuery = (query) => {
    return new Promise((resolve, reject) => {
        connection().promise().query(query)
            .then(([rows, fields]) => {
                resolve(rows)
            }).catch((err) => {
                reject(err)
            }).then(() => {
                connection().end()
            })
    })
}

executeQuery(
    `CREATE DATABASE IF NOT EXISTS ${process.env._DATABASE};

    CREATE TABLE IF NOT EXISTS ${process.env._DATABASE}.client
    (_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL, 
    cpf VARCHAR(14) NOT NULL, 
    PRIMARY KEY (_id), 
    UNIQUE INDEX cpf_UNIQUE (cpf ASC)); 

    CREATE TABLE IF NOT EXISTS ${process.env._DATABASE}.professional
    (_id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL, 
    cpf_cnpj VARCHAR(18) NOT NULL, 
    PRIMARY KEY (_id), 
    UNIQUE INDEX cpf_cnpj_UNIQUE (cpf_cnpj ASC)); 

    CREATE TABLE IF NOT EXISTS ${process.env._DATABASE}.schedule
    (_id INT NOT NULL AUTO_INCREMENT, 
    client_id INT NOT NULL, 
    date VARCHAR(10) NOT NULL, 
    initial_time VARCHAR(8) NOT NULL, 
    final_time VARCHAR(8) NOT NULL, 
    PRIMARY KEY (_id), 
    CONSTRAINT client_id FOREIGN KEY (_id) REFERENCES 
    ${process.env._DATABASE}.client (_id) ON DELETE CASCADE ON UPDATE CASCADE, 
    CONSTRAINT professional_id FOREIGN KEY (_id) REFERENCES 
    ${process.env._DATABASE}.professional (_id) ON DELETE CASCADE ON UPDATE CASCADE);`)
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
        process.exit(0);
    })

module.exports = executeQuery