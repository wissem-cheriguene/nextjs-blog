// This function gets called at build time
export async function getPosts() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://newsapi.org/v2/top-headlines?country=fr&apiKey=df4115a6e0454b86a29740271132028c')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      ...posts,
    },
  }
}