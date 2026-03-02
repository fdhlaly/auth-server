import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["ADMIN", "USER", "SUPERADMIN"],
      defaultValue: "USER",
    },
  },
  {
    timestamps: true,
  },
);

// Hash password sebelum save
User.beforeCreate(async (user) => {
  //   const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, 10);
});

// Sembunyikan password saat response
User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

export default User;
