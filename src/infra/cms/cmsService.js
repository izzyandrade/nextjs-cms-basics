const globalQuery = `query {
  globalFooter {
    description
  }
}`;

const BASE_ENDPOINT = "https://graphql.datocms.com/";
const PREVIEW_ENDPOINT = "https://graphql.datocms.com/preview";

function getEndpoint(preview) {
  return preview ? PREVIEW_ENDPOINT : BASE_ENDPOINT;
}

export async function cmsService({ query, preview }) {
  try {
    const response = await fetch(getEndpoint(preview), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
      },
      body: JSON.stringify({ query: query }),
    }).then(async (res) => {
      const body = await res.json();
      if (!body.errors) return body;
      throw new Error(JSON.stringify(body));
    });

    const globalResponse = await fetch(getEndpoint(preview), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
      },
      body: JSON.stringify({ query: globalQuery }),
    }).then(async (res) => {
      const body = await res.json();
      if (!body.errors) return body;
      throw new Error(JSON.stringify(body));
    });
    return {
      data: {
        ...response.data,
        globalContent: {
          ...globalResponse.data,
        },
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
