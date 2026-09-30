---
type: lesson
course: Excel Zero to Hero
module: Module 3
topic: Data Analysis Life Cycle
status: completed
difficulty: intermediate
tags:
  - analytics
  - methodology
  - dalc
  - crisp-dm
prerequisites: []
related_project: "[[Call Center Performance Analysis]]"
source: https://youtu.be/uv1bxe2gdnU
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 3 – Excel Formulas & Functions\"
video_timestamp: \"1:38:56\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s\"
---

# Lesson 3.8: The Data Analysis Life Cycle (DALC & CRISP-DM Frameworks)

> [!abstract] Learning Objective
> Apply industry-standard analytical frameworks (Google 6-Phase DALC and CRISP-DM) to structure end-to-end analytical problem solving from initial stakeholder inquiry to executive action.

> 🎥 **Video Chapter**: [Chapter 3 – Excel Formulas & Functions (1:38:56)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s)

```mermaid
flowchart LR
    subgraph S1 ["🎯 DISCOVERY & SOURCING"]
        direction TB
        A["<b>1. Ask</b><br/>• Frame Business Question<br/>• Identify Metrics & Scope"]
        B["<b>2. Prepare</b><br/>• Sourcing & Extraction<br/>• Schema & Integrity Check"]
        A ==> B
    end

    subgraph S2 ["⚡ WRANGLING & ANALYSIS"]
        direction TB
        C["<b>3. Process</b><br/>• Cleanse & Remove Duplicates<br/>• Audit Operational Nulls"]
        D["<b>4. Analyze</b><br/>• Calculate Core KPIs<br/>• Uncover Patterns & Trends"]
        C ==> D
    end

    subgraph S3 ["🚀 STRATEGIC IMPACT"]
        direction TB
        E["<b>5. Share</b><br/>• Executive BI Dashboards<br/>• Clear Visual Narratives"]
        F["<b>6. Act</b><br/>• Leadership Decisions<br/>• Track Operational ROI"]
        E ==> F
    end

    S1 ==>|Validated Source Data| S2
    S2 ==>|Synthesized Insights| S3
```

## The 6 Phases Breakdown
1. **Ask**: Frame the business problem, identify stakeholders, and define measurable objectives.
2. **Prepare**: Discover, collect, and verify data sources; inspect schema and data dictionaries.
3. **Process**: Clean data, handle missing values, resolve duplicates, and ensure data integrity.
4. **Analyze**: Aggregate, calculate KPIs, identify patterns, trends, and correlations.
5. **Share**: Create executive dashboards, data visualizations, and contextual narratives.
6. **Act**: Formulate evidence-based recommendations and monitor business implementation.

## Related Knowledge
- Concepts: [[Data Analysis Life Cycle]], [[Six Dimensions of Data Quality]]
- Projects: [[06_Projects/Call Center Performance Analysis/Project Overview]]
