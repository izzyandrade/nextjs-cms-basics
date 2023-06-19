import CMSProvider from "../../infra/cms/CMSProvider";

export default function pageHOC(Component) {
  return function Page(props) {
    return (
      <CMSProvider cmsContent={props.cmsContent}>
        <Component {...props} />
      </CMSProvider>
    );
  };
}
