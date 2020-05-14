---
layout: post
title: Bash
last_modified_at: "2020-05-14"
tags: [bash, linux]
---

### Math
- `bc -l`
- `expr`: there must be spaces between expression parts
- `\*`: `*` has a special meaning to Bash so it needs to be escaped
- `let`
- calculation: `$((b++))` includes assignment (assignment first then evaluation), `((b++))` no assignment only evaluation

### Commands
- command substitution:
```
$(command)
`command`
```
- `()`: runs commands in a subshell
- `{}`: runs commands in the current shell

### Variables
- assigments: no space on either side of the equal sign
- global by default
- `$@`: list of arguments; `$1`, `$2`, etc: first, second, etc. argument; `$#`: number of arguments

### User input
- `read`

### Logic and If-else
- `$?`: last exit status. `&&` continues only after `$?` == 0, `||` continues only after `$?` != 0
- conditional expression: `[ ]` POSIX compliant, `[[ ]]` extension to the standard, supporting extra operations
+ logical flags: `[[ 4 -gt 3 ]] && echo t || echo f` : prints t; `[[ -e math.sh ]]` : checks if a file exists; `-d` : a dir exists; `-z`, `-n`: string length is zero, non-zero
+ logical operators: regex: `[[ "sean" =~ ^s.+n$ ]] && echo t || echo f` : prints t; NOT: `[[ ! 7 -gt 2 ]] && echo t || echo f` : prints f; `=`, `!=` : string equal, not equal

### Arrays
- indexed and associative
- init: `a=(1 2 3)`, `declare -a a=(1 2 3)` (indexed), `declare -A` (associative), `declare`: local by default
- get: `${a[0]}`, `${a[*]}` expanding to one single argument, `${a[@]}` expanding to distinct arguments, a part: `${a[*]:1:2}` : 2 3, length: `${#a[*]}` : 3
- set: `a[0]=0`
- concat: `a+=(3 4 5)`

### Braces
- sequence: `{ .. }`, `a{0..4}c`, `{1..3}{a..c}`; with variables: `start=4; end=9; eval echo {$start..$end}` : 4 5 6 7 8 9
- combine: `{% raw %}{{1..3},{a..c}}{% endraw%}`

### Loops
```
for i in 1 2 3
do
  ...
done
```
```
while [[ ]]
do
  ...
done
```

### Functions
{%highlight bash%}
#f () {
function f {
  local result=0
  ...
  echo $result
}
{%endhighlight%}
