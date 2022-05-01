import { generalRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		logsById: (_, { Doc }) =>
			generalRequest(`${URL}/(id)?id=${Doc}`, 'GET'),
	}
};

export default resolvers;
