---
layout: post
title: Staticman
mtime: "2020-05-13"
tags: [staticman, jekyll, akismet]
---

### Structure
Staticman is the middle man who pushes comments on a GH site as commits from an account (let's call it Staticman-account) to the site's repo. The Staticman-account and repo's account can be the same but are [suggested][trav-downs-acc] to be different. A token or a GitHub app is required to make a commit from the Staticman-account and to read a config file in the site's repo, the _staticman.yml_ file.

- _app.json_: describes Staticman so Heroku knows how to install and deploy it,
- _config.js_: manages configs of Staticman,
- _config.{ENV}.yml_: contains config values for Staticman, env vars can be used instead,
- _\*ocker\*_: for installing and deploying Staticman using Docker,
- _siteConfig.js_: manages configs of Staticman for the site,
- _staticman.sample.yml_: a sample to create _staticman.yml_ which is the site config file and must be put in the site's repo.
- _staticman\_key.pub_: key to encrypt sensitive fields in the site config file _staticman.yml_.

### For v2
- Scope of the token: `public_repo` is enough if the site repo is public, otherwise `repo` is needed for accessing a private repo.
  - Travis Downs in [his blog post][trav-downs-token] wrote that `user` is necessary: so far I don't see the reason for that.
  - Ujjwal Verma [noted][ujjwal96-token] to use `admin:repo_hook`: the returned error code would be `GITHUB_CREATING_PR` which means that GitHub could not create a PR with this scope (when `moderation` is on). Or maybe he used a GitHub app instead of a token?

### Other notes
- Webhook payload URL is `/v1/webhook`. This function still works, even though the test request sent by GH after the webhook is added seems to fail.
- The site URL set up on Akismet and the `akismet.site` config should both be the URL of where you host Staticman. The comment form sends form data to Staticman at this URL, Akismet also tries to catch spams at this URL, those `akismet` fields in _staticman.yml_ are for Akismet to know what data it receives.

[trav-downs-acc]: https://travisdowns.github.io/blog/2020/02/05/now-with-comments.html#set-up-github-bot-account
[trav-downs-token]: https://travisdowns.github.io/blog/2020/02/05/now-with-comments.html#generate-personal-access-token
[ujjwal96-token]: https://gist.github.com/ujjwal96/70eabafefa8c2e3f5fa900f352f16c5e
