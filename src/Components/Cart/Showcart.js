
import axios from "axios";
import { useEffect, useState } from "react";

function Showcart() {
    const [item, setItem] = useState({})
    const [dataPd , setDataPd] = useState(JSON.parse(localStorage.getItem('dataPd')));

    useEffect(() => {
        axios.post("https://localhost/laravel/public/api/product/cart" , dataPd)
        .then(res => {
            setItem(res.data.data);
        }).catch(err => {
            console.log(err);
        })
    },[])
    
    console.log(item);
    useEffect(() => {
        if (Object.keys(dataPd).length > 0) {
          localStorage.setItem('dataPd', JSON.stringify(dataPd));
        }
      }, [dataPd]);
    const renderCart = () => {
        if(Object.keys(item).length > 0){
            return(Object.keys(item).map((value) => {
                const imagesArray = JSON.parse(item[value].image);
                const firstImage = imagesArray[0];
                return(
                    <tbody key={item[value].id}>
                    <tr>
                        <td className="cart_product">
                        <img src={"https://localhost/laravel/public/upload/user/product/" + item[value].id_user + "/" + firstImage}/>
                        </td>
                        <td className="cart_description">
                        <h4><a href>{item[value].name}</a></h4>
                        <p>Web ID: 1089772</p>
                        </td>
                        <td className="cart_price">
                        <p>{item[value].price}</p>
                        </td>
                        <td className="cart_quantity">
                        <div className="cart_quantity_button">
                            <a className="cart_quantity_up" > + </a>
                            <input className="cart_quantity_input" type="text" name="quantity" defaultValue={item[value].qty} autoComplete="off" size={2} />
                            <a className="cart_quantity_down" href> - </a>
                        </div>
                        </td>
                        <td className="cart_total" >
                        <p className="cart_total_price"> </p>

                        </td>
                        <td className="cart_delete">
                        <a className="cart_quantity_delete" href><i className="fa fa-times" /></a>
                        </td>
                    </tr>
                    </tbody>

                )
                })
            )
        }
    }
    return(
        <>
            <section id="cart_items" >
                <div className="container">
                    <div className="breadcrumbs">
                    <ol className="breadcrumb">
                        <li><a href="#">Home</a></li>
                        <li className="active">Shopping Cart</li>
                    </ol>
                    </div>
                    <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                        <tr className="cart_menu">
                            <td className="image">Item</td>
                            <td className="description" />
                            <td className="price">Price</td>
                            <td className="quantity">Quantity</td>
                            <td className="total">Total</td>
                            <td />
                        </tr>
                        </thead>
                        {renderCart()}
                    </table>
                    </div>
                </div>
            </section>

            <section id="do_action">
            <div className="container">
                <div className="heading">
                <h3>What would you like to do next?</h3>
                <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                </div>
                <div className="row">
                <div className="col-sm-6">
                    <div className="chose_area">
                    <ul className="user_option">
                        <li>
                        <input type="checkbox" />
                        <label>Use Coupon Code</label>
                        </li>
                        <li>
                        <input type="checkbox" />
                        <label>Use Gift Voucher</label>
                        </li>
                        <li>
                        <input type="checkbox" />
                        <label>Estimate Shipping &amp; Taxes</label>
                        </li>
                    </ul>
                    <ul className="user_info">
                        <li className="single_field">
                        <label>Country:</label>
                        <select>
                            <option>United States</option>
                            <option>Bangladesh</option>
                            <option>UK</option>
                            <option>India</option>
                            <option>Pakistan</option>
                            <option>Ucrane</option>
                            <option>Canada</option>
                            <option>Dubai</option>
                        </select>
                        </li>
                        <li className="single_field">
                        <label>Region / State:</label>
                        <select>
                            <option>Select</option>
                            <option>Dhaka</option>
                            <option>London</option>
                            <option>Dillih</option>
                            <option>Lahore</option>
                            <option>Alaska</option>
                            <option>Canada</option>
                            <option>Dubai</option>
                        </select>
                        </li>
                        <li className="single_field zip-field">
                        <label>Zip Code:</label>
                        <input type="text" />
                        </li>
                    </ul>
                    <a className="btn btn-default update" href>Get Quotes</a>
                    <a className="btn btn-default check_out" href>Continue</a>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="total_area">
                    <ul>
                        <li>Cart Sub Total <span>$59</span></li>
                        <li>Eco Tax <span>$2</span></li>
                        <li>Shipping Cost <span>Free</span></li>
                        <li>Total <span>$61</span></li>
                    </ul>
                    <a className="btn btn-default update" href>Update</a>
                    <a className="btn btn-default check_out" href>Check Out</a>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </>
    )
    
}
export default Showcart;