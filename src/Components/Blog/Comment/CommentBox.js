import axios from "axios";
import { useState } from "react";
import {useParams } from "react-router-dom";
import ListComment from "./ListComment";
import CommentForm from "./CommentForm";
function CommentBox(props) {
    let {id} = useParams();
    let url = ("http://localhost/laravel/public/api/blog/comment/" + id);
    const [err , setErr] = useState([])
    const [iscomment, setIscomment] = useState("")
    const [showInput, setShowInput] = useState(false);
    const [inputs, setInputs] = useState('')
    const [replytest, setReplytest] = useState(0)
    const handleReplay =() => {
        setShowInput(true)
        setReplytest(1)
      };
     
      const handleInputs = (e) => {
        setInputs(e.target.value)
     
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const errMess = {};
        if(localStorage.getItem("jwt") === null){
            alert("Vui lòng đăng nhập trước khi Comment")
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
               
            if(inputs === "" ){
                errMess.comment = "Vui lòng nhập comment"
            }else{
                setInputs('');
                const formData = new FormData();
                  formData.append('id_blog', id);
                  formData.append('id_user', dataUser.id);
                  formData.append('id_comment', replytest);
                  formData.append('comment', inputs);
                  formData.append('image_user', dataUser.avatar);
                  formData.append('name_user', dataUser.name);
    
                  //post len API
                  axios.post(url, formData, config)
                  .then(res => {
                    console.log(res);
                    if(res.statusText === "OK")
                    {
                        setIscomment("SUCCESS")
                    }
                  
                  }).catch (error => console.error(error))
                }
            }
            setIscomment("");
            setReplytest(0);
        if(Object.keys(errMess).length>0){
            setErr(errMess)
            }
    }
    return (
        <>
            <div className="col-sm-9">
                <ListComment iscomment = {iscomment} handleReplay = {handleReplay}  showInput = {showInput}/>
                <CommentForm handleSubmit = {handleSubmit} handleInputs = {(e) => handleInputs(e)} err = {err} inputs = {inputs}/>
          </div>
        </>
    )
    
}
export default CommentBox;