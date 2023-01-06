import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation.js";
import { signIn, signOut, signUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", signIn);
authRouter.post("/logout", tokenValidation, signOut);

export { authRouter };
