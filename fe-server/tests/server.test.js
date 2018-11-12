const expect = require('expect'); //assertion library
const request = require('supertest'); //for testing express  routes

const { app } = require('./../server');

describe('search mtl-consortium members', () => {
  it('should return all results', (done) => {
    // expect(2).toBe(1);
    // done();
    request(app)
      .get('/mtl-consortium-search')
      .expect(400)
      .expect((res) => {
        console.log('something');
        expect(res.body.something.length).toBe(11);
      })
      .end(done());
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
