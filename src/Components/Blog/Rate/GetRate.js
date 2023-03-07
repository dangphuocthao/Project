import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GetRate() {
    const [datarate , setDatarate] = useState([]) 
    let {id} = useParams()
    useEffect(()  => {
        axios.get("http://localhost/laravel/public/api/blog/rate/ "+id)
        .then(res => {
            setDatarate(res.data.data)
        }).catch(error => console.error(error))
        
    },[])
        const sumRate = Object.keys(datarate).reduce((total, key) => total + datarate[key].rate, 0);
        const averageRate = sumRate / Object.keys(datarate).length;
    const renderStar = () => {
        if ( sumRate === 0) {
            return(
                 <span>
                  <i className="fa fa-star-o" />
                  <i className="fa fa-star-o" />
                  <i className="fa fa-star-o" />
                  <i className="fa fa-star-o" />
                  <i className="fa fa-star-o" />
                </span> 
            )
        }
        if ( averageRate >= 1 && averageRate < 2) {
            return(
                 <span>
                  <i className="fa fa-star" />
                  <i className="fa fa-star-o" />
                  <i className="fa fa-star-o" />
                  <i className="fa fa-star-o" />
                  <i className="fa fa-star-o" />
                </span> 
            )
        }
        if ( averageRate >= 2 && averageRate < 3) {
            return(
                 <span>
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-o" />
                  <i className="fa fa-star-o" />
                  <i className="fa fa-star-o" />
                </span> 
            )
        }
        if ( averageRate >= 3 && averageRate < 4) {
            return(
                 <span>
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-o" />
                  <i className="fa fa-star-o" />
                </span> 
            )
        }
        if ( averageRate >= 4 && averageRate < 5) {
            return(
                 <span>
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-o" />
                </span> 
            )
        }
        if ( averageRate === 5) {
            return(
                 <span>
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </span> 
            )
        }
    }
    return(
        <>
                {renderStar()}
        </>
    )
}
export default GetRate;