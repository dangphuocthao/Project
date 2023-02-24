
import axios from "axios";
import { useState } from "react";
import ErrMess from "./ErrorMess";

function Register(){
    const [files, setFile] = useState ([])
    const [avatar, setAvatar] = useState ([])
    const [inputs , setInputs] = useState({
        name: "",
        email:"",
        password:"",
        phone:"",
        address:"",
    })
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const [err, setErr] = useState([])
    const handleInputs = (e) =>{
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state=> ({...state, [nameInput]:value}))
    }
    const handleChange = (e) =>{
        const file = e.target.files;
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
            setFile(file[0])
        }
        reader.readAsDataURL(file[0])
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        let errMess = {};
        let flag = true;
        if(inputs.name === ""){
            errMess.name = "Vui lòng nhập Name"
            flag = false;
        }
        if(inputs.email === ""){
            errMess.email = "Vui lòng nhập Email"
            flag = false;
        }else{
            if(!validateEmail(inputs.email)){
                errMess.email = "Bạn cần nhập đúng định dạng Email"
                flag = false;
            }
        }
        if(inputs.password === ""){
            errMess.password = "Vui lòng nhập Password"
            flag = false;
        }
        if(inputs.phone === ""){
            errMess.phone = "Vui lòng nhập Phone"
            flag = false;
        }
        if(inputs.address === ""){
            errMess.address = "Vui lòng nhập Địa chỉ"
            flag = false;
        }
        if(files.length === 0){
            errMess.file = "Vui lòng upload file"
            flag = false;
        }else{
            const extension = files.type.split('/')[1]
            if(files.size > 1024 *1024){
                errMess.size = "File bạn nhập lớn hơn 1mb"
                flag = false;
            }
            if(extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg' && extension !== 'PNG' && extension !== 'JPG')
            {
                errMess.type = "Lỗi định dạng"
                flag = false;
            }
        }
        if(!flag){
            setErr(errMess);
        }else{
            const data ={
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                phone: inputs.phone,
                address: inputs.address,
                level: 0,
                avatar:avatar,

            }
            //Post user lên API
            axios.post("https://localhost/laravel/public/api/register" , data)
            .then(res => {
                if(res.data.errors){
                  errMess.datas= res.data.errors;
                  setErr(errMess.datas)
                  alert("Loi API")
                }else(
                    alert("Dang Ky Thanh Cong")
                   
                )
            }).catch(error => {
                console.error(error);
            });
           
    }   
        }
        

    return (

        <>
        <ErrMess err = {err}/>
        <div className="col-sm-4">
            <div className="signup-form">{/*sign up form*/}
                <h2>New User Signup!</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" placeholder="Name" name= "name" onChange={handleInputs}/>
                <p>{err.name}</p>
                <input type="text" placeholder="Email Address" name="email" onChange={handleInputs}/>
                <p>{err.email}</p>
                <input type="password" placeholder="Password" name="password" onChange={handleInputs}/>
                <p>{err.password}</p>
                <input type="tel" placeholder="Phone" name="phone"  onChange={handleInputs}/>
                <p>{err.phone}</p>
                <input type="text" placeholder="Address" name="address" onChange={handleInputs}/>
                <p>{err.address}</p>
                <input type="file" name="address" onChange={handleChange}/>
                <p>{err.file}</p>
                <p>{err.type}</p>
                <p>{err.size}</p>
                <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>{/*/sign up form*/}
        </div>
        </>
    )
    
}
export default Register;