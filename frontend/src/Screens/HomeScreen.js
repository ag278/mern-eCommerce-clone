import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import logger from 'use-reducer-logger';
import axios from 'axios';

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
      <h1>Featured products</h1>
      <div className="products">
        {loading ? (
          <div>loading</div>
        ) : error ? (
          <div>error</div>
        ) : (
          products.map((product) => (
            <div className="product" key={product.slug}>
              {/*link is used to remove the refreshing of the page while clicking on a link */}
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>Rs {product.price}</strong>
                </p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
