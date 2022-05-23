function getParameterFromRequest(req) {
    let params = req.fields;
    if (req.method === 'GET') {
        params = req.query;
    }
    
    return params;
}

module.exports = {
    getParameterFromRequest
}