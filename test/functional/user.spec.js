"use strict";

const { test, trait, after } = use("Test/Suite")("User");

const User = use("App/Models/User");

trait("Test/ApiClient");

const randomString = generateRandomString();

test("Test User creation", async ({ client }) => {
  const userData = {
    username: randomString,
    email: `${randomString}@test.com`,
    password: "123456",
  };

  const response = await client.post("/user/create").send(userData).end();

  response.assertStatus(200);

  //response.assertJSONSubset({ details: data });
}).timeout(0);

test("Fetch all users", async ({ client }) => {
  const response = await client.get("/user/get").end();

  //console.log(response);

  response.assertStatus(200);
  response.assertJSONSubset([
    {
      username: randomString,
      email: `${randomString}@test.com`,
    },
  ]);
}).timeout(0);

//Delete the created user
after(async () => {
  await (await User.findBy("username", randomString)).delete();
});

function generateRandomString(length = 7) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
