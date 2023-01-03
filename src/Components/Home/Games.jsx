import React from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../../Assetss/image1.png';
import image2 from '../../Assetss/image2.png';
import image3 from '../../Assetss/image3.png';

const Games = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="games__para">
                <p>Please select the game you want to play</p>
            </div>
            <div className="games__wrapper">
                <div className="game" onClick={() => navigate("/worldcup")}>
                    <img src={image1} alt="" className='game__image' />
                    <div className="game__overlay"></div>
                    <p className='game__text'>Futbol22 World Cup</p>
                </div>
                <div className="game" onClick={() => navigate("/futbol22")}>
                    <img src={image2} alt="" className='game__image' />
                    <div className="game__overlay"></div>
                    <p className='game__text'>Futbol22</p>
                </div>
                <div className="game" onClick={() => navigate("/guessfootballer")}>
                    <img src={image3} alt="" className='game__image' />
                    <div className="game__overlay"></div>
                    <p className='game__text'>GuessTheFootballer</p>
                </div>
            </div>
        </>
    );
}

export default Games;
