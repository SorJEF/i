var request = require('request');
var account = require('../bankid/account.controller');
var _ = require('lodash');
var FormData = require('form-data');

module.exports.shareDocument = function(req, res) {
    var params = {
        'nID_Document': req.query.nID_Document,
        'sFIO': req.query.sFIO,
        'sTarget': req.query.sTarget,
        'sTelephone': req.query.sTelephone,
        'nMS': req.query.nMS,
        'sMail': req.query.sMail
    };
    return buildGetRequest(req, res, '/setDocumentLink', params);
};

module.exports.getDocumentFile = function(req, res) {
    var r = request({
        'url': getUrl('/services/getDocumentFile'),
        'auth': getAuth(),
        'qs': {
            'nID': req.params.nID
        }
    });
    req.pipe(r).on('response', function(response) {
        response.headers['content-type'] = 'application/octet-stream';
    }).pipe(res);
};

module.exports.getDocument = function(req, res) {
    var params = {
        'nID': req.params.nID
    };
    return buildGetRequest(req, res, '/services/getDocument', params);
};

module.exports.index = function(req, res) {
    var params = {
        'nID_Subject': req.query.nID_Subject
    };
    return buildGetRequest(req, res, '/services/getDocuments', params);
};

module.exports.initialUpload = function(req, res) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    var accessToken = req.query.access_token;
    var nID_Subject = req.query.nID_Subject;
    var sID_Subject = req.query.sID_Subject;

    if (!accessToken || !sID_Subject) {
        res.status(400);
        res.send('both accessToken and sID_Subject are needed');
        res.end();
        return;
    }

    var config = require('../../config');
    var bankid = config.bankid;
    var activiti = config.activiti;

    var options = {
        protocol: bankid.protocol,
        hostname: bankid.hostname,
        params: {
            client_id: bankid.client_id,
            client_secret: bankid.client_secret,
            access_token: req.query.access_token
        }
    };

    var optionsForScans = _.merge(options, {
        path: '/ResourceService'
    });

    var url = activiti.protocol + '://' + activiti.hostname + activiti.path + '/services/setDocumentFile';
    var optionsForUploadContent = {
        'url': url,
        'auth': {
            'username': activiti.username,
            'password': activiti.password
        },
        'qs': {
            'nID_Subject': nID_Subject,
            'sID_Subject_Upload': sID_Subject,
            'sSubjectName_Upload': 'Приватбанк',
            'sName': 'Паспорт',
            'nID_DocumentType': 1
        }
    };

    var scansRequest = account.prepareScansRequest(optionsForScans);

    request
        .post(scansRequest, function(error, response, body) {
            if (!error && body) {
                var result = body;
                if (!result.error) {
                    var customer = result.customer;
                    if(customer.scans && customer.scans.length > 0){
                        var documentScan = customer.scans[0];

                    var scanContentRequest = account.prepareScanContentRequest(
                        _.merge(options, {
                            url: documentScan.link
                        })
                    );
                    scanContentRequest.on('response', function(response){
                        if(response){
                            
                        }
                    });

                    var form = new FormData();
                    form.append('oFile', scanContentRequest, {
                        filename: documentScan.type
                    });
                    form.pipe(request.post(
                        _.merge(optionsForUploadContent, {
                            headers: form.getHeaders()
                        }))).pipe(res);
                    }                    
                }
            } else {
                res.status(response.statusCode);
                res.end();
            }
        });
};

function buildGetRequest(req, res, apiURL, params) {
    var callback = function(error, response, body) {
        res.send(body);
        res.end();
    };

    return request({
        'url': getUrl(apiURL),
        'auth': getAuth(),
        'qs': params
    }, callback);
}

function getOptions(req) {
    var config = require('../../config');
    var activiti = config.activiti;

    return {
        protocol: activiti.protocol,
        hostname: activiti.hostname,
        port: activiti.port,
        path: activiti.path,
        username: activiti.username,
        password: activiti.password
    };
}

function getOptions() {
    var config = require('../../config');
    var activiti = config.activiti;

    return {
        protocol: activiti.protocol,
        hostname: activiti.hostname,
        port: activiti.port,
        path: activiti.path,
        username: activiti.username,
        password: activiti.password
    };
}

function getUrl(apiURL) {
    var options = getOptions();
    return options.protocol + '://' + options.hostname + options.path + apiURL;
}

function getAuth() {
    var options = getOptions();
    return {
        'username': options.username,
        'password': options.password
    };
}