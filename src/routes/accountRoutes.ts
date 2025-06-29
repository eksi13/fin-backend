import { Router } from "express";
import { account_list } from "../controllers/accountController.js";

const accountRouter = Router();

accountRouter.get("/accounts", account_list);

export default accountRouter;