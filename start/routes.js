"use strict";

const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Welcome to the Adonis API tutorial" };
});

//User routes
Route.group(() => {
  Route.post("create", "UserController.create");

  Route.route("get", "UserController.fetch", ["GET", "POST"]);
}).prefix("user");
