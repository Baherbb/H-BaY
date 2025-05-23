import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/database';

// Define the enum type to match PostgreSQL
export type UserType = 'customer' | 'employee' | 'admin' | 'super_admin';

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  user_type: UserType;
  google_id?: string;
  profile_picture?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public password!: string;
  public user_type!: UserType;
  public google_id!: string;
  public profile_picture!: string;
  public created_at!: Date;
  public updated_at!: Date;

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return this.password ? bcrypt.compare(candidatePassword, this.password) : false;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    user_type: {
      type: DataTypes.ENUM(...['customer', 'employee', 'admin', 'super_admin'] as const),
      allowNull: false,
    },
    google_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    profile_picture: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    underscored: true,
    freezeTableName: true, // Add this to prevent any table name modifications
    schema: 'public', // Explicitly set the schema
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password') && user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;