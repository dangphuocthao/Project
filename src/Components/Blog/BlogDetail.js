import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrMess from "../Member/ErrorMess";
import GetRate from "./Rate/GetRate";
import RatePost from "./Rate/RatePost";
function BlogDetail(props){
  let {id} = useParams();
  const temp= parseInt(id, 10);
  const [err , setErr] = useState([])
  const [item , setItem] = useState({})
  const [showInput, setShowInput] = useState(false);
  const [inputs, setInputs] = useState('')
  const [iscomment, setIscomment] = useState("")
  const [idRe, setIdRe] = useState(null)

  // Get DATA API
  useEffect(() => {
    axios.get("http://localhost/laravel/public/api/blog/detail/" + id)
    .then(res => {
      setItem(res.data.data)
    })
    .catch(error => console.log(error))
  },[iscomment])

  // RenderDataDetail
  const renderData = () =>{
    return(
      <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
              <div className="single-blog-post">
                <h3>{item.title}</h3>
                <div className="post-meta">
                  <ul>
                    <li><i className="fa fa-user" /> Mac Doe</li>
                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    <GetRate/>
                  </ul>
                </div>
                  <a href>
                    <img src={"https://localhost/laravel/public/upload/Blog/image/" +item.image} />
                  </a>
                  <p>{item.description}</p> <br />
                  <p>{item.content}</p> <br />
                <div className="pager-area">
                  <ul className="pager pull-right">
                    <li><Link to={"/blog/detail/Pagi/" + (temp-1)}>Pre</Link></li>
                    <li><Link to={"/blog/detail/Pagi/" + (temp+1)}>Next</Link></li>
                  </ul>
                </div>
              </div>
            </div>
      </div>
    )
  }
  const errorPage = () => {
    if (id>7 || id<4) {
      return(
        <h1>Trang không tồn tại</h1>
      )
    }
  }
  // Form Comment
  const commentForm = () => {
    return(
      <div className="replay-box">
      <div className="text-area">
          <form onSubmit={handleSubmit}>
          <span>*</span>
          <textarea name="message" rows={5} value = {inputs} onChange= {handleInputs} />
          <p>{err?.comment}</p>
          <button type="submit" className="btn btn-primary" >Post comment</button>
          </form>
      </div>
    </div>)
  }
  const handleRep =() => {
    setShowInput(true)
    setIdRe(1);
  };
  const handleInputs = (e) => {
    setInputs(e.target.value)
  }
  // Submit comment
  const handleSubmit = (e) => {
    let url = ("http://localhost/laravel/public/api/blog/comment/" + id);
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
              formData.append('id_comment', idRe ? idRe : 0 );
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
        setInputs('')
        setShowInput(false)
        setIdRe(null)
    if(Object.keys(errMess).length>0){
        setErr(errMess)
        }
}

  // ListComment
  const renderComment = () => {  
    if((item.comment)?.length > 0) { 
        return((item.comment).map((value, key) => {

            return(     
              <div key={key} className="response-area">
                   <ul className="media-list">
                     <li className="media">
                       <a className="pull-left" href="#">
                         <img className="media-object" src={"https://localhost/laravel/public/upload/user/avatar/" +value.image_user} />
                       </a>
                       <div className="media-body">
                         <ul className="sinlge-post-meta">
                           <li><i className="fa fa-user" />
                           {value.name_user}
                           </li>
                           <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                           <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                         </ul>
                         <p>{value.comment}</p>
                         {showInput ? (commentForm ()) : 
                         (
                           <button className="btn btn-primary" value={idRe} onClick={handleRep}><i className="fa fa-reply" />Replay</button>
                         )}
                             
                       </div>
                        {/* <li className="media second-media">
                        <a className="pull-left" href="#">
                            <img className="media-object" src={"https:localhost/laravel/public/upload/user/avatar/" +value.image_user} />
                          </a>
                          <div className="media-body">
                          <ul className="sinlge-post-meta">
                            <li><i className="fa fa-user" />{value.name_user}</li>
                            <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                            <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                          </ul>
                          <p>{value.name_user}</p>
                          <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>                               
                        </div>
                        </li>  */}
                      </li>
                   </ul>					
               </div>
          )
        
          

      }))
      }     

    }
    return(
        <>
          <ErrMess err = {err} />
          {errorPage()}
          {renderData()}
          <div className="col-sm-9">
          {renderComment()}
          <RatePost/>
          {commentForm()}
        
          </div>

      </>
    )
}
export default BlogDetail; 