import React,{useState} from 'react'
import { Outlet, useNavigate} from 'react-router-dom'
import { fetchData, removeFromCart, addToCart} from '../store/proudctDataSlice';
import { useSelector, useDispatch } from 'react-redux'

export default function Shop() {
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/product/${id}`);
    };

    const dispatch = useDispatch()

    const productList = useSelector(state => state.Data.products);

    const cartItems = useSelector(state => state.Data.items)

    const handleAddToCart = (product, event) => {
        if (!product) return;

        event.stopPropagation();

        const selectedSize = product.sizes[0];
        const selectedColor = product.availableColors[0];

        // to check if the clicked product is already in the cart at the time the button is clicked, to decide the (add or remove) action 
        const isProductInCart = cartItems.some(item =>
            item.product.id === product.id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
        );

        if (isProductInCart) {
            dispatch(removeFromCart({
                id: product.id, selectedSize, selectedColor
            }));
        } else {
            dispatch(addToCart({
                product, selectedSize, selectedColor
            }));
        }
    };

    // Determine if the product is in the basket
    function isInbasket(product) {
        const flag = cartItems.some(item =>
            item.product.id === product.id &&
            item.selectedSize === product.sizes[0] &&
            item.selectedColor === product.availableColors[0]
        );
        return flag
    }

    return (
        <>
            <div className="album py-5 bg-light shop">
                <div className="container">
                    <div className="row">
                        {productList.map((product) => {
                            return (
                                <div className="col-md-4" key={product.id} onClick={() => handleNavigate(product.id)}>
                                    <div className="card mb-4 box-shadow">
                                        <img className="card-img-top" src={product.image} alt={product.name} />
                                        <div className="card-body">
                                            <h2 className='productName'>{product.name}</h2>
                                            <p className="card-text">T{product.brand}</p>
                                            <p className="price">${product.price}.00</p>
                                        </div>
                                        {/* (product, event):new product parameter represents the event object because it's the first parameter of the onClick handler function. */}
                                        {/* Display the corresponding style using a ternary expression based on the judgment result */}
                                        <button className="add-to-basket" onClick={(event) => handleAddToCart(product, event)} style={isInbasket(product) ? { backgroundColor: 'white', color: 'black', borderColor: '#e1e1e1' } : {}}>{isInbasket(product) ? 'Remove from Basket' : 'Add to Basket'}</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Outlet />
        </>
    );
}


