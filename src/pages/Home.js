import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import LoginPage from "./Loginpage";

function Home() {
    return ( 
        <div>
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
        </div>
     );
}

export default Home;
