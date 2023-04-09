import React from 'react'

const CardItem = ({good, decrease, increase, count}: any) => {
  return (
    <div className="card__content">
    <div className="card__img">
      <img src={`${process.env.PUBLIC_URL}${good?.url}`} alt="" />
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
  )
}

export default CardItem