// Import the dependencies for testing
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe ('Contact app API Tests', () => {

    describe("Test GET API call on route /api/contacts to list all contacts", () => {
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
    })

    describe("Test POST API call on route /api/contacts to add a new contact", () => {
        it("It should result in the addition of a new contact - Tester123", (done) => {
            chai.request(app)
                .post("/api/contacts")
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
    })


    describe("Test GET API call on route /api/contacts/:contact_name to return one contact", () => {
        it("It should get Tester123's contact which we have just added", (done) => {
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
    })

    // describe("Test GET API call on route /api/contacts/:contact_name that should fail", () => {
    //     it("It should not get a contact that doesn't exist", (done) => {
    //         const contact_name = "doesnotexist"
    //         chai.request(app)
    //             .get("/api/contacts/" + contact_name)
    //             .end((err, res) => {
    //                 res.should.have.status(404);
    //             done();
    //         })
    //     })
    // })

    describe("Test PATCH API call on route /api/contacts/:contact_name to update a contact", () => {
        it("It should result in the update of Tester123's contact", (done) => {
            const name = 'Tester123'
            chai.request(app)
                .put("/api/contacts/" + name)
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

    describe("Test DELETE API call on route /api/contacts/:name to delete a contact", () => {
        it("It should result in the deletion of our test contact", (done) => {
            const name = 'Updated123'
            chai.request(app)
                .delete("/api/contacts/" + name)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.equal("success");
                    res.body.message.should.equal("Contact deleted");
                done();
            })
        })
    })
})


