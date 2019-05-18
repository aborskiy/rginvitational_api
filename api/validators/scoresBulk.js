const { check, body, header, param } = require('express-validator/check');

exports.validate = (method) => {
    
    //console.log(`scoresbulk.validator validate method`);
    switch (method) {
        case 'create': {
            console.log(`scoresBulk validator header: ${header('X-Action')} body: ${body()}`);
            return [
                header('X-Action').isIn(['bulk']).withMessage('invalid value in X-Action header'),
            ];
        }
        case 'delete': {
            return [
                header('X-Action').isIn(['bulk']).withMessage('invalid value in X-Action header')
            ];
        }
    }
};