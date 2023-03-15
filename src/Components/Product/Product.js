import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
function ProductShow() {

    const [item , setItem] = useState([])

    useEffect(() => {
        axios.get("https://localhost/laravel/public/api/product/list")
        .then(res => {
           setItem(res.data.data.data);
        }).catch(err => {
            console.log(err);
        })
    },[])
    const renderProduct = () => {
        if(item && Object.keys(item)?.length >0 ){
           return(Object.keys(item).map((value , key) => { 
            const imagesArray = JSON.parse(item[value].image);
            const firstImage = imagesArray[0];
                    return(
                            <div className="col-sm-4" key={key}>
                                <div className="product-image-wrapper">
                                    <div className="single-products">
                                        <div className="productinfo text-center">
                                            <img src={"https://localhost/laravel/public/upload/user/product/" + item[value].id_user + "/" + firstImage}/>    
                                            <h2>{item[value].price}</h2>
                                            <p>{item[value].name}</p>
                                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                        </div>
                                        <div className="product-overlay">
                                            <div className="overlay-content">
                                                <h2>{item[value].price}</h2>
                                                <p>{item[value].name}</p>
                                                <Link to={"/product/detail/" + item[value].id} className="btn btn-default add-to-cart" >Add to cart</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="choose">
                                        <ul className="nav nav-pills nav-justified">
                                        <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
                                        <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                )
                })
            ) 
        }
    }
    return(
        <div className="features_items">
            <h2 className="title text-center">Features Items</h2>
            {renderProduct()}  
        </div>
    )
}
export default ProductShow;