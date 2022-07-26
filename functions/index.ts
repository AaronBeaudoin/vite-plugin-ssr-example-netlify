import { Handler } from "@netlify/functions";
import { renderPage } from "vite-plugin-ssr";

export const handler: Handler = async event => {
  const pageContext = await renderPage({ url: event.rawUrl });
  if (!pageContext.httpResponse) return { statusCode: 200 };
  console.log(pageContext.httpResponse.statusCode, event.rawUrl);
  
  return {
    statusCode: pageContext.httpResponse.statusCode,
    headers: { "Content-Type": pageContext.httpResponse.contentType },
    body: pageContext.httpResponse.body
  };
};
