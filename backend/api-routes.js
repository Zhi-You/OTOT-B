// Initialize express router
let router = require('express').Router();
// Import contact controller
var contactController = require('./contactController');

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to my CS3219 Task B REST API'
    });
});


// Contact routes
router.route('/contacts')
    .get(contactController.viewAll)
    .post(contactController.new);

router.route('/contacts/:contact_name')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

// Export API routes
module.exports = router;