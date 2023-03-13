import { useLocation } from "react-router-dom";
import Menuacc from "./Components/Account/Menuacc";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import MenuLeft from "./Components/Layout/MenuLeft";



function App(props) {
  let param = useLocation();
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
        
    </>
  );
}

export default App;
