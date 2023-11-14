import Head from 'next/head'

import Layout from "@/components/Layout";
import Admin from "@/components/Admin";

export default function AdminPage() {
    return (
        <>
            <Head>
                <title>Vandy Courses - Admin</title>
                <meta name="description" content="Read and write reviews, optimize your course calendar" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout
                authGate
            >
                <Admin />
            </Layout>
        </>
    )
}
