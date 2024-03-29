---
title: Linux
date: "2020-05-14"
tags: [linux, fedora, nvidia, optimus]
---

_[F] means "Fedora specific"_

### Terminal option types:
- BSD options: may be grouped, must not be used with a dash
- UNIX options: may be grouped, must be preceded by a dash
- GNU long options: are preceded by two dashes

### Directories:
- Wifi passwords: `/etc/sysconfig/network-scripts`

### `/etc/shadow`:
- Stores user passwords and expiration information
- Second field:
    - `\*`, `!`, `!!` all prevent users from logging in using passwords.
    - `!`, `!!` mean the account is locked. _[F]_
    - `!` goes before a field, indicating the password before being locked.
    - `\*` means that there is no previous password hash.
    - `!!` means the account has been created but not yet given a password. _[F]_

### Systemd services:
- `/etc/systemd/system.conf`  
Config of systemd (??)
- `/etc/systemd/system/`  
Contains `target.wants`s and links to services in `/usr/lib/systemd/system/`, along with some services and some `service.wants`s or `service.requires`s.
- `/usr/lib/systemd/system/`  
Seems that almost all service unit files are stored here and linked to from `/etc/systemd/system/` and its children, with some exceptions that are stored right in there. And that is because this directory is for files downloaded from distribution repositories, and `/etc` is for modifications made at local. The equivalent of this on Debian systems is `/lib/systemd/system/`.
- `/etc/init.d/`  
  `/etc/rc.d/init.d/` _[F]_  
Contains start/stop scripts for services in SysV style. Removing a file in `init.d` also makes the file in `rc.d` gone (??)

### NVIDIA Optimus: (links: [1](https://devtalk.nvidia.com/default/topic/957814/linux/prime-and-prime-synchronization/) [2](https://wiki.archlinux.org/index.php/NVIDIA_Optimus#SDDM) [3](https://docs.fedoraproject.org/en-US/quick-docs/bumblebee/))
- NVIDIA Optimus is a technology allowing a laptop to access both an Intel integrated GPU and a discrete NVIDIA GPU.  
On Macs or older PCs, there is a switch to change which GPU drives the screen. On newer PCs, there is no switch, only the iGPU is connected to the display, and the dGPU is connected only to the system memory.  
PRIME is a collection of features in the Linux kernel, X server, and various drivers, to allow the dGPU to share its output with the iGPU. 2 methods of sharing: output and offload.  
Bumblebee is Optimus for Linux.
- There are 2 options for the driver of the discrete GPU: nouveau and NVIDIA driver.  
If nouveau is used: PRIME must be used with nouveau (Bumblebee doesn't support nouveau anymore, using PRIME is faster, nouveau already handles power saving so Bumblebee is not useful anymore) to achieve GPU switching; however, this has poor performance compared to the NVIDIA driver, and may cause sleep and/or hibernate problems.  
If NVIDIA driver is used:
  - PRIME can only "output": only dGPU renders, and shares the buffer to iGPU, iGPU presents it to the screen. NVIDIA does not currently support PRIME offload.
  - Bumblebee can "offload": iGPU does all normal operations, dGPU can be used to render 3D, and powered off when not in use.

### Order of executing `.profile`, `.bash_profile`, `.bashrc`
What are written in `man bash`:
> When bash is invoked as an interactive login shell, or as a non-interactive shell with the --login option, it first reads and executes commands from the file /etc/profile, if that file exists.  After reading  that  file,  it looks  for  ~/.bash_profile,  ~/.bash_login,  and  ~/.profile,  in  that order, and reads and executes commands from the first one that exists and is readable.  The --noprofile option may be used when the shell is started to inhibit this behavior.
>
> [...]
>
> When an interactive shell that is not a login shell is started, bash reads and executes commands from ~/.bashrc, if that file exists.  This may be inhibited by using the --norc option.  The --rcfile file  option  will force bash to read and execute commands from file instead of ~/.bashrc.

The order I got on my Fedora (31) machine:  
Login:
- `~/.profile`
- `/etc/profile` > `/etc/profile.d/custom.sh`  
`/etc/profile` > `/etc/bashrc`
- `~/.bash_profile` > `~/.bashrc` > `/etc/bashrc`

Non-login:
- `~/.bashrc` > `/etc/bashrc` > `/etc/profile.d/custom.sh`

So:
- `~/.profile`: login, personal, multi shells
- `/etc/profile`: login, system-wide, possibly multi shells(?)
- `/etc/profile.d/custom.sh`: both login and non-login, system-wide, possibly multi shells, for customizations
- `/etc/bashrc`: non-login, system-wide, bash only
- `~/.bash_profile`: login, personal, bash only
- `~/.bashrc`: non-login, personal, bash only
