import { createServer, RestSerializer } from "miragejs";
import models from "./models";
import routes from "./routes";
import seeds from "./seeds";
createServer({
  serializers: {
    application: RestSerializer,
  },
  models,
  seeds,
  routes,
});
