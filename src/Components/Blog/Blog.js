
import axios from "axios"
import { useState,useEffect, } from "react"

function Blog() {
    const [item, setItem] = useState([])
    useEffect(() => {
      axios.get("https://localhost/laravel/public/api/blog")
      .then(res => {
        setItem(res.data.blog.data)

      })
      .catch(error => console.log(error))
    },[]) 
    const renderData = () =>{
      if(item.length > 0){
        return item.map((value, key)=>{
          return(
            <div key={value.id} className="single-blog-post">
              <h3>{value.title}</h3>
              <div className="post-meta">
                <ul>
                  <li><i className="fa fa-user" /> Mac Doe</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <span>
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" />
                </span>
              </div>
                <img src={"https://localhost/laravel/public/upload/Blog/image/" +value.image} />
                {value.description}
              <a className="btn btn-primary" href>Read More</a>
            </div>
          )
        })
      }
    }
    return(
      <>
        
          <div className="col-sm-9">
                <div className="blog-post-area">
                  <h2 className="title text-center">Latest From our Blog</h2>
                      {renderData()}
                  <div className="pagination-area">
                    <ul className="pagination">
                      <li><a href className="active">1</a></li>
                      <li><a href>2</a></li>
                      <li><a href>3</a></li>
                      <li><a href><i className="fa fa-angle-double-right" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
      </>
    )
    
}
export default Blog;