import { getCMSContent } from "./CMSProvider";
import { cmsSections } from "../../components/cmsSections";

export function CMSSectionRender({ pageName }) {
  const sections = getCMSContent(`${pageName}.pageContent[0].section`);

  console.log(sections);

  return sections.map((section) => {
    const Component = cmsSections[section.componentName];

    if (!Component) return null;

    return <Component {...section} key={section.id} />;
  });
}
