import { generalRequest , authRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;
const rabbitmqURL = `http://localhost:15672/api/exchanges/%2f/amq.default/publish`;

const resolvers = {
	Query: {
		logsById: (_, { Doc }) =>
			generalRequest(`${URL}/(id)?id=${Doc}`, 'GET'),
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

export default resolvers;
