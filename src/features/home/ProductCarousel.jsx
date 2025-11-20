import ProductCard from './ProductCard';
import './ProductCarousel.scss';

const ProductCarousel = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;