import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
	},
	Mutation: {
		postLogIn: (_, { username ,password }) => 
			generalRequest(`${URL}/signin`, 'POST',{username,password})
			,
		postSignUp: (_, { username ,password }) => 
			generalRequest(`${URL}/signup`, 'POST',{username,password}),
	}
};

export default resolvers;
