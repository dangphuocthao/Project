
import { createContext, useState ,} from "react";
import { useParams } from "react-router-dom";
import ErrMess from "../../Member/ErrorMess";
function Comment(props) {
    let {id} = useParams();
    const handleSubmitForm = props.handleSubmit;
    const handleInputs = props.handleInputs;
    const err = props.err;
    const inputs = props.inputs;
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const errMess = {};
    //     if(localStorage.getItem("jwt") === null){
    //         alert("Vui lòng đăng nhập trước khi Comment")
    //     }else{
    //         const dataUser = JSON.parse(localStorage["jwt"])
    //         let token = dataUser.token;
    //         let config = { 
    //             headers: { 
    //             'Authorization': 'Bearer '+ token,
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Accept': 'application/json'
    //             } 
    //             }
    //         if(inputs === "" ){
    //             errMess.comment = "Vui lòng nhập comment"
    //         }else{
    //             setInputs('');
    //             const formData = new FormData();
    //               formData.append('id_blog', id);
    //               formData.append('id_user', dataUser.id);
    //               formData.append('id_comment', 0);
    //               formData.append('comment', inputs);
    //               formData.append('image_user', dataUser.avatar);
    //               formData.append('name_user', dataUser.name);
        
    //               //post len API
    //               axios.post(url, formData, config)
    //               .then(res => {
    //                 if(res.statusText === "OK")
    //                 {
    //                     setIscomment("SUCCESS")
    //                 }
                    
    //               })
            
    //             }
    //         }
    //         setIscomment("");
    //     if(Object.keys(errMess).length>0){
    //         setErr(errMess)
    //         }
    // }
    
    return(
        <>   
        <ErrMess err ={err}/>
        <div className="col-sm-9">
        
            <div className="replay-box">
                    <div className="text-area">
                        <form onSubmit={handleSubmitForm}>
                        <span>*</span>
                        <textarea name="message" rows={5} value = {inputs} onChange= {handleInputs} />
                        <p>{err?.comment}</p>
                        <button type="submit" className="btn btn-primary" >Post comment</button>
                        </form>
                    </div>
            </div>
        </div>

        </>
    )
}
export default Comment;