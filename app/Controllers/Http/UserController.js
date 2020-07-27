"use strict";

const Logger = use("Logger");
const { validate } = use("Validator");
const User = use("App/Models/User");

class UserController {
  async create({ request, response }) {
    const data = request.post();

    const rules = {
      username: `required|unique:${User.table}`,
      email: `required|unique:${User.table}`,
      password: `required`,
    };

    const messages = {
      "username.required": "A username is required",
      "username.unique": "This username is taken. Try another.",
      "email.required": "An Email is required",
      "email.unique": "Email already exists",
      "password.required": "A password for the user",
    };

    const validation = await validate(data, rules, messages);

    if (validation.fails()) {
      const validation_messages = validation.messages().map((msgObject) => {
        return msgObject.message;
      });

      return response.status(400).send({
        success: false,
        message: validation_messages,
      });
    }

    try {
      let create_user = await User.createUser(data);

      let return_body = {
        success: true,
        details: create_user,
        message: "User Successully created",
      };

      response.send(return_body);
    } catch (error) {
      Logger.error("Error : ", error);
      return response.status(500).send({
        success: false,
        message: error.toString(),
      });
    }
  } //create

  async fetch({ request, response }) {
    const data = request.all();

    try {
      const users = await User.getUsers(data);

      response.send(users);
    } catch (error) {
      Logger.error("Error : ", error);
      return response.status(500).send({
        success: false,
        message: error.toString(),
      });
    }
  } //fetch
}

module.exports = UserController;
