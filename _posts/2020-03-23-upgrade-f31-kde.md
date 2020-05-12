---
layout: post
title: "Upgrading to Fedora 31, Scientific edition"
tags: [fedora, f31, kde, log, troubleshoot]
---

Lately, I have upgraded my Fedora Scientific to version 31. I started using it from version 28 and have had great experiences. This upgrade was not as smooth as previous ones but gave me chances to figure out many things about a Linux system. And since it has given me many more warnings and errors than previous versions, I want to keep a log of those issues and track how I possibly resolve them or at least have a workaround hopefully.

Fedora Scientific is a Fedora variation which comes with KDE among a bunch of scientific software. The latest version of Fedora that has this variation is 30, you can still download it from the Fedora Media Writer program or from the [torrent server][fedora-torrent]. I did this upgrade from a Fedora Scientific 30 system with Plasma 5.15.5 and KDE Frameworks 5.64.0. The upgraded system has Plasma 5.17.5 and KDE Frameworks 5.67.0.

Here come the issues, from while upgrading until using:

#### dnfdaemon-selinux
```
11:09:18 dnf[781]:   Upgrading        : dnfdaemon-selinux-0.3.19-7.fc31.noarch            656/5138
11:09:19 python3[2965]: detected unhandled Python exception in '/sbin/semanage'
11:09:19 python3[2965]: can't communicate with ABRT daemon, is it running? [Errno 2] No such file or directory
11:09:19 python3[2965]: error sending data to ABRT daemon:
```

---
#### selinux-policy-targeted
```
11:09:43 dnf[781]:   Upgrading        : selinux-policy-targeted-3.14.4-49.fc31.noarch     658/5138
11:10:03 kernel: SELinux:  Permission watch in class filesystem not defined in policy.
11:10:03 kernel: SELinux:  Permission watch in class file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_mount in class file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_sb in class file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_with_perm in class file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_reads in class file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch in class dir not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_mount in class dir not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_sb in class dir not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_with_perm in class dir not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_reads in class dir not defined in policy.
11:10:03 kernel: SELinux:  Permission watch in class lnk_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_mount in class lnk_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_sb in class lnk_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_with_perm in class lnk_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_reads in class lnk_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch in class chr_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_mount in class chr_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_sb in class chr_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_with_perm in class chr_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_reads in class chr_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch in class blk_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_mount in class blk_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_sb in class blk_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_with_perm in class blk_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_reads in class blk_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch in class sock_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_mount in class sock_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_sb in class sock_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_with_perm in class sock_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_reads in class sock_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch in class fifo_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_mount in class fifo_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_sb in class fifo_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_with_perm in class fifo_file not defined in policy.
11:10:03 kernel: SELinux:  Permission watch_reads in class fifo_file not defined in policy.
11:10:03 kernel: SELinux:  Class perf_event not defined in policy.
11:10:03 kernel: SELinux: the above unknown classes and permissions will be allowed
11:10:03 kernel: SELinux:  Converting 450 SID table entries...
```

---
#### flatpak-selinux
```
11:10:03 dnf[781]:   Upgrading        : flatpak-selinux-1.4.4-2.fc31.noarch               659/5138
11:10:23 kernel: SELinux:  Permission watch in class filesystem not defined in policy.
11:10:23 kernel: SELinux:  Permission watch in class file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_mount in class file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_sb in class file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_with_perm in class file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_reads in class file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch in class dir not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_mount in class dir not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_sb in class dir not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_with_perm in class dir not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_reads in class dir not defined in policy.
11:10:23 kernel: SELinux:  Permission watch in class lnk_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_mount in class lnk_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_sb in class lnk_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_with_perm in class lnk_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_reads in class lnk_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch in class chr_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_mount in class chr_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_sb in class chr_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_with_perm in class chr_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_reads in class chr_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch in class blk_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_mount in class blk_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_sb in class blk_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_with_perm in class blk_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_reads in class blk_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch in class sock_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_mount in class sock_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_sb in class sock_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_with_perm in class sock_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_reads in class sock_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch in class fifo_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_mount in class fifo_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_sb in class fifo_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_with_perm in class fifo_file not defined in policy.
11:10:23 kernel: SELinux:  Permission watch_reads in class fifo_file not defined in policy.
11:10:23 kernel: SELinux:  Class perf_event not defined in policy.
11:10:23 kernel: SELinux: the above unknown classes and permissions will be allowed
11:10:23 kernel: SELinux:  Converting 467 SID table entries...
```

