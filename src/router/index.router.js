// import { Router } from "express";
// import apiRouter from "./api/index.api.js";
// import viewsRouter from "./views/index.view.js";

// const indexRouter = Router();

// indexRouter.use("/api", apiRouter);
// indexRouter.use("/", viewsRouter);

// export default indexRouter;

import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.api.js";
import sendEmail from "../utils/mailing.util.js";

class IndexRouter extends CustomRouter {
    init() {
        this.use("/api", apiRouter)
        //this.use("/", viewsRouter)
        this.create("/api/nodemailer", ["PUBLIC"], async(req,res,next)=> {
            try {
              const { email, name }= req.body
              await sendEmail({ to: email, first_name: name })
              return res.message200("EMAIL SENT")
            } catch (error) {
              next(error)
            }
          })
    }
}

const indexRouter = new IndexRouter()

export default indexRouter.getRouter()