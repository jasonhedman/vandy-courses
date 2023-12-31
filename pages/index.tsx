import Head from 'next/head'

import Layout from "@/components/Layout";
import Home from "@/components/Home";

export default function HomePage() {
  return (
    <>
        <Head>
            <title>Vandy Courses</title>
            <meta name="description" content="Read and write reviews, optimize your course calendar" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout
            authGate
        >
            <Home />
        </Layout>
    </>
  )
}
