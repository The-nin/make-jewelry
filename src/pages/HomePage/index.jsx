// import Footer from "antd/es/layout/layout";
import Footer from "../../components/Footer/Footer";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import Navbar from "../../components/Navbar/Navbar";
import Products from "../../components/ProductsJewelry/Products";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <ImageSlider />
      <Products />
      <Footer />
    </div>
  );
}
