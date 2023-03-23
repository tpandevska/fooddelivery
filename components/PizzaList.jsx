import React from 'react'
import styles from "../styles/PizzaList.module.css"
import PizzaCard from './PizzaCard'

const PizzaList = ({pizzaList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
        <p className={styles.desc}>
        The Luigi's pizzeria was born with the aim of bringing into your homes a traditional product enriched with PASSION and QUALITY. The PASSION of our pizza makers will allow you to enjoy a highly digestible pizza studied in detail, always following tradition. The QUALITY of our ingredients is SPECIAL, we are never satisfied. We always look for the best for each single product. These factors make our work wonderful and our pizza UNIQUE.
        </p>
        <div className={styles.wrapper}>
            {pizzaList.map((pizza) => (
                 <PizzaCard key={pizza._id} pizza={pizza}/>
            ))}
        </div>
    </div>
  )
}

export default PizzaList
