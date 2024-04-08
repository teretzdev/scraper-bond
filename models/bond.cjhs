import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Bond = sequelize.define('Bond', {
    bondNumber: DataTypes.STRING,
    status: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    cid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    offense: DataTypes.TEXT,
    mDate: DataTypes.DATEONLY,
    bondsmen: DataTypes.STRING,
    bookInDate: DataTypes.DATEONLY,
    type: DataTypes.STRING,
    address: DataTypes.TEXT
}, {
    tableName: 'bonds'
});



module.exports = { Bond, sequelize };