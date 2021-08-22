---
title: articles
---
<article class="text-article">
  {% for post in site.posts %}
      <a href="{{ post.url }}"><h2 class="left-title">{{ post.title }}</h2></a>
      <h5 class="subtitle"><em>{{ post.date  | date_to_string}}</em></h5>
      {{ post.excerpt }}
      <hr />
  {% endfor %}
</article>