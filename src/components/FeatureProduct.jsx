import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect} from 'react';
import '../style/index.css'
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../store/proudctDataSlice';
import { useSelector, useDispatch } from 'react-redux'
import { addProduct, setError } from '../store/proudctDataSlice';
import  app  from '../service/config'
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default function FeatureProduct() {
    const navigate = useNavigate();
    // const db = getFirestore(app);
    const dispatch = useDispatch()
    const productList = useSelector(state => state.Data.products);
    // console.log(productList);

    // async function getData(){
    //     const querySnapshot = await getDocs(collection(db, "products"));
    //     let arr = []
    //     querySnapshot.forEach((doc) => {
    //         arr.push(doc.data())
    //     })
    //     dispatch(addProduct(arr))
    // }

    // useEffect(() => {
    //     getData();  
    // }, []); 

    useEffect(() => {
        dispatch(fetchData());  
    }, [dispatch]); 


    const handleNavigate = (id, name) => {
        navigate(`/product/${id}`);
    };

    return (
        <>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        {productList.map((product) => (
                            <div className="col-md-4" key={product.id} onClick={() => handleNavigate(product.id)}>
                                <div className="card mb-4 box-shadow productBox">
                                    <img className="card-img-top" src={product.image} alt={product.name} />
                                    <div className="card-body">
                                        <h2 className='productName'>{product.name}</h2>
                                        <p className="card-text">{product.brand}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
