# sascha-blog

My personal blog website made with Next.js (React), Tailwind CSS, GraphQL and a headless content management system.

## Technical Features

- Static Site Generation (SSG) for Pre-Rendering with Next.js based on React.js
- Tailwind CSS Utility-First Framework for CSS
- GraphQL as Query Language
- GraphCMS as GraphQL headless CMS

## Setup

### Environment Variables

- `NEXT_PUBLIC_GRAPHCMS_ENDPOINT` for the GraphQL data fetching to GraphCMS. The connection URL can be retrieved within the web interface of GraphCMS under settings -> environments -> master environment URL. Also make sure to enable API access within settings -> API Access -> Content API Permissions -> "Yes Initialize with defaults"

## Learnings

### Setup

The project was created using Next.js bootstrap cli command `npx create-next-app -e with-tailwindcss ./`. to bootstrap a pre configured but blank project into the current directory.

### Styling

- The navigation bar uses the tailwindcss command `contents` which will create a phantom container whose children act like direct children of the parent
- The Layout.jsx component is created in such a way that every component can used this through props and the header will always be added above the given component. Thus the redundancy of inserted the header before every view is gone.

### GraphQL & Data fetching

- For data fetching in the browser with GraphQL to the GraphCMS headless CMS the package graphql-request is used within the `service` folder.
- Instead of writing out the nested graphql queries yourself it is much easier to use the GraphCMS API Playground feature and just select all the data you want to retrieve and get the finished query structured out already. You can click the play button there to see real time data of your response to double check.
- For executing the data fetching instead of writing a useEffect the next.js way is to outsource the function into a getStaticProps() async function outside of the page function but within the page file like this:

```javascript
export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}
```

- For sending http requests and data to GraphCMS the in Next.js integrated serverless backend (when hosted at Vercel) is used and can be found within the pages/api folder. Also another token for the API is needed and can be found within the GraphCMS platform under settings -> Permanent Auth Tokens -> Permanent Auth Tokens -> Create Token. Then go within these settings into Content API Permissions -> Create permission and tick all checkboxes there (read, create, update, delete, publish, unpublish, read versions) and click Create.

### Next.js

- When using dynamic pages like `[slug].js` and using `getStaticProps` for data fetching you will also need to implement `getStaticPath` like described below. So Next.js knows about all possible dynamic path that are available for routing so that it can statically render and prepare them.

```javascript
export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}
```

- Images can be inserted for Static Site Generation (SSG) with the NextJS `import Image from "next/image";`. To keep the quality and aspect ratio as it is the `unoptimized` prop can be applied.

### React.js

- When input data like in a comment form does not need to be persisted within the app state but should be sent directly to the database or in this case the GraphCMS it can be more efficient to use the `useRef` hook and create the input elements like `const commentElement = useRef()`. The input state does not need to be tracked within the component state in these cases.
