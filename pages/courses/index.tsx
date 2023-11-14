import Head from 'next/head'

import Layout from "@/components/Layout";
import Courses from "@/components/Courses";

export default function CoursePage() {
  return (
    <>
        <Head>
            <title>Vandy Courses - Courses</title>
            <meta name="description" content="Read and write reviews, optimize your course calendar" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout
            authGate
        >
            <Courses />
        </Layout>
    </>
  )
}
