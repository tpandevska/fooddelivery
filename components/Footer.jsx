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
              PARTIZANSKI ODREDI #197. 
              <br/> SKOPJE, 1000
              <br/> (389) 111-1111
          </p>
          <p className={styles.text}>
              NARODEN FRONT #10. 
              <br/> BITOLA, 2000
              <br/> (389) 111-1112
          </p>
          <p className={styles.text}>
              KLIMENT OHRIDSKI #104. 
              <br/> STRUMICA, 2400
              <br/> (389) 111-1113
          </p>
          <p className={styles.text}>
              LENINOVA #25. 
              <br/> STIP, 1400
              <br/> (389) 111-1114
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
