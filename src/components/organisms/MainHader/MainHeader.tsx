import React from 'react';
import styles from '../MainHader/MainHeader.module.css';
import { Button } from 'primereact/button';
import Image from 'next/image';
import logo from '../../../assets/images/logo.png';

const MainHeader = () => {
  return (
    <div className={styles.mainHeaderContainer}>
        <Image src={logo} alt='Logo' className={styles.logo} width={30} height={30}/>
        <Button icon="pi pi-spin pi-cog" className={styles.buttonConfig} rounded text/>
    </div>
  )
}

export default MainHeader