import axios from "axios";
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import ErrMess from "../Member/ErrorMess";
function EditProduct() {
    let {id} = useParams();
    const data = JSON.parse(localStorage["jwt"])
    const token = data.token
    const [item, setItem] = useState({})
    const [CBrand, setCBrand] = useState({})
    const [inputs , setInputs] = useState({})
    const [avatarCheckbox , setAvatarCheckbox] = useState([])
    const [isChecked, setIsChecked] = useState(false);
    const [files, setFiles] = useState([])
    const [avatar, setAvatar] = useState ([])
    const [err, setErr]= useState({})
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
        axios.get("https://localhost/laravel/public/api/category-brand")
        .then(res => {
            setCBrand(res.data)
        }).catch(err => {
            console.log(err);
        })
    },[])
    const handleChange = (e) => {
        const file = e.target.files;
        setFiles(file);
        setAvatar(file[0])
      };
    const handleInputs = (e) =>{
        const nameInput = e.target.name
        const value = e.target.value
        setInputs(state => ({...state , [nameInput]:value}))
    }
    const category = () => {
        if((CBrand.category)?.length > 0){
            return(
                    <select name="category" defaultValue={item.id_category} onChange={handleInputs}>
                        
                        {(CBrand.category).map((value)=> 
                            <option key={value.id} value={value.id}>{value.category}</option>
                        )}
                    </select> 
            )
        }

    }
    const brand = () => {
        if((CBrand.brand)?.length > 0){
            return(
                    <select name="brand" defaultValue={item.id_brand} onChange={handleInputs}>
                        {(CBrand.brand).map((value)=> 
                            <option key={value.id} value={value.id}>{value.brand}</option>
                        )}
                    </select> 
            )
        }
    }
    const handleCheckboxChange = (e) => {
        setIsChecked(true)
        setIsChecked(e.target.checked)
        if(isChecked == false){
            setAvatarCheckbox(item.image)
        }else{
            setAvatarCheckbox([])
        }
        

    }
    const showFile = () => {
        if (item.image?.length > 0) {

            return(
                (item.image).map((i, index) => {
                    return(
                        <div key={index}>
                        <img src={"https://localhost/laravel/public/upload/user/product/" + data.id + "/" + item.image[index]}/>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        </div>
                    )
                })
            )
            
        }
       
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let errMess= {}
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
            let url = ("https://localhost/laravel/public/api/user/edit-product/" + id )
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
                }
            let formData = new FormData();
                formData.append('name', inputs.name ? inputs.name : item.name)
                formData.append('price', inputs.price ? inputs.price : item.price)
                formData.append('category', inputs.category ? inputs.category : item.id_category)
                formData.append('brand', inputs.brand ? inputs.brand : item.id_brand)
                formData.append('company',inputs.company ? inputs.company : item.company_profile)
                formData.append('detail', inputs.detail ? inputs.detail : item.detail)
                formData.append('status', inputs.status ? inputs.status : item.status)
                Object.keys(files).map((value)=>{
                    formData.append("file[]",files[value])
                })
                Object.keys(avatarCheckbox).map((value)=>{
                    formData.append("avatarCheckbox[]",avatarCheckbox[value])
                })
                axios.post(url, formData , config)
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
                console.log(files);
        }
    }
    return(
        <>
            <ErrMess err = {err} />
            <div className="col-sm-4">
                <div className="signup-form">
                    <h2>EditProduct</h2>
                    <form  encType="multipart/form-data"  onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" name= "name" defaultValue={item.name} onChange={handleInputs}/>
                    {category()}
                    {brand()}
                    <select name="status" defaultValue={item.status} onChange={handleInputs}>
                        <option value="0">Normal</option>
                        <option value="1">New</option>
                        <option value="2">Sale</option>
                    </select>
                    <input type="number" placeholder="Price" name="price"  defaultValue={item.price} onChange={handleInputs}/>
                    <input type="text" placeholder="Company profile" name= "company" defaultValue={item.company_profile} onChange={handleInputs} />
                    <input type="file" name="file" onChange={handleChange}/>
                    {err.file}
                    {err.size}
                    {err.type}
                    {showFile()}
                    <textarea  placeholder="Detail" name= "detail" defaultValue={item.detail} onChange={handleInputs}/>
                    <button type="submit" className="btn btn-default">Creact</button>
                    </form>
                </div>
            </div>
        </>
    )
    
}
export default EditProduct;