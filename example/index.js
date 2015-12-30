const githubEmojify = require("../lib");

// Emojify just one repo
githubEmojify("ionicabizau/git-stats", "your token");

// Emojify all my repos by this owner
githubEmojify("ionicabizau", "your token").on(
    "finish"
  , console.log
);

// Remove emoji from all my repository descriptions
githubEmojify("ionciabizau", "my token", true);
