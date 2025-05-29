  import { Sequelize } from 'sequelize';

  const sequelize = new Sequelize(process.env.DATABASE!, process.env.DB_USER!, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.error
  }); 

  export default sequelize;