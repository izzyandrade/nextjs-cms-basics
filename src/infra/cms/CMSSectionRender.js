import { getCMSContent } from "./CMSProvider";
import { cmsSections } from "../../components/cmsSections";

export function CMSSectionRender({ pageName }) {
  const sections = getCMSContent(`${pageName}.pageContent[0].section`);

  return sections.map((section) => {
    const Component = cmsSections[section.componentName];

    return <Component {...section} key={section.id} />;
  });
}
