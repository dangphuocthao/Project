import axios from "axios";
import { useEffect, useState } from "react";
import ErrMess from "../Member/ErrorMess";

function NewProduct() {
    const [err, setErr]= useState({})
    const [item, setItem] = useState([])
    useEffect(() =>{
        axios.get("https://localhost/laravel/public/api/category-brand")
        .then(res => {
            setItem(res.data)
        }).catch(err => {
            console.log(err);
        })
    },[])
    const category = () => {
        if((item.category)?.length > 0){
            return(
                <>
                    <select name="category">
                        <option>Please choose category</option>
                        {(item.category).map((value)=> 
                            <option key={value.id}>{value.category}</option>
                        )}
                    </select> 
                </>
            )
        }

    }
    const brand = () => {
        if((item.brand)?.length > 0){
            return(
                <>
                    <select name="category">
                        <option>Please choose brand</option>
                        {(item.brand).map((value)=> 
                            <option key={value.id}>{value.brand}</option>
                        )}
                    </select> 
                </>
            )
        }

    }
    const status = () =>{
        return(
           
                <select name="status">
                    <option value="0">New</option>
                    <option value="1">Sale</option>
                </select>
          
        )
    }
    return(
        <>
            <ErrMess err = {err}/>
            <div className="col-sm-4">
                <div className="signup-form">
                    <h2>New User Signup!</h2>
                    <form  encType="multipart/form-data">
                    <input type="text" placeholder="Name" name= "name" />
                    {category()}
                    {brand()}
                    {status()}
                    <input type="text" placeholder="Price" name="price" />
                    <input type="text" placeholder="Company profile" name= "profile" />
                    <input type="file" name="file" />
                    <textarea  placeholder="Detail" name= "detail"/>
                    <button type="submit" className="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>

        </>
    )
}
export default NewProduct;