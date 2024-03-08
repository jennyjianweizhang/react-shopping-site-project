import React from 'react'
import { useDispatch } from 'react-redux';
import { addProduct, setError } from '../store/proudctDataSlice';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import app from '../service/config'
import productList from '../productData';

export default function DataToFirebase() {
    // initializes Firestore with your Firebase configuration.
    const db = getFirestore(app);
    

    const postData = async () => {
        try {
            for (let i = 0; i < productList.length; i++) {
                //  addDoc: adds data to the "products" collection in Firestore. 
                const docRef = await addDoc(collection(db, "products"), productList[i]);

                console.log("Document written with ID: ", docRef.id);
                // docRef is the reference to the newly added document in Firestore.
            }
        } catch (error) {
           
            console.log(error);
        }
    }

  return (
    <>
        <h2>AddData</h2>
        <button onClick={postData}>post</button>
    </>
    
  )
}
