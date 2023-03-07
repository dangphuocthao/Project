import axios from "axios";
import { useEffect, useState } from "react";
import ErrMess from "../Member/ErrorMess";

function NewProduct() {
    const data = JSON.parse(localStorage["jwt"])
    const [err, setErr]= useState({})
    const [item, setItem] = useState([])
    const [files, setFiles] = useState([])
    const [avatar, setAvatar] = useState ([])
    const [inputs, setInputs] = useState({
        name: "",
        category: "",
        brand: "",
        price:"",
        profile:"",
        detail:"",
        sale:"",
        status: 0,


    })
    useEffect(() =>{
        axios.get("https://localhost/laravel/public/api/category-brand")
        .then(res => {
            setItem(res.data)
        }).catch(err => {
            console.log(err);
        })
    },[])
    const handleInput = (e) =>{
        const nameInput = e.target.name
        const value = e.target.value
        setInputs(state => ({...state, [nameInput]:value}))
    }
    const category = () => {
        if((item.category)?.length > 0){
            return(
                    <select name="category" onChange={handleInput}>
                        <option>Please choose category</option>
                        {(item.category).map((value)=> 
                            <option key={value.id} value={value.id}>{value.category}</option>
                        )}
                    </select> 
            )
        }

    }
    const brand = () => {
        if((item.brand)?.length > 0){
            return(
                    <select name="brand" onChange={handleInput}>
                        <option>Please choose brand</option>
                        {(item.brand).map((value)=> 
                            <option key={value.id} value={value.id}>{value.brand}</option>
                        )}
                    </select> 
            )
        }
    }
    const showInputs =() => {

        if(inputs.status == 2){
            return(
                <>
                <input type="number" placeholder="0%" name= "sale"  onChange={handleInput}/>
                </>
            )
        }
    }
    const handleChange = (e) => {
        const file = e.target.files;
        setFiles(file);
        setAvatar(file[0])
      };
    const handleSubmit = (e) => {
        let errMess= {}
        e.preventDefault();
        if (inputs.name === "") {
            errMess.name = "Vui lòng nhập name"
        }
        if (inputs.category === "") {
            errMess.category = "Vui lòng chọn category"
        }
        if (inputs.brand === "") {
            errMess.brand = "Vui lòng chọn brand"
        }
        if (inputs.price === "") {
            errMess.price = "Vui lòng nhập giá"
        }
        if (inputs.profile === "") {
            errMess.profile = "Vui lòng nhập Company profile"
        }
        if (inputs.detail === "") {
            errMess.detail = "Vui lòng nhập detail"
        }
        if(files.length === 0){
            errMess.file = "Vui lòng upload file"
        }else{
                if (avatar && avatar.size > 1024 * 1024) {
                    errMess.size = "File bạn nhập lớn hơn 1mb";
                }
                if (avatar) {
                    const extension = avatar.type.split("/")[1];
                    if (!["png", "jpg", "jpeg", "PNG", "JPG"].includes(extension)) {
                        errMess.type = "Lỗi định dạng";
                    }
                }
    
            }
        if(Object.keys(errMess).length > 0){
            setErr(errMess)
        }else{
            let url = ("https://localhost/laravel/public/api/user/add-product" )
            let token = data.token;
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
                }
             let formData = new FormData();
                formData.append('name', inputs.name)
                formData.append('price', inputs.price)
                formData.append('category', inputs.category)
                formData.append('brand', inputs.brand)
                formData.append('company', inputs.profile)
                formData.append('detail', inputs.detail)
                formData.append('status', inputs.status)
                formData.append('sale', inputs.sale)
                Object.keys(files).map((value)=>{
                    formData.append("file[]",files[value])
                })
            axios.post(url, formData, config)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
           
        }
        
    }

    return(
        <>
            <ErrMess err = {err}/>
            <div className="col-sm-4">
                <div className="signup-form">
                    <h2>New User Signup!</h2>
                    <form  encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" name= "name"  onChange={handleInput}/>
                    {err.name}
                    {category()}
                    {err.category}
                    {brand()}
                    {err.brand}
                    <select name="status" onChange={handleInput}>
                        <option value="0">Normal</option>
                        <option value="1">New</option>
                        <option value="2">Sale</option>
                    </select>
                    {showInputs()}
                    <input type="text" placeholder="Price" name="price"  onChange={handleInput}/>
                    {err.price}
                    <input type="text" placeholder="Company profile" name= "profile" onChange={handleInput} />
                    {err.profile}
                    <input type="file" name="file" multiple  onChange={handleChange}/>
                    {err.file}
                    {err.size}
                    {err.type}
                    {err.maxfile}
                    <textarea  placeholder="Detail" name= "detail" onChange={handleInput}/>
                    {err.detail}
                    <button type="submit" className="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>

        </>
    )
}
export default NewProduct;