export default async function handler(req, res) {
  const previousPage = req.headers.referer;
  if (req.preview) {
    console.log("removing");
    res.clearPreviewData();
    res.writeHead(307, { Location: previousPage });
    res.end();
  } else {
    console.log("setting");
    res.setPreviewData({});
    res.writeHead(307, { Location: previousPage });
    res.end();
  }
}
