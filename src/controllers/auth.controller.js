import User from "../models/User.js";
import { userRegistrationSchema } from "../libs/authValidator.js";

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
};
