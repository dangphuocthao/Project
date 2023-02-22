import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function DetailPagination(){
  let {id} = useParams();
  const temp= parseInt(id, 10);
  const [item , setItem] = useState([])
  useEffect(() => {
    axios.get("http://localhost/laravel/public/api/blog/detail-pagination/" + id)
    .then(res => {
      setItem(res.data.data)
    })
    .catch(error => console.log(error))
  },[])
  const renderData= () =>{
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
                    <li><a href={"/blog/detail/Pagi/" + (temp-1)}>Pre</a></li>
                    <li><a href={"/blog/detail/Pagi/" + (temp+1)}>Next</a></li>
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
          
      </>
    )
}
export default DetailPagination; 