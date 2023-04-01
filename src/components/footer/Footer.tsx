import React, { FC } from "react";
import "./footer.scss";

const Footer: FC = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__info">
          <div className="footer__company">
            <img src="./images/sultan.svg" alt="" />
            <h5>
              Компания «Султан» — снабжаем розничные магазины товарами "под
              ключ" в Кокчетаве и Акмолинской области
            </h5>
            <p>Подпишись на скидки и акции</p>
            <div className="footer__email">
              <input type="text" placeholder="Введите ваш E-mail" />
              <button>
                <img src="./images/arrow_footer.svg" alt="" />
              </button>
            </div>
          </div>

          <div>
            <h3>Меню сайта:</h3>
            <p>О компании</p>
            <p>Доставка и оплата</p>
            <p>Возврат</p>
            <p>Контакты</p>
          </div>
          <div className="cat">
            <h3>Категории:</h3>
            <p>Бытовая химия</p>
            <p>Косметика и гигиена</p>
            <p>Товары для дома</p>
            <p>Товары для детей и мам</p>
            <p>Посуда</p>
          </div>
          <div className="price-media">
            <h3>Скачать прайс-лист:</h3>
            <button className="footer__price">
              Прайс-лист
              <img src="./images/arrow_down.svg" alt="" />
            </button>
            <p className="f__svaz">Связь в мессенджерах:</p>
            <button className="footer__wsapp"><img src="./images/wsapp.svg" alt="" /></button>
            <button className="footer__tg"><img src="./images/tg.svg" alt="" /></button>
          </div>
          <div className="footer__contacts">
            <h3>Контакты:</h3>
            <h4>+7 (777) 490-00-91</h4>
            <p>время работы: 9:00-20:00</p>
            <span>Заказать звонок</span>
            <h4>opt.sultan@mail.ru</h4>
            <p>На связи в любое время</p>
            <button className="footer__visa"><img src="./images/visa.svg" alt="" /></button>
            <button className="footer__mc"><img src="./images/mc.svg" alt="" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
