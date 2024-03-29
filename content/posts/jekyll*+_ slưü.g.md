---
publishdate: "2020-05-12"
date: "2023-09-19"
tags:
- jekyll
- liquid
- slug
- data file
title: Jekyll slug and data files
---

**This post has been ported to Hugo. While details about file names and URLs might not hold true anymore, Jekyll-related details remain correct.**
___

If you haven't seen it, the markdown file of this post is named "_2020-05-12-jekyll*+\_ slưü.g.md_". Why so?

### What they are

A post in Jekyll is the result of parsing a file which is named with the structure

```text
<year> - <month> - <day> - <slug>.<extension>
```

I only added spaces to make it clearer. There should be no space.

The Jekyll doc might call that `<slug>` part ["title"](https://jekyllrb.com/docs/posts/#creating-posts) but when you write `jekyll*+_ slưü.g`, what you get is that "title". Oh sorry I forgot to add the `raw` tag. When you write `{{page.slug}}`, what you get is that "title".

I have only written 4 posts here (this is the fifth, but one has been moved to the newly created [Notes](/notes) section), and [one of them]({{<relref "toggle-krunner-plasma-5.17.md" >}}) contains a dot in its slug. Again, you don't see any dot in URLs around here, whether in this post's or that old post's, although I also use "slug"s to build URLs. The reason is that "slug"s to build URL and `page.slug`s are slugified differently.

Slugification (don't take my word for it!) is the act of converting strings to a form with no space and no "strange" characters. In Liquid, the `slugify` filter helps you do this. How "strange" characters are converted depends on which [option](https://jekyllrb.com/docs/liquid/filters/#options-for-the-slugify-filter) you pass to the filter:
- `{{page.slug | slugify}}` gives "_jekyll-slưü-g_" just like what you see in the address bar;
- `{{page.slug | slugify: "ascii"}}` gives "_jekyll-sl-g_", it's what I'm gonna use with this site now;
- `{{page.slug | slugify: "latin"}}` gives "_jekyll-sl-u-g_", it's what I was about to use because I thought of writing something in Vietnamese in the future, but as I see my characters are not preserved (I expected only partly though), for now I will skip it.

And as you might already see, `page.slug` still contains a bunch of special characters, which means that it is not slugified at all. So yes, `page.slug` is less sluggy than the URL.

### Why I am doing this

Back to the old post with a dot in its slug. When I used only `page.slug` for identifying which post a [Staticman]({{<relref "notes/staticman.md" >}}) comment belongs to, comments on that old post would end up in a directory with a dot in its name

```text
toggle-krunner-plasma-5.17
```

However, the dot does not appear in the property name of the data object `site.data.comments` that Jekyll retrieves

```json
{"toggle-krunner-plasma-517"=>{"entry...
```

So when my code tried to get `site.data.comments[page.slug]`, nothing was returned.

How Jekyll converts the directory name is still unknown to me. For example, "_jekyll*+\_ slưü.g_", this post's slug, when read by Jekyll, appears as "_jekyll\_\_slg_", which shows that:
- Underscores are kept;
- Asterisks, dots, and pluses are removed. At least ü's and ư's are also removed;
- Spaces are changed to underscores.

And that's all I know so far.

What I can do with my Staticman commenting function is to slugify `page.slug` both in the comment form to indicate which post this comment belongs to and in the comment list to tell which post's comments to get. And let's see if my comment (later) can be shown down there.

### Side effect related to data files

While playing around with the slug, I also got a problem with Jekyll being unable to sort some null object. By fixing this error, I found out that data files are read by Jekyll as properties of their folder as the object. To be clearer, consider a post "How to slugify" with the slug "how-to-slugify". Its comments are placed as in this directory tree:
```bash
.
├─ _data
│  └─ comments
│     ├─ how-to-slugify
│     │  ├─ entry1.yml
│     │  ├─ entry2.yml
│     │  └─ entry3.yml
│     ├─ ...
```
and the data are read into this object `site.data.comments` as
```json
{
  "how-to-slugify": {
    "entry1": {...},
    "entry2": {...},
    "entry3": {...}
  },
  ...
} 
```
So when I passed the object `site.data.comments[slug]` to a `sort` filter, it's not an array and the filter threw an error.

I went on and converted these properties into an array of comment objects. You can see more [here](https://github.com/PhuNH/phunh.github.io/blob/source/_includes/comments.html).
{{<highlight java >}}
{% assign props_array = '' | split: '' %}
{% for entry in site.data.comments[slug] %}
  {% assign props_array = props_array | concat: entry %}
{% endfor %}
{% assign comments_array = props_array | where_exp: "entry", "entry['_id'] != nil" %}
{% assign first_level = comments_array | where_exp: "item", "item.reply_to == ''" | sort: 'date' %}
{{</highlight >}}

Basically, using Liquid, you cannot create an array directly, but only split a string to create a string array. So I did the trick of splitting an empty string and then concatenated each property to the resulting array. The concatenated properties, however, also contains property names ("entry1", "entry2", "entry3" in the example) as separate array elements, so I filtered them out using a `where_exp` filter to check for the "_id" property in each element.

There is however still one thing I don't understand about this problem with Liquid: `site.data.comments[slug]` after a filter (e.g. `where_exp: "item", "item.reply_to == ''"`) is shown to be an array, just like our `first_level` array variable above, but I still cannot sort it. It would be nice to know why. Anyway, off to the comment section.
