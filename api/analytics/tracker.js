import asyncHandler from 'express-async-handler';
import ua from 'universal-analytics';

var visitor = ua(process.env.GTAG, { http: true }, { uid: 'rginvitational-api' });



exports.trackRequest = asyncHandler(async (req, res, next) => {
    visitor.pageview(req.originalUrl, req.hostname, req.method, function (err) {
        if (err) {
            console.log(`analytics tracker trackRequest error: ${err}`);
        }
    });

    next();
}
);

export default this;
