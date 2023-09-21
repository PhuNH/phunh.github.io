---
title: Staticman
date: "2020-05-13"
tags: [staticman, jekyll, akismet]
---

### Structure
Staticman is the middle man who pushes comments on a GH site as commits from an account (let's call it Staticman-account) to the site's repo. The Staticman-account and repo's account can be the same but are [suggested][trav-downs-acc] to be different. A token or a GitHub app is required to make a commit from the Staticman-account and to read a config file in the site's repo, the `staticman.yml` file.

- `app.json`: describes Staticman so the host knows how to install and deploy it,
- `config.js`: manages configs of Staticman,
- `config.{ENV}.yml`: contains config values for Staticman, env vars can be used instead,
- `*ocker*`: for installing and deploying Staticman using Docker,
- `siteConfig.js`: manages configs of Staticman for the site,
- `staticman.sample.yml`: a sample to create `staticman.yml` which is the site config file and must be put in the site's repo.
- `staticman_key.pub`: key to encrypt sensitive fields in the site config file `staticman.yml`.

### For v2
- Scope of the token: `public_repo` is enough if the site repo is public, otherwise `repo` is needed for accessing a private repo.
  - Travis Downs in [his blog post][trav-downs-token] wrote that `user` is necessary: so far I don't see the reason for that.
  - Ujjwal Verma [noted][ujjwal96-token] to use `admin:repo_hook`: the returned error code would be `GITHUB_CREATING_PR` which means that GitHub could not create a PR with this scope (when `moderation` is on). Or maybe he used a GitHub app instead of a token?

### Other notes
- Webhook payload URL is `/v1/webhook`. This function still works, even though the test request sent by GH after the webhook is added seems to fail.

[trav-downs-acc]: https://travisdowns.github.io/blog/2020/02/05/now-with-comments.html#set-up-github-bot-account
[trav-downs-token]: https://travisdowns.github.io/blog/2020/02/05/now-with-comments.html#generate-personal-access-token
[ujjwal96-token]: https://gist.github.com/ujjwal96/70eabafefa8c2e3f5fa900f352f16c5e
