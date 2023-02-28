import axios from "axios";
import { useState } from "react";
import {useParams } from "react-router-dom";
import ErrMess from "../../Member/ErrorMess";

function RatePost() {
    const [rate ,setRate] = useState(0)
    const [err , setErr] = useState([])
    const [active1,setActive1] =useState("fa fa-star-o")
    const [active2,setActive2] =useState("fa fa-star-o")
    const [active3,setActive3] =useState("fa fa-star-o")
    const [active4,setActive4] =useState("fa fa-star-o")
    const [active5,setActive5] =useState("fa fa-star-o")
    let {id} = useParams();
    let url =("http://localhost/laravel/public/api/blog/rate/ "+id)
    const handleRate1sao = () => {
        setRate(1);
        setActive1(active1=== "fa fa-star-o" ? "fa fa-star" : "fa fa-star-o");
    }
    const handleRate2sao = () => {
        setRate(2);
        setActive2(active2=== "fa fa-star-o" ? "fa fa-star" : "fa fa-star-o");
        setActive1(active1=== "fa fa-star" ? "fa fa-star" : "fa fa-star-o");
    }
    const handleRate3sao = () => {
        setRate(3);
        setActive3(active3=== "fa fa-star-o" ? "fa fa-star" : "fa fa-star-o");
        setActive2(active2=== "fa fa-star-o" ? "fa fa-star" : "fa fa-star-o");
        setActive1(active1=== "fa fa-star-o" ? "fa fa-star" : "fa fa-star-o");
    }
    const handleRate4sao = () => {
        setRate(4);
        setActive4(active4=== "fa fa-star-o" ? "fa fa-star" : "fa fa-star-o");
        setActive3(active3=== "fa fa-star-o" ? "fa fa-star" : "fa fa-star-o");
        setActive2(active2=== "fa fa-star-o" ? "fa fa-star" : "fa fa-star-o");
        setActive1(active1=== "fa fa-star-o" ? "fa fa-star" : "fa fa-star-o");
    }
    const handleRate5sao = () => {
        setRate(5);
        setActive5(active5=== "fa fa-star-o" ? "fa fa-star" : "fa fa-star-o");
        setActive4(active4=== "fa fa-star-o" ? "fa fa-star" : "fa fa-star-o");
        setActive3(active3=== "fa fa-star-o" ? "fa fa-star" : "fa fa-star-o");
        setActive2(active2=== "fa fa-star-o" ? "fa fa-star" : "fa fa-star-o");
        setActive1(active1=== "fa fa-star-o" ? "fa fa-star" : "fa fa-star-o");
    }
    const handleSubmit = (e) => {

        const errMess = {};
        e.preventDefault();
        if(localStorage.getItem("jwt") === null){
            alert("Vui lòng đăng nhập trước khi đánh giá")
        }else{
            const dataUser = JSON.parse(localStorage["jwt"])
            let token = dataUser.token;
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
                }

            if(rate===0){
                errMess.Rate = "Vui lòng bình chọn trước khi gửi"
                setErr(errMess)
                
            }else{
                const data ={
                    user_id: dataUser.id,
                    blog_id: id,
                    rate: rate,}
                axios.post(url, data , config)
                .then(res => {
                    console.log(res);
                }).catch(error => console.error(error))

            }
        }   
    }
    return (
        <>     
            <ErrMess err = {err} />
            <form onSubmit={handleSubmit}>
                <div className="post-meta">
                    <span>
                        <i className={active1} onClick={handleRate1sao}/>
                        <i className={active2} onClick={handleRate2sao}/>
                        <i className={active3} onClick={handleRate3sao}/>
                        <i className={active4} onClick={handleRate4sao}/>
                        <i className={active5} onClick={handleRate5sao}/>
                        <button type="submit" className="btn " >Gửi đánh giá</button>
                        <p>{err.Rate}</p>
                    </span>
                </div>
            </form>
        </>
    )
}
export default RatePost;