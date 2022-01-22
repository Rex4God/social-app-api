const chai = require('chai')
const chatHttp = require('chai-http')
const { send } = require('express/lib/response')
const server = require('../config/connect')


//Assertion Style

chai.should()

chai.use(chatHttp)

describe( 'Social API ',()=>{
 // Post Route

});

describe('POST /api/v1/login',()=>{
   it("It should login user",(done)=>{
      const login={
         emailAddress: "kehinde@2canplay.com",
         password: "kennhft"
      }
      chai.request(server)
      .post('/api/v1/login/')
      .send(login)
      .end((err, response)=>{
         response.should.have.status(201);
         response.body.should.be.a('object');
         response.body.should.have.property('id');
         response.body.should.have.property('emailAddress');
         response.body.should.have.property('password');
         response.body.should.have.property('id').eq(1);
         done(err)
   });

 })
})
