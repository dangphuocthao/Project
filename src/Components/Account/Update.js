import { useState } from "react";
import axios from "axios";
function Update () {
    const data = JSON.parse(localStorage["jwt"])
    const [inputs , setInputs] = useState({})

    const handleInputs = (e) =>{
        const nameInput = e.target.name
        const value = e.target.value
        setInputs(state => ({...state , [nameInput]:value}))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        let url = ("https://localhost/laravel/public/api/user/update/" + data.id )
    
        let token = data.token;
        let config = { 
            headers: { 
            'Authorization': 'Bearer '+ token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
            }
        const  dataUser = {
            name: inputs.name ? inputs.name : data.name,
            email: inputs.email ? inputs.email : data.email,
            address: inputs.address ? inputs.address : data.address,
            phone: inputs.phone ? inputs.phone : data.phone,
            password: inputs.password ? inputs.password : data.password,
        }
        axios.post(url, dataUser, config)
        .then(res => {
          console.log(res);
        }).catch (error => console.error(error))
    }
    return (
            <div className="col-sm-4">
                <div className="signup-form">{/*sign up form*/}
                    <h2>Edit Profile!</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="text" placeholder="Name" name= "name" defaultValue = {data.name} onChange= {handleInputs}/>
                    <input type="text" placeholder="Email Address" name="email" readOnly defaultValue = {data.email} onChange= {handleInputs}/>
                    <input type="password" placeholder="Password" name="password"  defaultValue = {data.password} onChange= {handleInputs}/>
                    <input type="tel" placeholder="Phone" name="phone" defaultValue = {data.phone} onChange= {handleInputs}/>
                    <input type="text" placeholder="Address" name="address" defaultValue = {data.address} onChange= {handleInputs}/>
                    <button type="submit" className="btn btn-default">Edit</button>
                    </form>
                </div>{/*/sign up form*/}
            </div>
    )

}
export default Update;