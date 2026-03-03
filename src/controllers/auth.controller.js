import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  userRegistrationSchema,
  userLoginSchema,
} from "../libs/authValidator.js";
import { JWT_SECRET_TOKEN, JWT_EXPIRATION_IN } from "../utils/env.js";

export default {
  async register(req, res) {
    try {
      const { fullname, email, password, confirmPassword } = req.body;

      await userRegistrationSchema.validate({
        fullname,
        email,
        password,
        confirmPassword,
      });

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          status: false,
          message: "Email already used, try another email",
          data: null,
        });
      }

      const user = await User.create({
        fullname,
        email,
        password,
      });

      res.status(201).json({
        status: true,
        message: "User registration success",
        data: user,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      await userLoginSchema.validate({ email, password });

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
          data: null,
        });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(401).json({
          status: false,
          message: "Invalid credentials",
          data: null,
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
        },
        JWT_SECRET_TOKEN,
        { expiresIn: JWT_EXPIRATION_IN },
      );

      res.status(200).json({
        status: true,
        message: "login success",
        data: { token },
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        status: false,
        message: error.message,
        data: null,
      });
    }
  },
};
