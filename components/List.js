import React from 'react'
import { Tag, Spacer, Card, Text, Button } from '@zeit-ui/react'

export const types = {
  'custo justo': 'warning',
  'stand virtual': 'success',
  'olx': 'warning',
  'autosapo': 'secondary',
}

const List = ({ data = [], info = null, type = 'stand virtual', title="", description = null }) => {
  return (
    <div className="wrapper">
      <div className="top">
        <Tag invert type={types[type]}><h3>{title}</h3></Tag>
        {description && (
          <p>
            {description}
            {info && info.link && <a href={info.link} rel="noreferrer noopener" target="_blank"> ver todos</a>}
          </p>
        )}
      </div>
      <Spacer y={1} />
        <div className="list">
          {data.map(car => {
            return (
              <Card shadow className="card">
                  <div className="car">
                    <div className="car__top">
                      <h4>{car.title}</h4>
                    </div>
                    <div className="car__bottom">
                      <img src={car.img} />
                      <Spacer y={1} />
                      <Text h3>{car.price}€</Text>
                      <Spacer y={1} />
                      <a href={car.link} rel="noreferrer noopener" target="_blank">
                        <Button auto style={{width: '100%'}}>Ver</Button>
                      </a>
                    </div>
                  </div>
              </Card>
            )
          })}
      </div>
      <style jsx>{`
        .wrapper {
          margin: 1rem 0;
        }
        h3 {
          text-align: center;
          text-transform: capitalize;
        }
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
        }
        .list {
            display: grid;
            grid-column-gap: 24px;
            grid-row-gap: 24px;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            margin-bottom: 10rem;
          }
          @media only screen and (max-width: 1200px)  {
            .list {
              grid-column-gap: 8px;
              grid-row-gap: 8px;
              grid-template-columns: 1fr 1fr 1fr;
            }
          }
          @media only screen and (max-width: 900px)  {
            .list {
              grid-column-gap: 8px;
              grid-row-gap: 8px;
              grid-template-columns: 1fr 1fr;
            }
          }
          .car {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          }
          .car__top {
            margin-bottom: 1rem;
          }
          .car img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
          }
          .card {
            padding: 10px;
          }
      `}</style>
    </div>
  )
}

export default List