import axios from "axios";
import { useEffect, useState } from "react";


 
 function Myproduct() {
    const data = JSON.parse(localStorage["jwt"])
    const [item, setItem] = useState([])
    const token = data.token
    useEffect(() => {
        axios.get('https://localhost/laravel/public/api/user/my-product', {
        headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
        setItem(res.data.data);
    }).catch(err => {
        console.error(err);
    })
    },[])
    const renderProduct = () => {
        if(item?.length > 0){
            return(item.map((value, key) => {
                const imagesArray = JSON.parse(value.image);
                const firstImage = imagesArray[0];
                return(
                    <div key={key} className="col-sm-1">
                    <section id="cart_items">
                        <div className="container1">
                        <div className="table-responsive cart_info">
                            <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                <td className="image">ID</td>
                                <td className="price">Name</td>
                                <td className="quantity">image</td>
                                <td className="total">Price</td>
                                <td className="action">Action</td>
                                <td />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td className="cart_description">
                                    <h4>{value.id}</h4>
                                </td>
                                <td className="cart_description">
                                    <h4><a href>{value.name}</a></h4>
                                </td>
                                <td className="cart_product">
                                   <img src={"https://localhost/laravel/public/upload/user/product/" + data.id + "/" + firstImage}/>
                                </td>
                                <td className="cart_price">
                                    <p>{value.price}</p>
                                </td>
                                <td className="cart_delete">
                                    <a className="cart_quantity_delete" href><i className="fa fa-delete" /></a>
                                    <a className="cart_quantity_delete" href><i className="fa fa-edit" /></a>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </section> {/*/#cart_items*/}
                </div>
                )
            }))
        }
    }
    return(
        <>
        {renderProduct()}
        </>
    )
 }
 export default Myproduct;