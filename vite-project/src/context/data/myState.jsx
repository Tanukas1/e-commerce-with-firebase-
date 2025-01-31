import React,{useEffect, useState} from 'react'
import MyContext from './myContext';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';
import { QuerySnapshot, Timestamp, addDoc, collection, onSnapshot } from 'firebase/firestore';
function myState(props) {

  const [mode, setMode] = useState('light');

  const toggleMode = () => { 
    if (mode === 'light') {
        setMode('dark');
        document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else {
        setMode('light');
        document.body.style.backgroundColor = 'white';

    }
}


  const[loading, setLoading] = useState(false);


  const [products, setproducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",

      }
    )
  });

  const addProduct = async () =>{
    if(products.title == null || products.price == null|| products.imageUrl == null ||
       products.category == null || products.description == null){
        return toast.error("all fields are required")

    }
    setLoading(true)

    try{
      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, products)
      toast.success("Add product successfully");
      setTimeout(()=>{
        window.location.href = '/dashboard'
      }, 800);
      getProductData();
      setLoading(false)

    }
    catch(error){
      console.log(error);
        setLoading(false)
    }
  }
  

  const[product, setProduct] = useState([]);
  console.log(product)

  const getProductData = async () =>{

    setLoading(true)

    try{
      const q = query(
        collection(fireDB,'products'),
        orderBy('time')
      );

      const data = onSnapshot(q, (QuerySnapshot)=>{
        let productArray = [];
        QuerySnapshot.forEach((doc)=>{
            productArray.push({...doc.data(), id: doc.id});
        });
        setProduct(productArray)
        setLoading(false)
      });
      return () => data;

    }catch(error){
      console.log(error)
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    getProductData
  },[]);


  // pudate product function

  const edithandle = (item) =>{
    setproducts(item)
  }
  const updateProduct = async () =>{
    setLoading(true)
    try{
      await setDoc(doc(fireDB, "products", products.id),products)
      toast.success("Products Updated successfully")
      setTimeout(()=>{
        window.location.href='/dashboard'
      },800)
      getProductDara();
      setLoading(false)
     
    }catch(error){
      console.log(false)
    }
  }

  // delete product

  const deleteProduct = async(item) =>{
    setLoading(true)
    try{
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Products Deleted successfully")
      getProductDara();
      setLoading(false)

    }catch(error){
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <MyContext.Provider value={{mode, toggleMode, loading, setLoading,
      products, setproducts, addProduct, product, edithandle, updateProduct,deleteProduct
    }} >
        {props.children}
    </MyContext.Provider>
  )
}

export default myState