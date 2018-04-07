const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

/**
*	Test Cases for User endpoints
**/
describe('Users', function() {
	// This newUser object will be used for testing of Create, Update, and Delete
	let newUser = {
    	'username': 'demo',
    	'password': 'pass',
    	'email': 'demo@email.com',
    	'firstname': 'Java',
    	'lastname': 'Script'
    };

    // Test retrieving all Users
  it('should list ALL users on /api/user GET', function(done) {
  	chai.request(server)
    .get('/api/user')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });

  // Test creating a User, which will be the newUser object we defined above
  it('should add a SINGLE user on /api/user POST', function(done) {
  	chai.request(server)
    .post('/api/user')
    .send(newUser)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('username');
      res.body.should.have.property('password');
      res.body.should.have.property('email');
      res.body.should.have.property('firstname');
      res.body.should.have.property('lastname');
      res.body.should.have.property('id');
      res.body.username.should.equal('demo');
      res.body.password.should.equal('pass');
      res.body.email.should.equal('demo@email.com');
      res.body.firstname.should.equal('Java');
      res.body.lastname.should.equal('Script');

      // Save the id for later so that we only work with one newUser
      newUser.id = res.body.id;
      done();
    });
  });

  // Test retrieving a single User, which will be the newUser object we defined above
  it('should list a SINGLE user on /api/user/:id GET', function(done) {
  	chai.request(server)
        .get('/api/user/' + newUser.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('username');
	      res.body.should.have.property('password');
	      res.body.should.have.property('email');
	      res.body.should.have.property('firstname');
	      res.body.should.have.property('lastname');
	      res.body.should.have.property('id');
	      res.body.id.should.equal(newUser.id);
	      res.body.username.should.equal('demo');
	      res.body.password.should.equal('pass');
	      res.body.email.should.equal('demo@email.com');
	      res.body.firstname.should.equal('Java');
	      res.body.lastname.should.equal('Script');
          done();
        });
  });

  // Test updating a single User, which will be the newUser object we defined above
  it('should update a SINGLE user on /api/user/:id PUT', function(done) {
  	chai.request(server)
        .post('/api/user/' + newUser.id)
        .send({
        	'firstname': 'Super',
        	'lastname': 'Man'
    	})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          chai.request(server)
          	.get('/api/user/' + newUser.id)
          	.end(function(err, res) {
          		  res.body.should.have.property('username');
			      res.body.should.have.property('password');
			      res.body.should.have.property('email');
			      res.body.should.have.property('firstname');
			      res.body.should.have.property('lastname');
			      res.body.should.have.property('id');
			      res.body.id.should.equal(newUser.id);
			      res.body.username.should.equal('demo');
			      res.body.password.should.equal('pass');
			      res.body.email.should.equal('demo@email.com');
			      res.body.firstname.should.equal('Super');
			      res.body.lastname.should.equal('Man');
         		  done();
          	});
      });
  });

  // Test deleting a single User, which will be the newUser object we defined above
  it('should delete a SINGLE user on /api/user/:id DELETE', function(done) {
  	chai.request(server)
  		.delete('/api/user/' + newUser.id)
  		.end(function(err, res) {
  			res.should.have.status(200);
          	res.should.be.json;
          	res.body.should.equal(1);
          	chai.request(server)
          		.get('/api/user/' + newUser.id)
          		.end(function(error, response) {
          			 should.not.exist(response.body);
          			done();
          		});
  		});
  });
}); // End User Test Cases

