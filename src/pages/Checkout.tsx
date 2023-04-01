import React, { FC, useState } from "react";
import { IGood } from "../models/model";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { cartActions } from "../store/reducers/CartSlice";
import "../style/checkout.scss";
import ModalDash from "../UI/ModalDash";

const Checkout: FC = () => {
  const [active, setActive] = useState(false);

  let cartGoods = useAppSelector((state) => state.cartSlice.cartItems);
  const totalAmount = useAppSelector((state) => state.cartSlice.totalAmount);

  const dispatch = useAppDispatch();

  // удаление товара
  const deleteProduct = (good: IGood) => {
    dispatch(cartActions.deleteItem(good.barcode));
  };

  // минус
  const decrease = (good: IGood) => {
    dispatch(cartActions.minusItem(good.barcode));
  };
  // плюс
  const increase = (good: IGood) => {
    dispatch(cartActions.plusItem(good.barcode));
  };

  // очистка корзины
  const thanksAndClearCart = () => {
    dispatch(cartActions.clearCart())
    setActive(true)
  }

  return (
    <div className="container">
      <div className="hlebnie__kroshki">
        <h4>Главная</h4>
        <h4>Корзина</h4>
      </div>

      <div className="check__title">
        <h2>Корзина</h2>
      </div>

      {cartGoods.map((good: IGood) => (
        <div className="check__content" key={good.barcode}>
          <div className="check__img">
            <img src={good.url} alt="" />
          </div>
          <div className="check__info">
            <span>
              {good.size} {good.sizeType === "вес" ? "г" : "мл"}
            </span>
            <h3>
              {good.name} {good.description}
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              interdum ut justo, vestibulum sagittis iaculis iaculis. Quis
              mattis vulputate feugiat massa vestibulum duis.
            </p>
          </div>
          <div className="check__price">
            <span onClick={() => decrease(good)}>-</span>
            <p>{good.quantity}</p>
            <span onClick={() => increase(good)}>+</span>
            <h3>{good.price * Number(good.quantity)} ₸</h3>
            <button onClick={() => deleteProduct(good)}>
              <img src={`${process.env.PUBLIC_URL}/images/trashcan.svg`} alt="" />
            </button>
          </div>
        </div>
      ))}

      <div className="check__content"></div>

      <div className="check__buy">
        <button onClick={thanksAndClearCart}>Оформить заказ</button>
        <h3>{totalAmount} ₸</h3>
      </div>

      <ModalDash active={active} setActive={setActive}>
        <button className="double__wings" onClick={() => setActive(false)}>
          <img src={`${process.env.PUBLIC_URL}/images/wings.svg`} alt="" />
        </button>
        <h3>Спасибо за заказ</h3>
        <span>Наш менеджер свяжется с вами в ближайшее время</span>
      </ModalDash>
    </div>
  );
};

export default Checkout;
