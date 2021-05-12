---
title: Firefox
date: "2020-07-03"
tags: [firefox, configs]
---

### Configs
- **dom.event.clipboardevents.enabled = true**
  - for Messenger to track when something is pasted to the text box. Pasting between a pair of dots can help if set to `false`.
- **network.cookie.cookieBehavior = 0 or 4, != 1 and 2** (default 4 meaning blocking cross-site cookies and social media trackers, 0 means accepting all cookies, whether from originating site or not)
  - for Messenger to stay signed in,
  - for CodeReady (OpenShift with Eclipse Che) to open a workspace.
- **network.http.referer.XOriginPolicy = 0** (send _Referer_ header whether the hostnames match or not)
  - for iCloud.com to be able to login. When the user is logged in already, it's not required anymore.
- **privacy.firstparty.isolate = false** (tracking across domains)
  - for Grammarly plugin to stay signed in,
  - for Disqus on websites to work.
- **privacy.resistFingerprinting = true**
  - makes it a requirement for websites to ask for HTML5 canvas extraction permission without which text in Notes on iCloud.com is not displayed properly,
  - that permission is also required for Whatsapp Web version to show the QR code,
  - makes Firefox to report UTC time to websites,
  - makes Zoom show a white screen instead of the video and shared screen,
  - fixes the user-agent to version 68 and Windows 10.
- **webgl.disabled = false**
  - needs to be `true` for Notes on iCloud.com to be able to open.
- WebRTC is required to call in Messenger. **media.navigator.enabled** is not.
