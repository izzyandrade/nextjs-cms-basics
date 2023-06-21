import { Footer } from "../commons/Footer";
import { Menu } from "../commons/Menu";
import { PageHomeHeroSection } from "./PageHome/HeroSection";
import { SEOBlock } from "./SeoBlock";

export const cmsSections = {
  CommonSeoBlockRecord: (props) => <SEOBlock {...props} />,
  PageHomeHeroSectionRecord: () => <PageHomeHeroSection />,
  CommonMenuRecord: (props) => <Menu {...props} />,
  CommonFooterRecord: (props) => <Footer {...props} />,
};
