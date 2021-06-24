import React from 'react'
import Head from 'next/head'
import Header from 'components/header/header'
import Hero from 'components/hero'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({
  children
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Image Viewer - Willy Da Conceicao</title>
      </Head>
      <div className="container mx-auto min-h-screen">
        <Header />
        <Hero />
        {children}
      </div>
    </>
  )
}

export default Layout
