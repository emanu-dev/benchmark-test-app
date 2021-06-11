import products from './productList.json'
import './App.css';
import { useEffect, useState } from 'react';

const App = () => {

  const [productId, setProductId] = useState(window.location.pathname.replace('/', ''));
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showAddToCart, setShowAddToCart] = useState(false);

  useEffect(() => {
    if (productId === '') return null;
    setSelectedProduct(products.filter(product => product.ProductID == productId )[0]);
  }, [productId])

  useEffect(() => {
    console.log(selectedProduct[0]);
  }, [selectedProduct])

  const addToCart = () => {
    setShowAddToCart(true);
    setTimeout(() => {
      setShowAddToCart(false);
    }, 5000);
  }

  return (
    <>
      {productId === '' ?
      (
        <div className="App">
          <div className='productlist__wrapper'>
            {
              products.map((product, index) => {
                const onClick = () => {
                  window.location = `/${product.ProductID}`;
                }
                return (
                  <div key={index} className='product__wrapper'>
                    <img className='product__thumb' src='https://dummyimage.com/150x150/AAF4EE/000000' alt={product.Name} />
                    <div className='product__info__wrapper'>
                      <h3 className='product__info__name'>{product.Name}</h3>
                      <p className='product__info__price'>${product.Price}</p>
                    </div>
                    <button onClick={onClick} className='product__details-btn'>View Details</button>
                  </div>
                )
              })
            }
          </div>
        </div>
        )
        :
        (
          <div>
            <div className='product-details__wrapper'>
              <img className='product-detail__img' src={selectedProduct.PictureURL} alt={selectedProduct.Name}/>
              <div className='product-detail__info__wrapper'>
                <h2 className='product-detail__info__name'>{selectedProduct.Name}</h2>
                <h5 className='product-detail__info__name'>Ratings: {selectedProduct.RatingAvg}</h5>
                <p className='product-detail__info__description'>{selectedProduct.Description}</p>
              </div>
              <div className='product-detail__buy__wrapper'>
                <div style={{display: 'flex'}}>
                <p className='product-detail__info__retailprice'>{selectedProduct['Retail Price']}</p>
                  <p className='product-detail__info__price'>{selectedProduct.Price}</p>
                </div>
                  <p className='product-detail__info__status'>Out of stock</p>
                <button className='product-detail__info__button' onClick={addToCart}>Add to cart</button>
              </div>
            </div>
          </div>
        )
      }
      {showAddToCart && <div className='product__add-cart'>Product added successfully</div>}
    </>
  );
}


export default App;
