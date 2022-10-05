import { useRouter } from "next/router"
import { gql, useQuery } from '@apollo/client';
import { useState, useContext } from 'react'
import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col
} from "reactstrap";

function Dishes({ restId }) {
  const [restaurantID, setRestaurantID] = useState()
  const { addItem } = useContext(AppContext)



  const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

  const router = useRouter();

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: restId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>SELECT RESTAURANT FOR DISHES</p>;
  if (!data) return <p>Not found</p>;

  let restaurant = data.restaurant;

  console.log(`Restaurant Data: ${JSON.stringify(data.restaurant)}`)
  console.log(`restaurant ID from DISHES: ${restId}`);



  if (restId != '') {

    return (
      <>

        {restaurant.dishes.map((res) => (

          <Col xs="6" sm="4" key={res.id}>

            <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
              <CardImg
                top={true}
                style={{ height: 200 }}
                src={`http://localhost:1337${res.image.url}`}
              />
              <CardBody>
                <CardTitle>{res.name}</CardTitle>
                <CardText>{res.description}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button color="info"
                  outline
                  onClick={() => addItem(res)}
                >
                  + Add To Cart
                </Button>

              </div>
            </Card>
          </Col>
        ))}
      </>
    )
  }
  else {
    return <h3 className="dish">SELECT RESTAURANT FOR DISHES</h3>
  }
}
export default Dishes