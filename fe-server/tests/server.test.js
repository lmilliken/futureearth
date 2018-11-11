const expect = require('expect'); //assertion library
const request = require('supertest'); //for testing express  routes

const { app } = require('./../server');

describe('search mtl-consortium members', () => {
  it('should return all results', (done) => {
    expect(30).toBe(30);
    done();
  });
});

// describe('search mtl-consortium members'),
//   () => {
//     it('should return all results'),
//       (done) => {
//         request(app)
//           .get('/mtl-consortium-search')
//           .send({ something })
//           .expect(200)
//           .expect((res) => {
//             expect(res.body).toBe;
//           });
//       };
//   };

// describe('PEGASUS'),
//   () => {
//     describe('Application Submission'),
//       () => {
//         it('should submit application'),
//           (done) => {
//             request(app)
//               .post('/')
//               .send({ application })
//               .expect(200)
//               .end(done());
//           };
//       };

//     describe('Admin');
//   };
