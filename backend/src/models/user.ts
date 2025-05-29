import { DataTypes } from 'sequelize';
import db from '../db/connection';


const User = db.define('User', {
  fbUID:{
    type: DataTypes.STRING
  },
  username:{
    type: DataTypes.STRING
  },
  userPhoto:{
    type: DataTypes.STRING
  },
})

export default User;
