import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import styles from "../styles/Footer.module.css"

const Footer = props => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" objectFit="cover" layout="fill" alt=""/>
      </div>
      <div className={styles.item}>
      <div className={styles.card}>
        <h2 className={styles.motto}>
          OH YES, WE DID. THE LUIGI'S PIZZA WELL BAKED SLICE OF PIZZA.
          </h2>
         </div>
      <div className={styles.card}> 
      <h1 className={styles.title}>
          FIND OUR RESTAURANTS
          </h1>
          <p className={styles.text}>
          413 8th Ave, New York
              <br/>  NY 10001, United States
              <br/>  111-111-111
          </p>
          <p className={styles.text}>
          421 Amsterdam Ave, New York
              <br/> NY 10024, United States
              <br/> 111-222-112
          </p>
          <p className={styles.text}> 
          1435 Broadway, New York
              <br/> NY 10018, United States
              <br/>  111-333-113
          </p>
          <p className={styles.text}>
          434 E 72nd St, New York
              <br/>  NY 10021, United States
              <br/> 111-444-114
          </p>
      </div>
      <div className={styles.card}>
      <h1 className={styles.title}>
          WORKING HOURS
          </h1>
          <p className={styles.text}>
              MONDAY UNTIL FRIDAY
              <br/> 9:00 - 22:00
          </p>
          <p className={styles.text}>
              SATURDAY - SUNDAY
              <br/> 12:00 - 24:00
          </p>
      </div>
      </div>
    </div>
  )
}

export default Footer
