---
layout: post
title: "Toggle KRunner in Plasma 5.17"
date: 2020-03-25 12:00:00 +0100
tags: [kde, plasma 5.17, krunner, workaround]
---

On my Fedora KDE machine, I use KRunner instead of the Application Menu to launch programs, since it can also do other stuff like executing commands, calculating expressions, etc., which is quite convenient.

Previously on Plasma 5.16, setting Meta key shortcut to `org.kde.kglobalaccel,/component/krunner,,invokeShortcut,run command` in kwinrc is enough to make KRunner toggleable using Meta key. However, this doesn't work anymore in Plasma 5.17. KRunner can now only be opened with Meta key if we set the shortcut to `org.kde.krunner,/App,,display`. Wanna close it? Reach to the Esc key.

I was stuck with this for some days, until this morning I just looked through my bookmark collection with no real purpose and saw the title "KDE 5.17: KRunner or KRunner\_Desktop ?" of [a Reddit post][reddit-post] 5 months ago. And...

The solution is:
- Install xdotool
- Copy the guy's code to make a bash script
{% highlight bash %}
#!/bin/bash
krunnerWindow=$(xdotool getwindowfocus getwindowname)
if [[ $krunnerWindow == *"krunner"* ]]; then
    xdotool key 'Escape'
    exit 0
else
    qdbus org.kde.krunner /App display
    exit 0
fi
{% endhighlight %}
- Create a custom global shortcut:
  - System _Settings_ > _Shortcuts_ > _Custom Shortcuts_ > _Edit_ > _New_ > _Global Shortcut_ > _Command/URL_
  - Point to the bash script in the new shortcut's _Action_ tab
- Open `~/.config/khotkeysrc`, find the UUID of the new shortcut
- Set Meta key shortcut in kwinrc to `org.kde.kglobalaccel,/component/khotkeys,org.kde.kglobalaccel.Component,invokeShortcut,<UUID>` (the UUID includes the curly brackets)

Maybe I should get the newest KDE software instead of going with what Fedora maintainers give me.

[reddit-post]: https://www.reddit.com/r/archlinux/comments/dkfkvj/kde_517_krunner_or_krunner_desktop/
