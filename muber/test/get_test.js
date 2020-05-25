const assert = require("assert");
const request = require("supertest");
const app = require("../app");

describe("Testing the functionality of app.js", () => {
  it("responds with { hi: 'there' } when a GET request is sent to /api", (done) => {
    request(app)
      .get("/api")
      .end((err, response) => {
        console.log(response.body.hi);
        assert(response.body.hi === "there");
        done();
      });
  });
});
