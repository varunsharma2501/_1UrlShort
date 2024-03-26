const URL = require("../models/url");
async function redirectController(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortId,
    },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );
  if (!entry) return res.json({ error: "not found" });
  else {
    res.redirect(entry.redirectURL);
  }
}

module.exports = {
  redirectController,
};
