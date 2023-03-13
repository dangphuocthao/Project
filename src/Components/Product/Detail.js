import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    let {id} = useParams()
    const [item, setItem] = useState()
    const [CBrand, setCBrand] = useState()
    useEffect(() => {
        axios.get("https://localhost/laravel/public/api/product/detail/" + id)
        .then(res => {
            setItem(res.data.data);
        }).catch(err => 
            {console.log(err)
        })
        axios.get("https://localhost/laravel/public/api/category-brand")
        .then(res => {
            setCBrand(res.data)
        }).catch(err => {
            console.log(err);
        })
    },[])
    const renderDetail = () => {
        if(item && Object.keys(item)?.length >0){
            
            const imagesArray = JSON.parse(item.image);
            const firstImage = imagesArray[0];
            return(
                <>
                <div className="product-details">
                <div className="col-sm-5">
                <div className="view-product">
                <img src={"https://localhost/laravel/public/upload/user/product/" + item.id_user + "/" + firstImage}/>  
                    <a href="images/product-details/1.jpg" rel="prettyPhoto"><h3>ZOOM</h3></a>
                </div>
                </div>
                <div className="col-sm-7">
                <div className="product-information">{/*/product-information*/}
                    <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                    <h2>{item.name}</h2>
                    <p>Web ID: 1089772</p>
                    <img src="images/product-details/rating.png" alt="" />
                    <span>
                    <span>{item.price}</span>
                    <label>Quantity:</label>
                    <input type="text" defaultValue={1} />
                    <button type="button" className="btn btn-fefault cart">
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                    </button>
                    </span>
                    <p><b>Availability:</b> In Stock</p>
                    <p><b>Condition:</b> New</p>
                    <p><b>Brand:</b></p>
                    <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                </div>{/*/product-information*/}
                </div>
                </div>
                <div className="category-tab shop-details-tab">
                    <div className="col-sm-12">
                    <ul className="nav nav-tabs">
                        <li><a href="#details" data-toggle="tab">Details</a></li>
                        <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                        <li><a href="#tag" data-toggle="tab">Tag</a></li>
                        <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                    </ul>
                    </div>
                    <div className="tab-content">
                    <div className="tab-pane fade active in" id="reviews">
                        <div className="col-sm-12">
                        <ul>
                            <li><a href><i className="fa fa-user" />EUGEN</a></li>
                            <li><a href><i className="fa fa-clock-o" />12:41 PM</a></li>
                            <li><a href><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
                        </ul>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <p><b>Write Your Review</b></p>
                        <form action="#">
                            <span>
                            <input type="text" placeholder="Your Name" />
                            <input type="email" placeholder="Email Address" />
                            </span>
                            <textarea name defaultValue={""} />
                            <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                            <button type="button" className="btn btn-default pull-right">
                            Submit
                            </button>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </>
            )
        }
        
    }
    return(

        <div className="col-sm-9 padding-right">
            {renderDetail()}
        </div>   
    )
}
export default Detail;