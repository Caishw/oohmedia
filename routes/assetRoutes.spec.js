const server = require("../app");
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const dbInitialize = require("../dbInitialize");

chai.use(chaiHttp);
chai.use(require("chai-uuid"));
let app;
describe("Server", function () {
  beforeEach(() => {
    app = chai.request(server).keepOpen();
  });

  afterEach(() => {
    app.close();
  });

  describe("Asset", () => {
    beforeEach(() => {
      dbInitialize.createAssetTable();
    });

    afterEach(() => {
      dbInitialize.emptyAssetTable();
    });

    describe("Create Asset", () => {
      it("should create a asset", () => {
        app
          .post("/assets")
          .send({
            name: "Myer",
            location: "1st floor",
            dimension: "20W, 30H",
            active: "true",
            shoppingCenterId: "123456",
          })
          .then((response) => {
            expect(response).to.have.status(201);
            expect(response.body.id).to.be.a.uuid();
          });
      });

      it("should return bad request when inputs is empty or undefined", (done) => {
        app
          .post("/assets")
          .send({
            name: "",
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body.errors[0].msg).to.be.equal(
              "name is mandatory"
            );
            expect(response.body.errors[1].msg).to.be.equal(
              "location is mandatory"
            );
            done();
          });
      });
    });

    describe("Get asset", () => {
      it("should return empty list if there are no existing assets", () => {
        app.get("/assets").then((response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.deep.equal({ data: [] });
        });
      });

      describe("when asset exists", () => {
        it("should return the list of existing assets", (done) => {
          app
            .post("/assets")
            .send({
              name: "Westfield",
              location: "200 Barangaroo",
            })
            .then((response) => {
              expect(response).to.have.status(201);
              app.get("/assets").then((response) => {
                expect(response.body.data.length).to.be.equal(1);
                expect(response.body.data[0].name).to.be.equal("Westfield");
                expect(response.body.data[0].location).to.be.equal(
                  "200 Barangaroo"
                );
              });
            })
            .then(() => done());
        });

        it("should return the asset given an id", (done) => {
          app
            .post("/assets")
            .send({
              name: "Westfield",
              location: "200 Barangaroo",
            })
            .then((response) => {
              expect(response).to.have.status(201);
              return response.body.id;
            })
            .then((response) => {
              app.get(`/assets/${response}`).then((response) => {
                expect(response).to.have.status(200);
                expect(response.body.name).to.be.equal("Westfield");
                expect(response.body.location).to.be.equal("200 Barangaroo");
              });
            })
            .then(() => done());
        });
      });
    });

    describe("Update asset", () => {
      it("should update the name and location of a given asset", (done) => {
        app
          .post("/assets")
          .send({
            name: "Myer",
            location: "5 Kent street",
          })
          .then((response) => {
            expect(response).to.have.status(201);
            return response.body.id;
          })
          .then((id) => {
            app
              .put(`/assets/${id}`)
              .send({
                name: "Westfield",
                location: "5 Kent street",
              })
              .then((response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.deep.equal({
                  id,
                  name: "Westfield",
                  location: "5 Kent street",
                });
              });
          })
          .then(() => done());
      });
    });

    describe("Delete asset", () => {
      it("should delete a given asset", (done) => {
        app
          .post("/assets")
          .send({
            name: "Myer",
            location: "5 Kent street",
          })
          .then((response) => {
            expect(response).to.have.status(201);
            return response.body.id;
          })
          .then((id) => {
            app
              .delete(`/assets/${id}`)
              .then((response) => {
                expect(response).to.have.status(200);
                return id;
              })
              .then((id) => {
                app
                  .get(`/assets/${id}`)
                  .send({
                    name: "Westfield",
                    location: "5 Kent street",
                  })
                  .then((response) => {
                    expect(response.body).to.be.deep.equal({});
                  });
              })
              .then(() => done());
          });
      });

      it("should delete a given asset", (done) => {
        app
          .post("/assets")
          .send({
            name: "Myer",
            location: "5 Kent street",
          })
          .then((response) => {
            expect(response).to.have.status(201);
            return response.body.id;
          })
          .then((id) => {
            app
              .delete(`/assets/`)
              .then((response) => {
                expect(response).to.have.status(200);
                return id;
              })
              .then((id) => {
                app
                  .get(`/assets/${id}`)
                  .send({
                    name: "Westfield",
                    location: "5 Kent street",
                  })
                  .then((response) => {
                    expect(response.body).to.be.deep.equal({});
                  });
              })
              .then(() => done());
          });
      });
    });
  });
});
