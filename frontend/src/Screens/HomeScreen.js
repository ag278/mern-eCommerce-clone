import { useEffect, useReducer, useState } from 'react';
import logger from 'use-reducer-logger';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../Components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  //const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch({ type: 'FETCH_REQUEST' });

    const fetchData = async () => {
      try {
        const result = await axios.get('/api/products'); //we call axios.get method to fetch data from backend at this route and store it in result variable
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData(); //calling fetch function
  }, []);

  return (
    <div>
      <Helmet>
        <title>eCommerce</title>
      </Helmet>
      <h1>Featured products</h1>
      <div className="products">
        {loading ? (
          <div>
            <LoadingBox />
          </div>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                {/* {console.log(product)} */}
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
