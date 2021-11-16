import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Counter from '../features/counter/Counter'
import styles from '../styles/Home.module.css'

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Отчеты</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Link href="/indicators"><a>Индикаторы</a></Link>
      </div>
      
      <div>
        <Link href="/dynamics"><a>Динамика продаж</a></Link>
      </div>
    </div>
  )
}

export default IndexPage
