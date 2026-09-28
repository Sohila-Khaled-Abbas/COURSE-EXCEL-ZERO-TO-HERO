---
type: project-documentation
project_name: PwC Call Center Performance Analysis
section: Data Dictionary
created: 2026-09-28
---

# 3. Data Dictionary

| Column Name | Data Type | Null Count | Allowed Values / Format | Description & Business Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `Call Id` | String | 0 | `ID0001` - `ID5000` | Unique alphanumeric identifier for each call interaction (Primary Key). |
| `Agent` | String | 0 | 8 Agents: `Diane`, `Becky`, `Stewart`, `Greg`, `Jim`, `Joe`, `Martha`, `Dan` | Name of the customer service representative assigned to the call. |
| `Date` | Date | 0 | `YYYY-MM-DD` (2021-01-01 to 2021-03-31) | The calendar date on which the call was placed. |
| `Time` | Time | 0 | `HH:MM:SS` (09:00:00 to 18:00:00) | The exact timestamp when the customer dialed into the telephony queue. |
| `Topic` | String | 0 | 5 Topics: `Contract related`, `Technical Support`, `Payment related`, `Admin Support`, `Streaming` | The primary business subject of the call inquiry. |
| `Answered (Y/N)` | String (Char) | 0 | `Y`, `N` | Binary flag indicating whether an agent answered the call (`Y`) or the customer abandoned (`N`). |
| `Resolved` | String (Char) | 0 | `Y`, `N` | Binary flag indicating whether the customer's issue was successfully resolved. |
| `Speed of answer in seconds` | Float / Int | 946 | `10` - `125` seconds | The duration in seconds the caller waited in queue before agent pickup. |
| `AvgTalkDuration` | Time / Duration | 946 | `HH:MM:SS` (`00:00:30` - `00:07:00`) | The elapsed speaking duration between the agent and customer. |
| `Satisfaction rating` | Float / Int | 946 | `1` to `5` | Post-call CSAT rating submitted by the customer (1 = Very Dissatisfied, 5 = Very Satisfied). |
