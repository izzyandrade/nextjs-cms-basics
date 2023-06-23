import Head from "next/head";
import { Footer } from "../../components/commons/Footer";
import { Menu } from "../../components/commons/Menu";
import { Box, Text, Link, Image, theme } from "../../theme/components";
import { cmsService } from "../../infra/cms/cmsService";
import CMSProvider from "../../infra/cms/CMSProvider";
import pageHOC from "../../components/hoc/pageHOC";
import { CMSSectionRender } from "../../infra/cms/CMSSectionRender";

export async function getStaticProps({ preview }) {
  const categoryQuery = `
    query FaqScreen {
      pageFaq {
        id
        pageContent {
          id
          section {
            componentName: __typename
            ... on CommonSeoBlockRecord {
              id
              title
            }
            ... on CommonFooterRecord {
              id
            }
            ... on PageFaqDisplayQuestionSectionRecord {
              id
              categories {
                id
                title
                questions {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
  `;

  const { data: cmsContent } = await cmsService({
    query: categoryQuery,
    preview,
  });

  return {
    props: {
      cmsContent,
    },
  };
}

function FAQAllQuestionsScreen({ pageContent, globalContent, cmsContent }) {
  return <CMSSectionRender pageName="pageFaq" />;
}

export default pageHOC(FAQAllQuestionsScreen);
