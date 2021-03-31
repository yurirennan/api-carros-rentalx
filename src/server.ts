import express from "express";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";
import swaggerConfig from "./swagger.json";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(routes);

app.listen(3333);
