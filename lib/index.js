'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');
var axios = _interopDefault(require('axios'));
var response = _interopDefault(require('koa/lib/response'));

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
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

async function authRequest(url, method, body, fullResponse) {

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
	}).then( function(response$$1){
		console.log(response$$1);
		return response$$1;
	}).catch( function ( error ) {
		console.log(error);
		return error;
	});

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
function addParams(url, parameters) {
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
function getRequest(url, path, parameters) {
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
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const signTypeDef = `
  type Sign {
      id: Int
      title: String
      body: String
  }
  input SignInput {
      title: String!
      body: String!
  }`;

  
const signQueries = `
      allSign: [Sign]
      signById(id: Int): Sign
  `;


const signMutations = `
    postSign(sign: SignInput): Sign
`;

const documentTypeDef = `
  type Document {
    _id: String
    name: String
    type: String
    user: String!
    storage: String!
    updated_at: String
    created_at: String
  }

  input NewDocument {
      name: String!
      type: String!
      user: String!
      file: String!
  }`;

  
const documentQueries = `
      documents_user(user: String): [Document]
  `;


const documentMutations = `
    postNewDocument(document: NewDocument): Document
`;

const imgTypeDef = `
  type Image {
      file: String
  }`;

  
const imgQueries = `
  `;


const imgMutations = `
    postImg(surl: String!): Image,
    postPdf(surl: String!): Image,
    postPdfRange(surl: String!): Image,
`;

const pdfTypeDef = `
  type PDF {
      message: String
  }`;

  
const pdfQueries = `
  `;


const pdfMutations = `
    mergePdf: PDF,
    splitPdf: PDF
`;

const logTypeDef = `
  type Log {
      Doc: String
      Description: String
      User: String
      Date: String
  }
  input LogInput{
    doc: String!
    user: String!
    description: String!
  }`;

const logQueries = `
      logsById(Doc: String): [Log]
  `;

const logMutations = `
      postLog(log: LogInput): Log 
`;

const usersTypeDef = `
  type User {
    id: Int
    name: String
    email: String
    password: String
  }
  
  input RegisterInput {
    name: String
    email: String
    password: String
  }
  `;

  
const usersQueries = `
    allUsers(in: String): [User]
  `;


const usersMutations = `
    postLogin(email: String, password: String): String
`;

const url = 'localhost';
const port = '1234';
const entryPoint = 'postSign';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allSign: (_) =>
			getRequest(URL, ''),
		signById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		postSign: (_, { sign }) =>
			generalRequest(`${URL}`, 'POST', sign),
	}
};

const url$1 = 'localhost';
const port$1 = '3000';
//export const entryPoint = 'postSign'

const URL$1 = `http://${url$1}:${port$1}/`;

const resolvers$1 = {
	Query: {
	},
	Mutation: {
		postImg: (_, { surl }) =>
			generalRequest(`${URL$1}/img2pdf`, 'POST', JSON.parse(`{\r\n    \"url\": \"${surl}\"\r\n}  `)),
		postPdf: (_, { surl }) => 
			generalRequest(`${URL$1}/pdf2img`, 'POST', JSON.parse(`{\r\n    \"url\": \"${surl}\"\r\n}  `)),
		postPdfRange: (_, { firstPage, lastPage, surl }) =>
			generalRequest(`${URL$1}/pdf2img/${firstPage}-${lastPage}`, 'POST', JSON.parse(`{\r\n    \"url\": \"${surl}\"\r\n}  `)),
	}
};

const url$2 = 'localhost';
const port$2 = '9155';
const entryPoint$1 = 'api/Logs';

const URL$2 = `http://${url$2}:${port$2}/${entryPoint$1}`;
const rabbitmqURL = `http://localhost:15672/api/exchanges/%2f/amq.default/publish`;

const resolvers$2 = {
	Query: {
		logsById: (_, { Doc }) =>
			generalRequest(`${URL$2}/(id)?id=${Doc}`, 'GET'),
	},
	Mutation: {
		postLog: (_, { log }) =>
			authRequest(`${rabbitmqURL}`, 'POST', {
														"properties": {},
														"routing_key": "logsq",
														"payload": JSON.stringify(log),
														"payload_encoding": "string"
													}),
	}
};

const url$3 = 'localhost';
const port$3 = '8081';
//export const entryPoint = 'postSign'

const URL$3 = `http://${url$3}:${port$3}/`;

const resolvers$3 = {
	Query: {
	},
	Mutation: {
		splitPdf: (_, { split }) =>
			generalRequest(`${URL$3}split_pdf`, 'GET', split),
		mergePdf: (_, { merge: merge$$1 }) =>
			generalRequest(`${URL$3}merge_pdf`, 'GET', merge$$1)
	}
};

const url$4 = '172.18.0.3';
const port$4 = '3000';

const URL$4 = `http://${url$4}:${port$4}`;

const resolvers$4 = {
	Query: {
		documents_user: (_, {user}) =>
			generalRequest(`${URL$4}/documents_user/${user}`, 'GET')
	},
	Mutation: {
		postNewDocument: (_, { document }) =>
			generalRequest(`${URL$4}/documents`, 'POST', document),
	}
};

const url$5 = 'localhost';
const port$5 = '6868';
const entryPoint$3 = 'users';

const URL$5 = `http://${url$5}:${port$5}/${entryPoint$3}`;

const resolvers$5 = {
	Query: {
		allUsers: (_,) =>
			generalRequest(`${URL$5}/all`, 'GET')
	},
	Mutation: {
		postLogin: (_, { email ,password }) => 
			generalRequest(`${URL$5}/login?email=${email}&password=${password}`, 'POST',)
			,
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		logTypeDef,
		signTypeDef,
		imgTypeDef,
		pdfTypeDef,
		documentTypeDef,
		usersTypeDef
	],
	[
		logQueries,
		signQueries,
		imgQueries,
		pdfQueries,
		documentQueries,
		usersQueries
	],
	[
		signMutations,
		imgMutations,
		logMutations,
		pdfMutations,
		documentMutations,
		usersMutations
	],
	
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers$2,
		resolvers,
		resolvers$1,
		resolvers$3,
		resolvers$4,
		resolvers$5
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
