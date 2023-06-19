import { createContext, useContext } from "react";
import { get } from "lodash";

const CMSContext = createContext({
  cmsContent: {},
});

export const getCMSContent = (path = "") => {
  const cmsContent = useContext(CMSContext).cmsContent;
  const output = get(cmsContent, path);
  return output;
};

export default function CMSProvider({ cmsContent, children }) {
  return (
    <CMSContext.Provider value={{ cmsContent }}>{children}</CMSContext.Provider>
  );
}
