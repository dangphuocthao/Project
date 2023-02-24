import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import ErrMess from "./ErrorMess";

function Login() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        isLogged : localStorage.getItem('jwt') !==null,
    })
    
    const [err, setErr] = useState([])
    //const [check,setCheck] = useState(false);
    const handleInputs = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setInputs(state => ({...state,[nameInput]:value}))
    }
    // const handleCheck= (e) => {
    //     setCheck(e.target.checked)
    // }
    const validateEmail= (email) =>{
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        let errMess = {};
        let flag = true;
        if(inputs.email === ""){
            errMess.email = "Vui lòng nhập Email"
            flag = false;
        }else{
            if(!validateEmail(inputs.email)){
                errMess.email = "Vui lòng nhập đúng định dạng Email";
                flag = false;
            }
        }
        if(inputs.password === "") {
            errMess.password = "Vui lòng nhập Password";
            flag = false;
        }
        if(!flag){
            setErr(errMess);
        }else{
            const data = {
                email: inputs.email,
                password: inputs.password,
            }
            //Post data lên API
            axios.post("https://localhost/laravel/public/api/login" , data)
            .then(res => {
                if(res.data.errors){       
                    errMess= res.data.errors;
                    setErr(errMess)
                }else {
                     navigate('/')
                     errMess.loginn = "Logout" 
                     setErr(errMess) 
                }   
                const token = res.data.success.token;
                //Lưu JWT vào localStorage
                localStorage.setItem('jwt', token);
            }).catch(error => {
                console.error(error);
            })
        }
}
    return(
        <>
        
        <ErrMess err = {err}/>
        <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">
                <h2>Login to your account</h2>
                <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email Address" name="email" onChange={handleInputs}/>
                <p>{err.email}</p>
                <p>{err.errors}</p>
                <input type="password" placeholder="Password" name="password" onChange={handleInputs}/>
                <p>{err.password}</p>
                <span>
                    <input type="checkbox" className="checkbox" />   {/* checked={check} onChange={handleCheck} */}
                        Keep me signed in
                </span>
                <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>
        </div>
        </>
    )
}
export default Login;