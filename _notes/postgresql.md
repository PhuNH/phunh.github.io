---
layout: post
title: PostgreSQL
mtime: "2020-05-14"
---

Server version:  
```
pg_config --version
```  
Client version:  
```
psql --version
```

Config files in /var/lib/pgsql/data/

Authentication:

- trust: everyone can access everything.
- password, md5, scram-sha-256: password-based.
- ident: makes use of the maps defined in pg\_ident.conf. When this is specified for a local (non-TCP/IP) connection, peer will be used instead.
- peer: obtains user name from operating system and checks if it matches database user name. Only supported on local connections.

Check where the data area is:  
```
ps aux | grep postgres | grep -- -D
```
