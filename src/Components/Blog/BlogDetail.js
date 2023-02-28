import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentBox from "./Comment/CommentBox";
import GetRate from "./Rate/GetRate";
import RatePost from "./Rate/RatePost";
function BlogDetail(props){
  let {id} = useParams();
  const temp= parseInt(id, 10);
  const [item , setItem] = useState({})


  useEffect(() => {
    axios.get("http://localhost/laravel/public/api/blog/detail/" + id)
    .then(res => {
      setItem(res.data.data)
    })
    .catch(error => console.log(error))
  },[])

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
                  <GetRate/>
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
    return(
        <>
          {errorPage()}
          {renderData()}
          <RatePost/>
          <CommentBox/>
      </>
    )
}
export default BlogDetail; 