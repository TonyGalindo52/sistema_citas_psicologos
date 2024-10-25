const { Sequelize } = require('sequelize');

const bdName  = 'sistema_citas_psicologo';
const user = 'root';
const password = '';
const shost = 'localhost';


const dbConn = new Sequelize(bdName, user, password, {host: shost, dialect:"mariadb"});

module.exports = dbConn;
