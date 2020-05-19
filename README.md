# Hugo to MeiliSearch

[![Github Total Stars](https://img.shields.io/github/stars/livingstoneco/hugo-meilisearch-action?style=for-the-badge)
![GitHub Total Downloads](https://img.shields.io/github/downloads/livingstoneco/hugo-meilisearch-action/total?style=for-the-badge)
[![Latest Release](https://img.shields.io/github/v/release/livingstoneco/hugo-meilisearch-action?style=for-the-badge)]()
[![Last Commit](https://img.shields.io/github/last-commit/livingstoneco/hugo-meilisearch-action?style=for-the-badge)]()
![License](https://img.shields.io/github/license/livingstoneco/hugo-meilisearch-action?style=for-the-badge)



This GitHub action generates a search index for your Hugo blog and import generated index to MeiliSearch instance.

[MeiliSearch](https://www.meilisearch.com/) is a RESTful search API. It aims to be a ready-to-go solution for everyone who wants a fast and relevant search experience for their end-users ⚡️🔎

## Setup

### 1. Create Search Index

Define a new output format named “SearchIndex” in Hugo config file `config.yaml`

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

### 2. Create GitHub Workflow

Define your workflow `.github/workflows/deploySearchIndex.yml`

```
on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy Search Index to MeiliSearch
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: Setup Hugo
      uses: peaceiris/actions-hugo@v2
      with:
        hugo-version: '0.68.3'
        extended: true
    - name: Build Hugo Blog
      run: hugo
    - name: Setup Node.js
      uses: actions/setup-node@v1
      with:
        node-version: '12.x'
    - name: Deploy Search Index to MeiliSearch Instance
      uses: livingstoneco/hugo-meilisearch-action@v1.66
      with:
        key: ${{ secrets.searchApiToken }}
        host: ${{ secrets.searchApiHost }}
        indexName: posts
```

### 3. Define Secrets
TODO: create screenshots outlining how to define repo secrets

TODO: meilisearch api key and host must be defined as a secret

TODO: more emojis


