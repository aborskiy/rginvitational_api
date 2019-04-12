const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');


// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: process.env.EXPRESS_JWT_SECRET_CACHE,
        rateLimit: process.env.EXPRESS_JWT_SECRET_RATELIMIT,
        jwksRequestsPerMinute: process.env.EXPRESS_JWT_SECRET_JWKSREQUESTSPERMINUTE,
        jwksUri: process.env.EXPRESS_JWT_SECRET_JWKSURI
    }),

    // Validate the audience and the issuer.
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    algorithms: [process.env.JWT_ALGORITHM]
});

console.log(`auth.checkJwt:  ${checkJwt}`);
export default checkJwt;