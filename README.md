[![github-emojify](http://i.imgur.com/CIeDHAi.png)](#)

# `$ github-emojify` [![Support this project][donate-now]][paypal-donations]

Emojify your GitHub repository descriptions.

[![github-emojify](http://i.imgur.com/sLiyIOK.png)](#)

## Installation

You can install the package globally and use it as command line tool:

```sh
$ npm i -g github-emojify
```

Then, run `github-emojify --help` and see what the CLI tool can do.

```sh
$ github-emojify --help
Usage: github-emojify [options]

Options:
  -i, --input <owner[/repo]>  The GitHub username or repository full name
                              (owner/repo).                              
  -t, --token <token>         Your GitHub token. Generate one here:      
                              https://github.com/settings/tokens/new     
  -r, --remove                Remove first emoji from the description.   
  -h, --help                  Displays this help.                        
  -v, --version               Displays version information.              

Examples:
  # Emojify just one  repository description
  github-emojify -i ionicabizau/git-stats
  # Emojify all my repository descriptions
  github-emojify -i ionicabizau

Enjoy the emoji spirit!

Documentation can be found at https://github.com/IonicaBizau/github-emojifiy#readme
```

## Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md