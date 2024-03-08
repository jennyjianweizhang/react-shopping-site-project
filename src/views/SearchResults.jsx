import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../store/proudctDataSlice';
import { useNavigate } from 'react-router-dom';

export default function SearchResults() {
    const searchTerm = useSelector(state => state.Data.searchTerm)
    const productList = useSelector(state => state.Data.products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    // filterProducts = (dataset, criterion for filtering)
    const filterProducts = (productList, searchTerm) => {
        return productList.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };
    const filteredProducts = filterProducts(productList, searchTerm);

    const navigate = useNavigate();
    const handleNavigate = (id, name) => {
        navigate(`/product/${id}`);
    };
    return (
        <>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div className="col-md-4" key={product.id} onClick={() => handleNavigate(product.id)}>
                                    <div className="card mb-4 box-shadow productBox">
                                        <img className="card-img-top" src={product.image} alt={product.name} />
                                        <div className="card-body">
                                            <h2 className='productName'>{product.name}</h2>
                                            <p className="card-text">{product.brand}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-product-container">
                                <p className="no-product-found">🔍 No Product Found</p>
                            </div>
                        )
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
