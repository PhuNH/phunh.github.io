---
layout: post
title: "Upgrading to Fedora 31, Scientific edition"
last_modified_at: "2020-09-14"
tags: [fedora, f31, kde, log, troubleshoot]
---

Lately, I have upgraded my Fedora Scientific to version 31. I started using it from version 28 and have had great experiences. This upgrade was not as smooth as previous ones but gave me chances to figure out many things about a Linux system. And since it has given me many more warnings and errors than previous versions, I want to keep a log of those issues and track how I possibly resolve them or at least have a workaround hopefully.

Fedora Scientific is a Fedora variation which comes with KDE among a bunch of scientific software. The latest version of Fedora that has this variation is 30, you can still download it from the Fedora Media Writer program or from the [torrent server][fedora-torrent]. I did this upgrade from a Fedora Scientific 30 system with Plasma 5.15.5 and KDE Frameworks 5.64.0. The upgraded system has Plasma 5.17.5 and KDE Frameworks 5.67.0.

Here come the issues, from while upgrading until using:

#### ~~Creating boot menu and booting up~~

__Details__: [problem with grubby]({% post_url 2020-04-07-problem-grubby-f31 %})

```
11:26:27 dnf[781]:   Running scriptlet: kernel-core-5.5.10-200.fc31.x86_64               5138/5138
11:26:27 dnf[781]: grubby fatal error: unable to find a suitable template
11:26:27 dnf[781]:   Running scriptlet: grub2-tools-1:2.02-106.fc31.x86_64               5138/5138
```
Then when booting up, no grub menu, only a message: "Fatal error: token too large, exceeds YYLMAX"

---
#### ~~Dolphin runs as a daemon and keeps opening Home at system startup~~

[Bugzilla][bz1808716]

__Workaround__: Kill the daemon and remove `/etc/xdg/autostart/org.kde.dolphin.desktop` (maybe leave it in `~`).

---
#### Nextcloud AppImage cannot start at system startup

---
#### Plasma session does not fully restore at system startup 

Only Firefox and Thunderbird are restored; for others, sometimes some are, sometimes not.

---
#### Logoff

`kscreen.kded: PowerDevil SuspendSession action not available!`

---
#### krunner
  - ~~To toggle krunner with Meta key, `invokeShortcut,run command` can't be used anymore~~ [workaround]({% post_url 2020-03-25-toggle-krunner-plasma-5.17 %})
  - ~~Programs opened have a different interface and a different icon in Task Switcher from those of ones opened from Application Menu~~  
  It turns out to be Fusion style (_System Settings_ > _Application Style_ > _Application Style_). Reason unknown. Being asked [here](https://www.reddit.com/r/kde/comments/g3jwyy/some_apps_are_in_fusion_style_while_the_style_in/).  
  __Workaround__: create a symlink to `/usr/share/kglobalaccel/krunner.desktop` in `/etc/xdg/autostart/`, or just use Alt+Space/Alt+F2 to start KRunner for the first time after system startup. After that using the assigned key combination to execute the script will bring up KRunner with the normal application style.

---
#### TorBrowser can't start, no log exists

On f30 as well

---
#### ~~Kate cannot restore its previous session at startup~~

__Workaround__: Make a default session (in `~/.local/share/kate/sessions`)

---
#### Bug reporting failed for many bugs, an example:

On f30 as well

```
Preparing environment for backtrace generation
..................................................................
Retrace job failed
Retrace failed. Try again later and if the problem persists report this issue please.
    2020-03-21 21:34:00 Analyzing crash data
    2020-03-21 21:34:35 Preparing environment for backtrace generation
   2020-03-21 21:47:14 /usr/bin/mock init --resultdir /srv/retrace/tasks/736543580/log --configdir /srv/retrace/tasks/736543580 exitted with 20
=== OUTPUT ===
INFO: mock.py version 1.4.21 starting (python version = 3.6.8)...
Start: init plugins
INFO: selinux enabled
Finish: init plugins
INFO: Signal handler active
Start: run
Start: clean chroot
Finish: clean chroot
Start: chroot init
INFO: calling preinit hooks
INFO: enabled HW Info plugin
Mock Version: 1.4.21
INFO: Mock Version: 1.4.21
Start: yum install
Finish: yum install
ERROR: Could not find useradd in chroot, maybe the install failed?

   2020-03-21 21:47:19 None

Do you want to generate a stack trace locally? (It may download a huge amount of data but reporting can't continue without stack trace). 'NO'
('analyze_CCpp' exited with 1)
```

---
#### Gnome Keyring

- "gkr-pam unable to locate daemon control file"
- Keyring is still locked after system unlock, maybe related to the one above

---
_(WIP)_

[fedora-torrent]: https://torrent.fedoraproject.org/
[bz1808716]: https://bugzilla.redhat.com/show_bug.cgi?id=1808716
