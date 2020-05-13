---
layout: post
title: Shell
mtime: "2020-05-14"
---

Math
- \*
- bc -l

Variables
- assigments: no space on either side of the equal sign
- let
- command substitution: $(command) or `command`
- $@: list of arguments; $1, $2, etc: first, second, etc. argument; $#: number of arguments
- calculation: $(())

User input
- read

Logic and If-else
- $?: last exit status. && continues only after $? == 0, || continues only after $? != 0
- conditional expression: [[ ]]
+ logical flags: [[ 4 -gt 3]] && echo t || echo f : prints t; [[ -e math.sh ]] : checks if a file exists; -d : a dir exists; -z, -n: string length is zero, non-zero
+ logical operators: regex: [[ "sean" =~ ^s.+n$ ]] && echo t || echo f : prints t; NOT: [[ ! 7 -gt 2 ]] && echo t || echo f : prints f; =, != : string equal, not equal

Arrays
- init: a=(1 2 3)
- get: ${a[0]}, ${a[*]}, a part: ${a[*]:1:2} : 2 3, length: ${#a[*]} : 3
- set: a[0]=0
- concat: a+=(3 4 5)

Braces
- sequence: { .. }, a{0..4}c, {1..3}{a..c}; with variables: eval echo {$start..$end} : 4 5 6 7 8 9 with $start = 4 and $end = 9
- combine: {% raw %}{{1..3},{a..c}}{% endraw%}

Loops
- for i in 1 2 3
  do ...
  done
- while [[ ]]
  do ...
  done

Functions
function f {
  local result=0
  ...
  echo $result
}


