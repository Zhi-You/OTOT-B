// Import the dependencies for testing
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe ('Contact app API Tests', () => {

    describe("Test POST API calls", () => {
        it("It should add a new contact - Tester123", (done) => {
            chai.request(app)
                .post("/api/contacts")
                .type("form")
                .send({
                    "name": "Tester123",
                    "email": "tester123@gmail.com",
                    "phone": 987654321,
                    "gender": "Male"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.equal("New contact created!");
                    res.body.data.name.should.equal("Tester123");
                    res.body.data.email.should.equal("tester123@gmail.com");
                    res.body.data.phone.should.equal('987654321');
                    res.body.data.gender.should.equal("Male");
                done();
            })
        })
        
        it("INVALID - It should not add a new contact when specified schema is wrong", (done) => {
            chai.request(app)
                .post("/api/contacts")
                .type("form")
                .send({
                    "name": "Tester123",
                    "phone": 987654321,
                    "gender": "Male"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.name.should.equal("ValidationError");
                done();
            })
        })
    })


    describe("Test GET API calls", () => {
        it("It should get and list all existing contacts", (done) => {
            chai.request(app)
                .get("/api/contacts")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.equal("success");
                    res.body.message.should.equal("All contacts retrieved successfully");
                done();
            })
        })

        it("It should get one contact (Tester123) which we have just added", (done) => {
            const contact_name = "Tester123"
            chai.request(app)
                .get("/api/contacts/" + contact_name)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.equal("Contact details loading..");
                    res.body.data.name.should.equal("Tester123");
                done();
            })
        })

        it("INVALID - It should not get a contact that doesn't exist", (done) => {
            const contact_name = "doesnotexist"
            chai.request(app)
                .get("/api/contacts/" + contact_name)
                .end((err, res) => {
                    res.should.have.status(404);
                done();
            })
        })
    })



    describe("Test PATCH API calls", () => {
        it("INVALID - It should not update a contact that doesnt exist", (done) => {
            const name = 'doesnotexist'
            chai.request(app)
                .put("/api/contacts/" + name)
                .send(
                    {
                        "name": "Updated123",
                        "email": "updated123@gmail.com"
                    }
                )
                .end((err, res) => {
                    res.should.have.status(404);
                done();
            })
        })

        it("INVALID - It should not update Tester123's contact since email is not specified", (done) => {
            const name = 'Tester123'
            chai.request(app)
                .put("/api/contacts/" + name)
                .send(
                    {
                        "name": "Updated123"
                    }
                )
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.name.should.equal("ValidationError");
                done();
            })
        })

        it("It should update Tester123's contact", (done) => {
            const name = 'Tester123'
            chai.request(app)
                .put("/api/contacts/" + name)
                .type("form")
                .send(
                    {
                        "name": "Updated123",
                        "email": "updated123@gmail.com"
                    }
                )
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.equal("Contact Info updated");
                    res.body.data.name.should.equal("Updated123");
                    res.body.data.email.should.equal("updated123@gmail.com");
                done();
            })
        })
    })



    describe("Test DELETE API calls", () => {
        it("It should result in the deletion of our test contact", (done) => {
            const name = 'Updated123'
            chai.request(app)
                .delete("/api/contacts/" + name)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.equal("success");
                done();
            })
        })

        it("INVALID - It should not delete a contact that doesn't exist", (done) => {
            const name = "doesnotexist"
            chai.request(app)
                .delete("/api/contacts/" + name)
                .end((err, res) => {
                    res.should.have.status(404);
                done();
            })
        })
    })
})


