# bright-network-test

This is a lightweight recommendation engine built to match members with relevant jobs using basic natural language processing (NLP) and scoring heuristics.

## 🧑‍💻 Getting Started

### 1. Clone and install
```bash
git clone https://github.com/sandmule/bright-network-test.git
cd bright-network-test
yarn
```

### 2. Run the program
```bash
yarn dev
```

### 3. Run tests
```bash
yarn test
```

---

## 🎯 The Problem

We were asked to recommend jobs to members based on two key factors:
1. The **keywords** in their bios vs the job titles  
2. The **location** preferences expressed in their bios

Each member should receive a list of top matching jobs, printed to the console.

---

## 🔍 Matching Algorithm

1. **Tokenization**  
   Text is tokenized into lowercase word arrays using a basic regex (`\b\w+\b`).  
   Example:  
   `"Software engineer in London"` → `['software', 'engineer', 'in', 'london']`

2. **Keyword Matching**  
   A set of mapped job domains (e.g. `software`, `design`, `marketing`) is matched against bio and job title tokens.  
   Each shared category adds **2 points**.

3. **Location Matching**  
   If a known location in the bio matches the job’s location, **+1 point** is added.

4. **Scoring**  
   Final score = `(keyword matches * 2) + location match`

5. **Output**  
   For each member, top 3 jobs by score are displayed (only if score > 0).

---

## Design Choices & Challenges

### Simplicity First
The scoring is deliberately lightweight, given more time could be improved with fuzzy matching or ML.

### Modularity
Files are separated to reflect maintainable architecture:
- Business logic (matching)
- Data validation
- IO (API requests, logging)

### Extensibility
Weighting logic, keyword maps, and cities are all easy to tune or expand without changing core logic.

### Challenge: Bio Ambiguity
Members’ bios are free-form, so assumptions had to be made:
- Only predefined categories are matched
- No stemming, typo correction, or semantic similarity

In production, this could be improved with real NLP or ML techniques — but that was out of scope for a ~3-hour task.

---
