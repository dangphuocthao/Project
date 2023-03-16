import { useState } from "react";
import { useLocation } from "react-router-dom";
import Menuacc from "./Components/Account/Menuacc";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import MenuLeft from "./Components/Layout/MenuLeft";
import { UserContext } from "./UserContext.js";



function App(props) {
  let param = useLocation();
  const [user , setUser] = useState({
    totalCart: "",
  })

  const show = () => {
    if(param["pathname"].includes("account")){
      return(
        <Menuacc/>
      )
    }
    else{
      if(param["pathname"].includes("cart")){
        return
      }else{
        return(
          <MenuLeft/>
        )
      }
    }
  }
  return (
    <>
      <UserContext.Provider value = {{user, setUser }}>
        <Header/>
        {/* <Slider/> */}
        <section>
            <div className="container">
              <div className="row">
                  {show()}
                  {props.children}
              </div>
            </div>
        </section>
        <Footer/>
      </UserContext.Provider>
    </>
  );
}

export default App;
