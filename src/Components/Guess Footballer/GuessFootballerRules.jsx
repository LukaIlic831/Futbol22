import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image3 from "../../Assetss/image3.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const GuessFootballerRules = ({ closeGameRules }) => {
  return (
    <div className="game__rules--block">
      <div className="game__rules--block-content">
        <div className="game__rules--block-close">
          <FontAwesomeIcon
            icon="fa-solid fa-xmark"
            className="x-mark"
            onClick={closeGameRules}
          />
        </div>
        <div className="game__rules--block-title">
          <h2>Rules</h2>
        </div>
        <div className="game__rules--block-sub-title">
          <p>
            <span>Guess</span> the correct player! You have up to 10 questions
            to ask.
          </p>
        </div>
        <div className="game__rules--block-instructions">
          <p>Instructions:</p>
        </div>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={image3} alt="" />
            <p className="swiper-slide__para">
              Countries will appear in random order. Here for example we have
              England as the first country. You should type in a player from
              England.
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={image3} alt="" />
            <p className="swiper-slide__para">
              After adding a player in the lineup, in this case Pickford as GK,
              another country will show up. You now have to type a player from
              Germany.
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={image3} alt="" />
            <p className="swiper-slide__para">
              Countries will appear in random order. Here for example we have
              England as the first country. You should type in a player from
              England.
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={image3} alt="" />
            <p className="swiper-slide__para">
              Countries will appear in random order. Here for example we have
              England as the first country. You should type in a player from
              England.
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={image3} alt="" />
            <p className="swiper-slide__para">
              Countries will appear in random order. Here for example we have
              England as the first country. You should type in a player from
              England.
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={image3} alt="" />
            <p className="swiper-slide__para">
              Countries will appear in random order. Here for example we have
              England as the first country. You should type in a player from
              England.
            </p>
          </SwiperSlide>
        </Swiper>
        <div className="game__rules--block-button">
          <span onClick={closeGameRules}>Play</span>
        </div>
      </div>
    </div>
  );
};

export default GuessFootballerRules;
