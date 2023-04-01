import React, { FC, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { IGood } from "../models/model";
import data from "../bd.json"
import "../style/card.scss";
import { useAppDispatch } from "../store/hooks/redux";
import { cartActions } from "../store/reducers/CartSlice";

const Card: FC = () => {
  const [good, setGood] = useState<IGood>()
  const [count, setCount] = useState(1)

  const params: any = useParams()
  
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    specificGood()
  })

  // инфа о конкретном товаре
  function specificGood() {
    const fData = data.filter(item => item.barcode.toString().includes(params.id))
    setGood(fData[0])
  }

  // счетчик
  function decrease () {
    if (count !== 1) {
      setCount(count - 1)
    }
  }
  function increase () {
      setCount(count + 1)
  }

  
  // добавление в корзину
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        barcode: good?.barcode,
        url: good?.url,
        name: good?.name,
        description: good?.description,
        price: good?.price,
        size: good?.size,
        sizeType: good?.sizeType,
        quantity: count
      }
      )
    );
  };

  return (
    <div className="container">
      <div className="hlebnie__kroshki">
        <h4>Главная</h4>
        <h4>Каталог</h4>
        <h4>{good?.name}</h4>
      </div>

      <div className="card">
        <button onClick={addToCart}>
          В корзину
          <img src={`${process.env.PUBLIC_URL}/images/cart_mini.svg`} alt="пропала картинка" />
        </button>

        <div className="card__content">
          <div className="card__img">
            <img src={`../${good?.url}`} alt="" />
          </div>

          <div className="card__info">
            <h4>В наличии</h4>
            <h2>{good?.name}<span>{good?.description}</span></h2>
            <span className="card__ves">{good?.size} {good?.sizeType === "вес" ? "г" : "мл"}</span>
            <div className="card__price">
              <h3>{good?.price} ₸</h3>
              <span onClick={decrease}>-</span>
              <p>{count}</p>
              <span onClick={increase}>+</span>
            </div>
            <div className="card__trash">
              <span><img src={`${process.env.PUBLIC_URL}/images/link.svg`} alt="" /></span>
              <span>При покупке от &nbsp;<strong>10 000 ₸</strong>&nbsp; бесплатная <br></br> доставка по Кокчетаву и области</span>
              <span>Прайс-лист<img src={`${process.env.PUBLIC_URL}/images/arrow_down-grey.svg`} alt="" /></span>
            </div>
            <div className="char">
              <p>Производитель: <span>{good?.maker}</span></p>
              <p>Бренд: <span>{good?.brend}</span></p>
              <p>Штрихкод: <span>{good?.barcode}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
