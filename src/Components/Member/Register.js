import axios from "axios";
import { useState } from "react";
import ErrMess from "./ErrorMess";

function Register(){
    const [files, setFile] = useState ([])
    const [inputs , setInputs] = useState({
        name: "",
        email:"",
        pass:"",
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
        setFile(e.target.files[0]);
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
        if(inputs.pass === ""){
            errMess.pass = "Vui lòng nhập Password"
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
            alert("OK")

            // Post user lên API
            // axios.post("url/user" , inputs)
            // .then(res => {
            //     console.log(res.data);
            // }).catch(error => {
            //     console.error(error);
            // });
            //

            // Post file lên API
            // const formData = new FormData();
            // files.forEach((file,index) => {
            //     formData.append(`file${index}`, file);
            // })
            // axios.post("url/api" ,formData, {
            //     headers: {
            //         "Content-Type": "multipart/form-data"
            //     }
            // }).then(res => {
            //     console.log(res.data);
            // }).catch(error => {
            //     console.error(error);
            // });
            //
            
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
                <input type="password" placeholder="Password" name="pass" onChange={handleInputs}/>
                <p>{err.pass}</p>
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