---
#### mariadb-gssapi-server
```
11:13:07 dnf[781]:   Upgrading        : mariadb-gssapi-server-3:10.3.22-1.fc31.x86_64    1154/5138
11:13:07 audit[4532]: ADD_GROUP pid=4532 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:groupadd_t:s0 msg='op=add-group acct="mysql" exe="/usr/sbin/groupadd" hostname=? addr=? terminal=? res=failed'
11:13:07 kernel: audit: type=1116 audit(1584785587.784:86): pid=4532 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:groupadd_t:s0 msg='op=add-group acct="mysql" exe="/usr/sbin/groupadd" hostname=? addr=? terminal=? res=failed'
11:13:07 audit[4533]: ADD_USER pid=4533 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:useradd_t:s0 msg='op=add-user acct="mysql" exe="/usr/sbin/useradd" hostname=? addr=? terminal=? res=failed'
11:13:07 useradd[4533]: failed adding user 'mysql', exit code: 9
11:13:07 kernel: audit: type=1114 audit(1584785587.793:87): pid=4533 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:useradd_t:s0 msg='op=add-user acct="mysql" exe="/usr/sbin/useradd" hostname=? addr=? terminal=? res=failed'
```

---
#### initial-setup
```
11:16:41 dnf[781]:   Running scriptlet: initial-setup-0.3.76-1.fc31.x86_64               2053/5138
11:16:41 dnf[781]: Failed to get unit file state for initial-setup-graphical.service: No such file or directory
11:16:41 dnf[781]: Failed to get unit file state for initial-setup-text.service: No such file or directory
```

---
#### openconnect
```
11:16:44 dnf[781]:   Upgrading        : openconnect-8.05-1.fc31.x86_64                   2067/5138
11:16:45 audit[7158]: ADD_GROUP pid=7158 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:groupadd_t:s0 msg='op=add-group acct="nm-openconnect" exe="/usr/sbin/groupadd" hostname=? addr=? terminal=? res=failed'
11:16:45 kernel: audit: type=1116 audit(1584785805.001:88): pid=7158 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:groupadd_t:s0 msg='op=add-group acct="nm-openconnect" exe="/usr/sbin/groupadd" hostname=? addr=? terminal=? res=failed'
11:16:45 audit[7159]: ADD_USER pid=7159 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:useradd_t:s0 msg='op=add-user acct="nm-openconnect" exe="/usr/sbin/useradd" hostname=? addr=? terminal=? res=failed'
11:16:45 useradd[7159]: failed adding user 'nm-openconnect', exit code: 9
11:16:45 kernel: audit: type=1114 audit(1584785805.008:89): pid=7159 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:useradd_t:s0 msg='op=add-user acct="nm-openconnect" exe="/usr/sbin/useradd" hostname=? addr=? terminal=? res=failed'
```

---
#### maven
```
11:19:49 dnf[781]:   Running scriptlet: maven-1:3.5.4-7.fc30.noarch                      2581/5138
11:19:49 dnf[781]: warning: %postun(maven-1:3.5.4-7.fc30.noarch) scriptlet failed, exit status 1
11:19:49 dnf[781]: Error in POSTUN scriptlet in rpm package maven
```

---
#### alsa-utils
```
11:22:34 dnf[781]:   Cleanup          : alsa-utils-1.2.1-3.fc30.x86_64                   3731/5138
11:22:34 systemd[1]: Stopping Manage Sound Card State (restore and store)...
11:22:34 alsactl[778]: alsactl daemon stopped
11:22:34 systemd[1]: alsa-state.service: Succeeded.
11:22:34 systemd[1]: Stopped Manage Sound Card State (restore and store).
11:22:34 audit[1]: SERVICE_STOP pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=alsa-state comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
11:22:34 kernel: audit: type=1131 audit(1584786154.482:93): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=alsa-state comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
11:22:34 systemd[1]: Started Manage Sound Card State (restore and store).
11:22:34 alsactl[12430]: alsactl 1.2.2 daemon started
11:22:34 alsactl[12430]: /usr/sbin/alsactl: do_nice:165sched_setparam failed: No such file or directory
11:22:34 audit[1]: SERVICE_START pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=alsa-state comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
11:22:34 kernel: audit: type=1130 audit(1584786154.494:94): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=alsa-state comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
```

