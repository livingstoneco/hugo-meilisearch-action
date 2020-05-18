# Hugo to MeiliSearch

This GitHub action generates a search index for your Hugo blog and import generated index to MeiliSearch instance.

[MeiliSearch](https://www.meilisearch.com/) is a RESTful search API. It aims to be a ready-to-go solution for everyone who wants a fast and relevant search experience for their end-users ⚡️🔎

## Setup

### 1. Create Search Index

Define a new output format named “SearchIndex”

```
outputFormats:
  SearchIndex:
    mediaType: "application/json"
    baseName: "searchindex"
    isPlainText: true
    notAlternative: true

outputs:
  home: ["HTML","RSS", "SearchIndex"]
```

Create "SearchIndex" output format template in `layouts/_default/list.searchindex.json`

```
{{- $.Scratch.Add "searchindex" slice -}}
{{- range $index, $element := (where .Site.Pages "Kind" "page") -}}
    {{- $.Scratch.Add "searchindex" (dict "id" $index "title" $element.Title "uri" $element.Permalink "tags" $element.Params.tags "section" $element.Section "content" $element.Plain "summary" $element.Summary "year" ($element.Date.Format "2006")) -}}
{{- end -}}
{{- $.Scratch.Get "searchindex" | jsonify -}}
```

### 2.


