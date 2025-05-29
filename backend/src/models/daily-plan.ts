import { DataTypes } from 'sequelize';
import db from '../db/connection';


const DailyPlan = db.define('DailyPlan', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userID:{
    type: DataTypes.STRING
  },
  planID:{
    type: DataTypes.INTEGER,
    allowNull: true
  },
  blogID:{
    type: DataTypes.INTEGER,
    allowNull: true
  },
  costs:{
    type: DataTypes.DOUBLE
  },
  dayNumber:{
    type: DataTypes.INTEGER
  },
  description:{
    type: DataTypes.TEXT('long'),    
  }}, {
  tableName: 'daily_plans'
})

export default DailyPlan;