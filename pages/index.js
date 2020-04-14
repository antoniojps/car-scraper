import { withApollo } from '../graphql/client';
import { useQuery } from '@apollo/react-hooks';
import { Spacer, Spinner } from '@zeit-ui/react'
import { STANDVIRTUAL_QUERY, AUTOSAPO_QUERY, CUSTOJUSTO_QUERY, OLX_QUERY } from '../graphql/gql'
import List from '../components/List'

const Index = () => {
  const { data: standVirtualData, loading: standVirtualLoading, error: standVirtualError } = useQuery(
    STANDVIRTUAL_QUERY, {
    variables: {
      page: 1,
    },
    fetchPolicy: 'cache-and-network',
  });
  const { data: autoSapoData, loading: autoSapoLoading, error: autoSapoError } = useQuery(
    AUTOSAPO_QUERY, {
    variables: {
      page: 1,
    },
    fetchPolicy: 'cache-and-network',
  });
  const { data: custoJustoBmwData, loading: custoJustoBmwLoading, error: custoJustoBmwError } = useQuery(
    CUSTOJUSTO_QUERY, {
    variables: {
      page: 1,
      model: 'bmw',
    },
    fetchPolicy: 'cache-and-network',
  });
  const { data: custoJustoAudiData, loading: custoJustoAudiLoading, error: custoJustoAudiError } = useQuery(
    CUSTOJUSTO_QUERY, {
    variables: {
      page: 1,
      model: 'audi',
    },
    fetchPolicy: 'cache-and-network',
  });
  const { data: olxBmwData, loading: olxBmwLoading, error: olxBmwError } = useQuery(
    OLX_QUERY, {
    variables: {
      page: 1,
      model: 'bmw',
    },
    fetchPolicy: 'cache-and-network',
  });
  const { data: olxAudiData, loading: olxAudiLoading, error: olxAudiError } = useQuery(
    OLX_QUERY, {
    variables: {
      page: 1,
      model: 'audi',
    },
    fetchPolicy: 'cache-and-network',
  });

  const isLoading = standVirtualLoading || autoSapoLoading || custoJustoBmwLoading || custoJustoAudiLoading || olxBmwLoading || olxAudiLoading

  return (
    <div className="container">
        <header>
          <h1>
          Carrinhos
            {isLoading && (
              <>
                <Spacer x={1} />
                <Spinner size="large" />
              </>
            )}
          </h1>
        </header>
        <Spacer y={2} />
        {
          standVirtualData && standVirtualData.standVirtual
          && <List data={standVirtualData.standVirtual.list} info={standVirtualData.standVirtual.info} type="stand virtual" title="Stand Virtual" description="bmw e audi entre €1000 e €8000" />
        }
        {
          autoSapoData && autoSapoData.autoSapo
          && <List data={autoSapoData.autoSapo.list} info={autoSapoData.autoSapo.info} type="autosapo" title="Auto sapo" description="bmw e audi entre €1000 e €8000" />
        }
        {
          custoJustoBmwData && custoJustoBmwData.custoJusto
          && <List data={custoJustoBmwData.custoJusto.list} info={custoJustoBmwData.custoJusto.info} type="custo justo" title="Custo Justo" description="bmw entre €1000 e €8000" />
        }
        {
          custoJustoAudiData && custoJustoAudiData.custoJusto
          && <List data={custoJustoAudiData.custoJusto.list} info={custoJustoAudiData.custoJusto.info} type="custo justo" title="Custo Justo" description="audi entre €1000 e €8000" />
        }
        {
          olxAudiData && olxAudiData.olx
          && <List data={olxAudiData.olx.list} info={olxAudiData.olx.info} link={olxAudiData.olx.link} type="olx" title="Olx"  description="audi entre €1000 e €8000"/>
        }
        {
          olxBmwData && olxBmwData.olx
          && <List data={olxBmwData.olx.list} info={olxBmwData.olx.info} type="olx" title="Olx" description="bmw entre €1000 e €8000" />
        }
      )}

      <style jsx>{`
        .tags {
          display: flex;
          align-items: center;
        }

        header {
          margin-top: 2rem;
          text-align: center;
        }
        header h1 {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default withApollo({ ssr: false })(Index);
