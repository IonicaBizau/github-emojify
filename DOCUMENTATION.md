## Documentation
You can see below the API reference of this module.

### `githubEmojify(input, token, remove)`

#### Params
- **String** `input`: The GitHub owner (user or organization) or a specific repository in the `owner/repo` format.
- **String** `token`: The access token.
- **Boolean** `remove`: If `true`, the first emoji from the description will be removed (if the description starts with emoji).

#### Return
- **EventEmitter** An `EventEmitter` instance emitting the following events:
 - `progress` Some helper messages during the whole process.
 - `finish`: Finished (everything).
 - `error`: A nasty error appeared.
 - `fail`: Updating the description failed.
 - `skip`: The repo is skipped.
 - `repo-done`: Repository updated.

