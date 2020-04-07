---
layout: post
title: "grubby and BootLoaderSpec - and grubby-deprecated"
date: 2020-04-07 12:00:00 +0100
tags: [grubby, grub2, boot, bootloaderspec, f31, fedora, troubleshoot]
---

My machine running Fedora 30 was upgraded to version 31 on March 21st. When rebooting I got no grub menu and a [fatal error]({{ '/2020/03/23/upgrade-f31-kde.html#delcreating-boot-menu-and-booting-updel' | relative_url }}). This post is about what I have done to resolve this issue.

# How to make changes to your system when you can't boot into it

You need a live system! Or maybe there are better ways but so far this is the best I know of. I also heard about _rescue mode_ but people seem to have to wait at that error screen for quite a long time before the mode activates, so a reset might be faster.

From the live system, you can use `chroot` command to basically operate as if your root is in your unbootable system, so that you can fix its problems. Do these things in your terminal:

{% highlight bash %}
> sudo -i # keep yourself as an admin
# list all (-a) disks and partitions with filesystems (-f) and device paths (-p)
> lsblk -fap 
> mount <root-partition-path> /mnt
# also mount your boot partition, can be useful here
> mount <boot-partition-path> /mnt/boot/efi # suppose you are using UEFI
# these are to make sure the chroot-ed system works
> mount -o bind /dev /mnt/dev
> mount -o bind /proc /mnt/proc
> mount -o bind /run /mnt/run
> mount -o bind /sys /mnt/sys
# now we can change the root
> chroot /mnt
# and now it's like we are in the system we need to repair
{% endhighlight %}

# The problem

From the chroot-ed system I could check log with _journalctl_ and saw an error message "_grubby fatal error: unable to find a suitable template_". I also checked _grub.cfg_ in both _/boot/grub2/_ and _/boot/efi/EFI/fedora/_, since the problem might be with grub, and saw in both a huge amount of the root partition's UUID repeated in the default kernel option:

{% highlight bash %}
set default_kernelopts="root=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557=4298dad3-baa3-4843-9fcf-c849f4cdf557 ro resume=UUID=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac=9a58685a-be9a-4b36-99a2-7c50f19938ac "
{% endhighlight %}

And this is just a shorter version, with the root partition's UUID appearing 179 times, recreated after I had figured out the issue. The real one I saw had that UUID repeated for 21949 times. So this was the reason for the "_token too large, exceeds YYLMAX_" error. But why? And what's up with a template for _grubby_? Anyway, `grub2-mkconfig` can help remaking the grub config file, so I moved on.

On March 29th and April 3rd, I ran kernel updates, both of which ended up again with the error message about the grubby's template, and a process being killed:

```
/sbin/new-kernel-pkg: line 321: 170010 Killed   $grubby --grub2 -c $grub2Config --remove-kernel=$kernelImage
```

The grub config files again contained the same amount of UUID strings. So _grubby_ might have been killed because of this.

Should I continue running `grub2-mkconfig` everytime I update the kernel? I don't want to have error logs either, so no. At this point it's all about _grubby_: the `new-kernel-pkg` script called grubby to change the grub config file and then got a bad file, grubby also wanted a template which seemed to not exist. So let's read grubby code to see what it does.

# The reason

From [Fedora 30][f30-bls], BootLoaderSpec (BLS)-style config files have been made the default for configuring the bootloader's menu entries. I don't actually know when it came to my machine, just remember that at some point when running `grub2-mkconfig` I didn't see Fedora entries anymore, only the Windows one. And since after using `grub2-mkconfig` to recreate _grub.cfg_ I could boot normally, it's safe to assume that what it creates is good with grub and BLS:

{% highlight bash %}
set default_kernelopts="root=UUID=4298dad3-baa3-4843-9fcf-c849f4cdf557 ro resume=UUID=9a58685a-be9a-4b36-99a2-7c50f19938ac "
{% endhighlight %}

The issue is that _grubby_ considers the equal sign `=` a kind of separator between the name and the value of a key, and it doesn't know about the BLS-style that config line is using, so when parsing the config file, it replicates every right hand side of each equal sign. After it runs once, the number of times the root partition's UUID appears in that line increases from 1 to 3, twice, to 14, three times, to 179, and four times, to 21949.

__So how did _grubby_ get called after each kernel update?__

There are 2 macros in [_kernel.spec_][kernel-spec-src] file, which run the kernel-install script: `kernel_variant_posttrans` runs the `add` command and `kernel_variant_preun` runs the `remove` command. These in turn [trigger][kernel-install-manual] the corresponding `add` and `remove` parts of scripts in both _/usr/lib/kernel/install.d/_ and _/etc/kernel/install.d/_.

In _/usr/lib/kernel/install.d/_ I have `20-grubby.install` which a bit surprisingly comes from the package _systemd-udev_ and runs `new-kernel-pkg` to install a new bootloader's menu entry, add a new kernel image, update the rescue image, and remove the old kernel, all using _grubby_. The command in the error message `$grubby --grub2 -c $grub2Config --remove-kernel=$kernelImage` can also be found in this `new-kernel-pkg` script.

There is also the `20-grub.install` script in that folder, which comes from _grub2-common_ package and also uses `new-kernel-pkg` to do those tasks, but only when that script exists [AND][grub2-src] grub doesn't have BLS enabled (`GRUB_ENABLE_BLSCFG != true`). This config can be found in _/etc/default/grub_ and I have it set to true.

The question now is: __why is `new-kernel-pkg` there?__ If it's not there, grubby won't be called, no error.

And surprise surprise, which package contains that script? _grubby-deprecated_.

When did I install it? March 19th.

Why did I do that? I don't remember.

What should I do now? Remove _grubby-deprecated_, I guess.

And right now while I'm writing this post, a new kernel update is available. Let's see how it goes...

While waiting for the update to finish, let's talk about the grubby's template. It will be resolved anyway when we get rid of `new-kernel-pkg`, but just for the sake of completeness: _grubby_ tries to find a menu entry and to use it as a default template to create another one, but it can't, since with this BLS-styled grub, configs for menu entries are stored in separated files, not in the grub config file anymore.

Update finishes. No more grubby. Done. 

[f30-bls]: https://fedoraproject.org/wiki/Releases/30/ChangeSet#Make_BootLoaderSpec-style_configuration_files_the_default
[kernel-spec-src]: https://src.fedoraproject.org/rpms/kernel/blob/f31/f/kernel.spec#_2618
[kernel-install-manual]: http://man7.org/linux/man-pages/man8/kernel-install.8.html
[grub2-src]: https://src.fedoraproject.org/rpms/grub2/blob/f31/f/20-grub.install#_80
