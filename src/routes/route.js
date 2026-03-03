import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { authenticate, authorizeRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

// protected route for user only
router.get("/", authenticate, (req, res) => {
  res.status(200).json({
    status: true,
    message: "HELLO USER",
    data: req.user,
  });
});

// protected route for admin only
router.get(
  "/admin",
  authenticate,
  authorizeRole("ADMIN", "SUPERADMIN"),
  (req, res) => {
    res.status(200).json({
      status: true,
      message: "HELLO ADMIN",
      data: req.user,
    });
  },
);

// protected route for superadmin only
router.get(
  "/super-admin",
  authenticate,
  authorizeRole("SUPERADMIN"),
  (req, res) => {
    res.status(200).json({
      status: true,
      message: "HELLO SUPER ADMIN",
      data: req.user,
    });
  },
);

export default router;
