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
	documentMutations,
	documentQueries,
	documentTypeDef
} from './unpdf/documents/typeDefs';

import {
	imgMutations,
	imgQueries,
	imgTypeDef
} from './unpdf/images/typeDefs';

import {
	pdfMutations,
	pdfQueries,
	pdfTypeDef
} from './unpdf/pdf/typeDefs';

import {
	logMutations,
	logQueries,
	logTypeDef
} from './unpdf/logs/typeDefs';

import signResolvers from './unpdf/sign/resolvers';

import imgResolvers from './unpdf/images/resolvers'

import logResolvers from './unpdf/logs/resolvers';

import pdfResolvers from './unpdf/pdf/resolvers';

import documentResolvers from './unpdf/documents/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		logTypeDef,
		signTypeDef,
		imgTypeDef,
		pdfTypeDef,
		documentTypeDef
	],
	[
		logQueries,
		signQueries,
		imgQueries,
		pdfQueries,
		documentQueries
	],
	[
		signMutations,
		imgMutations,
		logMutations,
		pdfMutations,
		documentMutations
	],
	
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		logResolvers,
		signResolvers,
		imgResolvers,
		pdfResolvers,
		documentResolvers
	)
});
