import { Router } from "express";
import { tokenValidation, validateBody } from "../middlewares/index.js";
import { signIn, signOut, signUp } from "../controllers/index.js";
import { loginBody, signupBody } from "../schemas/index.js";

const userRouter = Router();

userRouter
	.post("/signup", validateBody(signupBody), signUp)
	.post("/login", validateBody(loginBody), signIn)
	.all("/*", tokenValidation)
	.post("/logout", signOut);

export { userRouter };
