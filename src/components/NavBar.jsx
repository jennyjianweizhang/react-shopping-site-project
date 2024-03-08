import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import '../style/index.css'
import { clearUser, showCart, hideCart, clearCart, increaseQuantity, decreaseQuantity, removeFromCart, setSearchTerm } from '../store/proudctDataSlice';

export default function NavbarComponent() {
  // redirect signup/signin
  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate('/signup');
  };
  const navigateToSignIn = () => {
    navigate('/signin');
  };
  const navigateToAccount = () => {
    navigate('/account')
  }
  // -----------log in show user name-----//
  const user = useSelector(state => state.Data.user);
  const auth = getAuth();

  // --------log out--------//
  const dispatch = useDispatch();
  const handleLogOut = () => {
    signOut(auth).then(() => {
      // Sign out from Firebase
      dispatch(clearUser());
      // Clear user data from Redux
      navigate('/home');
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  // ---------display/hide shopping cart---//
  // const [isCartVisible, setIsCartVisible] = useState(false);
  // const showCart = () => {
  //   setIsCartVisible(true);
  // };
  // const hideCart = () => {
  //   setIsCartVisible(false);
  // };

  const isCartVisible = useSelector(state => state.Data.isCartVisible);
  const handleShowCart = () => {
    dispatch(showCart());
  };

  const handleHideCart = () => {
    dispatch(hideCart());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // must be a object to pass to payload in Redux slice
  // must have arguments so action can identify which specific item needs to increase
  const handleIncrease = (item) => {
    dispatch(increaseQuantity({
      id: item.product.id,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor
    }));
  };

  const handleDecrease = (item) => {
    dispatch(decreaseQuantity({
      id: item.product.id,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor
    }));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart({
      id: item.product.id,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor
    }));
  };

  const cartItems = useSelector(state => state.Data.items) || [];
  console.log(cartItems)
  // check the name of each properties to access below

  const totalQuantity = cartItems.reduce((total, item) => total + item.product.quantity, 0);
  // accumulator + currentValue, initialValue,

  const totalAmount = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  //  temporarily store these inputs until submiting the form.
  const [term, setTerm] = useState('');
  const handleChange = (e) => {
    setTerm(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(term));
    navigate('/search');
  }

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <a className="navbar-brand" href="#">
        {/* <img src="../img/logo-full.059e10fa5fedbfb65165e7565ed3936f.png" alt="Logo" className="my-logo-class"/> */}
        <img src="https://salinaka-ecommerce.web.app/images/logo-full.059e10fa5fedbfb65165e7565ed3936f.png" alt="Logo" className="my-logo-class" />
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/shop">Shop</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/featured" activeclassname="activeNavLink">Featured</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/recommended">Recommended</NavLink>
          </li>
        </ul>
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa fa-search"></i>
            </span>
            <input className="form-control me-2" type="search" placeholder="Search product..." aria-label="Search" value={term}
              onChange={handleChange} />
          </div>
        </form>
        <button className="btn btn-primary" onClick={handleShowCart}>
          <i className="fa fa-shopping-cart"></i>
          {totalQuantity > 0 && (
            <span className='cart-notification'>{totalQuantity}</span>
          )}
        </button>


        <section className={`cartPage ${isCartVisible ? 'cartPageVisible' : ''}`} >
          <div className="container ">
            <span>
              <span className="h2">My Basket </span>
              <span className="h4">({totalQuantity} item{totalQuantity !== 1 ? 's' : ''})</span>
            </span>
            <span className="clearBtn">
              <button className='close' onClick={handleHideCart}>
                <span>Close</span>
              </button>
              <button className='clear' onClick={handleClearCart}>
                <span>Clear Basket</span>
              </button>
            </span>

            {cartItems.map((item, index) => (
              <div className="row d-flex justify-content-center" key={index}>
                <div className="col">
                  <div className="card mb-4 productAdd">
                    <div className="card-body p-4">
                      <div className="controlBtn">
                        <button className="addBtn" onClick={() => handleIncrease(item)}>
                          <span>+</span>
                        </button>
                        <button className="delBtn" onClick={() => handleDecrease(item)}>
                          <span>-</span>
                        </button>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-md-2 ">
                          <img src={item.product.image}
                            className="img-fluid productImage" alt={item.product.image} />
                        </div>
                        <div className="col-md-2 d-flex justify-content-center">
                          <div>
                            <a className='productName' href="#">
                              <p className="lead fw-normal mb-0 ">{item.product.name}</p>
                            </a>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center ">
                          <div className='quantityBox'>
                            <p className="quantity">Quantity</p>
                            <p className="number">{item.quantity}</p>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center ">
                          <div className='sizeBox'>
                            <p className="size">Size</p>
                            <p className="sizeNum">{item.selectedSize}</p>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center">
                          <div className='colorBox'>
                            <p className="color">Color</p>
                            {/* <p className="colorCircle"><i className="fas fa-circle me-2" ></i>
                             </p> */}
                            <div style={{ backgroundColor: item.selectedColor, width: 20 + 'px', height: 20 + 'px', borderRadius: '50%', marginTop: -14 + 'px' }}></div>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center">
                          <div>
                            <p className="subTotal">${item.product.price}.00</p>
                          </div>
                        </div>
                        <button className='delet' onClick={() => handleRemoveFromCart(item)}>
                          <span>x</span>
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )
            )}
            <div className="totalBox">
              <p className='sub'>Subtotal Amount:</p>
              <h4>${totalAmount.toFixed(2)}</h4>
              {/* toFixed(2): the number to two decimal places */}
              <div className="d-flex justify-content-end checkOut">
                <button type="button" className="btn btn-primary btn-lg">CHECK OUT</button>
              </div>
            </div>


          </div>
        </section>

        <div className="userAccount">
          {user ? (
            <div className="user-info" onClick={toggleDropdown}>
              <span className='userName'>{user.name}</span>
              {/* user: set up in Redux slice; name: set up in Firebase  */}
              <span className="material-symbols-outlined profileImg" >account_circle</span>
              <span className="material-symbols-outlined arrow">arrow_drop_down</span>
              {/* formate of embbing expression in string:`${expression} `*/}
              <div className={`dropdown-menu ${isDropdownVisible ? 'show' : ''}`}>
                <button className="dropdown-item" onClick={handleLogOut}>Logout</button>
                <button className="dropdown-item" onClick={navigateToAccount}>View Account</button>
              </div>
            </div>
          ) : (
            <div className="sign">
              <button className="signUp" onClick={navigateToSignUp}>Sign Up</button>
              <button className="signIn" onClick={navigateToSignIn}>Sign In</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 
