import React, { FC, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { IGood } from "../models/model";
import data from "../bd.json"
import "../style/card.scss";
import { useAppDispatch } from "../store/hooks/redux";
import { cartActions } from "../store/reducers/CartSlice";
import ButtonToCart from "../UI/ButtonToCart";
import CardItem from "../components/CardItem";

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
        <ButtonToCart onClick={addToCart}/>

        <CardItem good={good} decrease={decrease} increase={increase} count={count}/>
      </div>
    </div>
  );
};

export default Card;
