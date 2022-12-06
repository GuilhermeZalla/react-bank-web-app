import Logo from "../../assets/images/logo.png";
import coversJSON from "../../assets/data/cover.json";
import { useEffect, useState } from "react";
import { LoginForm } from "./login/login";
import { RegisterForm } from "./register/register";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

export const Validation = () => {
    const [validationTab, setValidationTab] = useState('login');
    const [index, setIndex] = useState(0);
    const covers = coversJSON.covers;
    const coversSwitch = document.getElementsByName('cover');

    useEffect(() => {
        const interval = setInterval(() => {
            if (index < 2) {
                setIndex(index + 1);
                updateSwitcher(index + 1);
            } else {
                setIndex(0);
                updateSwitcher(0);
            };

        }, 5000);
        return () => clearInterval(interval);
    }, [index]);

    const switchValidationTab = tab => tab.target?.name ? setValidationTab(tab.target.name) : setValidationTab(tab);

    const updateSwitcher = e => {
        console.log(e);
        for (let i = 0; i < coversSwitch.length; ++i) {
            if (e === i) {
                coversSwitch[i].style.opacity = '100%';
            } else {
                coversSwitch[i].style.opacity = '70%';
            };
        };
    };

    const switchToNext = () => {
        if (index < 2) {
            setIndex(index + 1);
            updateSwitcher(index + 1);
        } else {
            setIndex(0);
            updateSwitcher(index - 2);
        };
    };

    const switchToPrevious = () => {
        if (index > 0) {
            setIndex(index - 1);
            updateSwitcher(index - 1);
        } else {
            setIndex(2);
            updateSwitcher(index + 2);
        };
    };

    return (
        <>
            <div className="container">
                <figure className="logo">
                    <img src={Logo} alt="Logo NG.Cash retirado do desafio do processo seletivo" />
                </figure>
                {
                    validationTab === 'login' ? <LoginForm validationTab={switchValidationTab} /> : <RegisterForm validationTab={switchValidationTab} />
                }
                <section className="cover">
                    <div className="slider">
                        <figure>
                            <img src={covers[index].image} alt="Cover bank mobile app" />
                        </figure>
                    </div>
                    <article>
                        <h1>{covers[index].title}</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </article>
                    <span>
                        <button type="button" name='previous' onClick={switchToPrevious}><IoIosArrowDropleftCircle /></button>
                        <span className="slider__btns">
                            <button type="button" name='cover' disabled></button>
                            <button type="button" name='cover' disabled></button>
                            <button type="button" name='cover' disabled></button>
                        </span>
                        <button type="button" name='previous' onClick={switchToNext}><IoIosArrowDroprightCircle /></button>
                    </span>
                </section>
            </div>
        </>
    );
};