import Head from "next/head";
import { PostCard, Categories, PostWidget } from "../components";

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
        <div className="col-span-1 col-span-8 lg:">
          {posts.map((post, index) => (
            <PostCard post={post} key={index} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
