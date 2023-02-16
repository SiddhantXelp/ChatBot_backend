import express, { Request, Response } from "express";

import bodyParser from "body-parser";
import connects from "./config/db";
import responseRouter from "./routes/response.routes";
import widgetRouter from "./routes/widget.route";

connects();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

const PORT = 4011;

app.use(widgetRouter);
app.use(responseRouter);

app.get("/test", (req: Request, resp: Response): void => {
  resp.json({ data: "test page 1" });
});

app.listen(PORT, (): void => {
  console.log(`server is running on ${PORT}`);
});
