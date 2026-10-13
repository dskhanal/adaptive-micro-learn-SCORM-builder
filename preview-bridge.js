// Universal SCORM Player Bridge & Statistics Starter
(function() {
  // Clear any legacy HLTINF006 / infection sample project from localStorage
  try {
    const keys = ["adaptive-scorm-studio-project-v2", "adaptive-scorm-studio-project-v1"];
    for (const k of keys) {
      const val = localStorage.getItem(k);
      if (val && (val.includes("HLTINF006") || val.includes("Infection") || val.includes("infection"))) {
        localStorage.removeItem(k);
        console.log("Cleared legacy HLTINF006 sample content from " + k);
      }
    }
  } catch (e) {
    console.warn("Notice checking localStorage:", e);
  }

  // Provide the default Basic to Advanced Statistics starter project
  window.__STATISTICS_STARTER = {
  "editorVersion": "4.1.0",
  "version": "1.0.0",
  "code": "STAT101",
  "title": "Basic to Advanced Statistics",
  "subtitle": "Master descriptive metrics, probability distributions, hypothesis testing, ANOVA, and regression modeling.",
  "context": "Data Science, Business Analytics & Research Methodology",
  "jurisdiction": "Global / ISO & Academic Standard",
  "passMark": 80,
  "supportThreshold": 55,
  "challengeThreshold": 82,
  "estimatedMinutes": 75,
  "theme": {
    "name": "Modern Royal Blue",
    "variant": "light",
    "background": "#f8fafc",
    "surface": "#ffffff",
    "surfaceRaised": "#ffffff",
    "border": "#e2e8f0",
    "textPrimary": "#0f172a",
    "textMuted": "#475569",
    "textOnBrand": "#ffffff",
    "brandPrimary": "#1d4ed8",
    "brandSecondary": "#0369a1",
    "brandGradient": "linear-gradient(135deg, #1d4ed8 0%, #0369a1 100%)",
    "accent": "#0284c7",
    "accentSoft": "#e0f2fe",
    "mastered": "#15803d",
    "fragile": "#b45309",
    "gap": "#b91c1c",
    "neutralDark": "#0f172a",
    "neutralLight": "#f8fafc",
    "radii": {
      "sm": 6,
      "md": 10,
      "lg": 14,
      "full": 9999
    },
    "radius": 12,
    "typography": {
      "hero": {
        "fontSize": 32,
        "lineHeight": 1.2,
        "maxMeasure": 30
      },
      "h1": {
        "fontSize": 26,
        "lineHeight": 1.25,
        "maxMeasure": 35
      },
      "h2": {
        "fontSize": 20,
        "lineHeight": 1.3,
        "maxMeasure": 40
      },
      "h3": {
        "fontSize": 17,
        "lineHeight": 1.4,
        "maxMeasure": 45
      },
      "body": {
        "fontSize": 15,
        "lineHeight": 1.5,
        "maxMeasure": 60
      },
      "caption": {
        "fontSize": 13,
        "lineHeight": 1.4,
        "maxMeasure": 50
      },
      "micro": {
        "fontSize": 11,
        "lineHeight": 1.3,
        "maxMeasure": 40
      }
    },
    "motion": {
      "durationMs": 180,
      "easing": "ease-out",
      "scale": 1
    },
    "customFontName": "",
    "customFontData": "",
    "customCss": ""
  },
  "coverPage": {
    "enabled": true,
    "eyebrow": "STAT101 · Probability & Data Science",
    "title": "Basic to Advanced Statistics",
    "subtitle": "Master descriptive metrics, probability distributions, hypothesis testing, ANOVA, and regression modeling.",
    "layout": "heroSplit",
    "hero": [],
    "author": "Adaptive SCORM Studio",
    "organization": "Department of Statistics & Data Science",
    "date": "2026",
    "versionBadge": true,
    "startPrompt": "Start adaptive course"
  },
  "defaultRoleId": "data-analyst",
  "xapiEnabled": true,
  "roles": [
    {
      "id": "data-analyst",
      "label": "Data Analyst",
      "description": "Applied depth across exploratory analytics, probability, hypothesis testing, and regression modeling.",
      "defaultTarget": "upperIntermediate",
      "targets": {
        "descriptive": "advanced",
        "probability": "upperIntermediate",
        "inferential": "advanced",
        "categorical": "upperIntermediate",
        "variance": "upperIntermediate",
        "regression": "advanced"
      }
    },
    {
      "id": "research-scientist",
      "label": "Research Scientist / Statistician",
      "description": "Theoretical and experimental rigor across all distribution assumptions, ANOVA, and multivariate inference.",
      "defaultTarget": "advanced",
      "targets": {
        "descriptive": "advanced",
        "probability": "advanced",
        "inferential": "advanced",
        "categorical": "advanced",
        "variance": "advanced",
        "regression": "advanced"
      }
    },
    {
      "id": "business-practitioner",
      "label": "Business Analytics Practitioner",
      "description": "Core statistical literacy, effect sizes, decision risks, and predictive metric interpretation.",
      "defaultTarget": "intermediate",
      "targets": {
        "descriptive": "upperIntermediate",
        "probability": "intermediate",
        "inferential": "intermediate",
        "categorical": "intermediate",
        "variance": "intermediate",
        "regression": "intermediate"
      }
    }
  ],
  "modules": [
    {
      "id": "descriptive-module",
      "domain": "descriptive",
      "icon": "chart",
      "title": "Descriptive Statistics & Exploratory Analysis",
      "mapping": "STAT101-M1: Calculate and interpret measures of center, spread, shape, and quartiles for data distributions.",
      "required": true,
      "outcome": "Summarize data distributions accurately, compute robust metrics, identify skewness, and detect outliers.",
      "essential": "Descriptive statistics describe the basic features of data in a study. Measures of center include the mean (arithmetic average), median (middle value of ordered observations), and mode (most frequent value). Measures of spread include range, variance (average squared deviation from the mean), and standard deviation (square root of variance). In skewed distributions or when outliers are present, the median and Interquartile Range (IQR = Q3 - Q1) provide resilient, robust summaries that resist distortion.",
      "routes": {
        "beginner": "Understand the three measures of central tendency (mean, median, mode) and basic spread (range, standard deviation). Learn when the mean is pulled towards extreme values and why the median remains stable.",
        "intermediate": "Calculate the five-number summary: Minimum, First Quartile (Q1), Median, Third Quartile (Q3), and Maximum. Construct boxplots and apply Tukey's 1.5 x IQR rule to detect mild and extreme outliers.",
        "upperIntermediate": "Analyze distribution shapes using skewness (left/negative vs right/positive) and kurtosis (leptokurtic, mesokurtic, platykurtic). Apply Chebyshev's Inequality and the Empirical Rule (68-95-99.7%) to estimate probability bounds.",
        "advanced": "Implement robust location and dispersion estimators including the trimmed mean, Winsorized variance, and Median Absolute Deviation (MAD). Apply Box-Cox and logarithmic power transformations to stabilize variance and normalize skewed empirical data."
      },
      "contentStyles": {
        "cardLayout": "standard",
        "calloutStyle": "info"
      },
      "contentMedia": [],
      "checkpoints": {
        "beginner": {
          "id": "descriptive-beginner-checkpoint",
          "domain": "descriptive",
          "tier": "beginner",
          "prompt": "[Beginner Checkpoint] Which measure of central tendency is most robust and reliable when summarizing heavily skewed income data containing extreme high earners?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-median",
                "text": "The median, because it relies on ranking rather than magnitude and is unaffected by extreme values."
              },
              {
                "id": "opt-mean",
                "text": "The arithmetic mean, because it uses all observed values in the dataset."
              },
              {
                "id": "opt-midrange",
                "text": "The midrange (mean of max and min), because it captures the entire spread."
              },
              {
                "id": "opt-geometric",
                "text": "The geometric mean, because it always equals the median in positive numbers."
              }
            ],
            "correctOptionIds": [
              "opt-median"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! The median divides the ordered distribution in half and is unaffected by extreme outliers in the upper tail.",
            "incorrect": "Incorrect. The arithmetic mean is heavily pulled upward by extreme values. The median is the robust choice."
          },
          "remediation": {
            "moduleId": "descriptive-module",
            "level": "beginner",
            "topic": "Descriptive Statistics & Exploratory Analysis: Beginner",
            "text": "Review the descriptive concept: Correct! The median divides the ordered distribution in half and is unaffected by extreme outliers in the upper tail."
          }
        },
        "intermediate": {
          "id": "descriptive-intermediate-checkpoint",
          "domain": "descriptive",
          "tier": "intermediate",
          "prompt": "[Intermediate Checkpoint] For descriptive statistics & exploratory analysis, which method or metric is appropriate?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-a",
                "text": "Standard statistical formula and analytical procedure for descriptive."
              },
              {
                "id": "opt-b",
                "text": "Subjective visual estimation without mathematical verification."
              },
              {
                "id": "opt-c",
                "text": "Arbitrary selection ignoring underlying distribution characteristics."
              }
            ],
            "correctOptionIds": [
              "opt-a"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Rigorous quantitative evaluation is required for descriptive statistics & exploratory analysis.",
            "incorrect": "Incorrect. Always apply sound statistical principles and standard formulas."
          },
          "remediation": {
            "moduleId": "descriptive-module",
            "level": "intermediate",
            "topic": "Descriptive Statistics & Exploratory Analysis: Intermediate",
            "text": "Review the descriptive concept: Correct! Rigorous quantitative evaluation is required for descriptive statistics & exploratory analysis."
          }
        },
        "upperIntermediate": {
          "id": "descriptive-upperIntermediate-checkpoint",
          "domain": "descriptive",
          "tier": "upperIntermediate",
          "prompt": "[Upper Intermediate Checkpoint] In applied analytics, what assumption or constraint governs descriptive statistics & exploratory analysis?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-valid",
                "text": "Verifying distribution assumptions, sample size criteria, and boundary conditions."
              },
              {
                "id": "opt-ignore",
                "text": "Assuming all empirical datasets satisfy normal distribution criteria automatically."
              },
              {
                "id": "opt-random",
                "text": "Ignoring sample independence and measurement reliability."
              }
            ],
            "correctOptionIds": [
              "opt-valid"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Testing statistical assumptions is essential before drawing valid inferences.",
            "incorrect": "Incorrect. Assumptions and boundary conditions must always be checked."
          },
          "remediation": {
            "moduleId": "descriptive-module",
            "level": "upperIntermediate",
            "topic": "Descriptive Statistics & Exploratory Analysis: UpperIntermediate",
            "text": "Review the descriptive concept: Correct! Testing statistical assumptions is essential before drawing valid inferences."
          }
        },
        "advanced": {
          "id": "descriptive-advanced-checkpoint",
          "domain": "descriptive",
          "tier": "advanced",
          "prompt": "[Advanced Checkpoint] What diagnostic or correction is required when underlying model assumptions for descriptive statistics & exploratory analysis are violated?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-robust",
                "text": "Employ robust estimators, power transformations, or non-parametric alternatives."
              },
              {
                "id": "opt-proceed",
                "text": "Proceed without modifications because large sample sizes eliminate all biases."
              },
              {
                "id": "opt-discard",
                "text": "Discard random observations until the test statistic reaches significance."
              }
            ],
            "correctOptionIds": [
              "opt-robust"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Applying robust methods or non-parametric tests ensures sound conclusions.",
            "incorrect": "Incorrect. Model violations require appropriate transformations or robust methods."
          },
          "remediation": {
            "moduleId": "descriptive-module",
            "level": "advanced",
            "topic": "Descriptive Statistics & Exploratory Analysis: Advanced",
            "text": "Review the descriptive concept: Correct! Applying robust methods or non-parametric tests ensures sound conclusions."
          }
        }
      },
      "fastTrack": true
    },
    {
      "id": "probability-module",
      "domain": "probability",
      "icon": "sparkles",
      "title": "Probability Theory & Sampling Distributions",
      "mapping": "STAT101-M2: Apply probability axioms, theoretical distributions, and the Central Limit Theorem to sampling problems.",
      "required": true,
      "outcome": "Evaluate event probabilities, work with Normal, Binomial, and Student's t distributions, and apply the Central Limit Theorem.",
      "essential": "Probability quantifies the likelihood of random events on a scale from 0 to 1. The Central Limit Theorem (CLT) establishes that the sampling distribution of the sample mean approaches a Normal distribution as sample size n increases (typically n >= 30), regardless of the population distribution shape, provided samples are independent and identically distributed. The Standard Error of the mean (SE = sigma / sqrt(n)) quantifies sample mean variability.",
      "routes": {
        "beginner": "Master probability basics: sample spaces, mutually exclusive vs independent events, and the standard Normal distribution bell curve with Z-score standardization: Z = (X - mu) / sigma.",
        "intermediate": "Model discrete counts using the Binomial (fixed trials, constant probability) and Poisson distributions (rate of occurrences over continuous intervals). Use standard Normal distribution tables to determine tail areas.",
        "upperIntermediate": "Apply the Central Limit Theorem to calculate probabilities for sample means. Contrast population standard deviation (sigma) with the standard error of the sample mean (SE = sigma / sqrt(n)). Introduce Student's t-distribution for small samples with unknown sigma.",
        "advanced": "Derive properties of Probability Density Functions (PDF) and Cumulative Distribution Functions (CDF). Evaluate sampling distribution convergence via the Berry-Esseen theorem and assess normality using quantile-quantile (Q-Q) plots and the Shapiro-Wilk test."
      },
      "contentStyles": {
        "cardLayout": "standard",
        "calloutStyle": "info"
      },
      "contentMedia": [],
      "checkpoints": {
        "beginner": {
          "id": "probability-beginner-checkpoint",
          "domain": "probability",
          "tier": "beginner",
          "prompt": "[Beginner Checkpoint] According to the Central Limit Theorem, what happens to the standard error of the sample mean as the sample size n is quadrupled (multiplied by 4)?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-half",
                "text": "The standard error is halved (divided by 2), since SE = sigma / sqrt(n)."
              },
              {
                "id": "opt-quarter",
                "text": "The standard error is divided by 4, scaling inversely with sample size."
              },
              {
                "id": "opt-double",
                "text": "The standard error doubles due to increased sample variability."
              },
              {
                "id": "opt-constant",
                "text": "The standard error remains constant because population sigma does not change."
              }
            ],
            "correctOptionIds": [
              "opt-half"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Because n is inside the square root in the denominator (SE = sigma / sqrt(n)), multiplying n by 4 cuts the standard error in half.",
            "incorrect": "Incorrect. Recall the formula SE = sigma / sqrt(n). Since sqrt(4) = 2, multiplying n by 4 halves the standard error."
          },
          "remediation": {
            "moduleId": "probability-module",
            "level": "beginner",
            "topic": "Probability Theory & Sampling Distributions: Beginner",
            "text": "Review the probability concept: Correct! Because n is inside the square root in the denominator (SE = sigma / sqrt(n)), multiplying n by 4 cuts the standard error in half."
          }
        },
        "intermediate": {
          "id": "probability-intermediate-checkpoint",
          "domain": "probability",
          "tier": "intermediate",
          "prompt": "[Intermediate Checkpoint] For probability theory & sampling distributions, which method or metric is appropriate?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-a",
                "text": "Standard statistical formula and analytical procedure for probability."
              },
              {
                "id": "opt-b",
                "text": "Subjective visual estimation without mathematical verification."
              },
              {
                "id": "opt-c",
                "text": "Arbitrary selection ignoring underlying distribution characteristics."
              }
            ],
            "correctOptionIds": [
              "opt-a"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Rigorous quantitative evaluation is required for probability theory & sampling distributions.",
            "incorrect": "Incorrect. Always apply sound statistical principles and standard formulas."
          },
          "remediation": {
            "moduleId": "probability-module",
            "level": "intermediate",
            "topic": "Probability Theory & Sampling Distributions: Intermediate",
            "text": "Review the probability concept: Correct! Rigorous quantitative evaluation is required for probability theory & sampling distributions."
          }
        },
        "upperIntermediate": {
          "id": "probability-upperIntermediate-checkpoint",
          "domain": "probability",
          "tier": "upperIntermediate",
          "prompt": "[Upper Intermediate Checkpoint] In applied analytics, what assumption or constraint governs probability theory & sampling distributions?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-valid",
                "text": "Verifying distribution assumptions, sample size criteria, and boundary conditions."
              },
              {
                "id": "opt-ignore",
                "text": "Assuming all empirical datasets satisfy normal distribution criteria automatically."
              },
              {
                "id": "opt-random",
                "text": "Ignoring sample independence and measurement reliability."
              }
            ],
            "correctOptionIds": [
              "opt-valid"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Testing statistical assumptions is essential before drawing valid inferences.",
            "incorrect": "Incorrect. Assumptions and boundary conditions must always be checked."
          },
          "remediation": {
            "moduleId": "probability-module",
            "level": "upperIntermediate",
            "topic": "Probability Theory & Sampling Distributions: UpperIntermediate",
            "text": "Review the probability concept: Correct! Testing statistical assumptions is essential before drawing valid inferences."
          }
        },
        "advanced": {
          "id": "probability-advanced-checkpoint",
          "domain": "probability",
          "tier": "advanced",
          "prompt": "[Advanced Checkpoint] What diagnostic or correction is required when underlying model assumptions for probability theory & sampling distributions are violated?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-robust",
                "text": "Employ robust estimators, power transformations, or non-parametric alternatives."
              },
              {
                "id": "opt-proceed",
                "text": "Proceed without modifications because large sample sizes eliminate all biases."
              },
              {
                "id": "opt-discard",
                "text": "Discard random observations until the test statistic reaches significance."
              }
            ],
            "correctOptionIds": [
              "opt-robust"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Applying robust methods or non-parametric tests ensures sound conclusions.",
            "incorrect": "Incorrect. Model violations require appropriate transformations or robust methods."
          },
          "remediation": {
            "moduleId": "probability-module",
            "level": "advanced",
            "topic": "Probability Theory & Sampling Distributions: Advanced",
            "text": "Review the probability concept: Correct! Applying robust methods or non-parametric tests ensures sound conclusions."
          }
        }
      },
      "fastTrack": true
    },
    {
      "id": "inferential-module",
      "domain": "inferential",
      "icon": "shield",
      "title": "Hypothesis Testing & Two-Sample Inference",
      "mapping": "STAT101-M3: Formulate statistical hypotheses, evaluate p-values against alpha, and avoid Type I and Type II decision errors.",
      "required": true,
      "outcome": "State statistical hypotheses, compute test statistics, interpret p-values, calculate effect sizes, and avoid decision errors.",
      "essential": "Hypothesis testing evaluates empirical evidence against a null hypothesis (H0, specifying no effect or difference) in favor of an alternative hypothesis (Ha). The p-value is the probability of obtaining test results at least as extreme as the observed sample, assuming H0 is true. A Type I error (alpha) occurs when rejecting a true null hypothesis (false positive). A Type II error (beta) occurs when failing to reject a false null hypothesis (false negative). Power (1 - beta) represents the probability of correctly detecting a real effect.",
      "routes": {
        "beginner": "Understand the five steps of hypothesis testing: state H0 and Ha, choose significance level alpha (commonly 0.05), calculate test statistic and p-value, and make a reject / fail-to-reject decision.",
        "intermediate": "Interpret p-values correctly: p <= alpha indicates statistically significant divergence from H0. Distinguish Type I and Type II errors, and calculate Cohen's d to quantify practical effect size beyond statistical significance.",
        "upperIntermediate": "Select and execute One-sample t-tests, Independent Two-sample t-tests, Welch's t-test (for unequal variances), and Paired samples t-tests. Conduct power calculations to determine minimum required sample sizes for target effect sizes.",
        "advanced": "Address the multiple testing problem by implementing Bonferroni correction and the Benjamini-Hochberg False Discovery Rate (FDR). Employ non-parametric alternatives (Mann-Whitney U, Wilcoxon Signed-Rank) when distributional assumptions fail."
      },
      "contentStyles": {
        "cardLayout": "standard",
        "calloutStyle": "info"
      },
      "contentMedia": [],
      "checkpoints": {
        "beginner": {
          "id": "inferential-beginner-checkpoint",
          "domain": "inferential",
          "tier": "beginner",
          "prompt": "[Beginner Checkpoint] A clinical trial tests a new therapy with alpha = 0.05 and obtains a p-value of 0.018. What is the correct statistical conclusion?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-reject",
                "text": "Reject the null hypothesis; there is statistically significant evidence of a treatment effect at the 0.05 level."
              },
              {
                "id": "opt-fail",
                "text": "Fail to reject the null hypothesis, because p is greater than 0.01."
              },
              {
                "id": "opt-prove-alt",
                "text": "Accept that the alternative hypothesis has been proven with 100% certainty."
              },
              {
                "id": "opt-type1",
                "text": "Conclude that a Type I error has definitely occurred."
              }
            ],
            "correctOptionIds": [
              "opt-reject"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Because p = 0.018 <= 0.05, we reject the null hypothesis and conclude that the observed effect is statistically significant.",
            "incorrect": "Incorrect. When p <= alpha (0.018 <= 0.05), the decision is to reject H0."
          },
          "remediation": {
            "moduleId": "inferential-module",
            "level": "beginner",
            "topic": "Hypothesis Testing & Two-Sample Inference: Beginner",
            "text": "Review the inferential concept: Correct! Because p = 0.018 <= 0.05, we reject the null hypothesis and conclude that the observed effect is statistically significant."
          }
        },
        "intermediate": {
          "id": "inferential-intermediate-checkpoint",
          "domain": "inferential",
          "tier": "intermediate",
          "prompt": "[Intermediate Checkpoint] For hypothesis testing & two-sample inference, which method or metric is appropriate?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-a",
                "text": "Standard statistical formula and analytical procedure for inferential."
              },
              {
                "id": "opt-b",
                "text": "Subjective visual estimation without mathematical verification."
              },
              {
                "id": "opt-c",
                "text": "Arbitrary selection ignoring underlying distribution characteristics."
              }
            ],
            "correctOptionIds": [
              "opt-a"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Rigorous quantitative evaluation is required for hypothesis testing & two-sample inference.",
            "incorrect": "Incorrect. Always apply sound statistical principles and standard formulas."
          },
          "remediation": {
            "moduleId": "inferential-module",
            "level": "intermediate",
            "topic": "Hypothesis Testing & Two-Sample Inference: Intermediate",
            "text": "Review the inferential concept: Correct! Rigorous quantitative evaluation is required for hypothesis testing & two-sample inference."
          }
        },
        "upperIntermediate": {
          "id": "inferential-upperIntermediate-checkpoint",
          "domain": "inferential",
          "tier": "upperIntermediate",
          "prompt": "[Upper Intermediate Checkpoint] In applied analytics, what assumption or constraint governs hypothesis testing & two-sample inference?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-valid",
                "text": "Verifying distribution assumptions, sample size criteria, and boundary conditions."
              },
              {
                "id": "opt-ignore",
                "text": "Assuming all empirical datasets satisfy normal distribution criteria automatically."
              },
              {
                "id": "opt-random",
                "text": "Ignoring sample independence and measurement reliability."
              }
            ],
            "correctOptionIds": [
              "opt-valid"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Testing statistical assumptions is essential before drawing valid inferences.",
            "incorrect": "Incorrect. Assumptions and boundary conditions must always be checked."
          },
          "remediation": {
            "moduleId": "inferential-module",
            "level": "upperIntermediate",
            "topic": "Hypothesis Testing & Two-Sample Inference: UpperIntermediate",
            "text": "Review the inferential concept: Correct! Testing statistical assumptions is essential before drawing valid inferences."
          }
        },
        "advanced": {
          "id": "inferential-advanced-checkpoint",
          "domain": "inferential",
          "tier": "advanced",
          "prompt": "[Advanced Checkpoint] What diagnostic or correction is required when underlying model assumptions for hypothesis testing & two-sample inference are violated?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-robust",
                "text": "Employ robust estimators, power transformations, or non-parametric alternatives."
              },
              {
                "id": "opt-proceed",
                "text": "Proceed without modifications because large sample sizes eliminate all biases."
              },
              {
                "id": "opt-discard",
                "text": "Discard random observations until the test statistic reaches significance."
              }
            ],
            "correctOptionIds": [
              "opt-robust"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Applying robust methods or non-parametric tests ensures sound conclusions.",
            "incorrect": "Incorrect. Model violations require appropriate transformations or robust methods."
          },
          "remediation": {
            "moduleId": "inferential-module",
            "level": "advanced",
            "topic": "Hypothesis Testing & Two-Sample Inference: Advanced",
            "text": "Review the inferential concept: Correct! Applying robust methods or non-parametric tests ensures sound conclusions."
          }
        }
      },
      "fastTrack": true
    },
    {
      "id": "categorical-module",
      "domain": "categorical",
      "icon": "layers",
      "title": "Categorical Data Analysis & Contingency Testing",
      "mapping": "STAT101-M4: Analyze frequency tables, test independence and goodness-of-fit with Chi-Square, and measure association with odds ratios.",
      "required": true,
      "outcome": "Compute expected cell frequencies, evaluate Chi-Square tests of independence and goodness-of-fit, and interpret odds ratios.",
      "essential": "Categorical analysis evaluates qualitative attributes grouped into counts. The Pearson Chi-Square test compares observed frequencies (O) against expected frequencies (E) under independence: Chi-Square = sum((O - E)^2 / E). In r x c contingency tables, degrees of freedom equal (r - 1)(c - 1). For 2x2 tables, association strength is measured using Odds Ratios (OR = (a*d)/(b*c)), Relative Risk (RR), and Risk Difference.",
      "routes": {
        "beginner": "Explore categorical variables, contingency tables, and observed frequencies. Understand the concept of test of independence between two categorical factors.",
        "intermediate": "Calculate expected frequencies: E = (Row Total * Column Total) / Grand Total. Compute the Chi-Square statistic and compare it against the critical value for degrees of freedom (r - 1)(c - 1).",
        "upperIntermediate": "Verify Cochran's sample size criteria (all E >= 1, and no more than 20% of cells have E < 5). Calculate and interpret Odds Ratios (OR) and Relative Risk (RR) with 95% confidence intervals.",
        "advanced": "Apply Fisher's Exact Test for 2x2 tables with sparse counts. Calculate Cramer's V to measure the strength of association, and formulate log-linear models for multi-way contingency structures."
      },
      "contentStyles": {
        "cardLayout": "standard",
        "calloutStyle": "info"
      },
      "contentMedia": [],
      "checkpoints": {
        "beginner": {
          "id": "categorical-beginner-checkpoint",
          "domain": "categorical",
          "tier": "beginner",
          "prompt": "[Beginner Checkpoint] In a 3 x 4 contingency table evaluating customer satisfaction across product tiers, what are the degrees of freedom (df) for the Chi-Square test of independence?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-6",
                "text": "6, calculated as (3 - 1) * (4 - 1) = 2 * 3 = 6."
              },
              {
                "id": "opt-12",
                "text": "12, calculated as the total number of cells 3 * 4 = 12."
              },
              {
                "id": "opt-11",
                "text": "11, calculated as total cells minus one (12 - 1 = 11)."
              },
              {
                "id": "opt-7",
                "text": "7, calculated as rows plus columns (3 + 4 = 7)."
              }
            ],
            "correctOptionIds": [
              "opt-6"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! The degrees of freedom for an r x c contingency table are (r - 1) * (c - 1) = (3 - 1) * (4 - 1) = 6.",
            "incorrect": "Incorrect. Remember the formula df = (r - 1) * (c - 1). For 3 rows and 4 columns, df = 2 * 3 = 6."
          },
          "remediation": {
            "moduleId": "categorical-module",
            "level": "beginner",
            "topic": "Categorical Data Analysis & Contingency Testing: Beginner",
            "text": "Review the categorical concept: Correct! The degrees of freedom for an r x c contingency table are (r - 1) * (c - 1) = (3 - 1) * (4 - 1) = 6."
          }
        },
        "intermediate": {
          "id": "categorical-intermediate-checkpoint",
          "domain": "categorical",
          "tier": "intermediate",
          "prompt": "[Intermediate Checkpoint] For categorical data analysis & contingency testing, which method or metric is appropriate?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-a",
                "text": "Standard statistical formula and analytical procedure for categorical."
              },
              {
                "id": "opt-b",
                "text": "Subjective visual estimation without mathematical verification."
              },
              {
                "id": "opt-c",
                "text": "Arbitrary selection ignoring underlying distribution characteristics."
              }
            ],
            "correctOptionIds": [
              "opt-a"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Rigorous quantitative evaluation is required for categorical data analysis & contingency testing.",
            "incorrect": "Incorrect. Always apply sound statistical principles and standard formulas."
          },
          "remediation": {
            "moduleId": "categorical-module",
            "level": "intermediate",
            "topic": "Categorical Data Analysis & Contingency Testing: Intermediate",
            "text": "Review the categorical concept: Correct! Rigorous quantitative evaluation is required for categorical data analysis & contingency testing."
          }
        },
        "upperIntermediate": {
          "id": "categorical-upperIntermediate-checkpoint",
          "domain": "categorical",
          "tier": "upperIntermediate",
          "prompt": "[Upper Intermediate Checkpoint] In applied analytics, what assumption or constraint governs categorical data analysis & contingency testing?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-valid",
                "text": "Verifying distribution assumptions, sample size criteria, and boundary conditions."
              },
              {
                "id": "opt-ignore",
                "text": "Assuming all empirical datasets satisfy normal distribution criteria automatically."
              },
              {
                "id": "opt-random",
                "text": "Ignoring sample independence and measurement reliability."
              }
            ],
            "correctOptionIds": [
              "opt-valid"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Testing statistical assumptions is essential before drawing valid inferences.",
            "incorrect": "Incorrect. Assumptions and boundary conditions must always be checked."
          },
          "remediation": {
            "moduleId": "categorical-module",
            "level": "upperIntermediate",
            "topic": "Categorical Data Analysis & Contingency Testing: UpperIntermediate",
            "text": "Review the categorical concept: Correct! Testing statistical assumptions is essential before drawing valid inferences."
          }
        },
        "advanced": {
          "id": "categorical-advanced-checkpoint",
          "domain": "categorical",
          "tier": "advanced",
          "prompt": "[Advanced Checkpoint] What diagnostic or correction is required when underlying model assumptions for categorical data analysis & contingency testing are violated?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-robust",
                "text": "Employ robust estimators, power transformations, or non-parametric alternatives."
              },
              {
                "id": "opt-proceed",
                "text": "Proceed without modifications because large sample sizes eliminate all biases."
              },
              {
                "id": "opt-discard",
                "text": "Discard random observations until the test statistic reaches significance."
              }
            ],
            "correctOptionIds": [
              "opt-robust"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Applying robust methods or non-parametric tests ensures sound conclusions.",
            "incorrect": "Incorrect. Model violations require appropriate transformations or robust methods."
          },
          "remediation": {
            "moduleId": "categorical-module",
            "level": "advanced",
            "topic": "Categorical Data Analysis & Contingency Testing: Advanced",
            "text": "Review the categorical concept: Correct! Applying robust methods or non-parametric tests ensures sound conclusions."
          }
        }
      },
      "fastTrack": true
    },
    {
      "id": "variance-module",
      "domain": "variance",
      "icon": "trending",
      "title": "Analysis of Variance (ANOVA) & Experimental Design",
      "mapping": "STAT101-M5: Conduct one-way and two-way ANOVA to evaluate differences across three or more treatment groups without inflating error rates.",
      "required": true,
      "outcome": "Partition total variance into between and within components, compute F-ratios, evaluate ANOVA assumptions, and apply post-hoc tests.",
      "essential": "When comparing means across three or more groups, performing multiple pairwise t-tests causes family-wise Type I error inflation (1 - (1 - alpha)^k). Analysis of Variance (ANOVA) controls this by partitioning Total Sum of Squares (SST) into Between-Group variation (SSB) and Within-Group variation (SSW). The test statistic is the F-ratio: F = MSB / MSW. An F-ratio significantly greater than 1 indicates that between-group differences exceed random sampling variation.",
      "routes": {
        "beginner": "Understand why ANOVA is required instead of multiple independent t-tests across three or more groups. Learn the intuition of comparing variance between groups against variance within groups.",
        "intermediate": "Construct a One-Way ANOVA summary table: Degrees of freedom (df_between = k - 1, df_within = N - k), Mean Squares (MS = SS / df), and the F-ratio (MSB / MSW). Interpret the overall F-test decision.",
        "upperIntermediate": "Test ANOVA assumptions: Normality of residuals (Shapiro-Wilk) and Homogeneity of variance (Levene's test). Conduct Tukey's Honestly Significant Difference (HSD) post-hoc test to identify exactly which group pairs differ.",
        "advanced": "Formulate Two-Way Factorial ANOVA with interaction effects (Factor A, Factor B, A x B interaction). Interpret parallel vs intersecting profile plots, and apply Repeated Measures ANOVA with Mauchly's test for sphericity."
      },
      "contentStyles": {
        "cardLayout": "standard",
        "calloutStyle": "info"
      },
      "contentMedia": [],
      "checkpoints": {
        "beginner": {
          "id": "variance-beginner-checkpoint",
          "domain": "variance",
          "tier": "beginner",
          "prompt": "[Beginner Checkpoint] Why must an educator or researcher use One-Way ANOVA instead of three separate independent two-sample t-tests when comparing three treatment groups at alpha = 0.05?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-familywise",
                "text": "Multiple t-tests inflate the family-wise Type I error rate to approximately 14%, increasing the chance of false positives."
              },
              {
                "id": "opt-variance",
                "text": "T-tests cannot be computed when samples have more than 20 participants."
              },
              {
                "id": "opt-negative",
                "text": "T-tests always produce negative values when comparing three groups."
              },
              {
                "id": "opt-degrees",
                "text": "ANOVA eliminates the need for any post-hoc pairwise comparisons."
              }
            ],
            "correctOptionIds": [
              "opt-familywise"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! With 3 tests at alpha = 0.05, the cumulative family-wise error rate is 1 - (1 - 0.05)^3 = 14.3%. ANOVA protects against this inflation.",
            "incorrect": "Incorrect. Running multiple t-tests inflates the overall Type I error rate (family-wise error). ANOVA evaluates all groups simultaneously."
          },
          "remediation": {
            "moduleId": "variance-module",
            "level": "beginner",
            "topic": "Analysis of Variance (ANOVA) & Experimental Design: Beginner",
            "text": "Review the variance concept: Correct! With 3 tests at alpha = 0.05, the cumulative family-wise error rate is 1 - (1 - 0.05)^3 = 14.3%. ANOVA protects against this inflation."
          }
        },
        "intermediate": {
          "id": "variance-intermediate-checkpoint",
          "domain": "variance",
          "tier": "intermediate",
          "prompt": "[Intermediate Checkpoint] For analysis of variance (anova) & experimental design, which method or metric is appropriate?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-a",
                "text": "Standard statistical formula and analytical procedure for variance."
              },
              {
                "id": "opt-b",
                "text": "Subjective visual estimation without mathematical verification."
              },
              {
                "id": "opt-c",
                "text": "Arbitrary selection ignoring underlying distribution characteristics."
              }
            ],
            "correctOptionIds": [
              "opt-a"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Rigorous quantitative evaluation is required for analysis of variance (anova) & experimental design.",
            "incorrect": "Incorrect. Always apply sound statistical principles and standard formulas."
          },
          "remediation": {
            "moduleId": "variance-module",
            "level": "intermediate",
            "topic": "Analysis of Variance (ANOVA) & Experimental Design: Intermediate",
            "text": "Review the variance concept: Correct! Rigorous quantitative evaluation is required for analysis of variance (anova) & experimental design."
          }
        },
        "upperIntermediate": {
          "id": "variance-upperIntermediate-checkpoint",
          "domain": "variance",
          "tier": "upperIntermediate",
          "prompt": "[Upper Intermediate Checkpoint] In applied analytics, what assumption or constraint governs analysis of variance (anova) & experimental design?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-valid",
                "text": "Verifying distribution assumptions, sample size criteria, and boundary conditions."
              },
              {
                "id": "opt-ignore",
                "text": "Assuming all empirical datasets satisfy normal distribution criteria automatically."
              },
              {
                "id": "opt-random",
                "text": "Ignoring sample independence and measurement reliability."
              }
            ],
            "correctOptionIds": [
              "opt-valid"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Testing statistical assumptions is essential before drawing valid inferences.",
            "incorrect": "Incorrect. Assumptions and boundary conditions must always be checked."
          },
          "remediation": {
            "moduleId": "variance-module",
            "level": "upperIntermediate",
            "topic": "Analysis of Variance (ANOVA) & Experimental Design: UpperIntermediate",
            "text": "Review the variance concept: Correct! Testing statistical assumptions is essential before drawing valid inferences."
          }
        },
        "advanced": {
          "id": "variance-advanced-checkpoint",
          "domain": "variance",
          "tier": "advanced",
          "prompt": "[Advanced Checkpoint] What diagnostic or correction is required when underlying model assumptions for analysis of variance (anova) & experimental design are violated?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-robust",
                "text": "Employ robust estimators, power transformations, or non-parametric alternatives."
              },
              {
                "id": "opt-proceed",
                "text": "Proceed without modifications because large sample sizes eliminate all biases."
              },
              {
                "id": "opt-discard",
                "text": "Discard random observations until the test statistic reaches significance."
              }
            ],
            "correctOptionIds": [
              "opt-robust"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Applying robust methods or non-parametric tests ensures sound conclusions.",
            "incorrect": "Incorrect. Model violations require appropriate transformations or robust methods."
          },
          "remediation": {
            "moduleId": "variance-module",
            "level": "advanced",
            "topic": "Analysis of Variance (ANOVA) & Experimental Design: Advanced",
            "text": "Review the variance concept: Correct! Applying robust methods or non-parametric tests ensures sound conclusions."
          }
        }
      },
      "fastTrack": true
    },
    {
      "id": "regression-module",
      "domain": "regression",
      "icon": "book",
      "title": "Correlation, Linear Regression & Predictive Modeling",
      "mapping": "STAT101-M6: Formulate simple and multiple linear regression models, evaluate R-squared, diagnose residual assumptions, and assess collinearity.",
      "required": true,
      "outcome": "Estimate OLS regression coefficients, evaluate goodness-of-fit (R-squared), validate LINE residual assumptions, and detect multicollinearity.",
      "essential": "Regression analysis models the relationship between dependent response variable Y and one or more independent explanatory variables X. Ordinary Least Squares (OLS) minimizes the sum of squared residuals (errors). The coefficient of determination (R^2) represents the proportion of variance in Y explained by the model. Multiple regression extends this to multiple predictors, requiring verification of LINE assumptions (Linearity, Independence, Normality, Equal variance) and checks for multicollinearity (Variance Inflation Factor / VIF).",
      "routes": {
        "beginner": "Contrast correlation (strength and direction of linear association, Pearson's r from -1 to +1) with causation. Understand the simple linear regression line equation: Y_hat = beta0 + beta1 * X.",
        "intermediate": "Interpret the regression intercept (beta0) and slope coefficient (beta1). Understand the coefficient of determination R^2 and calculate predictions for given values of X.",
        "upperIntermediate": "Extend to Multiple Linear Regression with multiple predictors. Interpret partial regression coefficients holding other variables constant. Evaluate Adjusted R^2 and the overall model F-test.",
        "advanced": "Verify OLS assumptions using residual plots: Linearity, Normality (Q-Q plot), Homoscedasticity vs Heteroscedasticity (Breusch-Pagan test), and Independence. Detect multicollinearity using Variance Inflation Factors (VIF > 5-10) and influential outliers using Cook's Distance."
      },
      "contentStyles": {
        "cardLayout": "standard",
        "calloutStyle": "info"
      },
      "contentMedia": [],
      "checkpoints": {
        "beginner": {
          "id": "regression-beginner-checkpoint",
          "domain": "regression",
          "tier": "beginner",
          "prompt": "[Beginner Checkpoint] In a multiple linear regression model predicting sales from ad spend and store size, the model R-squared is 0.72. What is the correct interpretation of this value?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-r2",
                "text": "72% of the total variance in sales is explained by the combination of ad spend and store size in the model."
              },
              {
                "id": "opt-correlation",
                "text": "The Pearson correlation coefficient between sales and each predictor is 0.72."
              },
              {
                "id": "opt-error",
                "text": "The model will make accurate sales predictions exactly 72% of the time."
              },
              {
                "id": "opt-slope",
                "text": "Every dollar increase in ad spend increases sales by $0.72."
              }
            ],
            "correctOptionIds": [
              "opt-r2"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! R^2 (coefficient of determination) represents the proportion of variance in the dependent variable explained by the independent variables.",
            "incorrect": "Incorrect. R^2 is the proportion of variance in the response variable explained by the regression model (72% in this case)."
          },
          "remediation": {
            "moduleId": "regression-module",
            "level": "beginner",
            "topic": "Correlation, Linear Regression & Predictive Modeling: Beginner",
            "text": "Review the regression concept: Correct! R^2 (coefficient of determination) represents the proportion of variance in the dependent variable explained by the independent variables."
          }
        },
        "intermediate": {
          "id": "regression-intermediate-checkpoint",
          "domain": "regression",
          "tier": "intermediate",
          "prompt": "[Intermediate Checkpoint] For correlation, linear regression & predictive modeling, which method or metric is appropriate?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-a",
                "text": "Standard statistical formula and analytical procedure for regression."
              },
              {
                "id": "opt-b",
                "text": "Subjective visual estimation without mathematical verification."
              },
              {
                "id": "opt-c",
                "text": "Arbitrary selection ignoring underlying distribution characteristics."
              }
            ],
            "correctOptionIds": [
              "opt-a"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Rigorous quantitative evaluation is required for correlation, linear regression & predictive modeling.",
            "incorrect": "Incorrect. Always apply sound statistical principles and standard formulas."
          },
          "remediation": {
            "moduleId": "regression-module",
            "level": "intermediate",
            "topic": "Correlation, Linear Regression & Predictive Modeling: Intermediate",
            "text": "Review the regression concept: Correct! Rigorous quantitative evaluation is required for correlation, linear regression & predictive modeling."
          }
        },
        "upperIntermediate": {
          "id": "regression-upperIntermediate-checkpoint",
          "domain": "regression",
          "tier": "upperIntermediate",
          "prompt": "[Upper Intermediate Checkpoint] In applied analytics, what assumption or constraint governs correlation, linear regression & predictive modeling?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-valid",
                "text": "Verifying distribution assumptions, sample size criteria, and boundary conditions."
              },
              {
                "id": "opt-ignore",
                "text": "Assuming all empirical datasets satisfy normal distribution criteria automatically."
              },
              {
                "id": "opt-random",
                "text": "Ignoring sample independence and measurement reliability."
              }
            ],
            "correctOptionIds": [
              "opt-valid"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Testing statistical assumptions is essential before drawing valid inferences.",
            "incorrect": "Incorrect. Assumptions and boundary conditions must always be checked."
          },
          "remediation": {
            "moduleId": "regression-module",
            "level": "upperIntermediate",
            "topic": "Correlation, Linear Regression & Predictive Modeling: UpperIntermediate",
            "text": "Review the regression concept: Correct! Testing statistical assumptions is essential before drawing valid inferences."
          }
        },
        "advanced": {
          "id": "regression-advanced-checkpoint",
          "domain": "regression",
          "tier": "advanced",
          "prompt": "[Advanced Checkpoint] What diagnostic or correction is required when underlying model assumptions for correlation, linear regression & predictive modeling are violated?",
          "interaction": {
            "kind": "multipleChoice",
            "options": [
              {
                "id": "opt-robust",
                "text": "Employ robust estimators, power transformations, or non-parametric alternatives."
              },
              {
                "id": "opt-proceed",
                "text": "Proceed without modifications because large sample sizes eliminate all biases."
              },
              {
                "id": "opt-discard",
                "text": "Discard random observations until the test statistic reaches significance."
              }
            ],
            "correctOptionIds": [
              "opt-robust"
            ],
            "minSelections": 1,
            "maxSelections": 1,
            "scoringMode": "strict"
          },
          "feedback": {
            "correct": "Correct! Applying robust methods or non-parametric tests ensures sound conclusions.",
            "incorrect": "Incorrect. Model violations require appropriate transformations or robust methods."
          },
          "remediation": {
            "moduleId": "regression-module",
            "level": "advanced",
            "topic": "Correlation, Linear Regression & Predictive Modeling: Advanced",
            "text": "Review the regression concept: Correct! Applying robust methods or non-parametric tests ensures sound conclusions."
          }
        }
      },
      "fastTrack": true
    }
  ],
  "diagnostic": [
    {
      "id": "diag-desc-1",
      "domain": "descriptive",
      "tier": "beginner",
      "prompt": "If a dataset has a mean of 50 and a median of 35, what does this indicate about the distribution shape?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "d1-pos",
            "text": "The distribution is right-skewed (positively skewed) with a long upper tail."
          },
          {
            "id": "d1-neg",
            "text": "The distribution is left-skewed (negatively skewed) with extreme low values."
          },
          {
            "id": "d1-sym",
            "text": "The distribution is symmetric and follows a perfect normal curve."
          },
          {
            "id": "d1-uni",
            "text": "The distribution has zero variance."
          }
        ],
        "correctOptionIds": [
          "d1-pos"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! When mean > median, extreme large values pull the mean upward into the right tail.",
        "incorrect": "Incorrect. When the mean is larger than the median, the distribution is right-skewed."
      },
      "remediation": {
        "moduleId": "descriptive-module",
        "level": "beginner",
        "topic": "Descriptive Analysis: Beginner",
        "text": "Review the descriptive concept: Correct! When mean > median, extreme large values pull the mean upward into the right tail."
      }
    },
    {
      "id": "diag-desc-2",
      "domain": "descriptive",
      "tier": "intermediate",
      "prompt": "In a boxplot, an observation is classified as an outlier if it falls beyond what boundary?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "d2-iqr",
            "text": "1.5 times the Interquartile Range (IQR) above Q3 or below Q1."
          },
          {
            "id": "d2-sd",
            "text": "Exactly 1 standard deviation from the median."
          },
          {
            "id": "d2-range",
            "text": "50% of the total range from the center."
          },
          {
            "id": "d2-mean",
            "text": "Any value outside the middle 90% percentile."
          }
        ],
        "correctOptionIds": [
          "d2-iqr"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! Tukey's fence rule defines outliers as values outside [Q1 - 1.5*IQR, Q3 + 1.5*IQR].",
        "incorrect": "Incorrect. Outliers in standard boxplots are located beyond 1.5 x IQR from the quartiles."
      },
      "remediation": {
        "moduleId": "descriptive-module",
        "level": "intermediate",
        "topic": "Descriptive Analysis: Intermediate",
        "text": "Review the descriptive concept: Correct! Tukey's fence rule defines outliers as values outside [Q1 - 1.5*IQR, Q3 + 1.5*IQR]."
      }
    },
    {
      "id": "diag-prob-1",
      "domain": "probability",
      "tier": "beginner",
      "prompt": "What is the total area under the probability density curve of any continuous random variable?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "dp1-one",
            "text": "Exactly 1.0 (or 100%)."
          },
          {
            "id": "dp1-zero",
            "text": "0.0, because single point probabilities are zero."
          },
          {
            "id": "dp1-inf",
            "text": "Infinity, because continuous variables are unbounded."
          },
          {
            "id": "dp1-z",
            "text": "Equal to the population mean mu."
          }
        ],
        "correctOptionIds": [
          "dp1-one"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! The total area under any probability density function must integrate to exactly 1.",
        "incorrect": "Incorrect. By the fundamental axioms of probability, the total probability area is 1."
      },
      "remediation": {
        "moduleId": "probability-module",
        "level": "beginner",
        "topic": "Probability Theory: Beginner",
        "text": "Review the probability concept: Correct! The total area under any probability density function must integrate to exactly 1."
      }
    },
    {
      "id": "diag-prob-2",
      "domain": "probability",
      "tier": "intermediate",
      "prompt": "Which probability distribution is most appropriate for modeling the number of website visits per hour?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "dp2-poisson",
            "text": "Poisson distribution, which models counts of events occurring in fixed time intervals."
          },
          {
            "id": "dp2-uniform",
            "text": "Uniform distribution, where all counts have identical probability."
          },
          {
            "id": "dp2-t",
            "text": "Student's t-distribution with infinite degrees of freedom."
          },
          {
            "id": "dp2-bernoulli",
            "text": "Bernoulli distribution, which only allows binary 0 or 1 values."
          }
        ],
        "correctOptionIds": [
          "dp2-poisson"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! The Poisson distribution models independent event arrival counts over a continuous interval.",
        "incorrect": "Incorrect. Event counts over a specified time interval are modeled using the Poisson distribution."
      },
      "remediation": {
        "moduleId": "probability-module",
        "level": "intermediate",
        "topic": "Probability Theory: Intermediate",
        "text": "Review the probability concept: Correct! The Poisson distribution models independent event arrival counts over a continuous interval."
      }
    },
    {
      "id": "diag-inf-1",
      "domain": "inferential",
      "tier": "beginner",
      "prompt": "What is the definition of a Type I error in statistical hypothesis testing?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "di1-falsepos",
            "text": "Rejecting the null hypothesis when the null hypothesis is actually true (False Positive)."
          },
          {
            "id": "di1-falseneg",
            "text": "Failing to reject the null hypothesis when the null hypothesis is false (False Negative)."
          },
          {
            "id": "di1-calc",
            "text": "Making a mathematical arithmetic mistake during test calculation."
          },
          {
            "id": "di1-power",
            "text": "Having insufficient sample size to detect a genuine effect."
          }
        ],
        "correctOptionIds": [
          "di1-falsepos"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! Type I error (alpha) occurs when we falsely reject a true null hypothesis.",
        "incorrect": "Incorrect. Type I error is rejecting H0 when H0 is true. Failing to reject a false H0 is Type II error."
      },
      "remediation": {
        "moduleId": "inferential-module",
        "level": "beginner",
        "topic": "Hypothesis Testing: Beginner",
        "text": "Review the inferential concept: Correct! Type I error (alpha) occurs when we falsely reject a true null hypothesis."
      }
    },
    {
      "id": "diag-inf-2",
      "domain": "inferential",
      "tier": "intermediate",
      "prompt": "When comparing the mean test scores of the SAME group of students before and after training, which test is appropriate?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "di2-paired",
            "text": "Paired samples t-test (dependent samples t-test)."
          },
          {
            "id": "di2-indep",
            "text": "Independent two-sample t-test."
          },
          {
            "id": "di2-anova",
            "text": "Three-way factorial ANOVA."
          },
          {
            "id": "di2-chisq",
            "text": "Chi-Square test of independence."
          }
        ],
        "correctOptionIds": [
          "di2-paired"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! Because each student provides both a pre-test and post-test score, a paired t-test is required.",
        "incorrect": "Incorrect. Repeated measures on the same subjects require a paired (dependent) samples t-test."
      },
      "remediation": {
        "moduleId": "inferential-module",
        "level": "intermediate",
        "topic": "Hypothesis Testing: Intermediate",
        "text": "Review the inferential concept: Correct! Because each student provides both a pre-test and post-test score, a paired t-test is required."
      }
    },
    {
      "id": "diag-cat-1",
      "domain": "categorical",
      "tier": "beginner",
      "prompt": "What test is used to evaluate whether smoking status (Yes/No) is independent of lung disease diagnosis (Yes/No)?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "dc1-chi",
            "text": "Chi-Square test of independence."
          },
          {
            "id": "dc1-z",
            "text": "One-sample Z-test for means."
          },
          {
            "id": "dc1-pearson",
            "text": "Pearson correlation coefficient r."
          },
          {
            "id": "dc1-anova",
            "text": "One-way ANOVA."
          }
        ],
        "correctOptionIds": [
          "dc1-chi"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! The Chi-Square test of independence assesses association between two categorical variables.",
        "incorrect": "Incorrect. Testing relationship between two categorical variables requires a Chi-Square test."
      },
      "remediation": {
        "moduleId": "categorical-module",
        "level": "beginner",
        "topic": "Categorical Analysis: Beginner",
        "text": "Review the categorical concept: Correct! The Chi-Square test of independence assesses association between two categorical variables."
      }
    },
    {
      "id": "diag-cat-2",
      "domain": "categorical",
      "tier": "intermediate",
      "prompt": "In a 2x2 contingency table, an Odds Ratio (OR) equal to 1.0 indicates what relationship?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "dc2-noassoc",
            "text": "No association; the odds of the outcome are identical in both exposure groups."
          },
          {
            "id": "dc2-strong",
            "text": "A strong positive relationship between exposure and outcome."
          },
          {
            "id": "dc2-protective",
            "text": "A complete protective effect preventing the outcome."
          },
          {
            "id": "dc2-invalid",
            "text": "An invalid study design requiring re-sampling."
          }
        ],
        "correctOptionIds": [
          "dc2-noassoc"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! An Odds Ratio of 1.0 indicates that exposure does not alter the odds of the outcome.",
        "incorrect": "Incorrect. An OR of 1.0 means no difference in odds between the groups (null value)."
      },
      "remediation": {
        "moduleId": "categorical-module",
        "level": "intermediate",
        "topic": "Categorical Analysis: Intermediate",
        "text": "Review the categorical concept: Correct! An Odds Ratio of 1.0 indicates that exposure does not alter the odds of the outcome."
      }
    },
    {
      "id": "diag-var-1",
      "domain": "variance",
      "tier": "beginner",
      "prompt": "What is the primary purpose of One-Way Analysis of Variance (ANOVA)?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "dv1-means",
            "text": "To test whether three or more population means are equal."
          },
          {
            "id": "dv1-predict",
            "text": "To predict a continuous outcome from a single predictor line."
          },
          {
            "id": "dv1-counts",
            "text": "To count the frequency of categorical survey responses."
          },
          {
            "id": "dv1-rank",
            "text": "To rank individual outliers by distance from the median."
          }
        ],
        "correctOptionIds": [
          "dv1-means"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! One-Way ANOVA tests the equality of means across three or more treatment groups.",
        "incorrect": "Incorrect. ANOVA evaluates whether three or more group means differ significantly."
      },
      "remediation": {
        "moduleId": "variance-module",
        "level": "beginner",
        "topic": "Analysis of Variance: Beginner",
        "text": "Review the variance concept: Correct! One-Way ANOVA tests the equality of means across three or more treatment groups."
      }
    },
    {
      "id": "diag-var-2",
      "domain": "variance",
      "tier": "intermediate",
      "prompt": "If a One-Way ANOVA omnibus F-test produces p = 0.002, what step should the researcher take next?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "dv2-posthoc",
            "text": "Perform post-hoc pairwise comparisons (such as Tukey's HSD) to identify which groups differ."
          },
          {
            "id": "dv2-accept",
            "text": "Accept that all group means are identical and conclude the analysis."
          },
          {
            "id": "dv2-repeat",
            "text": "Discard the data and rerun independent two-sample t-tests."
          },
          {
            "id": "dv2-single",
            "text": "Assume that only the first and last groups differ without further testing."
          }
        ],
        "correctOptionIds": [
          "dv2-posthoc"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! A significant omnibus F indicates at least one difference exists; post-hoc tests locate them.",
        "incorrect": "Incorrect. A significant ANOVA requires post-hoc comparisons (e.g., Tukey's HSD) to pinpoint differences."
      },
      "remediation": {
        "moduleId": "variance-module",
        "level": "intermediate",
        "topic": "Analysis of Variance: Intermediate",
        "text": "Review the variance concept: Correct! A significant omnibus F indicates at least one difference exists; post-hoc tests locate them."
      }
    },
    {
      "id": "diag-reg-1",
      "domain": "regression",
      "tier": "beginner",
      "prompt": "What does a Pearson correlation coefficient of r = -0.88 indicate about the relationship between two variables?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "dr1-strongneg",
            "text": "A strong negative linear relationship; as one variable increases, the other decreases."
          },
          {
            "id": "dr1-weak",
            "text": "A very weak association because the number is negative."
          },
          {
            "id": "dr1-curv",
            "text": "A non-linear parabolic curve with two peaks."
          },
          {
            "id": "dr1-causal",
            "text": "A proven direct causal relationship."
          }
        ],
        "correctOptionIds": [
          "dr1-strongneg"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! Values close to -1.0 represent strong inverse linear associations.",
        "incorrect": "Incorrect. Negative r values near -1.0 reflect a strong negative linear association."
      },
      "remediation": {
        "moduleId": "regression-module",
        "level": "beginner",
        "topic": "Linear Regression: Beginner",
        "text": "Review the regression concept: Correct! Values close to -1.0 represent strong inverse linear associations."
      }
    },
    {
      "id": "diag-reg-2",
      "domain": "regression",
      "tier": "intermediate",
      "prompt": "In simple linear regression (Y = beta0 + beta1*X), what does the slope coefficient beta1 represent?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "dr2-change",
            "text": "The expected change in Y for each one-unit increase in X."
          },
          {
            "id": "dr2-intercept",
            "text": "The predicted value of Y when X equals zero."
          },
          {
            "id": "dr2-r2",
            "text": "The percentage of variance explained by the model."
          },
          {
            "id": "dr2-error",
            "text": "The standard deviation of the residual errors."
          }
        ],
        "correctOptionIds": [
          "dr2-change"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! The slope beta1 represents the marginal change in the response Y per unit change in X.",
        "incorrect": "Incorrect. The slope beta1 indicates how much Y changes on average for each 1-unit increase in X."
      },
      "remediation": {
        "moduleId": "regression-module",
        "level": "intermediate",
        "topic": "Linear Regression: Intermediate",
        "text": "Review the regression concept: Correct! The slope beta1 represents the marginal change in the response Y per unit change in X."
      }
    }
  ],
  "final": [
    {
      "id": "final-desc-1",
      "domain": "descriptive",
      "tier": "intermediate",
      "prompt": "A distribution of employee salaries has Q1 = $45,000 and Q3 = $75,000. Under Tukey's rule, what is the lower outlier boundary?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fd1-zero",
            "text": "$0 (Q1 - 1.5 * IQR = 45,000 - 1.5 * 30,000 = $0)."
          },
          {
            "id": "fd1-30k",
            "text": "$30,000, which equals the interquartile range directly."
          },
          {
            "id": "fd1-15k",
            "text": "$15,000, calculated as half of the median."
          },
          {
            "id": "fd1-none",
            "text": "Salaries cannot have lower outliers by definition."
          }
        ],
        "correctOptionIds": [
          "fd1-zero"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! IQR = 75,000 - 45,000 = 30,000. Lower fence = 45,000 - 1.5*(30,000) = $0.",
        "incorrect": "Incorrect. IQR = Q3 - Q1 = $30,000. Lower boundary = Q1 - 1.5*IQR = 45,000 - 45,000 = $0."
      },
      "remediation": {
        "moduleId": "descriptive-module",
        "level": "intermediate",
        "topic": "Descriptive Analysis: Intermediate",
        "text": "Review the descriptive concept: Correct! IQR = 75,000 - 45,000 = 30,000. Lower fence = 45,000 - 1.5*(30,000) = $0."
      }
    },
    {
      "id": "final-desc-2",
      "domain": "descriptive",
      "tier": "upperIntermediate",
      "prompt": "For a bell-shaped Normal distribution with mean = 100 and standard deviation = 15, approximately what percentage of data falls between 70 and 130?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fd2-95",
            "text": "Approximately 95% (within 2 standard deviations: 100 +/- 2*15)."
          },
          {
            "id": "fd2-68",
            "text": "Approximately 68% (within 1 standard deviation)."
          },
          {
            "id": "fd2-997",
            "text": "Approximately 99.7% (within 3 standard deviations)."
          },
          {
            "id": "fd2-50",
            "text": "Exactly 50% around the median."
          }
        ],
        "correctOptionIds": [
          "fd2-95"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! By the Empirical Rule, approximately 95% of observations fall within mu +/- 2*sigma (70 to 130).",
        "incorrect": "Incorrect. 70 to 130 corresponds to mu +/- 2*sigma, which covers approximately 95% of the Normal curve."
      },
      "remediation": {
        "moduleId": "descriptive-module",
        "level": "upperIntermediate",
        "topic": "Descriptive Analysis: UpperIntermediate",
        "text": "Review the descriptive concept: Correct! By the Empirical Rule, approximately 95% of observations fall within mu +/- 2*sigma (70 to 130)."
      }
    },
    {
      "id": "final-desc-3",
      "domain": "descriptive",
      "tier": "advanced",
      "prompt": "When data exhibits severe positive skewness and non-constant variance, what transformation is commonly applied to stabilize variance and achieve approximate normality?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fd3-log",
            "text": "Natural logarithm or Box-Cox power transformation."
          },
          {
            "id": "fd3-sq",
            "text": "Squaring the values to expand high values."
          },
          {
            "id": "fd3-neg",
            "text": "Multiplying all numbers by -1."
          },
          {
            "id": "fd3-mod",
            "text": "Replacing the mean with the harmonic mode."
          }
        ],
        "correctOptionIds": [
          "fd3-log"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! Logarithmic and Box-Cox transformations compress right-tail dispersion and stabilize variance.",
        "incorrect": "Incorrect. Right-skewed positive data is normalized using logarithmic or Box-Cox power transformations."
      },
      "remediation": {
        "moduleId": "descriptive-module",
        "level": "advanced",
        "topic": "Descriptive Analysis: Advanced",
        "text": "Review the descriptive concept: Correct! Logarithmic and Box-Cox transformations compress right-tail dispersion and stabilize variance."
      }
    },
    {
      "id": "final-prob-1",
      "domain": "probability",
      "tier": "intermediate",
      "prompt": "A fair coin is tossed 10 times. Which formula gives the probability of getting exactly 7 heads?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fp1-bin",
            "text": "Binomial probability formula: P(X=7) = (10 choose 7) * (0.5)^7 * (0.5)^3."
          },
          {
            "id": "fp1-poi",
            "text": "Poisson formula: e^(-5) * 5^7 / 7!."
          },
          {
            "id": "fp1-geo",
            "text": "Geometric formula: (0.5)^6 * (0.5)."
          },
          {
            "id": "fp1-hyp",
            "text": "Hypergeometric sampling without replacement formula."
          }
        ],
        "correctOptionIds": [
          "fp1-bin"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! Fixed independent trials with constant probability are modeled with the Binomial formula.",
        "incorrect": "Incorrect. A sequence of independent binary trials with fixed n uses the Binomial probability formula."
      },
      "remediation": {
        "moduleId": "probability-module",
        "level": "intermediate",
        "topic": "Probability Theory: Intermediate",
        "text": "Review the probability concept: Correct! Fixed independent trials with constant probability are modeled with the Binomial formula."
      }
    },
    {
      "id": "final-prob-2",
      "domain": "probability",
      "tier": "upperIntermediate",
      "prompt": "A population has mean 200 and standard deviation 40. For random samples of size n = 64, what is the standard error of the sample mean?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fp2-five",
            "text": "5, calculated as sigma / sqrt(n) = 40 / sqrt(64) = 40 / 8 = 5."
          },
          {
            "id": "fp2-40",
            "text": "40, because standard error equals population standard deviation."
          },
          {
            "id": "fp2-0625",
            "text": "0.625, calculated as 40 / 64."
          },
          {
            "id": "fp2-25",
            "text": "25, calculated as 200 / 8."
          }
        ],
        "correctOptionIds": [
          "fp2-five"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! Standard Error = sigma / sqrt(n) = 40 / 8 = 5.",
        "incorrect": "Incorrect. SE = sigma / sqrt(n). With sigma = 40 and n = 64, SE = 40 / 8 = 5."
      },
      "remediation": {
        "moduleId": "probability-module",
        "level": "upperIntermediate",
        "topic": "Probability Theory: UpperIntermediate",
        "text": "Review the probability concept: Correct! Standard Error = sigma / sqrt(n) = 40 / 8 = 5."
      }
    },
    {
      "id": "final-prob-3",
      "domain": "probability",
      "tier": "advanced",
      "prompt": "In a quantile-quantile (Q-Q) plot, what visual pattern indicates that sample data conforms closely to a theoretical normal distribution?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fp3-straight",
            "text": "The sample points fall closely along a straight 45-degree reference diagonal line."
          },
          {
            "id": "fp3-s",
            "text": "The points form a distinct S-shaped sinusoidal wave."
          },
          {
            "id": "fp3-u",
            "text": "The points form a sharp U-shaped parabolic curve."
          },
          {
            "id": "fp3-vert",
            "text": "The points cluster vertically on the zero axis."
          }
        ],
        "correctOptionIds": [
          "fp3-straight"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! Conformity to a straight diagonal line confirms that empirical quantiles match theoretical normal quantiles.",
        "incorrect": "Incorrect. Points closely following a straight diagonal line signify normality on a Q-Q plot."
      },
      "remediation": {
        "moduleId": "probability-module",
        "level": "advanced",
        "topic": "Probability Theory: Advanced",
        "text": "Review the probability concept: Correct! Conformity to a straight diagonal line confirms that empirical quantiles match theoretical normal quantiles."
      }
    },
    {
      "id": "final-inf-1",
      "domain": "inferential",
      "tier": "intermediate",
      "prompt": "What does a 95% Confidence Interval for a population mean [42.1, 48.7] formally signify?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fi1-ci",
            "text": "In 95% of repeated random samples from this population, the calculated interval will contain the true population mean."
          },
          {
            "id": "fi1-95data",
            "text": "95% of all individual values in the sample fall between 42.1 and 48.7."
          },
          {
            "id": "fi1-param",
            "text": "There is a 95% probability that the sample mean varies across trials."
          },
          {
            "id": "fi1-certain",
            "text": "The population mean is proven to equal the midpoint 45.4."
          }
        ],
        "correctOptionIds": [
          "fi1-ci"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! The 95% confidence level reflects the long-run capture rate across repeated sampling.",
        "incorrect": "Incorrect. Confidence intervals describe the long-run coverage rate of the estimation procedure."
      },
      "remediation": {
        "moduleId": "inferential-module",
        "level": "intermediate",
        "topic": "Hypothesis Testing: Intermediate",
        "text": "Review the inferential concept: Correct! The 95% confidence level reflects the long-run capture rate across repeated sampling."
      }
    },
    {
      "id": "final-inf-2",
      "domain": "inferential",
      "tier": "upperIntermediate",
      "prompt": "When conducting an independent two-sample t-test, what test should be performed if Levene's test indicates unequal group variances?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fi2-welch",
            "text": "Welch's t-test (which adjusts degrees of freedom for unequal variances)."
          },
          {
            "id": "fi2-pooled",
            "text": "Standard pooled-variance Student's t-test."
          },
          {
            "id": "fi2-z",
            "text": "Paired Z-test without variance adjustment."
          },
          {
            "id": "fi2-chi",
            "text": "One-sample Goodness-of-Fit test."
          }
        ],
        "correctOptionIds": [
          "fi2-welch"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! Welch's t-test handles unequal population variances reliably and controls Type I error.",
        "incorrect": "Incorrect. Heteroscedastic groups require Welch's t-test with Satterthwaite degrees of freedom."
      },
      "remediation": {
        "moduleId": "inferential-module",
        "level": "upperIntermediate",
        "topic": "Hypothesis Testing: UpperIntermediate",
        "text": "Review the inferential concept: Correct! Welch's t-test handles unequal population variances reliably and controls Type I error."
      }
    },
    {
      "id": "final-inf-3",
      "domain": "inferential",
      "tier": "advanced",
      "prompt": "When performing 20 simultaneous hypothesis tests at alpha = 0.05, what is the Bonferroni-adjusted significance threshold per test?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fi3-bonf",
            "text": "alpha_adj = 0.05 / 20 = 0.0025."
          },
          {
            "id": "fi3-const",
            "text": "alpha_adj = 0.05, because each test is independent."
          },
          {
            "id": "fi3-one",
            "text": "alpha_adj = 1.0 (no threshold)."
          },
          {
            "id": "fi3-sqrt",
            "text": "alpha_adj = 0.05 / sqrt(20) = 0.0112."
          }
        ],
        "correctOptionIds": [
          "fi3-bonf"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! The Bonferroni correction divides nominal alpha by the number of comparisons: 0.05 / 20 = 0.0025.",
        "incorrect": "Incorrect. Bonferroni adjustment divides alpha by the number of comparisons: 0.05 / 20 = 0.0025."
      },
      "remediation": {
        "moduleId": "inferential-module",
        "level": "advanced",
        "topic": "Hypothesis Testing: Advanced",
        "text": "Review the inferential concept: Correct! The Bonferroni correction divides nominal alpha by the number of comparisons: 0.05 / 20 = 0.0025."
      }
    },
    {
      "id": "final-cat-1",
      "domain": "categorical",
      "tier": "intermediate",
      "prompt": "In a Chi-Square test of independence, how is the expected frequency E calculated for a cell in row i and column j?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fc1-formula",
            "text": "E = (Row i Total * Column j Total) / Grand Sample Total."
          },
          {
            "id": "fc1-mean",
            "text": "E = (Observed value + Grand Total) / 2."
          },
          {
            "id": "fc1-equal",
            "text": "E = Grand Total divided by the number of rows."
          },
          {
            "id": "fc1-sub",
            "text": "E = Row Total minus Column Total."
          }
        ],
        "correctOptionIds": [
          "fc1-formula"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! Under independence, expected count = (Row Total * Column Total) / Grand Total.",
        "incorrect": "Incorrect. Expected cell frequency = (Row Total * Column Total) / Grand Total."
      },
      "remediation": {
        "moduleId": "categorical-module",
        "level": "intermediate",
        "topic": "Categorical Analysis: Intermediate",
        "text": "Review the categorical concept: Correct! Under independence, expected count = (Row Total * Column Total) / Grand Total."
      }
    },
    {
      "id": "final-cat-2",
      "domain": "categorical",
      "tier": "upperIntermediate",
      "prompt": "If a 2x2 contingency table has an observed cell count of 3 with an expected count of 2.1, what test is recommended over standard Chi-Square?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fc2-fisher",
            "text": "Fisher's Exact Test, which calculates exact hypergeometric probabilities for small counts."
          },
          {
            "id": "fc2-z",
            "text": "Standard Z-test with normal continuity approximation."
          },
          {
            "id": "fc2-anova",
            "text": "One-Way ANOVA with Welch correction."
          },
          {
            "id": "fc2-regression",
            "text": "Multiple linear regression."
          }
        ],
        "correctOptionIds": [
          "fc2-fisher"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! When expected counts are small (< 5), Fisher's Exact Test provides exact p-values.",
        "incorrect": "Incorrect. Small cell counts violate asymptotic Chi-Square assumptions; Fisher's Exact Test is required."
      },
      "remediation": {
        "moduleId": "categorical-module",
        "level": "upperIntermediate",
        "topic": "Categorical Analysis: UpperIntermediate",
        "text": "Review the categorical concept: Correct! When expected counts are small (< 5), Fisher's Exact Test provides exact p-values."
      }
    },
    {
      "id": "final-cat-3",
      "domain": "categorical",
      "tier": "advanced",
      "prompt": "In a clinical cohort study, the risk of disease is 8% in exposed patients and 2% in unexposed patients. What is the Relative Risk (RR)?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fc3-four",
            "text": "4.0 (Risk in exposed / Risk in unexposed = 0.08 / 0.02 = 4.0)."
          },
          {
            "id": "fc3-six",
            "text": "6.0, calculated as the risk difference 8% - 2%."
          },
          {
            "id": "fc3-zero",
            "text": "0.25, the inverse ratio."
          },
          {
            "id": "fc3-ten",
            "text": "10.0, the sum of the two percentages."
          }
        ],
        "correctOptionIds": [
          "fc3-four"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! Relative Risk = 0.08 / 0.02 = 4.0. Exposed individuals have 4 times the risk.",
        "incorrect": "Incorrect. Relative Risk = (Risk in exposed) / (Risk in unexposed) = 0.08 / 0.02 = 4.0."
      },
      "remediation": {
        "moduleId": "categorical-module",
        "level": "advanced",
        "topic": "Categorical Analysis: Advanced",
        "text": "Review the categorical concept: Correct! Relative Risk = 0.08 / 0.02 = 4.0. Exposed individuals have 4 times the risk."
      }
    },
    {
      "id": "final-var-1",
      "domain": "variance",
      "tier": "intermediate",
      "prompt": "In an ANOVA summary table, how is the Mean Square Between (MSB) calculated?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fv1-msb",
            "text": "MSB = Sum of Squares Between (SSB) / Degrees of Freedom Between (k - 1)."
          },
          {
            "id": "fv1-sub",
            "text": "MSB = Total Sum of Squares minus Error Sum of Squares."
          },
          {
            "id": "fv1-mult",
            "text": "MSB = SSB multiplied by total sample size N."
          },
          {
            "id": "fv1-sqrt",
            "text": "MSB = Square root of the F-ratio."
          }
        ],
        "correctOptionIds": [
          "fv1-msb"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! Mean square is always calculated as Sum of Squares divided by its degrees of freedom.",
        "incorrect": "Incorrect. Mean square between groups MSB = SSB / df_between."
      },
      "remediation": {
        "moduleId": "variance-module",
        "level": "intermediate",
        "topic": "Analysis of Variance: Intermediate",
        "text": "Review the variance concept: Correct! Mean square is always calculated as Sum of Squares divided by its degrees of freedom."
      }
    },
    {
      "id": "final-var-2",
      "domain": "variance",
      "tier": "upperIntermediate",
      "prompt": "What does a significant interaction effect in a Two-Way Factorial ANOVA indicate?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fv2-inter",
            "text": "The effect of Factor A on the response variable depends on the level of Factor B."
          },
          {
            "id": "fv2-none",
            "text": "Neither Factor A nor Factor B has any main effect on the response."
          },
          {
            "id": "fv2-paral",
            "text": "The response lines on a profile interaction plot are completely parallel."
          },
          {
            "id": "fv2-error",
            "text": "The ANOVA model has zero residual error."
          }
        ],
        "correctOptionIds": [
          "fv2-inter"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! Interaction means that the effect of one factor changes across levels of the other factor.",
        "incorrect": "Incorrect. Interaction signifies that the effect of one factor depends on the level of the other factor."
      },
      "remediation": {
        "moduleId": "variance-module",
        "level": "upperIntermediate",
        "topic": "Analysis of Variance: UpperIntermediate",
        "text": "Review the variance concept: Correct! Interaction means that the effect of one factor changes across levels of the other factor."
      }
    },
    {
      "id": "final-var-3",
      "domain": "variance",
      "tier": "advanced",
      "prompt": "In Repeated Measures ANOVA, which assumption states that variances of differences between all possible pairs of within-subject conditions must be equal?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fv3-spher",
            "text": "Sphericity (tested via Mauchly's test, corrected with Greenhouse-Geisser if violated)."
          },
          {
            "id": "fv3-homo",
            "text": "Homogeneity of regression slopes."
          },
          {
            "id": "fv3-indep",
            "text": "Complete independence of repeated observations."
          },
          {
            "id": "fv3-bimod",
            "text": "Bimodality of condition medians."
          }
        ],
        "correctOptionIds": [
          "fv3-spher"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! Sphericity is the repeated measures compound symmetry assumption, evaluated by Mauchly's test.",
        "incorrect": "Incorrect. Sphericity requires equal variances of pairwise differences across repeated conditions."
      },
      "remediation": {
        "moduleId": "variance-module",
        "level": "advanced",
        "topic": "Analysis of Variance: Advanced",
        "text": "Review the variance concept: Correct! Sphericity is the repeated measures compound symmetry assumption, evaluated by Mauchly's test."
      }
    },
    {
      "id": "final-reg-1",
      "domain": "regression",
      "tier": "intermediate",
      "prompt": "What is the mathematical criterion used by Ordinary Least Squares (OLS) to fit the best regression line?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fr1-min",
            "text": "Minimizing the sum of squared vertical residuals: sum((Y_i - Y_hat_i)^2)."
          },
          {
            "id": "fr1-abs",
            "text": "Maximizing the sum of absolute errors between points."
          },
          {
            "id": "fr1-zero",
            "text": "Setting the correlation coefficient to zero."
          },
          {
            "id": "fr1-dist",
            "text": "Minimizing perpendicular Euclidean distances for all coordinates."
          }
        ],
        "correctOptionIds": [
          "fr1-min"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! OLS estimates minimize the sum of squared vertical residuals (errors).",
        "incorrect": "Incorrect. OLS minimizes the sum of squared vertical residuals: sum((Y - Y_hat)^2)."
      },
      "remediation": {
        "moduleId": "regression-module",
        "level": "intermediate",
        "topic": "Linear Regression: Intermediate",
        "text": "Review the regression concept: Correct! OLS estimates minimize the sum of squared vertical residuals (errors)."
      }
    },
    {
      "id": "final-reg-2",
      "domain": "regression",
      "tier": "upperIntermediate",
      "prompt": "In multiple linear regression, what metric evaluates whether two or more explanatory variables are dangerously correlated with each other?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fr2-vif",
            "text": "Variance Inflation Factor (VIF), where VIF > 5 to 10 indicates high multicollinearity."
          },
          {
            "id": "fr2-f",
            "text": "The omnibus F-statistic."
          },
          {
            "id": "fr2-intercept",
            "text": "The standard error of the Y-intercept."
          },
          {
            "id": "fr2-df",
            "text": "Residual degrees of freedom."
          }
        ],
        "correctOptionIds": [
          "fr2-vif"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! VIF measures how much predictor variance is inflated due to collinearity with other predictors.",
        "incorrect": "Incorrect. Multicollinearity among predictors is diagnosed using the Variance Inflation Factor (VIF)."
      },
      "remediation": {
        "moduleId": "regression-module",
        "level": "upperIntermediate",
        "topic": "Linear Regression: UpperIntermediate",
        "text": "Review the regression concept: Correct! VIF measures how much predictor variance is inflated due to collinearity with other predictors."
      }
    },
    {
      "id": "final-reg-3",
      "domain": "regression",
      "tier": "advanced",
      "prompt": "When inspecting a residual plot against fitted values, a distinct funnel/cone shape (expanding spread) violates which OLS regression assumption?",
      "interaction": {
        "kind": "multipleChoice",
        "options": [
          {
            "id": "fr3-homo",
            "text": "Homoscedasticity (equal residual variance across all fitted values; indicates heteroscedasticity)."
          },
          {
            "id": "fr3-linear",
            "text": "Linearity of the underlying relationship."
          },
          {
            "id": "fr3-indep",
            "text": "Independence of explanatory variable measurements."
          },
          {
            "id": "fr3-norm",
            "text": "Normality of independent variable predictors."
          }
        ],
        "correctOptionIds": [
          "fr3-homo"
        ],
        "minSelections": 1,
        "maxSelections": 1,
        "scoringMode": "strict"
      },
      "feedback": {
        "correct": "Correct! An expanding funnel pattern demonstrates heteroscedasticity (non-constant residual variance).",
        "incorrect": "Incorrect. Non-constant residual spread indicates heteroscedasticity (violating homoscedasticity)."
      },
      "remediation": {
        "moduleId": "regression-module",
        "level": "advanced",
        "topic": "Linear Regression: Advanced",
        "text": "Review the regression concept: Correct! An expanding funnel pattern demonstrates heteroscedasticity (non-constant residual variance)."
      }
    }
  ],
  "sources": [
    {
      "label": "NIST/SEMATECH e-Handbook of Statistical Methods",
      "url": "https://www.itl.nist.gov/div898/handbook/"
    },
    {
      "label": "OpenIntro Statistics (Diez, Barr, Çetinkaya-Rundel)",
      "url": "https://www.openintro.org/book/os/"
    },
    {
      "label": "American Statistical Association - GAISE Guidelines",
      "url": "https://www.amstat.org/education/gaise"
    }
  ]
};

  // In-page SCORM Mocks so iframes can access window.parent.API_1484_11
  const defaultLearnerName = "Jane Doe";
  const defaultLearnerId = "user_12345";

  function updateModalBadges() {
    const data = window.API_1484_11?.data || window.API?.data || {};
    const statusEl = document.getElementById('scorm-modal-badge-status');
    const scoreEl = document.getElementById('scorm-modal-badge-score');
    const interactionsEl = document.getElementById('scorm-modal-badge-interactions');

    if (statusEl) {
      const st = data['cmi.completion_status'] || data['cmi.core.lesson_status'] || 'incomplete';
      const succ = data['cmi.success_status'] || '';
      statusEl.textContent = succ && succ !== 'unknown' ? st + ' (' + succ + ')' : st;
      statusEl.style.color = (st === 'completed' || succ === 'passed') ? '#4ade80' : '#38bdf8';
    }
    if (scoreEl) {
      const raw = data['cmi.score.raw'] || data['cmi.core.score.raw'];
      const scaled = data['cmi.score.scaled'];
      if (raw !== undefined && raw !== '') {
        scoreEl.textContent = 'Score: ' + raw + (scaled ? ' (' + Math.round(Number(scaled)*100) + '%)' : '');
      } else {
        scoreEl.textContent = 'Score: --';
      }
    }
    if (interactionsEl) {
      const count = data['cmi.interactions._count'] || Object.keys(data).filter(k => k.startsWith('cmi.interactions.') && k.endsWith('.id')).length;
      interactionsEl.textContent = count + ' recorded';
    }
  }

  // Global SCORM 1.2 Mock
  window.API = {
    data: {
      "cmi.core.student_name": defaultLearnerName,
      "cmi.core.student_id": defaultLearnerId,
      "cmi.core.lesson_status": "not attempted",
      "cmi.core.lesson_mode": "normal",
      "cmi.core.credit": "credit",
      "cmi.core.entry": "ab-initio",
      "cmi.core.lesson_location": "",
      "cmi.suspend_data": "",
      "cmi.interactions._count": "0"
    },
    LMSInitialize: function() { return "true"; },
    LMSFinish: function() { return "true"; },
    LMSGetValue: function(e) { return this.data[e] || ""; },
    LMSSetValue: function(e, v) {
      this.data[e] = String(v);
      updateModalBadges();
      return "true";
    },
    LMSCommit: function() { updateModalBadges(); return "true"; },
    LMSGetLastError: function() { return "0"; },
    LMSGetErrorString: function() { return ""; },
    LMSGetDiagnostic: function() { return ""; }
  };

  // Global SCORM 2004 4th Edition Mock
  window.API_1484_11 = {
    data: {
      "cmi.learner_name": defaultLearnerName,
      "cmi.learner_id": defaultLearnerId,
      "cmi.completion_status": "incomplete",
      "cmi.success_status": "unknown",
      "cmi.mode": "normal",
      "cmi.credit": "credit",
      "cmi.entry": "ab-initio",
      "cmi.location": "",
      "cmi.suspend_data": "",
      "cmi.interactions._count": "0",
      "cmi.objectives._count": "0"
    },
    Initialize: function() { return "true"; },
    Terminate: function() { return "true"; },
    GetValue: function(e) {
      if (e === "cmi.interactions._count") {
        const count = Object.keys(this.data).filter(k => k.startsWith('cmi.interactions.') && k.endsWith('.id')).length;
        return String(count);
      }
      if (e === "cmi.objectives._count") {
        const count = Object.keys(this.data).filter(k => k.startsWith('cmi.objectives.') && k.endsWith('.id')).length;
        return String(count);
      }
      return this.data[e] !== undefined ? String(this.data[e]) : "";
    },
    SetValue: function(e, v) {
      this.data[e] = String(v);
      if (e.startsWith('cmi.interactions.') && e.endsWith('.id')) {
        const count = Object.keys(this.data).filter(k => k.startsWith('cmi.interactions.') && k.endsWith('.id')).length;
        this.data['cmi.interactions._count'] = String(count);
      }
      if (e.startsWith('cmi.objectives.') && e.endsWith('.id')) {
        const count = Object.keys(this.data).filter(k => k.startsWith('cmi.objectives.') && k.endsWith('.id')).length;
        this.data['cmi.objectives._count'] = String(count);
      }
      updateModalBadges();
      return "true";
    },
    Commit: function() {
      updateModalBadges();
      return "true";
    },
    GetLastError: function() { return "0"; },
    GetErrorString: function() { return ""; },
    GetDiagnostic: function() { return ""; }
  };

  // Function to download tracked LMS records
  window.downloadModalTrackingData = function() {
    const dataToExport = window.API_1484_11.data || window.API.data || {};
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scorm_2004_data.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // Close modal helper
  window.closeScormPlayerModal = function() {
    const modal = document.getElementById("scorm-player-inpage-modal");
    if (modal) modal.remove();
  };

  // Render in-page player modal
  function showInPagePlayerModal(playerUrl, courseSrc, title) {
    window.closeScormPlayerModal();

    const container = document.createElement("div");
    container.id = "scorm-player-inpage-modal";
    container.style.cssText = "position: fixed; inset: 0; z-index: 999999; background: rgba(15, 23, 42, 0.95); display: flex; flex-direction: column; font-family: system-ui, -apple-system, sans-serif;";

    container.innerHTML = `
      <div style="background: #1e293b; color: white; padding: 10px 18px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #3b82f6; flex-wrap: wrap; gap: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.4);">
        <div style="display: flex; gap: 14px; align-items: center; font-size: 13px; color: #94a3b8; flex-wrap: wrap;">
          <div style="color: white; font-weight: 700; display: flex; align-items: center; gap: 6px;">
            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #22c55e;"></span>
            ${title || 'SCORM 2004 Course'}
          </div>
          <div>Testing as: <span style="color: white; font-weight: 600;">${defaultLearnerName}</span></div>
          <div>Standard: <span style="color: white; font-weight: 600; text-transform: uppercase;">SCORM 2004</span></div>
          <div>Status: <span id="scorm-modal-badge-status" style="background: #334155; color: #38bdf8; padding: 2px 7px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase;">incomplete</span></div>
          <div><span id="scorm-modal-badge-score" style="background: #1e3a8a; color: #93c5fd; padding: 2px 7px; border-radius: 4px; font-size: 11px; font-weight: 700;">Score: --</span></div>
          <div><span id="scorm-modal-badge-interactions" style="background: #064e3b; color: #6ee7b7; padding: 2px 7px; border-radius: 4px; font-size: 11px; font-weight: 700;">0 recorded</span></div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button onclick="window.downloadModalTrackingData()" style="background: #059669; color: white; border: none; padding: 7px 13px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
            ↓ Download Data
          </button>
          <a href="${playerUrl}" target="_blank" style="background: #2563eb; color: white; border: none; padding: 7px 13px; border-radius: 6px; font-size: 12px; font-weight: 600; text-decoration: none; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
            Open in New Tab ↗
          </a>
          <button onclick="window.closeScormPlayerModal()" style="background: #475569; color: white; border: none; padding: 7px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">
            ✕ Close
          </button>
        </div>
      </div>
      <div style="flex: 1; position: relative; background: #ffffff;">
        <iframe id="scorm-modal-course-frame" src="${courseSrc}" allow="fullscreen" style="width: 100%; height: 100%; border: none; display: block;"></iframe>
      </div>
    `;

    document.body.appendChild(container);
    updateModalBadges();
  }

  // Toast / notification helper
  function showPublishToast(message, isSpinner = true) {
    let toast = document.getElementById("scorm-publish-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "scorm-publish-toast";
      toast.style.cssText = "position: fixed; bottom: 24px; right: 24px; z-index: 9999999; background: #1e293b; color: white; padding: 14px 20px; border-radius: 10px; border: 1px solid #3b82f6; box-shadow: 0 10px 25px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 12px; font-family: system-ui, sans-serif; font-size: 14px;";
      document.body.appendChild(toast);
    }
    toast.innerHTML = (isSpinner ? '<span style="display:inline-block;width:18px;height:18px;border:2px solid #64748b;border-top-color:#38bdf8;border-radius:50%;animation:spin 0.8s linear infinite;"></span>' : '<span>✓</span>') + ' ' + message;
  }

  function hidePublishToast() {
    const toast = document.getElementById("scorm-publish-toast");
    if (toast) toast.remove();
  }

  // Temp publish and launch SCORM player in BOTH in-page modal AND new tab
  window.tempPublishAndOpenPlayer = async function(project) {
    const proj = project || window.__STATISTICS_STARTER;
    if (!proj) {
      console.error("No project provided for preview.");
      return;
    }

    showPublishToast("Packaging & temp publishing SCORM 2004 course…", true);

    // Attempt to open new tab in user gesture
    let playerWin = null;
    try {
      playerWin = window.open("about:blank", "_blank");
    } catch (e) {
      console.warn("Notice: Popup blocked or restricted in iframe:", e);
    }

    if (playerWin && playerWin.document) {
      try {
        playerWin.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Temp Publishing SCORM Player…</title>
  <style>
    body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0f172a; color: #f8fafc; font-family: system-ui, sans-serif; text-align: center; padding: 24px; }
    .card { background: #1e293b; padding: 36px 30px; border-radius: 12px; max-width: 440px; border: 1px solid #334155; }
    .spinner { width: 40px; height: 40px; border: 4px solid #334155; border-top-color: #38bdf8; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="card">
    <div class="spinner"></div>
    <h2 style="margin:0 0 8px;font-size:18px;">Publishing SCORM 2004 Package</h2>
    <p style="margin:0;color:#94a3b8;font-size:14px;">Preparing universal SCORM player and launching course…</p>
  </div>
</body>
</html>`);
      } catch (err) {}
    }

    try {
      if (typeof window.__buildScormZip !== "function") {
        throw new Error("SCORM packaging generator (__buildScormZip) not yet ready. Please try again in 1 second.");
      }

      // Generate the package ZIP in memory using the native studio engine
      const zipBlob = await window.__buildScormZip(proj);

      const formData = new FormData();
      formData.append("courseFile", zipBlob, (proj.code || "course") + ".zip");
      formData.append("studentName", defaultLearnerName);
      formData.append("studentId", defaultLearnerId);

      const response = await fetch("/api/upload-course", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || ("Server responded with HTTP " + response.status));
      }

      const result = await response.json();
      hidePublishToast();

      if (result && result.playerUrl) {
        // 1. If new tab was permitted, navigate it to playerUrl
        if (playerWin && !playerWin.closed) {
          playerWin.location.href = result.playerUrl;
        }

        // 2. ALWAYS show the in-page player modal so it is guaranteed to work right inside the viewport
        const courseIframeSrc = '/' + result.folder + '/' + result.entry;
        showInPagePlayerModal(result.playerUrl, courseIframeSrc, proj.title || 'Basic to Advanced Statistics');
      } else {
        throw new Error("No playerUrl received in server publish response.");
      }
    } catch (err) {
      hidePublishToast();
      console.error("Failed to temp publish course for preview:", err);
      const errMsg = err && err.message ? err.message : String(err);
      if (playerWin && !playerWin.closed) {
        try {
          playerWin.document.body.innerHTML = '<div style="background:#1e293b;padding:32px;color:white;font-family:sans-serif;text-align:center;max-width:400px;margin:50px auto;border-radius:10px;"><h3 style="color:#ef4444;margin:0 0 10px;">Publish Error</h3><p>' + errMsg + '</p><button onclick="window.close()" style="background:#475569;color:white;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;">Close</button></div>';
        } catch (e) {}
      }
      alert("Notice launching preview: " + errMsg);
    }
  };
})();
