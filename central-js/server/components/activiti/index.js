var options;
var request = require('request');
var _ = require('lodash');

module.exports.getConfigOptions = function () {

	if (options)
		return options;

	var config = require('../../config/environment');
	var activiti = config.activiti;

	options = {
		protocol: activiti.protocol,
		hostname: activiti.hostname,
		port: activiti.port,
		path: activiti.path,
		username: activiti.username,
		password: activiti.password
	};

	return options;
};

module.exports.getRequestUrl = function (apiURL, sHost) {
	var options = this.getConfigOptions();
	return (sHost!==null && sHost !== undefined ? sHost : options.protocol + '://' + options.hostname + options.path) + apiURL;
};

module.exports.buildRequest = function (req, apiURL, params, sHost) {
  var sURL = this.getRequestUrl(apiURL, sHost);
	return {
		'url': sURL,
		'auth': this.getAuth(),
		'qs': _.extend(params, {nID_Subject: req.session.subject ? req.session.subject.nID : null})
	};
};

module.exports.getAuth = function () {
	var options = this.getConfigOptions();
	return {
		'username': options.username,
		'password': options.password
	};
};

module.exports.sendGetRequest = function (req, res, apiURL, params, callback, sHost) {
	var _callback = callback ? callback : function (error, response, body) {
    res.statusCode = response.statusCode;
		res.send(body);
		res.end();
	};
	var url = this.buildRequest(req, apiURL, params, sHost);
	return request(url, _callback);
};

module.exports.sendPostRequest = function (req, res, apiURL, params, callback, sHost) {
	var _callback = callback ? callback : function (error, response, body) {
    res.statusCode = response.statusCode;
		res.send(body);
		res.end();
	};
	var url = this.buildRequest(req, apiURL, params, sHost);
	return request.post(url, _callback);
};

module.exports.sendDeleteRequest = function (req, res, apiURL, params, callback, sHost) {
  var _callback = callback ? callback : function (error, response, body) {
    res.statusCode = response.statusCode;
    res.send(body);
    res.end();
  };
  var url = this.buildRequest(req, apiURL, params, sHost);
  return request.del(url, _callback);
};

