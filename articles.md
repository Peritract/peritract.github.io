---
title: articles
permalink: :basename
---

<ul>
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.title | capitalize }}</a></h2>
      <p>{{post.date | date_to_string}} - {{post.author}}</p>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>