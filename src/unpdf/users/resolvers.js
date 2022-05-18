import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allUsers: (_,) =>
			generalRequest(`${URL}/all`, 'GET')
	},
	Mutation: {
		postLogin: (_, { logininfo }) => 
			generalRequest(`${URL}/login?email=${logininfo.email}&password=${logininfo.password}`, 'POST',)
			,
			//http://localhost:8080/users/login?email=johan@mail.com&password=123456
	}
};

export default resolvers;
