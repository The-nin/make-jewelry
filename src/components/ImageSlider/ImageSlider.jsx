import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import './ImageSlider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function PrevArrow({ className, style, onClick }) {
    return (
        <button className={`${className} custom-prev-arrow`} style={{ ...style, left: '50px' }} onClick={onClick}>
            Pre
        </button>
    );
}

PrevArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
};

function NextArrow({ className, style, onClick }) {
    return (
        <button className={`${className} custom-next-arrow`} style={{ ...style, right: '50px' }} onClick={onClick}>
            Next
        </button>
    );
}

NextArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
};

const ImageSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <Slider className="slider-container" {...settings}>
            <div>
                <img src="/Public/bg.jpg" className="img-fluid full-screen-img" alt="Description of the image" />
            </div>
            <div>
                <img src="/Public/bg2.jpg" className="img-fluid full-screen-img" alt="Description of the image" />
            </div>
            <div>
                <img src="/Public/bg3.jpg" className="img-fluid full-screen-img" alt="Description of the image" />
            </div>
        </Slider>
    );
}

export default ImageSlider;
