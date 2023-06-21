import Head from "next/head";
import { Menu } from "../../components/commons/Menu";
import { Footer } from "../../components/commons/Footer";
import { theme, Box, Button, Text, Image } from "../../theme/components";
import pageHOC from "../../components/hoc/pageHOC";
import { cmsService } from "../../infra/cms/cmsService";
import { CMSSectionRender } from "../../infra/cms/CMSSectionRender";

export async function getStaticProps({ preview }) {
  const query = `
    query HomeScreen {
      pageHome {
        pageContent {
          section {
            componentName: __typename
            ... on CommonSeoBlockRecord {
              id
              title
            }
            ... on PageHomeHeroSectionRecord {
              id
              title
              description
              ctatext
              ctalink
            }
            ... on CommonMenuRecord {
              id
            }
            ... on CommonFooterRecord {
              id
            }
          }
        }
      }
    }
  `;

  const { data: cmsContent } = await cmsService({
    query: query,
    preview,
  });

  return {
    props: {
      cmsContent,
    },
  };
}

function HomeScreen() {
  return <CMSSectionRender pageName="pageHome" />;
}

export default pageHOC(HomeScreen);
