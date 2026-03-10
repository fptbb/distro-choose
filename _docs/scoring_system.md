# Scoring System

## How Matching Works

Each distro has a **score profile** — a set of numeric weights (0.0 to 1.0) for every possible answer the user can give across all 7 quiz categories.

When the user finishes the quiz, the engine:

1. Collects the user's 7 answers (one per category)
2. For each distro, sums `distro.scores[category][userAnswer]` across all 7 categories
3. Normalizes to a percentage: `(totalScore / maxPossibleScore) * 100`
4. Sorts descending and displays the top 3

## Score Values

| Score | Meaning |
|-------|---------|
| 1.0   | Perfect fit — this is exactly what the distro is built for |
| 0.8   | Strong fit — works very well for this use case |
| 0.6   | Good fit — capable, not primary focus |
| 0.4   | Acceptable — can do it but not ideal |
| 0.2   | Weak — possible but not recommended |
| 0.0   | Not applicable or incompatible |

## Why Not Exact Matching?

The previous system used exact string keys like `"desktop_simple|beginner|pragmatist|preconfigured|modern_standard|lts": "Ubuntu"`. This required manually writing a mapping for every possible combination (6^7 = 279,936 combos). Missing combos produced "No exact match."

The score-based system guarantees a result for every possible combination and naturally handles fuzzy preferences.
