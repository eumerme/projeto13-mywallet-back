import { Router } from "express";
import tokenValidation from "../middlewares/tokenValidation.js";
import { signIn, signOut, signUp } from "../controllers/userController.js";
import { validateBody } from "../middlewares/reqValidation.js";
import { loginBody, signupBody } from "../schemas/schemas.js";

const userRouter = Router();

userRouter
	.post("/signup", validateBody(signupBody), signUp)
	.post("/login", validateBody(loginBody), signIn)
	.all("/*", tokenValidation)
	.post("/logout", signOut);

export { userRouter };
