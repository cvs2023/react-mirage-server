import { Model, hasMany } from "miragejs";

const models = {
  user: Model.extend({
    addresses: hasMany("address"),
  }),
  address: Model.extend({
    users: hasMany("user"),
  }),
};
export default models;
