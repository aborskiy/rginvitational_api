const { body } = require('express-validator/check');

exports.validate = (method) => {
    console.log(`participants.validator validate method`);
    switch (method) {
        case 'create': {
            return [
                body('name.first', 'first name does not exist').exists(),
                body('name.last', 'last name does not exist').exists(),
                body('team', 'team does not exist').exists()
            ];
        }
    }
};
