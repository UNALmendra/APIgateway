import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

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

export default resolvers;
