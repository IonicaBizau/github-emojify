const GitHub = require("gh.js")
    , EventEmitter = require("events").EventEmitter
    , sameTime = require("same-time")
    , bindy = require("bindy")
    , startsWithEmoji = require("starts-with-emoji")
    , emojiFromText = require("emoji-from-text")
    , couleurs = require("couleurs")()
    ;

/**
 * githubEmojify
 *
 * @name githubEmojify
 * @function
 * @param {String} input The GitHub owner (user or organization) or a specific repository in the `owner/repo` format.
 * @param {String} token The access token.
 * @param {Boolean} remove If `true`, the first emoji from the description will be removed (if the description starts with emoji).
 * @return {EventEmitter} An `EventEmitter` instance emitting the following events:
 *
 *  - `progress` Some helper messages during the whole process.
 *  - `finish`: Finished (everything).
 *  - `error`: A nasty error appeared.
 *  - `fail`: Updating the description failed.
 *  - `skip`: The repo is skipped.
 *  - `repo-done`: Repository updated.
 *
 */
module.exports = function githubEmojify(input, token, remove) {
    var gh = new GitHub({ token: token })
      , ev = new EventEmitter()
      , user = input
      , repo = null
      , splits = user.split("/")
      ;

    // owner/repo
    if (splits.length > 1) {
        user = splits[0];
        repo = splits[1];
    }

    // Everything done
    function done() {
        ev.emit("finish", "Done.");
    }

    // Check error
    function checkErr(err) {
        if (err) {
            ev.emit("error", err);
            return true;
        }
    }

    // Update a single repo
    function updateRepo(repo, fn) {
        var path = `repos/${repo.full_name}`;
        gh.get(path, (err, data) => {
            if (checkErr(err)) { return fn(err); }

            var description = data.description || ""
            if (startsWithEmoji(description) && !remove) {
                ev.emit("skip", `Skipping ${couleurs.bold(repo.full_name)} because its description already starts with emoji.`);
                return fn();
            }

            var descEmoji = Object(emojiFromText(description, true)).match
              , newDescription = remove ? description.replace(startsWithEmoji.regex(), "").trim() : `${descEmoji} ${description}`
              ;

            if (!descEmoji && !remove) {
                ev.emit("fail", "Cannot get a relevant emoji for this repo: " + couleurs.bold(data.full_name));
                return fn(new Error("Cannot get a relevant emoji."));
            }

            if (remove && newDescription === data.description) {
                ev.emit("skip", `Skipping ${couleurs.bold(repo.full_name)} because its description doesn't start with emoji.`);
                return fn();
            }

            gh.get(path, {
                data: {
                    description: newDescription
                  , name: data.name
                }
            }, (err, data) => {
                if (checkErr(err)) { return fn(err); }
                if (remove) {
                    ev.emit("repo-done", `Removed the first emoji from ${couleurs.bold(repo.full_name)}'s description.`);
                } else {
                    ev.emit("repo-done", `Added ${couleurs.bold(descEmoji.emoji.char)} (${couleurs.bold(descEmoji)}) to ${couleurs.bold(repo.full_name)}'s description.`);
                }
                fn(err, data);
            });
        });
    }

    // Update all repositories by this owner
    if (!repo) {
        process.nextTick(ev.emit.bind(ev), "progress", "Getting all the repos.");
        gh.get(`users/${user}/repos`, { all: true }, (err, repos) => {
            if (checkErr(err)) {
                return done();
            }
            sameTime(bindy(repos, updateRepo), done);
        });
    } else {
        updateRepo({
            full_name: `${user}/${repo}`
        }, done);
    }

    return ev;
};
