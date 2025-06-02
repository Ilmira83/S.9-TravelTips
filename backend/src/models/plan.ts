import { DataTypes } from 'sequelize';
import db from '../db/connection';


const Plan = db.define('Plan', {
  userID:{
    type: DataTypes.STRING
  },
  title:{
    type: DataTypes.STRING
  },
  destination:{
    type: DataTypes.STRING
  },
  country:{
    type: DataTypes.STRING
  },
  city:{
    type: DataTypes.STRING
  },
  description:{
    type: DataTypes.STRING
  },
  travelers:{
    type: DataTypes.INTEGER
  },
  costs:{
    type: DataTypes.DOUBLE
  },
  month:{
    type: DataTypes.STRING
  },
  year:{
    type: DataTypes.STRING
  },
  nDays:{
    type: DataTypes.INTEGER
  },
  image:{
    type: DataTypes.TEXT('long'),    
  }
})

export default Plan;