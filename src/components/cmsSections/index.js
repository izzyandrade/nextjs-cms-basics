import { Footer } from "../commons/Footer";
import { Menu } from "../commons/Menu";
import { PageHomeHeroSection } from "./PageHome/HeroSection";
import { PageFAQDisplayQuestions } from "./PageFaq/DisplayQuestionsSection";
import { SEOBlock } from "./SeoBlock";

export const cmsSections = {
  CommonSeoBlockRecord: (props) => <SEOBlock {...props} />,
  CommonMenuRecord: (props) => <Menu {...props} />,
  CommonFooterRecord: (props) => <Footer {...props} />,
  PageHomeHeroSectionRecord: (props) => <PageHomeHeroSection {...props} />,
  PageFaqDisplayQuestionSectionRecord: (props) => (
    <PageFAQDisplayQuestions {...props} />
  ),
};
