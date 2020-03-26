const jwt = require('jsonwebtoken');

const authWrapper = (...args) => {
    const [context] = args;
    // using context.queryStringParameters.token as a token holder is for the sake of the demo.
    // use cookies or an authorization header if you want to use it in prod
    if(!context.queryStringParameters.token) {
        return unauthResp(...args);
    }
    jwt.verify(context.queryStringParameters.token, 'mySecret', function(err, decoded) {
        if(err) {
            return unauthResp(...args);
        }
        return fn(...args)
    });
};


const unauthResp = (event, context, callback) => {
    callback(null, {
        statusCode: 400,
        body: 'Not authenticated',
    });
};
exports.handler = authWrapper(function (event, context, callback) {
    callback(null, {
        statusCode: 200,
        body: "You can edit our amazing products"
    });
})
