import { generalRequest, getRequest } from '../../utilities';
import { url, port } from './server';

const URL = `http://${url}:${port}/`;

const resolvers = {
	Query: {
	},
	Mutation: {
		postImg: (_, { surl }) =>
			generalRequest(`${URL}/img2pdf`, 'POST', JSON.parse(`{\r\n    \"url\": \"${surl}\"\r\n}  `)),
		postPdf: (_, { surl }) => 
			generalRequest(`${URL}/pdf2img`, 'POST', JSON.parse(`{\r\n    \"url\": \"${surl}\"\r\n}  `)),
		postPdfRange: (_, { firstPage, lastPage, surl }) =>
			generalRequest(`${URL}/pdf2img/${firstPage}-${lastPage}`, 'POST', JSON.parse(`{\r\n    \"url\": \"${surl}\"\r\n}  `)),
	}
};

export default resolvers;
