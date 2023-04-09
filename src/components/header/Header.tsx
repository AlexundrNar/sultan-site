import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/redux";

import "./header.scss";

const Header: FC = () => {
  const navigate = useNavigate();
  const totalQuantity = useAppSelector((state) => state.cartSlice.totalQuantity);
  const totalAmount = useAppSelector((state) => state.cartSlice.totalAmount);

  return (
    <header>
      <div className="header__top">
        <div className="container">
          <div className="nav">
            <div className="nav__address">
              <img src={`${process.env.PUBLIC_URL}/images/marker.svg`} alt="" />
              <div>
                <h3>г. Кокчетав, ул. Ж. Ташенова 129Б</h3>
                <span>(Рынок Восточный)</span>
              </div>
            </div>
            <div className="nav__contact">
              <img src={`${process.env.PUBLIC_URL}/images/convert.svg`} alt="" />
              <div>
                <h3>opt.sultan@mail.ru</h3>
                <span>На связи в любое время</span>
              </div>
            </div>
            <div className="nav__info">
              <div>
                <p>О компании</p>
              </div>
              <div>
                <p>Доставка и оплата</p>
              </div>
              <div>
                <p>Возврат</p>
              </div>
              <div>
                <p>Контакты</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header__bot">
        <div className="container">
          <div className="header__content">
            <span className="burger">
              <img src={`${process.env.PUBLIC_URL}/images/burger.svg`} alt="" />
            </span>
            <img className="rgb" src={`${process.env.PUBLIC_URL}/images/RGB.svg`} alt="" />
            <button className="header__catalog" onClick={() => navigate("/")}>
              <img className="sqg" src={`${process.env.PUBLIC_URL}/images/squares_grey.svg`} alt="" />
              Каталог
              <img className="sq" src={`${process.env.PUBLIC_URL}/images/squares.svg`} alt="" />
            </button>
            <div className="header__search">
              <input type="text" placeholder="Поиск..." />
              <button>
                <img className="srg" src={`${process.env.PUBLIC_URL}/images/search_grey.svg`} alt="" />
                <img className="sr" src={`${process.env.PUBLIC_URL}/images/search.svg`} alt="" />
              </button>
            </div>
            <div className="header__tel">
              <h3>+7 (777) 490-00-91</h3>
              <p>время работы: 9:00-20:00</p>
              <span>Заказать звонок</span>
            </div>
            <img className="header__woman" src={`${process.env.PUBLIC_URL}/images/call_woman.png`} alt="" />
            <button className="header__price" onClick={() => navigate("/admin")}>
              АДМИН-ПАНЕЛЬ
              <img src={`${process.env.PUBLIC_URL}/images/arrow_down.svg`} alt="" />
            </button>
            <div className="header__cart">
              <img
                src={`${process.env.PUBLIC_URL}/images/cart.svg`}
                alt=""
                onClick={() => navigate("/checkout")}
              />
              <span data-testid="количество">{totalQuantity}</span>
            </div>
            <div className="header__cart-check">
              <p>Корзина</p>
              <span data-testid="сумма">{totalAmount} ₸</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
