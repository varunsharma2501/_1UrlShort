// varun
const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({
      error: "url is required",
    });
  const shortId = shortid();
  // URL.
  let newUrl = await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitedHistory: [],
    createdBy:req.user._id,
  });

  return res.render("home",{
     id:shortId,
  });

}

async function handleGetAnalytics(req, res) {
  const { shortId } = req.params;
  const result = await URL.findOne({ shortId });
  const dateToBeReturned = result.visitedHistory.map((obj) =>
    new Date(obj.timestamp).toISOString()
  );
  return res.json({
    totalClicks: result.visitedHistory.length,
    analytics: dateToBeReturned,
  });
}

async function handleEditURL(req, res) {
  const body = req.body;
  const { shortUrl } = body;
  const { newUrl } = body;

  if (!shortUrl || !newUrl)
    return res.status(400).json({
      error: "url and newurl required",
    });

  const editObj = await URL.findOneAndUpdate(
    { shortId: shortUrl },
    {
      redirectURL: newUrl,
    },
    {
      new: true,
    }
  );

  // editObj.redirectURL=newUrl;

  return res.json({
    // newUrl:updatedu,
    newUrl: newUrl,
  });
}

async function handleDeleteUrl(req, res) {
  try {
    const deleteUrl = req.params.shortId;
    console.log(deleteUrl)
    const mongoResponse = await URL.deleteOne({ shortId: deleteUrl });
    return res.json({ mongoResponse });
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleEditURL,
  handleDeleteUrl
};
