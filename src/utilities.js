import request from 'request-promise-native';
import { formatError } from 'graphql';
import axios from 'axios';
import response from 'koa/lib/response';

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
export async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

export async function authRequest(url, method, body, fullResponse) {

	/*
	const parameters = {
		method,
		uri: encodeURI(url),
		auth: {
			'username': 'apig',
			'password': '12345'
		},
		headers: {
			"User-Agent": "Request-Promise"
		},
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	*/

	axios.post(encodeURI(url),body,{
		headers: {
			'Content-Type': 'application/json',
			'Connection': 'keep-alive'
		},
		auth: {
			username: 'admin',
    		password: 'masterkey'
		}
	}).then( function(response){
		console.log(response);
		return response;
	}).catch( function ( error ) {
		console.log(error)
		return error;
	})

	/*
	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
	*/
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
export function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
export function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
export function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

export function formatErr(error) {
	const data = formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}
