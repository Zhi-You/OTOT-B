// Import contact model
Contact = require("./contactModel");
const Redis = require("redis");

const DEFAULT_EXPIRATION = 3600; // Redis cache items will last for 1 hr

// Initialise Redis one time to be used throughout the app
let redisClient;

(async () => {
  redisClient = Redis.createClient({ legacyMode: true });

  redisClient.on("connect", () => {
    console.log("Connected to Redis Client successfully!");
  });

  redisClient.on("ready", () => {
    console.log("Redis Client is ready to be used!");
  });

  redisClient.on("error", (error) =>
    console.error("Error in starting Redis Client:", err)
  );

  await redisClient.connect();
})();

// List all contacts
exports.viewAll = async function (req, res) {
  //   await redisClient.connect();

  redisClient.GET("contacts", async (error, contacts) => {
    if (error) console.error(error);

    // If data is already cached, just retrieve the data from cache,
    // otherwise fetch the data from DB and store it in the cache
    if (contacts != null) {
      console.log("Cache Hit");
      return res.json({
        status: "success",
        message: "All contacts retrieved successfully",
        data: JSON.parse(contacts),
      });
    } else {
      console.log("Cache Miss");
      Contact.get(async function (err, contacts) {
        if (err) {
          res.json({
            status: "error",
            message: err,
          });
        }

        await redisClient.setEx(
          "contacts",
          DEFAULT_EXPIRATION,
          JSON.stringify(contacts)
        );
        console.log("cached contacts for 1hr!");

        res.json({
          status: "success",
          message: "All contacts retrieved successfully",
          data: contacts,
        });
      });
    }
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
    if (err) res.status(400).json(err); // handles a bad request
    else
      res.json({
        message: "New contact created!",
        data: contact,
      });
  });
};

// Handle view contact info for a single contact
exports.view = function (req, res) {
  //console.log(req.params.contact_name);

  Contact.findOne({ name: req.params.contact_name }, function (err, contact) {
    if (err) res.send(err);
    else if (contact === null)
      // when user is not found
      res.status(404).json({
        message: "Contact doesnt exist..",
      });
    else
      res.json({
        message: "Contact details loading..",
        data: contact,
      });
  });
};

// Handle update contact info
exports.update = function (req, res) {
  Contact.findOne({ name: req.params.contact_name }, function (err, contact) {
    if (err) res.send(err);
    else if (contact === null)
      // when user is not found
      res.status(404).json({
        message: "Contact doesnt exist..",
      });
    else {
      contact.name = req.body.name ? req.body.name : contact.name;
      contact.gender = req.body.gender;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      // save the contact and check for errors
      contact.save(function (err) {
        if (err)
          // handles when bad request like if email is not specified
          res.status(400).json(err);
        else
          res.json({
            message: "Contact Info updated",
            data: contact,
          });
      });
    }
  });
};

// Handle delete contact
exports.delete = function (req, res) {
  Contact.deleteOne(
    {
      name: req.params.contact_name,
    },
    function (err, contact) {
      //console.log(contact)
      if (err) res.send(err);
      else if (contact.deletedCount === 0)
        res.status(404).json({
          message: "Contact doesnt exist..",
        });
      else
        res.json({
          status: "success",
          message: contact,
        });
    }
  );
};
