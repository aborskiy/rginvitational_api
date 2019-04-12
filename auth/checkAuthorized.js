const validate = (err, req, res, next) => {
    //console.log(`validateCheckJwtResponse starts! err: ${err} req: ${req} res: ${res} next: ${next}`);
    if (err.name === 'UnauthorizedError') {
        res.status(401).json(err.name);
        next(err);
    }
    next();
};

export default validate;