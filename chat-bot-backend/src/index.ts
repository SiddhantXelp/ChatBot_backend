import express, { Request, Response } from "express";

import { UserRequest } from "./models/userRequest.model";
import bodyParser from "body-parser";
import connects from "./config/db";
import cors from "cors";
import responseRouter from "./routes/response.routes";
import userRequestRouter from "./routes/userRequest.routes";
import widgetRouter from "./routes/widget.route";
import  authRouter from "./routes/auth.route"

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

connects();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));

const PORT = 4011;

// var options = {
//   explorer: true,
// };

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fitness Gram API",
      version: "1.0.0",
      description: "Fitness Gram API",
    },
    swaggerOptions: {
      // basicAuth: {
      //   name: 'authorization',
      //   schema: {
      //     type: 'basic',
      //     in: 'header'
      //   },
      //   value:  'Basic <user>'
      // }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },

    security: [{ bearerAuth: [] }],
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "authorization",
        in: "header",
        description: "Authentication token",
      },
    },
  },
  apis: ["./swagger.ts"],
};
// const specs = swaggerJsDoc(options);
// const customCss = fs.readFileSync((process.cwd() + "/src/swagger.css"), 'utf8');
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, { customCss }));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(widgetRouter);
app.use(responseRouter);
app.use(userRequestRouter);

app.use("/api/v1/auth",authRouter);

app.get("/test", (req: Request, resp: Response): void => {
  resp.json({ data: "test page 1" });
});

app.listen(PORT, (): void => {
  console.log(`server is running on ${PORT}`);
});
