import gql from 'graphql-tag';

export const OLX_QUERY = gql`
  query olx($page: Int!, $model: String!) {
    olx(page: $page, model: $model) {
      info {
        currentPage
        totalPages
        link
        provider
      }
      list {
        title
        link
        img
        price
        provider
      }
    }
  }
`

export const CUSTOJUSTO_QUERY = gql`
  query custoJusto($page: Int!, $model: String!) {
    custoJusto(page: $page, model: $model) {
      info {
        currentPage
        totalPages
        link
        provider
      }
      list {
        title
        link
        img
        price
        provider
      }
    }
  }
`

export const STANDVIRTUAL_QUERY = gql`
  query standVirtual($page: Int!) {
    standVirtual(page: $page) {
      info {
        currentPage
        totalPages
        link
        provider
      }
      list {
        title
        link
        img
        price
        provider
      }
    }
  }
`

export const AUTOSAPO_QUERY = gql`
  query autoSapo($page: Int!) {
    autoSapo(page: $page) {
      info {
        currentPage
        totalPages
        link
        provider
      }
      list {
        title
        link
        img
        price
        provider
      }
    }
  }
`