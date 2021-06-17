import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../config/config';
import './Carousel.css';

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState();

  const items = credits?.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem_img"
      />
      <b className="carouselItem_txt">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=vi-VN`
    );
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AliceCarousel
      autoPlay
      infinite
      disableButtonsControls
      disableDotsControls
      responsive={responsive}
      mouseTracking
      items={items}
    />
  );
};

export default Carousel;
