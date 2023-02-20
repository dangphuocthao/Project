import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import MenuLeft from "./Components/Layout/MenuLeft";
import Slider from "./Components/Layout/Slider";



function App(props) {
  return (
    <>
        <Header/>
        <Slider/>
        <section>
            <div className="container">
              <div className="row">
                  <MenuLeft />
                  {props.children}
              </div>
            </div>
        </section>

        <Footer/>
        
    </>
  );
}

export default App;
