import merge from 'lodash.merge';
import { resolvers as UserResolvers } from './schemas/user';
import { resolvers as CarResolvers } from './schemas/cars';

import {
  DateTimeResolver,
  PositiveIntResolver,
  EmailAddressResolver,
  URLResolver,
} from 'graphql-scalars';
import jsonScalar from 'graphql-type-json';

const setupResolvers = {
  // scalars
  DateTime: DateTimeResolver,
  PositiveInt: PositiveIntResolver,
  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
  JSON: jsonScalar,

  Query: {},

  Mutation: {},
};

const resolvers = merge(setupResolvers, UserResolvers, CarResolvers);

export default resolvers;
