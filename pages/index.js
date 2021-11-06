import Head from "next/head";

const posts = [
  { title: "My first Post", excerpt: "Hello World!" },
  { title: "My second Post", excerpt: "Hello World2!" },
  { title: "My third Post", excerpt: "Hello World3!" },
];

export default function Home() {
  return (
    <div className="container px-10 mx-auto mb-8 bg-gray-300">
      <Head>
        <title>SaschaWebDev - Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {posts.map((post, index) => (
          <div key={index}>
            {post.title}
            {post.excerpt}
          </div>
        ))}
      </div>
    </div>
  );
}
