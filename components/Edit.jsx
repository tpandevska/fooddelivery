import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from "../../styles/Product.module.css"

const Edit = () => {
    const router = useRouter();
    const { id } = router.query;

    const [product, setProduct] = useState({
        title: '',
        desc: '',
        prices: [],
        extraOptions: [],
        img: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (id) {
            // Fetch the product data by its ID from your API
            axios.get(`http://localhost:3000/api/products/${id}`)
                .then((response) => {
                    const fetchedProduct = response.data;
                    setProduct(fetchedProduct);
                })
                .catch((error) => {
                    console.error('Error fetching product data:', error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleUpdate = () => {
        console.log('Updating product:', product); // Log the product data before sending the update request
        axios.put(`http://localhost:3000/api/products/${id}`, product)
            .then((response) => {
                console.log('Product updated successfully:', response.data);
                setIsModalOpen(false);
                router.push(`/product/${id}`);
            })
            .catch((error) => {
                console.error('Error updating product:', error);
            });
    };

    const openModal = () => {
        console.log('Modal opened'); // Add this line for debugging
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <h1>Edit Product</h1>
            <button onClick={openModal}>Edit</button>
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={closeModal}>
                            &times;
                        </span>
                        <h2>Edit Product</h2>
                        <div className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={product.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <button className={styles.updateButton} onClick={handleUpdate}>Update Product</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Edit;
