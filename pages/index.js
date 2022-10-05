import React, { useState } from "react";
import Cart from "../components/cart"
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import RestaurantList from '../components/restaurantList';
import Dishes from '../components/dishes';
import { InputGroup, InputGroupAddon, Input, Row, Col } from "reactstrap";


function Home() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
    //const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.1.135:1337";
    // console.log(`URL: ${API_URL}`)
    const [query, setQuery] = useState("");
    const link = new HttpLink({ uri: `${API_URL}/graphql` })
    const cache = new InMemoryCache()
    const client = new ApolloClient({ link, cache });


    return (
        <ApolloProvider client={client}>

            <div className="search">
                <br />
                <h2 className="subtitle"> Local Restaurants Listing</h2>
                <br />
                <InputGroup >
                    <InputGroupAddon addonType="append"> Search </InputGroupAddon>
                    <Input
                        onChange={(e) =>
                            setQuery(e.target.value.toLocaleLowerCase())
                        }
                        value={query}
                    />
                </InputGroup><br></br>
            </div>

            <Row>
                <Col className="white border mt-1" xs="8">
                    <RestaurantList search={query} />
                </Col>
                <Col className="bg-light border" xs="4">
                    <Cart> </Cart>
                </Col>
            </Row>
        </ApolloProvider>
    );
}
export default Home;
