import React from 'react'
import Image from 'next/image'
import styles from "../styles/Navbar.module.css"
import { useSelector } from 'react-redux'
import Link from 'next/link'

const Navbar = props => {

  const quantity = useSelector(state => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
      <div className={styles.callButton}>
        <Image src="/img/telephone.png" alt="" width="32" height="32"/>
      </div>
      <div className={styles.texts}>
      <div className={styles.text}>ORDER NOW!</div>
      <div className={styles.text}>(389) 111 1111</div>
      </div> 
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/">
          <li className={styles.listItem}>HomePage</li>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Link href="/">
          <li className={styles.listItem}>
          <Image src="/img/logo.png" width="160px" height="69px"/>
          </li>
          </Link>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Content</li>
        </ul>
      </div>
      <Link href="/cart" passHref>
      <div className={styles.item}>
        <div className={styles.cart}>
        <Image src="/img/cart.png" width="30px" height="30px"/>
        <div className={styles.counter}>{quantity}</div>
        </div>
      </div>
      </Link>
      </div>
  )
}



export default Navbar