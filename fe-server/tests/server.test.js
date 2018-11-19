const expect = require('expect'); //assertion library
const request = require('supertest'); //for testing express  routes

const { app } = require('./../server');

describe('SEARCH MTL-CONSORTIUM MEMBERS', () => {
  it('should return all results', (done) => {
    // expect(2).toBe(1);
    // done();
    request(app)
      .get('/mtl-consortium-search')
      .expect(200)
      .expect((res) => {
        expect(res.body.members.length).toBe(9);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should only return K_CP results', (done) => {
    const themes = ['K_CP'];
    request(app)
      .get('/mtl-consortium-search?themes[]=K_CP')
      .expect(200)
      .expect((res) => {
        expect(res.body.members.length).toBe(3);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
