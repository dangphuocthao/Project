
import axios from "axios"
import { useState,useEffect, } from "react"
import { Link } from "react-router-dom"

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

              </div>
                <img src={"https://localhost/laravel/public/upload/Blog/image/" +value.image} />
                {value.description}
              <Link to={"/blog/detail/" + (value.id)} className="btn btn-primary" href>Read More</Link>
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
                      <li><Link to={"/blog/list/" + 1} className="active">1</Link></li>
                      <li><Link to={"/blog/list/" + 2} >2</Link></li>
                      <li><Link to={"/blog/list/" + 3}>3</Link></li>
                      <li><a href><i className="fa fa-angle-double-right" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
      </>
    )
    
}
export default Blog;