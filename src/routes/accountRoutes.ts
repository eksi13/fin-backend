import { Router } from "express";
import { accountDetail, accountList } from "../controllers/accountController.js";

const accountRouter = Router();

accountRouter.get("/accounts", accountList);

accountRouter.get("/account/:id", accountDetail);

export default accountRouter;