"use strict";

const Model = use("Model");

const Hash = use("Hash");

class User extends Model {
  static get table() {
    return "users";
  }

  static boot() {
    super.boot();

    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  tokens() {
    return this.hasMany("App/Models/Token");
  }

  static async createUser(data) {
    const newUser = await this.create(data);

    return newUser;
  }

  static async getUsers(filter) {
    const allUsers = await this.query().where(filter).fetch();

    return allUsers;
  }
}

module.exports = User;
