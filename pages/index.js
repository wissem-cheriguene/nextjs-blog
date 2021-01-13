import Head from 'next/head'
// import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import Date from '../components/date'
import { getPosts } from '../lib/posts'

export async function getStaticProps(context) {
  const res = await fetch('https://newsapi.org/v2/top-headlines?country=fr&apiKey=df4115a6e0454b86a29740271132028c')
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}

export default function Blog({ data }) {
  console.log(data.articles)
  return (
    <>
      <Head>
        <title>News</title>
      </Head>
      <h1 className="text-center text-black text-5xl font-bold p-4">
        Actualités
      </h1>
      <div className="container px-4 md:px-0 max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between pt-12 -mx-6 mx-0 sm:mx-6">
        {data.articles.map((post, index) => (
          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink" key={index}>
              <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                <a href={post.url} className="flex flex-wrap no-underline hover:no-underline">
                  <img src={post.urlToImage} className="h-64 w-full rounded-t pb-6"/>
                  <p className="w-full text-gray-600 text-xs md:text-sm px-6">{post.author}</p>
                  <div className="w-full  font-bold text-xl text-gray-900 px-6">{post.title}</div>
                  <p className="text-gray-800 font-serif text-base px-6 mb-5">
                  {post.description}
                  </p>
                </a>
              </div>
              <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 text-xs md:text-sm">      
                    <Date dateString={post.publishedAt} />
                  </p>
                </div>
              </div>
          </div>
        ))}
        </div>
      </div>
    </>
  )
}