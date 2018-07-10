# Contributing

Thanks for being willing to contribute!

**Working on your first Pull Request?** You can learn how from this _free_
series [How to Contribute to an Open Source Project on GitHub][egghead]

## Project setup

1.  Fork and clone the repo
2.  Create a branch for your PR
3.  Run `npm run start` to start the development server
4.  Use `./src/integrations/Demo.js` to test your changes
5.  Follow the guidelines below for pushing changes

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/willb335/chessboardjsx.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream," Then
> fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`. Then you
> can make all of your pull request branches based on this `master` branch.
> Whenever you want to update your version of `master`, do a regular `git pull`.

## Committing and Pushing changes

Please make sure to run `npm run commit` before pushing changes. The project uses semantic versioning for documentation and the commit script walks you through the commit message based on the [Angular Git Commit Guidelines][angular] format. You can commit normally by bypassing the githooks using the --no-verify flag.

## Add yourself as a contributor

This project follows the [all contributors][all-contributors] specification. To
add yourself to the table of contributors on the `README.md`, please use the
automated script as part of your PR:

```console
npm run contributors:add
```

Follow the prompt and commit `.all-contributorsrc` and `README.md` in the PR. If
you've already added yourself to the list and are making a new type of
contribution, you can run it again and select the added contribution type.

## Help needed

Please checkout the [the open issues][issues]

Also, please watch the repo and respond to questions/bug reports/feature
requests! Thanks!

The information above is pulled from the popular [downshift][downshift] library.

[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[all-contributors]: https://github.com/kentcdodds/all-contributors
[issues]: https://github.com/willb335/chessboardjsx/issues
[downshift]: https://github.com/paypal/downshift
[angular]: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit
