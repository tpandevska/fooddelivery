import React from 'react'
import styles from "../../styles/Product.module.css"
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'

const Product = ({ pizza, admin }) => {
    const [price, setPrice] = useState(pizza.prices[0]);
    const [size, setSize] = useState(0);
    const [extras, setExtras] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
   
    const changePrice = (number) => {
        setPrice(price + number);
    }

    const handleSize = (sizeIndex) => {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size];
        setSize(sizeIndex);
        changePrice(difference);
    }

    const handleChange = (e, option) => {
        const checked = e.target.checked;

        if (checked) {
            changePrice(option.price);
            setExtras(prev => [...prev, option])
        } else {
            changePrice(-option.price);
            setExtras(extras.filter(extra => extra._id !== option._id));
        }
    }

    const handleClick = () => {
        dispatch(addProduct({ ...pizza, extras, price, quantity }));
    };

    // State for the update modal
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    // Function to open the update modal
    const openUpdateModal = () => {
        setIsUpdateModalOpen(true);
    };

    // Function to close the update modal
    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
    };

    const [updatedTitle, setUpdatedTitle] = useState(pizza.title);
    const [updatedDesc, setUpdatedDesc] = useState(pizza.desc);
    const [updatedExtras, setUpdatedExtras] = useState([...pizza.extraOptions]);
    const [updatedPrices, setUpdatedPrices] = useState([...pizza.prices]);
    const [updatedFile, setUpdatedFile] = useState(pizza.img);

    // Function to handle file input change
    const handleFileChange = (e) => {
        setUpdatedFile(e.target.files[0]);
    };

    const handlePriceChange = (e, sizeIndex) => {
        const newPrices = [...updatedPrices];
        newPrices[sizeIndex] = parseFloat(e.target.value);
        setUpdatedPrices(newPrices);
    };


    const addNewExtra = () => {
        const newExtra = { text: '', price: 0 }; 
        setUpdatedExtras([...updatedExtras, newExtra]);
    };

    
    const deleteExtra = (index) => {
        const updatedExtrasCopy = [...updatedExtras];
        updatedExtrasCopy.splice(index, 1);
        setUpdatedExtras(updatedExtrasCopy);
    };

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("file", updatedFile); 
        formData.append("title", updatedTitle); 
        formData.append("desc", updatedDesc); 
        formData.append("extras", JSON.stringify(updatedExtras)); 
        formData.append("prices", JSON.stringify(updatedPrices)); 

        axios
            .put(`http://localhost:3000/api/products/${pizza._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log('Product updated successfully:', response.data);
                closeUpdateModal();
            })
            .catch((error) => {
                console.error('Error updating product:', error);
            });
    };

    return (
        <div className={styles.container}>
            <div>
                  {/* {admin && (<button className={styles.editButton} onClick={openUpdateModal}>
                    Edit
                </button>
                  )} */}
                <button className={styles.editButton} onClick={openUpdateModal}>
                    Edit
                </button>
                {isUpdateModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <span className={styles.close} onClick={closeUpdateModal}>
                                &times;
                            </span>
                            <h2>Edit Product</h2>
                            <div className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Title:</label>
                                    <input
                                        type="text"
                                        value={updatedTitle}
                                        onChange={(e) => setUpdatedTitle(e.target.value)}
                                    />
                                    <label className={styles.label}>Description:</label>
                                    <textarea
                                        rows={5}
                                        cols={50}
                                        value={updatedDesc}
                                        onChange={(e) => setUpdatedDesc(e.target.value)}
                                    />
                                    <label className={styles.label}>Prices:</label>
                                    <div className={styles.priceContainer}>
                                        <input
                                            className={`${styles.input} ${styles.inputSm}`}
                                            type="number"
                                            placeholder="Small"
                                            value={updatedPrices[0]}
                                            onChange={(e) => handlePriceChange(e, 0)}
                                        />
                                        <input
                                            className={`${styles.input} ${styles.inputSm}`}
                                            type="number"
                                            placeholder="Medium"
                                            value={updatedPrices[1]}
                                            onChange={(e) => handlePriceChange(e, 1)}
                                        />
                                        <input
                                            className={`${styles.input} ${styles.inputSm}`}
                                            type="number"
                                            placeholder="Large"
                                            value={updatedPrices[2]}
                                            onChange={(e) => handlePriceChange(e, 2)}
                                        />
                                    </div>
                                    <label className={styles.label}>Extras:</label>
                                <div className={styles.extraOptions}>
                                    {/* Display existing extras */}
                                    {updatedExtras.map((extra, index) => (
                                        <div key={index} className={styles.extraOption}>
                                            <input
                                                type="text"
                                                placeholder="Extra Name"
                                                value={extra.text}
                                                onChange={(e) => {
                                                    const updatedExtrasCopy = [...updatedExtras];
                                                    updatedExtrasCopy[index].text = e.target.value;
                                                    setUpdatedExtras(updatedExtrasCopy);
                                                }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Price"
                                                value={extra.price}
                                                className={styles.extraPrice}
                                                onChange={(e) => {
                                                    const updatedExtrasCopy = [...updatedExtras];
                                                    updatedExtrasCopy[index].price = parseFloat(e.target.value);
                                                    setUpdatedExtras(updatedExtrasCopy);
                                                }}
                                            />
                                            {/* {index < extras.length && (
                                                <button onClick={() => deleteExtra(index)}>Delete</button>
                                            )} */}
                                    
                                        </div>
                                        
                                    ))}
                                    <button onClick={addNewExtra}>Add New Extra</button>
                                </div>

                                    <label className={styles.label}>Image:</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <button className={styles.updateButton} onClick={handleUpdate}>Update Product</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.left}>

                <div className={styles.imgContainer}>
                    <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{pizza.title}</h1>
                <span className={styles.price}>${price}</span>
                <p className={styles.desc}>{pizza.desc}</p>
                <h3 className={styles.choose}>Choose the size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={() => handleSize(0)}>
                        <Image src="/img/size.png" layout="fill" alt="" />
                        <span className={styles.number}>Small</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(1)}>
                        <Image src="/img/size.png" layout="fill" alt="" />
                        <span className={styles.number}>Medium</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(2)}>
                        <Image src="/img/size.png" layout="fill" alt="" />
                        <span className={styles.number}>Large</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Choose additional ingredients</h3>
                <div className={styles.ingredients}>
                    {pizza.extraOptions.map((option) => (
                        <div className={styles.option} key={option._id}>
                            <input
                                type="checkbox"
                                id={option.text}
                                name={option.text}
                                className={styles.checkbox}
                                onChange={(e) => handleChange(e, option)}
                            />
                            <label htmlFor="double">{option.text}</label>
                        </div>
                    ))}
                </div>
                <div className={styles.add}>
                    <input onChange={(e) => setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity} />
                    <button className={styles.button} onClick={handleClick}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ params },ctx) => {

    let admin = false;

    if (ctx && ctx.req && ctx.req.cookies) {
        const myCookie = ctx.req.cookies;
        if (myCookie.token === process.env.TOKEN) {
            admin = true;
        }
    }

    const res = await axios.get(
        `http://localhost:3000/api/products/${params.id}`
    );
    return {
        props: {
            pizza: res.data,
            admin
        }
    }
}


export default Product