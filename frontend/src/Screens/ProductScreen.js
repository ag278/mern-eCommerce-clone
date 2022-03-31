import { useParams } from 'react-router-dom';

function ProductScreen() {
  const params = useParams(); //getting the variable slug as a param from the url
  const { slug } = params; //destructuring the params to get the slug
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}

export default ProductScreen;
