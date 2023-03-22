import axios from "axios";
import {useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrMess from "./ErrorMess";

function Login() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
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
        if(inputs.email === ""){
            errMess.email = "Vui lòng nhập Email"
        }else{
            if(!validateEmail(inputs.email)){
                errMess.email = "Vui lòng nhập đúng định dạng Email";

            }
        }
        if(inputs.password === "") {
            errMess.password = "Vui lòng nhập Password";
        }
        if(Object.keys(errMess).length > 0) {
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
                     console.log(res);
                }   
                const dataUser = {
                    token : res.data.success.token,
                    name: res.data.Auth.name,
                    avatar: res.data.Auth.avatar,
                    id: res.data.Auth.id,
                    email: res.data.Auth.email,
                    address: res.data.Auth.address,
                    password: inputs.password,
                    phone: res.data.Auth.phone,
                };
                //Lưu JWT vào localStorage
                localStorage.setItem("jwt", JSON.stringify(dataUser));
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
                    <input type="checkbox" className="checkbox" />
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