---
#### bluez
```
11:22:38 dnf[781]:   Cleanup          : bluez-5.52-1.fc30.x86_64                         3758/5138
11:22:38 bluetoothd[780]: Terminating
11:22:38 systemd[1]: Stopping Bluetooth service...
11:22:38 bluetoothd[780]: Stopping SDP server
11:22:38 bluetoothd[780]: Exit
11:22:38 systemd[1]: bluetooth.service: Succeeded.
11:22:38 systemd[1]: Stopped Bluetooth service.
11:22:38 audit[1]: SERVICE_STOP pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=bluetooth comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
11:22:38 systemd[1]: Starting Bluetooth service...
11:22:38 kernel: audit: type=1131 audit(1584786158.425:95): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=bluetooth comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? t>
11:22:38 bluetoothd[12527]: Bluetooth daemon 5.54
11:22:38 systemd[1]: Started Bluetooth service.
11:22:38 audit[1]: SERVICE_START pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=bluetooth comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
11:22:38 kernel: audit: type=1130 audit(1584786158.486:96): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=bluetooth comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? t>
11:22:38 bluetoothd[12527]: Starting SDP server
11:22:38 bluetoothd[12527]: Bluetooth management interface 1.14 initialized
11:22:38 systemd[1]: Starting Hostname Service...
11:22:38 kernel: debugfs: File 'le_min_key_size' in directory 'hci0' already present!
11:22:38 kernel: debugfs: File 'le_max_key_size' in directory 'hci0' already present!
11:22:38 kernel: debugfs: File 'force_bredr_smp' in directory 'hci0' already present!
```

---
#### Creating initramfs

(and this ran twice, why?)

```
11:25:46 dracut[16085]: dracut-050-26.git20200316.fc31
11:25:46 dracut[16087]: Executing: /usr/bin/dracut -f /boot/initramfs-5.5.10-200.fc31.x86_64.img 5.5.10-200.fc31.x86_64
11:25:46 dracut[16087]: dracut module 'busybox' will not be installed, because command 'busybox' could not be found!
11:25:46 dracut[16087]: dracut module 'stratis' will not be installed, because command 'stratisd-init' could not be found!
11:25:46 dracut[16087]: dracut module 'biosdevname' will not be installed, because command 'biosdevname' could not be found!
11:25:46 dracut[16087]: dracut module 'busybox' will not be installed, because command 'busybox' could not be found!
11:25:46 dracut[16087]: dracut module 'stratis' will not be installed, because command 'stratisd-init' could not be found!
11:25:47 dracut[16087]: *** Including module: bash ***
11:25:47 dracut[16087]: *** Including module: systemd ***
11:25:47 dracut[16087]: *** Including module: systemd-initrd ***
11:25:47 dracut[16087]: *** Including module: nss-softokn ***
11:25:47 dracut[16087]: *** Including module: rngd ***
11:25:47 dracut[16087]: *** Including module: i18n ***
11:25:47 dracut[16087]: *** Including module: network-manager ***
11:25:47 dracut[16087]: *** Including module: network ***
11:25:47 dracut[16087]: *** Including module: ifcfg ***
11:25:47 dracut[16087]: *** Including module: drm ***
11:25:48 dracut[16087]: *** Including module: plymouth ***
11:25:48 dracut[16087]: *** Including module: kernel-modules ***
11:25:49 dracut[16087]: *** Including module: kernel-modules-extra ***
11:25:49 dracut[16087]:   kernel-modules-extra: configuration source "/run/depmod.d/" does not exist
11:25:49 dracut[16087]:   kernel-modules-extra: configuration source "/etc/depmod.d/" is ignored (directory or doesn't exist)
11:25:49 dracut[16087]:   kernel-modules-extra: configuration source "/lib/depmod.d/" does not exist
11:25:__ dracut[16087]: [...]
11:25:52 dracut[16087]: *** Creating image file '/boot/initramfs-5.5.10-200.fc31.x86_64.img' ***
11:25:56 dracut[16087]: initrd in UEFI: : 31M
11:2_:__ dracut[16087]: [...]
11:26:04 dracut[16087]: ========================================================================
11:26:04 dracut[16087]: *** Creating initramfs image file '/boot/initramfs-5.5.10-200.fc31.x86_64.img' done ***
```

---
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
