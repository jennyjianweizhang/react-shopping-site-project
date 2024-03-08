import React , {useState}  from 'react'
import { useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, showCart, removeFromCart  } from '../store/proudctDataSlice';

export default function ProductDetail() {
    const { productId } = useParams();
    // const product = productList.find(p => p.id === toString(productId));
    const productList = useSelector(state => state.Data.products.find(p => p.id === productId));
    const [product, setproduct] = useState(productList);
    console.log(product)

    // Initialize the state with the first image
    const [selectedImage, setSelectedImage] = useState(product.imageCollection[0].url);
    // Change product image when click
    const handleImageClick = (imageUrl)=>{
        setSelectedImage(imageUrl);
    };

    // select size/color to add cart
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const dispatch = useDispatch();

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

    const cartItems = useSelector(state => state.Data.items)
    const isProductInCart = () => {
        return cartItems.some(item =>
            item.product.id === product.id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
        );
    };

    // some: to find an element for which the provided function returns true; otherwise it returns false.
    
    const productInCart = isProductInCart();
    const buttonText = productInCart ? 'Remove from Basket' : 'Add to Basket';
    const buttonStyle = productInCart ? { backgroundColor: 'white', color: 'black', borderColor: '#e1e1e1'} : {};

    const handleAddToCart = () => {
        // check if either selectedSize or selectedColor is not set. If not, exit.
        if(!selectedColor || !selectedSize) {
            alert('Please select size and color.');
            return;
        }
        if (productInCart){
            // the payload is accessed: action.payload.id, action.payload.selectedSize, and action.payload.selectedColor.
            dispatch(removeFromCart({id: product.id, selectedSize, selectedColor}))
        }else{
            dispatch(addToCart({ product, selectedSize, selectedColor}));
            dispatch(showCart());
        }
        

    };

    return (
        <>
            <section className="py-5 productDetail">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-md-2">
                            <div className="d-flex mb-3 left">
                                {product.imageCollection.map((imageObj) => (
                                    <a key={imageObj.id} data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb" target="_blank" rel="noreferrer" data-type="image" onClick={() => handleImageClick(imageObj.url)} >
                                        <img width="60" height="60" className="rounded-2" src={imageObj.url} alt={`${imageObj.id}`} />
                                    </a>
                                )
                                )}

                            </div>
                        </div>
                        <div className="col-md-4 middleBox">
                            <div className="border rounded-4 mb-3 d-flex justify-content-center middle">
                                <img
                                    style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }}
                                    className="rounded-4 fit"
                                    src={selectedImage} alt={product.name}
                                />

                            </div>
                        </div>

                        <main className="col-lg-6 right">
                            <div className="ps-lg-3">
                                <span className="text-subtle">{product.brand}</span>
                                <h4 className="title text-dark">
                                    {product.name}
                                </h4>


                                <p>
                                    {product.description}
                                </p>

                                <hr />

                                <div className="mb-4 rightBottom">
                                    <div className="col-md-4 col-6">
                                        <span className="text-subtle lensChoice">Lens Width and Frame Size</span>
                                        <select className="form-select border border-secondary borderColor"onChange={handleSizeChange} style={{ height: 35 + 'px' }}>
                                            <option>-Select Size-</option>
                                            {product.sizes.map((size, index) => (
                                                <option key={index} value={size}>{`${size}mm`}</option>
                                            )
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="container mt-3 colorBox">
                                    <span className='color-subtle'>Choose Color</span>
                                    <div className="colorChoice">
                                        {
                                            product.availableColors.map((color, index) => (
                                                <div className="form-check" key={index}>
                                                    {/* 'checked' updates the state of seletedColor */}
                                                    <input className="color-radio" type="radio" name="colorOptions" id={color} value={color}  checked={selectedColor === color} onChange={handleColorChange}/>
                                                    <label className="color-label" htmlFor={color} style={{ backgroundColor: color, border: selectedColor === color ? '3px solid orange' : 'none'}}></label>
                                                </div>
                                            )

                                            )
                                        }
                                        {/* id should be same as htmlFor */}

                                    </div>

                                </div>
                                <div className="mb-3">
                                    <h1 className="h1">${product.price}.00</h1>
                                </div>
                                <a onClick={handleAddToCart} className="btn btn-primary shadow-0" style={buttonStyle}> {buttonText} </a>

                            </div>
                        </main>
                    </div>
                </div>
            </section>

        </>

    )
}
