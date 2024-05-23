import React, { useEffect } from 'react'
import styles from './SearchSend.module.css'
import axios from 'axios'

const SearchSend = () => {

    const abc=async(e)=>{

        e.preventDefault();

        const formData = new FormData();
        formData.append('input', e.target.input.value);

        // try {
        //     const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/search`, formData, {
        //       headers: {
        //         'Content-Type': 'multipart/form-data'
        //       }
        //     });
        //     console.log('Search made successfully:', response.data);
        //   } catch (error) {
        //     console.error('Error during searching:', error.response.data);
        //   }
    }


  return (
    <form className={styles.form} onSubmit={abc} >

        <input className={styles.input} placeholder='Search the User...' type="text" id='input' name='input' />
        <button className={styles.button} >SEARCH</button>


    </form>
  )
}

export default SearchSend