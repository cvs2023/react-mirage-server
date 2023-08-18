const routes = function () {
  this.namespace = "/api";

  this.get("/users", (schema) => {
    console.log(schema.db._collections);
    console.log(schema.db._collections[0]);
    console.log(schema.db._collections[1]);

    return schema.users.all();
  });
  this.get("/users/:id");

  this.post("/users", (schema, request) => {
    let attrs = JSON.parse(request.requestBody);
    schema.users.create(attrs);
    // schema.users.save();
    return schema.users;
  });

  this.put("/users", (schema, request) => {
    let newAttrs = JSON.parse(request.requestBody);
    let id = newAttrs.body.id;
    let users = schema.users.find(id);
    return users.update(newAttrs);
  });

  this.del("/users/:id");
};
export default routes;
