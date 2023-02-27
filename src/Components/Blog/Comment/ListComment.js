import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";



function ListComment (props) {
const [item , setItem] = useState({})
const handleRep =props.handleReplay;
const iscomment = props.iscomment;
const showInput = props.showInput;
let {id} = useParams();
useEffect(()=> {
    axios.get("http://localhost/laravel/public/api/blog/detail/" + id)
    .then(res => {
        setItem(res.data.data)
    })
    .catch(error => console.error(error))
},[]);
useEffect(()=> {
    if(iscomment === "SUCCESS"){
        axios.get("http://localhost/laravel/public/api/blog/detail/" + id)
    .then(res => {
        setItem(res.data.data)
    })
    .catch(error => console.error(error))
    }
    
},[iscomment]);


const renderComment = () => {
    
    if((item.comment)?.length > 0) {
        
        return((item.comment).map((value, key) => {
            return(
                
                <div key={key} className="response-area">
                     <ul className="media-list">
                       <li className="media">
                         <a className="pull-left" href="#">
                           <img className="media-object" src={"https:localhost/laravel/public/upload/user/avatar/" +value.image_user} />
                         </a>
                         <div className="media-body">
                           <ul className="sinlge-post-meta">
                             <li><i className="fa fa-user" />
                             <p>{value.name_user}</p>
                             </li>
                             <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                             <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                           </ul>
                           <p>{value.comment}</p>
                           {showInput ? (
                            <CommentForm/>
                           ): (
                            <button className="btn btn-primary" onClick={handleRep}><i className="fa fa-reply" />Replay</button>    
                           )}
                         </div>
                           {/* <li className="media second-media">
                             <a className="pull-left" href="#">
                               <img className="media-object" src="images/blog/man-three.jpg" alt="" />
                             </a>
                             <div className="media-body">
                               <ul className="sinlge-post-meta">
                                 <li><i className="fa fa-user" />Janis Gallagher</li>
                                 <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                 <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                               </ul>
                               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                               <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>                              
                             </div>
                           </li> */}
                         </li>
                     </ul>					
                 </div>
            )
        }))
    }
}
    return(
        <>
        {renderComment()}
        
        </>
    )
}
export default ListComment;