import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrMess from "../Member/ErrorMess";

function BlogDetail(props){
  let {id} = useParams();
  const temp= parseInt(id, 10);
  const [item , setItem] = useState({})
  const [inputs , setInputs] = useState("")
  const [err , setErr] = useState([])
  useEffect(() => {
    axios.get("http://localhost/laravel/public/api/blog/detail/" + id)
    .then(res => {
      setItem(res.data.data)
    })
    .catch(error => console.log(error))
  },[])
  const handleInputs =(e) => {
    setInputs(e.target.value);
  }
  const dataUser = JSON.parse(localStorage["jwt"])
  let url = ("http://localhost/laravel/public/api/blog/comment/" + id);
  let token = dataUser.token;
  let config = { 
    headers: { 
    'Authorization': 'Bearer '+ token,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
    } 
  }

  const handleComment = (e) => {
    const errMess = {};
    if(localStorage.getItem("jwt") === null){
        alert("Vui lòng đăng nhập trước khi Comment")
    }else{
      if(inputs === "" ){
        errMess.comment = "Vui lòng nhập comment"
      }else{
        const formData = new FormData();
          formData.append('id_blog', id);
          formData.append('id_user', dataUser.id);
          formData.append('id_comment', 0);
          formData.append('comment', inputs);
          formData.append('image_user', dataUser.avatar);
          formData.append('name_user', dataUser.name);

          //post len API
          axios.post(url, formData, config)
          .then(res => {
            console.log(res);
          })
      }
    }
    if(Object.keys(errMess).length>0){
      setErr(errMess)
    }
  }
  const renderComment = () => {
    if((item.comment)?.length >0){
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
                  <p>{value.name_user}</p>
                  </li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <p>{value.comment}</p>
                <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
              </div>
                <li className="media second-media">
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
                </li>
              </li>
          </ul>					
      </div>
        )
      }))
      }

    }
  
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
            {renderComment()}
            <div className="replay-box">
                <div className="col-sm-12">
                  <h2>Leave a replay</h2>
                  <div className="text-area">
                    <div className="blank-arrow">
                      <label>Your Name</label>
                    </div>
                    <span>*</span>
                    <textarea name="message" rows={5} defaultValue={""} onChange={handleInputs}/>
                    <p>{err.comment}</p>
                    <Link className="btn btn-primary" onClick={handleComment}>post comment</Link>
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
    return(
        <>
          <ErrMess err = { err}/>
          {errorPage()}
          {renderData()}

      </>
    )
}
export default BlogDetail; 