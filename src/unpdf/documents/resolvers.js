import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}`;

const resolvers = {
	Query: {
		documents_user: (_, {user}) =>
			generalRequest(`${URL}/documents_user/${user}`, 'GET')
	},
	Mutation: {
		postNewDocument: (_, { document }) =>
			generalRequest(`${URL}/documents`, 'POST', document),
	}
};

export default resolvers;
