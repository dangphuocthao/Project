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
            <div className="response-area">
                <h2>3 RESPONSES</h2>
                <ul className="media-list">
                  <li className="media">
                    <a className="pull-left" href="#">
                      <img className="media-object" src="images/blog/man-two.jpg" alt="" />
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
                      <li className="media">
                        <a className="pull-left" href="#">
                          <img className="media-object" src="images/blog/man-four.jpg" alt="" />
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
            <div className="replay-box">
                <div className="col-sm-12">
                  <h2>Leave a replay</h2>
                  <div className="text-area">
                    <div className="blank-arrow">
                      <label>Your Name</label>
                    </div>
                    <span>*</span>
                    <textarea name="message" rows={11} defaultValue={""} />
                    <a className="btn btn-primary" href>post comment</a>
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