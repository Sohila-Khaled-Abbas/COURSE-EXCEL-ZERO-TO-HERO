---
type: lesson
course: Excel Zero to Hero
module: "Module 8"
topic: "M Language & Web Ingestion"
status: not-started
difficulty: advanced
tags: [excel, lesson, m-language, power-query, api]
prerequisites: ["[[01_Power_Query_Fundamentals_and_ETL]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 8 – Power Query & M Language\"
video_timestamp: \"4:20:30\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=15630s\"
---

# Lesson 8.4: Introduction to M Language & Live REST API Ingestion

> [!abstract] Learning Objective
> Read and write Power Query Formula Language (M) expressions, understand the `let ... in` structure, and query live web API endpoints directly into Excel.

> 🎥 **Video Chapter**: [Chapter 8 – Power Query & M Language (4:20:30)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=15630s)

## The Structure of M Code
Every Power Query transformation is underwritten by M code:
```powerquery
let
    Source = Csv.Document(File.Contents("C:\Data\Sales.csv"), [Delimiter=","]),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{{"Amount", type number}})
in
    #"Changed Type"
```

## Connecting to a Live Web API
From the course source files (`M language to Deal with API.txt`):
```powerquery
let
    baseUrl = "https://api.exchangerate-api.com/v4/latest/",
    currency = "USD",
    fullUrl = baseUrl & currency,
    response = Web.Contents(fullUrl),
    json = Json.Document(response),
    rates = json[rates],
    table = Record.ToTable(rates)
in
    table
```

## Related Knowledge
- Concepts: [[M Language]], [[Power Query]]