/**
*	Test Cases for Employee endpoints
**/
describe('Employees', function() {
	// This will be our temporary User so that we can store an Employee under this User
	let demoUser = {
		'username': 'demo',
    	'password': 'pass',
    	'email': 'demo@email.com',
    	'firstname': 'Java',
    	'lastname': 'Script'
	}

	// This newEmployee object will be used for testing of Create, Update, and Delete
	let newEmployee = {
    	'firstname': 'New',
    	'lastname': 'Guy',
    	'email': 'employee@mail.com',
    	'goals': "Git gud"
    };

    // Create our User to store the new Employee
  it('should add a SINGLE demo user', function(done) {
  	chai.request(server)
    .post('/api/user')
    .send(demoUser)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('username');
      res.body.should.have.property('password');
      res.body.should.have.property('email');
      res.body.should.have.property('firstname');
      res.body.should.have.property('lastname');
      res.body.should.have.property('id');
      res.body.username.should.equal('demo');
      res.body.password.should.equal('pass');
      res.body.email.should.equal('demo@email.com');
      res.body.firstname.should.equal('Java');
      res.body.lastname.should.equal('Script');

      // Save the id to associate this User's id to the new Employee
      newEmployee.UserId = res.body.id;
      done();
    });
  });

    // Test retrieving all Employees (should be empty for now)
  it('should list ALL employees on /api/employee GET', function(done) {
  	chai.request(server)
    .get('/api/employee')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });

  // Test creating an Employee, which will be the newEmployee object we defined above
  it('should add a SINGLE employee on /api/employee POST', function(done) {
  	chai.request(server)
    .post('/api/employee')
    .send(newEmployee)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('email');
      res.body.should.have.property('firstname');
      res.body.should.have.property('lastname');
      res.body.should.have.property('goals');
      res.body.should.have.property('id');
      res.body.email.should.equal('employee@mail.com');
      res.body.firstname.should.equal('New');
      res.body.lastname.should.equal('Guy');
      res.body.goals.should.equal('Git gud');

      // Save the id for later so that we only work with one newEmployee
      newEmployee.id = res.body.id;
      done();
    });
  });

  // Test retrieving a single Employee, which will be the newEmployee object we defined above
  it('should list a SINGLE employee on /api/employee/:id GET', function(done) {
  	chai.request(server)
        .get('/api/employee/' + newEmployee.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
	      res.body.should.have.property('goals');
	      res.body.should.have.property('email');
	      res.body.should.have.property('firstname');
	      res.body.should.have.property('lastname');
	      res.body.should.have.property('id');
	      res.body.id.should.equal(newEmployee.id);
	      res.body.goals.should.equal('Git gud');
	      res.body.email.should.equal('employee@mail.com');
	      res.body.firstname.should.equal('New');
	      res.body.lastname.should.equal('Guy');
          done();
        });
  });

  // Test updating a single Employee, which will be the newEmployee object we defined above
  it('should update a SINGLE employee on /api/employee/:id PUT', function(done) {
  	chai.request(server)
        .post('/api/employee/' + newEmployee.id)
        .send({
        	'firstname': 'Super',
        	'lastname': 'Man'
    	})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          chai.request(server)
          	.get('/api/employee/' + newEmployee.id)
          	.end(function(err, res) {
			      res.body.should.have.property('goals');
			      res.body.should.have.property('email');
			      res.body.should.have.property('firstname');
			      res.body.should.have.property('lastname');
			      res.body.should.have.property('id');
			      res.body.id.should.equal(newEmployee.id);
			      res.body.goals.should.equal('Git gud');
			      res.body.email.should.equal('employee@mail.com');
			      res.body.firstname.should.equal('Super');
			      res.body.lastname.should.equal('Man');
         		  done();
          	});
      });
  });

  // Test deleting a single Employee, which will be the newEmployee object we defined above
  it('should delete a SINGLE employee on /api/employee/:id DELETE', function(done) {
  	chai.request(server)
  		.delete('/api/employee/' + newEmployee.id)
  		.end(function(err, res) {
  			res.should.have.status(200);
          	res.should.be.json;
          	res.body.should.equal(1);
          	chai.request(server)
          		.get('/api/employee/' + newEmployee.id)
          		.end(function(error, response) {
          			 should.not.exist(response.body);
          			done();
          		});
  		});
  });
}); // End Employee Test Cases

