---
layout: post
title: Scala
mtime: "2020-05-14"
tags: [scala]
---

### Call-by-value - Call-by-name
- CBV: arguments are evaluated before substituting the function call with the function's RHS and the parameters with values
- CBN: substituting function and parameters then evaluating parameters
- By default, parameters are CBV. Use =>, e.g. `(x: Int, y: => Int)`, for CBN
- `def`: by-name - `val`: by-value

### Tail recursion:
- When a recursive function calls itself in the same form, so the call stack can be reused.
- In other words, there's no need to store immediate values, arguments for the next call can be put into the existing stack frame.

### For
`for` expression <=> `flatMap`, `withFilter`, and `map`

### Methods
To define a prefix operator, write: `def unary_- : <type> = {}`, the space before : is required to not make the colon a part of the identifier.
Only 4 operators can be used: `+` `-` `!` `~`

To refer to a method foo from a function foo inside another method, write like this
{%highlight scala%}
trait Bar {
  self =>

  def foo: T
  
  def waz: U = {
    def foo = self.foo // or like Java: Bar.this.foo
  }
}
{%endhighlight%}

Only the primary constructor of a class can call the superclass constructor.  
Every auxiliary constructor must invoke another constructor as its first action.

Traits further to the right take effect first: the method at the rightest is called first; if it calls super, it invokes the method in the trait to its left.
