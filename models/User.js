import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import validateModel from '../validation/validateModel.js';
import { userSchema } from '../validation/userSchema.js';

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      async isValid(value) {
        validateModel(userSchema, { email: value })
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // skip validation on hashed password - this happens on the controller
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    validate: {
      async isValid(value) {
        validateModel(userSchema, { isVerified: value })
      }
    }
  },
  isLocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    validate: {
      async isValid(value) {
        validateModel(userSchema, { isLocked: value })
      }
    }
  },
  roles: {
    type: DataTypes.JSON, //['user', 'reviewer', 'admin']
    defaultValue: ['user'],
    validate: {
      async isValid(value) {
        validateModel(userSchema, { roles: value })
      }
    }
  },
  addresses: {
    type: DataTypes.JSON, // [{default, title, firstName, lastName, street, city, state, zip}, {...}]
    allowNull: true,
    defaultValue: [],
    validate: {
      async isValid(value) {
        validateModel(userSchema, { addresses: value }, true)
      }
    }
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      async isValid(value) {
        validateModel(userSchema, { resetPasswordToken: value })
      }
    }
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
    validate: {
      async isValid(value) {
        validateModel(userSchema, { resetPasswordExpires: value })
      }
    }
  },
  failedLoginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      async isValid(value) {
        validateModel(userSchema, { failedLoginAttempts: value })
      }
    }
  }
}, { timestamps: true });

export default User;