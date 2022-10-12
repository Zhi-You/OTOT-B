// Import contact model
Contact = require('./contactModel');


// List all contacts
exports.viewAll = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "All contacts retrieved successfully",
            data: contacts
        });
    });
};


// Handle create contact actions
exports.new = function (req, res) {
    //console.log(req.body);
    var contact = new Contact();
    contact.name = req.body.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    
    // save the contact and check for errors
    contact.save(function (err) {
        if (err)
             res.status(400).json(err);         // handles a bad request
        else
            res.json({
                message: 'New contact created!',
                data: contact
            });
    });
};


// Handle view contact info for a single contact
exports.view = function (req, res) {
    //console.log(req.params.contact_name);

    Contact.findOne({ name: req.params.contact_name
    }, function (err, contact) {
        if (err)
            res.send(err);          
        else if (contact === null)                   // when user is not found
            res.status(404).json({
                message: 'Contact doesnt exist..'
            });          
        else
            res.json({
                message: 'Contact details loading..',
                data: contact
        });
    });
};


// Handle update contact info
exports.update = function (req, res) {
    Contact.findOne({ name: req.params.contact_name
    }, function (err, contact) {
        if (err)                                     
            res.send(err);          
        else if (contact === null)                   // when user is not found
            res.status(404).json({
                message: 'Contact doesnt exist..'
            });
        else  
        {
            contact.name = req.body.name ? req.body.name : contact.name;
            contact.gender = req.body.gender;
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            // save the contact and check for errors
            contact.save(function (err) {
                if (err)                            // handles when bad request like if email is not specified
                    res.status(400).json(err);
                else 
                    res.json({
                        message: 'Contact Info updated',
                        data: contact
                    });
            });
        }
    });
};


// Handle delete contact
exports.delete = function (req, res) {
    Contact.deleteOne({
        name: req.params.contact_name
    }, function (err, contact) {
        //console.log(contact)
        if (err)
            res.send(err);
        else if (contact.deletedCount === 0)
            res.status(404).json({
                message: 'Contact doesnt exist..'
            });
        else 
            res.json({
                status: "success",
                message: contact
            });
    });
};