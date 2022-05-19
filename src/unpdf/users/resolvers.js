import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allUsers: (_,) =>
			generalRequest(`${URL}/all`, 'GET')
	},
	Mutation: {
		postLogin: (_, { email ,password }) => 
			generalRequest(`${URL}/login?email=${email}&password=${password}`, 'POST',)
			,
	}
};

export default resolvers;
