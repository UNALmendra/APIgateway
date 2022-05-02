import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/`;

const resolvers = {
	Query: {
	},
	Mutation: {
		postImg: (_, { img }) =>
			generalRequest(`${URL}/img2pdf`, 'POST', img),
		postPdf: (_, { pdf }) =>
			generalRequest(`${URL}/pdf2img`, 'POST', pdf),
		postPdfRange: (_, { firstPage, lastPage, pdf }) =>
			generalRequest(`${URL}/pdf2img/${firstPage}-${lastPage}`, 'POST', pdf),
	}
};

export default resolvers;
