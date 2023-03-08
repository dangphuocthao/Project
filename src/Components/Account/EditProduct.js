import axios from "axios";
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
function EditProduct() {
    let {id} = useParams();
    const data = JSON.parse(localStorage["jwt"])
    const [item, setItem] = useState({})
    const token = data.token
    useEffect(() => {
        axios.get("https://localhost/laravel/public/api/user/product/" + id ,{
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            setItem(res.data.data);
        }).catch(err => {
            console.log(err);
        })
    },[])
    console.log(item);
    return(
        <>
            <h1>ok</h1>
        </>
    )
    
}
export default EditProduct;