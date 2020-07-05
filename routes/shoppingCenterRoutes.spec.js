const server = require('../app');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const dbInitialize = require('../dbInitialize');

chai.use(chaiHttp);
chai.use(require('chai-uuid'));
let app;
describe('server', function () {
  beforeEach(() => {
    app = chai.request(server).keepOpen();
  });

  afterEach(() => {
    app.close();
  });

  describe('Shopping center', () => {
    beforeEach(() => {
      dbInitialize.createShoppingCenterTable();
    });

    afterEach(() => {
      dbInitialize.emptyShoppingCenterTable();
    });

    describe('Create shopping center', () => {
      it('should create a shopping center', async () => {
        app
          .post('/shopping-centers')
          .send({
            name: 'Myer',
            address: '5 Kent street',
          })
          .then((response) => {
            expect(response).to.have.status(201);
            expect(response.body.id).to.be.a.uuid();
          });
      });

      it('should return bad request when name or address is empty or undefined', (done) => {
        app
          .post('/shopping-centers')
          .send({
            name: '',
          })
          .end((error, response) => {
            expect(response).to.have.status(400);
            expect(response.body.errors[0].msg).to.be.equal(
              'name is mandatory',
            );
            expect(response.body.errors[1].msg).to.be.equal(
              'address is mandatory',
            );
            done();
          });
      });
    });

    describe('Get shopping center', () => {
      it('should return empty list if there are no existing shopping centers', () => {
        app.get('/shopping-centers').then((response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.deep.equal({ data: [] });
        });
      });

      describe('when shopping center exists', () => {
        it('should return the list of existing shopping centers', (done) => {
          app
            .post('/shopping-centers')
            .send({
              name: 'Westfield',
              address: '200 Barangaroo',
            })
            .then((response) => {
              expect(response).to.have.status(201);
              app.get('/shopping-centers').then((response) => {
                expect(response.body.data.length).to.be.equal(1);
                expect(response.body.data[0].name).to.be.equal('Westfield');
                expect(response.body.data[0].address).to.be.equal(
                  '200 Barangaroo',
                );
              });
            })
            .then(() => done());
        });

        it('should return the shopping center given an id', (done) => {
          app
            .post('/shopping-centers')
            .send({
              name: 'Westfield',
              address: '200 Barangaroo',
            })
            .then((response) => {
              expect(response).to.have.status(201);
              return response.body.id;
            })
            .then((response) => {
              app.get(`/shopping-centers/${response}`).then((response) => {
                expect(response).to.have.status(200);
                expect(response.body.name).to.be.equal('Westfield');
                expect(response.body.address).to.be.equal('200 Barangaroo');
              });
            })
            .then(() => done());
        });
      });
    });

    describe('Update shopping center', () => {
      it('should update the name and address of a given shopping center', (done) => {
        app
          .post('/shopping-centers')
          .send({
            name: 'Myer',
            address: '5 Kent street',
          })
          .then((response) => {
            expect(response).to.have.status(201);
            return response.body.id;
          })
          .then((id) => {
            app
              .put(`/shopping-centers/${id}`)
              .send({
                name: 'Westfield',
                address: '5 Kent street',
              })
              .then((response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.deep.equal({
                  id,
                  name: 'Westfield',
                  address: '5 Kent street',
                });
              });
          })
          .then(() => done());
      });
    });

    describe('Delete shopping center', () => {
      it('should delete a given shopping center', (done) => {
        app
          .post('/shopping-centers')
          .send({
            name: 'Myer',
            address: '5 Kent street',
          })
          .then((response) => {
            expect(response).to.have.status(201);
            return response.body.id;
          })
          .then((id) => {
            app
              .delete(`/shopping-centers/${id}`)
              .then((response) => {
                expect(response).to.have.status(200);
                return id;
              })
              .then((id) => {
                app
                  .get(`/shopping-centers/${id}`)
                  .send({
                    name: 'Westfield',
                    address: '5 Kent street',
                  })
                  .then((response) => {
                    expect(response.body).to.be.deep.equal({});
                  });
              })
              .then(() => done());
          });
      });

      it('should delete a given shopping center', (done) => {
        app
          .post('/shopping-centers')
          .send({
            name: 'Myer',
            address: '5 Kent street',
          })
          .then((response) => {
            expect(response).to.have.status(201);
            return response.body.id;
          })
          .then((id) => {
            app
              .delete(`/shopping-centers/`)
              .then((response) => {
                expect(response).to.have.status(200);
                return id;
              })
              .then((id) => {
                app
                  .get(`/shopping-centers/${id}`)
                  .send({
                    name: 'Westfield',
                    address: '5 Kent street',
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
