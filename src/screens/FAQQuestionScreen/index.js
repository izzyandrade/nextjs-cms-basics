import Head from "next/head";
import { Footer } from "../../components/commons/Footer";
import { Menu } from "../../components/commons/Menu";
import { Box, Text, theme } from "../../theme/components";
import { StructuredText, renderNodeRule } from "react-datocms";
import { isHeading } from "datocms-structured-text-utils";
import pageHOC from "../../components/hoc/pageHOC";
import { cmsService } from "../../infra/cms/cmsService";

export async function getStaticPaths({ preview }) {
  const questionsQuery = `
    query ContentFaqQuestion {
      allContentFaqQuestions {
        id
        title
      }
    }
  `;

  const { data } = await cmsService({
    query: questionsQuery,
    preview,
  });

  const paths = data.allContentFaqQuestions.map((question) => ({
    params: { id: question.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, preview }) {
  const { id } = params;

  const contentQuery = `query {
      contentFaqQuestion {
        title
        content {
          value
        }
      }
    }
  `;

  const { data } = await cmsService({
    query: contentQuery,
    preview,
  });

  return {
    props: {
      cmsContent: data,
      id,
      title: data.contentFaqQuestion.title,
      content: data.contentFaqQuestion.content,
    },
  };
}

function FAQQuestionScreen({ cmsContent, title, content }) {
  return (
    <>
      <Head>
        <title>FAQ - Alura</title>
      </Head>

      <Menu />

      <Box
        tag="main"
        styleSheet={{
          flex: 1,
          backgroundColor: theme.colors.neutral.x050,
          paddingTop: theme.space.x20,
          paddingHorizontal: theme.space.x4,
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            gap: theme.space.x4,
            flexDirection: "column",
            width: "100%",
            maxWidth: theme.space.xcontainer_lg,
            marginHorizontal: "auto",
          }}
        >
          <Text tag="h1" variant="heading1">
            {title}
          </Text>
          <StructuredText
            data={content}
            customNodeRules={[
              renderNodeRule(isHeading, ({ node, children, key }) => {
                const tag = `h${node.level}`;
                const variant = `heading${node.level}`;
                return (
                  <Text
                    key={key}
                    tag={tag}
                    variant={variant}
                    styleSheet={{ color: "purple" }}
                  >
                    {children}
                  </Text>
                );
              }),
            ]}
          />
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default pageHOC(FAQQuestionScreen);
