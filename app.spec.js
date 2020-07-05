const server = require('./app');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

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

  it('should return 200', (done) => {
    app.get('/').end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(200);
      done();
    });
  });
});
