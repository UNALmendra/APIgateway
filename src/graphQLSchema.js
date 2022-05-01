import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	signMutations,
	signQueries,
	signTypeDef
} from './unpdf/sign/typeDefs';

import {
	imgMutations,
	imgQueries,
	imgTypeDef
} from './unpdf/images/typeDefs';

import {
	logQueries,
	logTypeDef
} from './unpdf/logs/typeDefs';

import signResolvers from './unpdf/sign/resolvers';

import imgResolvers from './unpdf/images/resolvers'

import logResolvers from './unpdf/logs/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		logTypeDef,
		signTypeDef,
		imgTypeDef
		
	],
	[
		logQueries,
		signQueries,
		imgQueries
	],
	[
		signMutations,
		imgMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		logResolvers,
		signResolvers,
		imgResolvers,
	)
});
