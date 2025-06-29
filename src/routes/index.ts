import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.send("NOT IMPLEMENTED: Index");
});

export default indexRouter;