import React from "react";
import Head from "next/head";

type Props = {
  title: string;
  description?: string;
  url?: string;
  image?: string;
};

export default function SEO({ title, description, url, image }: Props) {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
    </Head>
  );
}
