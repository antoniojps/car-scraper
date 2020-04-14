import gql from 'graphql-tag';
import { getStandVirtual, getAutoSapo, getCustoJusto, getOlx } from '../../utils/scrapers'

export const typeDef = gql`
  type Vehicle {
    title: String
    link: URL
    img: URL
    price: Int
    provider: String
  }

  type Info {
    currentPage: Int
    totalPages: Int
    link: URL
    provider: String
  }

  type Vehicles {
    info: Info
    list: [Vehicle]
  }

  extend type Query {
    standVirtual(page: Int!): Vehicles
    autoSapo(page: Int!): Vehicles
    custoJusto(page: Int!, model: String!): Vehicles
    olx(page: Int!, model: String!): Vehicles
  }
`;

export const resolvers = {
  Query: {
    standVirtual: (_parent, args) => getStandVirtual(args),
    autoSapo: (_parent, args) => getAutoSapo(args),
    custoJusto: (_parent, args) => getCustoJusto(args),
    olx: (_parent, args) => getOlx(args),
  },
};
