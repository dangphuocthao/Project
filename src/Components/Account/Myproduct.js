
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


 
 function Myproduct() {
    const data = JSON.parse(localStorage["jwt"])
    const [item, setItem] = useState({})
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
        if(Object.keys(item).length > 0){

            return(Object.keys(item).map(( key) => {

                const imagesArray = JSON.parse(item[key].image);
                const firstImage = imagesArray[0];
                return(
                            <tbody key={item[key].id}>
                                <tr>
                                <td className="cart_description">
                                    <h4>{item[key].id}</h4>
                                </td>
                                <td className="cart_description">
                                    <h4><a href>{item[key].name}</a></h4>
                                </td>
                                <td className="cart_product">
                                   <img src={"https://localhost/laravel/public/upload/user/product/" + data.id + "/" + firstImage}/>
                                </td>
                                <td className="cart_price">
                                    <p>{item[key].price}</p>
                                </td>
                                <td className="cart_delete">
                                <Link type="button" className="btn btn-default" 
                                onClick={ () => {
                                    axios.get("https://localhost/laravel/public/api/user/delete-product/" + item[key].id ,{
                                        headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }).then(res => {
                                        console.log(res.data);
                                    }).catch(err => {
                                        console.log(err);
                                    })
                                   
                                }}>
                                    Delete
                                </Link>
                                <Link to= {'/account/editproduct/' + item[key].id} type="button" className="btn btn-default">Edit</Link> 
                                </td>
                                </tr>
                            </tbody>

                )
            }))
        }
    }
    return(
        <>
        <div className="col-sm-1">
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
                            {renderProduct()}
                        </table>
                    </div>
                </div>
            </section> {/*/#cart_items*/}
        </div>
        <div className="col-sm-12">
            <Link to={"/account/newproduct/"}>
            <button type="button" className="btn btn-default pull-right">Add</button>
            </Link>
        </div>
        </>
    )
 }
 export default Myproduct;