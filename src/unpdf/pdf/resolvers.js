import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/`;

const resolvers = {
	Query: {
	},
	Mutation: {
		splitPdf: (_, { split }) =>
			generalRequest(`${URL}/split_pdf`, 'GET', split),
		mergePdf: (_, { merge }) =>
			generalRequest(`${URL}/merge_pdf`, 'GET', merge)
	}
};

export default resolvers;
