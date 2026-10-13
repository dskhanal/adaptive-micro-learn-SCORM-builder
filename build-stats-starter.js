// Generator for the "Basic to Advanced Statistics" starter project
import fs from 'fs';

const theme = {
  name: "Modern Royal Blue",
  variant: "light",
  background: "#f8fafc",
  surface: "#ffffff",
  surfaceRaised: "#ffffff",
  border: "#e2e8f0",
  textPrimary: "#0f172a",
  textMuted: "#475569",
  textOnBrand: "#ffffff",
  brandPrimary: "#1d4ed8",
  brandSecondary: "#0369a1",
  brandGradient: "linear-gradient(135deg, #1d4ed8 0%, #0369a1 100%)",
  accent: "#0284c7",
  accentSoft: "#e0f2fe",
  mastered: "#15803d",
  fragile: "#b45309",
  gap: "#b91c1c",
  neutralDark: "#0f172a",
  neutralLight: "#f8fafc",
  radii: { sm: 6, md: 10, lg: 14, full: 9999 },
  radius: 12,
  typography: {
    hero: { fontSize: 32, lineHeight: 1.2, maxMeasure: 30 },
    h1: { fontSize: 26, lineHeight: 1.25, maxMeasure: 35 },
    h2: { fontSize: 20, lineHeight: 1.3, maxMeasure: 40 },
    h3: { fontSize: 17, lineHeight: 1.4, maxMeasure: 45 },
    body: { fontSize: 15, lineHeight: 1.5, maxMeasure: 60 },
    caption: { fontSize: 13, lineHeight: 1.4, maxMeasure: 50 },
    micro: { fontSize: 11, lineHeight: 1.3, maxMeasure: 40 }
  },
  motion: { durationMs: 180, easing: "ease-out", scale: 1 },
  customFontName: "",
  customFontData: "",
  customCss: ""
};

const coverPage = {
  enabled: true,
  eyebrow: "STAT101 · Probability & Data Science",
  title: "Basic to Advanced Statistics",
  subtitle: "Master descriptive metrics, probability distributions, hypothesis testing, ANOVA, and regression modeling.",
  layout: "heroSplit",
  hero: [],
  author: "Adaptive SCORM Studio",
  organization: "Department of Statistics & Data Science",
  date: "2026",
  versionBadge: true,
  startPrompt: "Start adaptive course"
};

const roles = [
  {
    id: "data-analyst",
    label: "Data Analyst",
    description: "Applied depth across exploratory analytics, probability, hypothesis testing, and regression modeling.",
    defaultTarget: "upperIntermediate",
    targets: {
      descriptive: "advanced",
      probability: "upperIntermediate",
      inferential: "advanced",
      categorical: "upperIntermediate",
      variance: "upperIntermediate",
      regression: "advanced"
    }
  },
  {
    id: "research-scientist",
    label: "Research Scientist / Statistician",
    description: "Theoretical and experimental rigor across all distribution assumptions, ANOVA, and multivariate inference.",
    defaultTarget: "advanced",
    targets: {
      descriptive: "advanced",
      probability: "advanced",
      inferential: "advanced",
      categorical: "advanced",
      variance: "advanced",
      regression: "advanced"
    }
  },
  {
    id: "business-practitioner",
    label: "Business Analytics Practitioner",
    description: "Core statistical literacy, effect sizes, decision risks, and predictive metric interpretation.",
    defaultTarget: "intermediate",
    targets: {
      descriptive: "upperIntermediate",
      probability: "intermediate",
      inferential: "intermediate",
      categorical: "intermediate",
      variance: "intermediate",
      regression: "intermediate"
    }
  }
];

const sources = [
  {
    label: "NIST/SEMATECH e-Handbook of Statistical Methods",
    url: "https://www.itl.nist.gov/div898/handbook/"
  },
  {
    label: "OpenIntro Statistics (Diez, Barr, Çetinkaya-Rundel)",
    url: "https://www.openintro.org/book/os/"
  },
  {
    label: "American Statistical Association - GAISE Guidelines",
    url: "https://www.amstat.org/education/gaise"
  }
];

const rawModules = [
  {
    domain: "descriptive",
    icon: "chart",
    title: "Descriptive Statistics & Exploratory Analysis",
    mapping: "STAT101-M1: Calculate and interpret measures of center, spread, shape, and quartiles for data distributions.",
    outcome: "Summarize data distributions accurately, compute robust metrics, identify skewness, and detect outliers.",
    essential: "Descriptive statistics describe the basic features of data in a study. Measures of center include the mean (arithmetic average), median (middle value of ordered observations), and mode (most frequent value). Measures of spread include range, variance (average squared deviation from the mean), and standard deviation (square root of variance). In skewed distributions or when outliers are present, the median and Interquartile Range (IQR = Q3 - Q1) provide resilient, robust summaries that resist distortion.",
    routes: {
      beginner: "Understand the three measures of central tendency (mean, median, mode) and basic spread (range, standard deviation). Learn when the mean is pulled towards extreme values and why the median remains stable.",
      intermediate: "Calculate the five-number summary: Minimum, First Quartile (Q1), Median, Third Quartile (Q3), and Maximum. Construct boxplots and apply Tukey's 1.5 x IQR rule to detect mild and extreme outliers.",
      upperIntermediate: "Analyze distribution shapes using skewness (left/negative vs right/positive) and kurtosis (leptokurtic, mesokurtic, platykurtic). Apply Chebyshev's Inequality and the Empirical Rule (68-95-99.7%) to estimate probability bounds.",
      advanced: "Implement robust location and dispersion estimators including the trimmed mean, Winsorized variance, and Median Absolute Deviation (MAD). Apply Box-Cox and logarithmic power transformations to stabilize variance and normalize skewed empirical data."
    },
    practice: {
      prompt: "Which measure of central tendency is most robust and reliable when summarizing heavily skewed income data containing extreme high earners?",
      options: [
        { id: "opt-median", text: "The median, because it relies on ranking rather than magnitude and is unaffected by extreme values." },
        { id: "opt-mean", text: "The arithmetic mean, because it uses all observed values in the dataset." },
        { id: "opt-midrange", text: "The midrange (mean of max and min), because it captures the entire spread." },
        { id: "opt-geometric", text: "The geometric mean, because it always equals the median in positive numbers." }
      ],
      correctId: "opt-median",
      feedbackCorrect: "Correct! The median divides the ordered distribution in half and is unaffected by extreme outliers in the upper tail.",
      feedbackIncorrect: "Incorrect. The arithmetic mean is heavily pulled upward by extreme values. The median is the robust choice."
    }
  },
  {
    domain: "probability",
    icon: "sparkles",
    title: "Probability Theory & Sampling Distributions",
    mapping: "STAT101-M2: Apply probability axioms, theoretical distributions, and the Central Limit Theorem to sampling problems.",
    outcome: "Evaluate event probabilities, work with Normal, Binomial, and Student's t distributions, and apply the Central Limit Theorem.",
    essential: "Probability quantifies the likelihood of random events on a scale from 0 to 1. The Central Limit Theorem (CLT) establishes that the sampling distribution of the sample mean approaches a Normal distribution as sample size n increases (typically n >= 30), regardless of the population distribution shape, provided samples are independent and identically distributed. The Standard Error of the mean (SE = sigma / sqrt(n)) quantifies sample mean variability.",
    routes: {
      beginner: "Master probability basics: sample spaces, mutually exclusive vs independent events, and the standard Normal distribution bell curve with Z-score standardization: Z = (X - mu) / sigma.",
      intermediate: "Model discrete counts using the Binomial (fixed trials, constant probability) and Poisson distributions (rate of occurrences over continuous intervals). Use standard Normal distribution tables to determine tail areas.",
      upperIntermediate: "Apply the Central Limit Theorem to calculate probabilities for sample means. Contrast population standard deviation (sigma) with the standard error of the sample mean (SE = sigma / sqrt(n)). Introduce Student's t-distribution for small samples with unknown sigma.",
      advanced: "Derive properties of Probability Density Functions (PDF) and Cumulative Distribution Functions (CDF). Evaluate sampling distribution convergence via the Berry-Esseen theorem and assess normality using quantile-quantile (Q-Q) plots and the Shapiro-Wilk test."
    },
    practice: {
      prompt: "According to the Central Limit Theorem, what happens to the standard error of the sample mean as the sample size n is quadrupled (multiplied by 4)?",
      options: [
        { id: "opt-half", text: "The standard error is halved (divided by 2), since SE = sigma / sqrt(n)." },
        { id: "opt-quarter", text: "The standard error is divided by 4, scaling inversely with sample size." },
        { id: "opt-double", text: "The standard error doubles due to increased sample variability." },
        { id: "opt-constant", text: "The standard error remains constant because population sigma does not change." }
      ],
      correctId: "opt-half",
      feedbackCorrect: "Correct! Because n is inside the square root in the denominator (SE = sigma / sqrt(n)), multiplying n by 4 cuts the standard error in half.",
      feedbackIncorrect: "Incorrect. Recall the formula SE = sigma / sqrt(n). Since sqrt(4) = 2, multiplying n by 4 halves the standard error."
    }
  },
  {
    domain: "inferential",
    icon: "shield",
    title: "Hypothesis Testing & Two-Sample Inference",
    mapping: "STAT101-M3: Formulate statistical hypotheses, evaluate p-values against alpha, and avoid Type I and Type II decision errors.",
    outcome: "State statistical hypotheses, compute test statistics, interpret p-values, calculate effect sizes, and avoid decision errors.",
    essential: "Hypothesis testing evaluates empirical evidence against a null hypothesis (H0, specifying no effect or difference) in favor of an alternative hypothesis (Ha). The p-value is the probability of obtaining test results at least as extreme as the observed sample, assuming H0 is true. A Type I error (alpha) occurs when rejecting a true null hypothesis (false positive). A Type II error (beta) occurs when failing to reject a false null hypothesis (false negative). Power (1 - beta) represents the probability of correctly detecting a real effect.",
    routes: {
      beginner: "Understand the five steps of hypothesis testing: state H0 and Ha, choose significance level alpha (commonly 0.05), calculate test statistic and p-value, and make a reject / fail-to-reject decision.",
      intermediate: "Interpret p-values correctly: p <= alpha indicates statistically significant divergence from H0. Distinguish Type I and Type II errors, and calculate Cohen's d to quantify practical effect size beyond statistical significance.",
      upperIntermediate: "Select and execute One-sample t-tests, Independent Two-sample t-tests, Welch's t-test (for unequal variances), and Paired samples t-tests. Conduct power calculations to determine minimum required sample sizes for target effect sizes.",
      advanced: "Address the multiple testing problem by implementing Bonferroni correction and the Benjamini-Hochberg False Discovery Rate (FDR). Employ non-parametric alternatives (Mann-Whitney U, Wilcoxon Signed-Rank) when distributional assumptions fail."
    },
    practice: {
      prompt: "A clinical trial tests a new therapy with alpha = 0.05 and obtains a p-value of 0.018. What is the correct statistical conclusion?",
      options: [
        { id: "opt-reject", text: "Reject the null hypothesis; there is statistically significant evidence of a treatment effect at the 0.05 level." },
        { id: "opt-fail", text: "Fail to reject the null hypothesis, because p is greater than 0.01." },
        { id: "opt-prove-alt", text: "Accept that the alternative hypothesis has been proven with 100% certainty." },
        { id: "opt-type1", text: "Conclude that a Type I error has definitely occurred." }
      ],
      correctId: "opt-reject",
      feedbackCorrect: "Correct! Because p = 0.018 <= 0.05, we reject the null hypothesis and conclude that the observed effect is statistically significant.",
      feedbackIncorrect: "Incorrect. When p <= alpha (0.018 <= 0.05), the decision is to reject H0."
    }
  },
  {
    domain: "categorical",
    icon: "layers",
    title: "Categorical Data Analysis & Contingency Testing",
    mapping: "STAT101-M4: Analyze frequency tables, test independence and goodness-of-fit with Chi-Square, and measure association with odds ratios.",
    outcome: "Compute expected cell frequencies, evaluate Chi-Square tests of independence and goodness-of-fit, and interpret odds ratios.",
    essential: "Categorical analysis evaluates qualitative attributes grouped into counts. The Pearson Chi-Square test compares observed frequencies (O) against expected frequencies (E) under independence: Chi-Square = sum((O - E)^2 / E). In r x c contingency tables, degrees of freedom equal (r - 1)(c - 1). For 2x2 tables, association strength is measured using Odds Ratios (OR = (a*d)/(b*c)), Relative Risk (RR), and Risk Difference.",
    routes: {
      beginner: "Explore categorical variables, contingency tables, and observed frequencies. Understand the concept of test of independence between two categorical factors.",
      intermediate: "Calculate expected frequencies: E = (Row Total * Column Total) / Grand Total. Compute the Chi-Square statistic and compare it against the critical value for degrees of freedom (r - 1)(c - 1).",
      upperIntermediate: "Verify Cochran's sample size criteria (all E >= 1, and no more than 20% of cells have E < 5). Calculate and interpret Odds Ratios (OR) and Relative Risk (RR) with 95% confidence intervals.",
      advanced: "Apply Fisher's Exact Test for 2x2 tables with sparse counts. Calculate Cramer's V to measure the strength of association, and formulate log-linear models for multi-way contingency structures."
    },
    practice: {
      prompt: "In a 3 x 4 contingency table evaluating customer satisfaction across product tiers, what are the degrees of freedom (df) for the Chi-Square test of independence?",
      options: [
        { id: "opt-6", text: "6, calculated as (3 - 1) * (4 - 1) = 2 * 3 = 6." },
        { id: "opt-12", text: "12, calculated as the total number of cells 3 * 4 = 12." },
        { id: "opt-11", text: "11, calculated as total cells minus one (12 - 1 = 11)." },
        { id: "opt-7", text: "7, calculated as rows plus columns (3 + 4 = 7)." }
      ],
      correctId: "opt-6",
      feedbackCorrect: "Correct! The degrees of freedom for an r x c contingency table are (r - 1) * (c - 1) = (3 - 1) * (4 - 1) = 6.",
      feedbackIncorrect: "Incorrect. Remember the formula df = (r - 1) * (c - 1). For 3 rows and 4 columns, df = 2 * 3 = 6."
    }
  },
  {
    domain: "variance",
    icon: "trending",
    title: "Analysis of Variance (ANOVA) & Experimental Design",
    mapping: "STAT101-M5: Conduct one-way and two-way ANOVA to evaluate differences across three or more treatment groups without inflating error rates.",
    outcome: "Partition total variance into between and within components, compute F-ratios, evaluate ANOVA assumptions, and apply post-hoc tests.",
    essential: "When comparing means across three or more groups, performing multiple pairwise t-tests causes family-wise Type I error inflation (1 - (1 - alpha)^k). Analysis of Variance (ANOVA) controls this by partitioning Total Sum of Squares (SST) into Between-Group variation (SSB) and Within-Group variation (SSW). The test statistic is the F-ratio: F = MSB / MSW. An F-ratio significantly greater than 1 indicates that between-group differences exceed random sampling variation.",
    routes: {
      beginner: "Understand why ANOVA is required instead of multiple independent t-tests across three or more groups. Learn the intuition of comparing variance between groups against variance within groups.",
      intermediate: "Construct a One-Way ANOVA summary table: Degrees of freedom (df_between = k - 1, df_within = N - k), Mean Squares (MS = SS / df), and the F-ratio (MSB / MSW). Interpret the overall F-test decision.",
      upperIntermediate: "Test ANOVA assumptions: Normality of residuals (Shapiro-Wilk) and Homogeneity of variance (Levene's test). Conduct Tukey's Honestly Significant Difference (HSD) post-hoc test to identify exactly which group pairs differ.",
      advanced: "Formulate Two-Way Factorial ANOVA with interaction effects (Factor A, Factor B, A x B interaction). Interpret parallel vs intersecting profile plots, and apply Repeated Measures ANOVA with Mauchly's test for sphericity."
    },
    practice: {
      prompt: "Why must an educator or researcher use One-Way ANOVA instead of three separate independent two-sample t-tests when comparing three treatment groups at alpha = 0.05?",
      options: [
        { id: "opt-familywise", text: "Multiple t-tests inflate the family-wise Type I error rate to approximately 14%, increasing the chance of false positives." },
        { id: "opt-variance", text: "T-tests cannot be computed when samples have more than 20 participants." },
        { id: "opt-negative", text: "T-tests always produce negative values when comparing three groups." },
        { id: "opt-degrees", text: "ANOVA eliminates the need for any post-hoc pairwise comparisons." }
      ],
      correctId: "opt-familywise",
      feedbackCorrect: "Correct! With 3 tests at alpha = 0.05, the cumulative family-wise error rate is 1 - (1 - 0.05)^3 = 14.3%. ANOVA protects against this inflation.",
      feedbackIncorrect: "Incorrect. Running multiple t-tests inflates the overall Type I error rate (family-wise error). ANOVA evaluates all groups simultaneously."
    }
  },
  {
    domain: "regression",
    icon: "book",
    title: "Correlation, Linear Regression & Predictive Modeling",
    mapping: "STAT101-M6: Formulate simple and multiple linear regression models, evaluate R-squared, diagnose residual assumptions, and assess collinearity.",
    outcome: "Estimate OLS regression coefficients, evaluate goodness-of-fit (R-squared), validate LINE residual assumptions, and detect multicollinearity.",
    essential: "Regression analysis models the relationship between dependent response variable Y and one or more independent explanatory variables X. Ordinary Least Squares (OLS) minimizes the sum of squared residuals (errors). The coefficient of determination (R^2) represents the proportion of variance in Y explained by the model. Multiple regression extends this to multiple predictors, requiring verification of LINE assumptions (Linearity, Independence, Normality, Equal variance) and checks for multicollinearity (Variance Inflation Factor / VIF).",
    routes: {
      beginner: "Contrast correlation (strength and direction of linear association, Pearson's r from -1 to +1) with causation. Understand the simple linear regression line equation: Y_hat = beta0 + beta1 * X.",
      intermediate: "Interpret the regression intercept (beta0) and slope coefficient (beta1). Understand the coefficient of determination R^2 and calculate predictions for given values of X.",
      upperIntermediate: "Extend to Multiple Linear Regression with multiple predictors. Interpret partial regression coefficients holding other variables constant. Evaluate Adjusted R^2 and the overall model F-test.",
      advanced: "Verify OLS assumptions using residual plots: Linearity, Normality (Q-Q plot), Homoscedasticity vs Heteroscedasticity (Breusch-Pagan test), and Independence. Detect multicollinearity using Variance Inflation Factors (VIF > 5-10) and influential outliers using Cook's Distance."
    },
    practice: {
      prompt: "In a multiple linear regression model predicting sales from ad spend and store size, the model R-squared is 0.72. What is the correct interpretation of this value?",
      options: [
        { id: "opt-r2", text: "72% of the total variance in sales is explained by the combination of ad spend and store size in the model." },
        { id: "opt-correlation", text: "The Pearson correlation coefficient between sales and each predictor is 0.72." },
        { id: "opt-error", text: "The model will make accurate sales predictions exactly 72% of the time." },
        { id: "opt-slope", text: "Every dollar increase in ad spend increases sales by $0.72." }
      ],
      correctId: "opt-r2",
      feedbackCorrect: "Correct! R^2 (coefficient of determination) represents the proportion of variance in the dependent variable explained by the independent variables.",
      feedbackIncorrect: "Incorrect. R^2 is the proportion of variance in the response variable explained by the regression model (72% in this case)."
    }
  }
];

function makeQuestion(id, domain, tier, prompt, options, correctId, feedbackCorrect, feedbackIncorrect, topic) {
  return {
    id,
    domain,
    tier,
    prompt,
    interaction: {
      kind: "multipleChoice",
      options,
      correctOptionIds: [correctId],
      minSelections: 1,
      maxSelections: 1,
      scoringMode: "strict"
    },
    feedback: {
      correct: feedbackCorrect,
      incorrect: feedbackIncorrect
    },
    remediation: {
      moduleId: `${domain}-module`,
      level: tier,
      topic: `${topic}: ${tier.charAt(0).toUpperCase() + tier.slice(1)}`,
      text: `Review the ${domain} concept: ${feedbackCorrect}`
    }
  };
}

// Build modules with checkpoints
const modules = rawModules.map(m => {
  const checkpoints = {
    beginner: makeQuestion(
      `${m.domain}-beginner-checkpoint`,
      m.domain,
      "beginner",
      `[Beginner Checkpoint] ${m.practice.prompt}`,
      m.practice.options,
      m.practice.correctId,
      m.practice.feedbackCorrect,
      m.practice.feedbackIncorrect,
      m.title
    ),
    intermediate: makeQuestion(
      `${m.domain}-intermediate-checkpoint`,
      m.domain,
      "intermediate",
      `[Intermediate Checkpoint] For ${m.title.toLowerCase()}, which method or metric is appropriate?`,
      [
        { id: "opt-a", text: `Standard statistical formula and analytical procedure for ${m.domain}.` },
        { id: "opt-b", text: `Subjective visual estimation without mathematical verification.` },
        { id: "opt-c", text: `Arbitrary selection ignoring underlying distribution characteristics.` }
      ],
      "opt-a",
      `Correct! Rigorous quantitative evaluation is required for ${m.title.toLowerCase()}.`,
      "Incorrect. Always apply sound statistical principles and standard formulas.",
      m.title
    ),
    upperIntermediate: makeQuestion(
      `${m.domain}-upperIntermediate-checkpoint`,
      m.domain,
      "upperIntermediate",
      `[Upper Intermediate Checkpoint] In applied analytics, what assumption or constraint governs ${m.title.toLowerCase()}?`,
      [
        { id: "opt-valid", text: "Verifying distribution assumptions, sample size criteria, and boundary conditions." },
        { id: "opt-ignore", text: "Assuming all empirical datasets satisfy normal distribution criteria automatically." },
        { id: "opt-random", text: "Ignoring sample independence and measurement reliability." }
      ],
      "opt-valid",
      "Correct! Testing statistical assumptions is essential before drawing valid inferences.",
      "Incorrect. Assumptions and boundary conditions must always be checked.",
      m.title
    ),
    advanced: makeQuestion(
      `${m.domain}-advanced-checkpoint`,
      m.domain,
      "advanced",
      `[Advanced Checkpoint] What diagnostic or correction is required when underlying model assumptions for ${m.title.toLowerCase()} are violated?`,
      [
        { id: "opt-robust", text: "Employ robust estimators, power transformations, or non-parametric alternatives." },
        { id: "opt-proceed", text: "Proceed without modifications because large sample sizes eliminate all biases." },
        { id: "opt-discard", text: "Discard random observations until the test statistic reaches significance." }
      ],
      "opt-robust",
      "Correct! Applying robust methods or non-parametric tests ensures sound conclusions.",
      "Incorrect. Model violations require appropriate transformations or robust methods.",
      m.title
    )
  };

  return {
    id: `${m.domain}-module`,
    domain: m.domain,
    icon: m.icon,
    title: m.title,
    mapping: m.mapping,
    required: true,
    outcome: m.outcome,
    essential: m.essential,
    routes: {
      beginner: m.routes.beginner,
      intermediate: m.routes.intermediate,
      upperIntermediate: m.routes.upperIntermediate,
      advanced: m.routes.advanced
    },
    contentStyles: { cardLayout: "standard", calloutStyle: "info" },
    contentMedia: [],
    checkpoints,
    fastTrack: true
  };
});

// Diagnostic questions (2 per domain = 12 total, covering beginner & intermediate tiers)
const diagnostic = [
  makeQuestion(
    "diag-desc-1",
    "descriptive",
    "beginner",
    "If a dataset has a mean of 50 and a median of 35, what does this indicate about the distribution shape?",
    [
      { id: "d1-pos", text: "The distribution is right-skewed (positively skewed) with a long upper tail." },
      { id: "d1-neg", text: "The distribution is left-skewed (negatively skewed) with extreme low values." },
      { id: "d1-sym", text: "The distribution is symmetric and follows a perfect normal curve." },
      { id: "d1-uni", text: "The distribution has zero variance." }
    ],
    "d1-pos",
    "Correct! When mean > median, extreme large values pull the mean upward into the right tail.",
    "Incorrect. When the mean is larger than the median, the distribution is right-skewed.",
    "Descriptive Analysis"
  ),
  makeQuestion(
    "diag-desc-2",
    "descriptive",
    "intermediate",
    "In a boxplot, an observation is classified as an outlier if it falls beyond what boundary?",
    [
      { id: "d2-iqr", text: "1.5 times the Interquartile Range (IQR) above Q3 or below Q1." },
      { id: "d2-sd", text: "Exactly 1 standard deviation from the median." },
      { id: "d2-range", text: "50% of the total range from the center." },
      { id: "d2-mean", text: "Any value outside the middle 90% percentile." }
    ],
    "d2-iqr",
    "Correct! Tukey's fence rule defines outliers as values outside [Q1 - 1.5*IQR, Q3 + 1.5*IQR].",
    "Incorrect. Outliers in standard boxplots are located beyond 1.5 x IQR from the quartiles.",
    "Descriptive Analysis"
  ),
  makeQuestion(
    "diag-prob-1",
    "probability",
    "beginner",
    "What is the total area under the probability density curve of any continuous random variable?",
    [
      { id: "dp1-one", text: "Exactly 1.0 (or 100%)." },
      { id: "dp1-zero", text: "0.0, because single point probabilities are zero." },
      { id: "dp1-inf", text: "Infinity, because continuous variables are unbounded." },
      { id: "dp1-z", text: "Equal to the population mean mu." }
    ],
    "dp1-one",
    "Correct! The total area under any probability density function must integrate to exactly 1.",
    "Incorrect. By the fundamental axioms of probability, the total probability area is 1.",
    "Probability Theory"
  ),
  makeQuestion(
    "diag-prob-2",
    "probability",
    "intermediate",
    "Which probability distribution is most appropriate for modeling the number of website visits per hour?",
    [
      { id: "dp2-poisson", text: "Poisson distribution, which models counts of events occurring in fixed time intervals." },
      { id: "dp2-uniform", text: "Uniform distribution, where all counts have identical probability." },
      { id: "dp2-t", text: "Student's t-distribution with infinite degrees of freedom." },
      { id: "dp2-bernoulli", text: "Bernoulli distribution, which only allows binary 0 or 1 values." }
    ],
    "dp2-poisson",
    "Correct! The Poisson distribution models independent event arrival counts over a continuous interval.",
    "Incorrect. Event counts over a specified time interval are modeled using the Poisson distribution.",
    "Probability Theory"
  ),
  makeQuestion(
    "diag-inf-1",
    "inferential",
    "beginner",
    "What is the definition of a Type I error in statistical hypothesis testing?",
    [
      { id: "di1-falsepos", text: "Rejecting the null hypothesis when the null hypothesis is actually true (False Positive)." },
      { id: "di1-falseneg", text: "Failing to reject the null hypothesis when the null hypothesis is false (False Negative)." },
      { id: "di1-calc", text: "Making a mathematical arithmetic mistake during test calculation." },
      { id: "di1-power", text: "Having insufficient sample size to detect a genuine effect." }
    ],
    "di1-falsepos",
    "Correct! Type I error (alpha) occurs when we falsely reject a true null hypothesis.",
    "Incorrect. Type I error is rejecting H0 when H0 is true. Failing to reject a false H0 is Type II error.",
    "Hypothesis Testing"
  ),
  makeQuestion(
    "diag-inf-2",
    "inferential",
    "intermediate",
    "When comparing the mean test scores of the SAME group of students before and after training, which test is appropriate?",
    [
      { id: "di2-paired", text: "Paired samples t-test (dependent samples t-test)." },
      { id: "di2-indep", text: "Independent two-sample t-test." },
      { id: "di2-anova", text: "Three-way factorial ANOVA." },
      { id: "di2-chisq", text: "Chi-Square test of independence." }
    ],
    "di2-paired",
    "Correct! Because each student provides both a pre-test and post-test score, a paired t-test is required.",
    "Incorrect. Repeated measures on the same subjects require a paired (dependent) samples t-test.",
    "Hypothesis Testing"
  ),
  makeQuestion(
    "diag-cat-1",
    "categorical",
    "beginner",
    "What test is used to evaluate whether smoking status (Yes/No) is independent of lung disease diagnosis (Yes/No)?",
    [
      { id: "dc1-chi", text: "Chi-Square test of independence." },
      { id: "dc1-z", text: "One-sample Z-test for means." },
      { id: "dc1-pearson", text: "Pearson correlation coefficient r." },
      { id: "dc1-anova", text: "One-way ANOVA." }
    ],
    "dc1-chi",
    "Correct! The Chi-Square test of independence assesses association between two categorical variables.",
    "Incorrect. Testing relationship between two categorical variables requires a Chi-Square test.",
    "Categorical Analysis"
  ),
  makeQuestion(
    "diag-cat-2",
    "categorical",
    "intermediate",
    "In a 2x2 contingency table, an Odds Ratio (OR) equal to 1.0 indicates what relationship?",
    [
      { id: "dc2-noassoc", text: "No association; the odds of the outcome are identical in both exposure groups." },
      { id: "dc2-strong", text: "A strong positive relationship between exposure and outcome." },
      { id: "dc2-protective", text: "A complete protective effect preventing the outcome." },
      { id: "dc2-invalid", text: "An invalid study design requiring re-sampling." }
    ],
    "dc2-noassoc",
    "Correct! An Odds Ratio of 1.0 indicates that exposure does not alter the odds of the outcome.",
    "Incorrect. An OR of 1.0 means no difference in odds between the groups (null value).",
    "Categorical Analysis"
  ),
  makeQuestion(
    "diag-var-1",
    "variance",
    "beginner",
    "What is the primary purpose of One-Way Analysis of Variance (ANOVA)?",
    [
      { id: "dv1-means", text: "To test whether three or more population means are equal." },
      { id: "dv1-predict", text: "To predict a continuous outcome from a single predictor line." },
      { id: "dv1-counts", text: "To count the frequency of categorical survey responses." },
      { id: "dv1-rank", text: "To rank individual outliers by distance from the median." }
    ],
    "dv1-means",
    "Correct! One-Way ANOVA tests the equality of means across three or more treatment groups.",
    "Incorrect. ANOVA evaluates whether three or more group means differ significantly.",
    "Analysis of Variance"
  ),
  makeQuestion(
    "diag-var-2",
    "variance",
    "intermediate",
    "If a One-Way ANOVA omnibus F-test produces p = 0.002, what step should the researcher take next?",
    [
      { id: "dv2-posthoc", text: "Perform post-hoc pairwise comparisons (such as Tukey's HSD) to identify which groups differ." },
      { id: "dv2-accept", text: "Accept that all group means are identical and conclude the analysis." },
      { id: "dv2-repeat", text: "Discard the data and rerun independent two-sample t-tests." },
      { id: "dv2-single", text: "Assume that only the first and last groups differ without further testing." }
    ],
    "dv2-posthoc",
    "Correct! A significant omnibus F indicates at least one difference exists; post-hoc tests locate them.",
    "Incorrect. A significant ANOVA requires post-hoc comparisons (e.g., Tukey's HSD) to pinpoint differences.",
    "Analysis of Variance"
  ),
  makeQuestion(
    "diag-reg-1",
    "regression",
    "beginner",
    "What does a Pearson correlation coefficient of r = -0.88 indicate about the relationship between two variables?",
    [
      { id: "dr1-strongneg", text: "A strong negative linear relationship; as one variable increases, the other decreases." },
      { id: "dr1-weak", text: "A very weak association because the number is negative." },
      { id: "dr1-curv", text: "A non-linear parabolic curve with two peaks." },
      { id: "dr1-causal", text: "A proven direct causal relationship." }
    ],
    "dr1-strongneg",
    "Correct! Values close to -1.0 represent strong inverse linear associations.",
    "Incorrect. Negative r values near -1.0 reflect a strong negative linear association.",
    "Linear Regression"
  ),
  makeQuestion(
    "diag-reg-2",
    "regression",
    "intermediate",
    "In simple linear regression (Y = beta0 + beta1*X), what does the slope coefficient beta1 represent?",
    [
      { id: "dr2-change", text: "The expected change in Y for each one-unit increase in X." },
      { id: "dr2-intercept", text: "The predicted value of Y when X equals zero." },
      { id: "dr2-r2", text: "The percentage of variance explained by the model." },
      { id: "dr2-error", text: "The standard deviation of the residual errors." }
    ],
    "dr2-change",
    "Correct! The slope beta1 represents the marginal change in the response Y per unit change in X.",
    "Incorrect. The slope beta1 indicates how much Y changes on average for each 1-unit increase in X.",
    "Linear Regression"
  )
];

// Final assessment questions (3 per domain = 18 total)
const final = [
  makeQuestion(
    "final-desc-1",
    "descriptive",
    "intermediate",
    "A distribution of employee salaries has Q1 = $45,000 and Q3 = $75,000. Under Tukey's rule, what is the lower outlier boundary?",
    [
      { id: "fd1-zero", text: "$0 (Q1 - 1.5 * IQR = 45,000 - 1.5 * 30,000 = $0)." },
      { id: "fd1-30k", text: "$30,000, which equals the interquartile range directly." },
      { id: "fd1-15k", text: "$15,000, calculated as half of the median." },
      { id: "fd1-none", text: "Salaries cannot have lower outliers by definition." }
    ],
    "fd1-zero",
    "Correct! IQR = 75,000 - 45,000 = 30,000. Lower fence = 45,000 - 1.5*(30,000) = $0.",
    "Incorrect. IQR = Q3 - Q1 = $30,000. Lower boundary = Q1 - 1.5*IQR = 45,000 - 45,000 = $0.",
    "Descriptive Analysis"
  ),
  makeQuestion(
    "final-desc-2",
    "descriptive",
    "upperIntermediate",
    "For a bell-shaped Normal distribution with mean = 100 and standard deviation = 15, approximately what percentage of data falls between 70 and 130?",
    [
      { id: "fd2-95", text: "Approximately 95% (within 2 standard deviations: 100 +/- 2*15)." },
      { id: "fd2-68", text: "Approximately 68% (within 1 standard deviation)." },
      { id: "fd2-997", text: "Approximately 99.7% (within 3 standard deviations)." },
      { id: "fd2-50", text: "Exactly 50% around the median." }
    ],
    "fd2-95",
    "Correct! By the Empirical Rule, approximately 95% of observations fall within mu +/- 2*sigma (70 to 130).",
    "Incorrect. 70 to 130 corresponds to mu +/- 2*sigma, which covers approximately 95% of the Normal curve.",
    "Descriptive Analysis"
  ),
  makeQuestion(
    "final-desc-3",
    "descriptive",
    "advanced",
    "When data exhibits severe positive skewness and non-constant variance, what transformation is commonly applied to stabilize variance and achieve approximate normality?",
    [
      { id: "fd3-log", text: "Natural logarithm or Box-Cox power transformation." },
      { id: "fd3-sq", text: "Squaring the values to expand high values." },
      { id: "fd3-neg", text: "Multiplying all numbers by -1." },
      { id: "fd3-mod", text: "Replacing the mean with the harmonic mode." }
    ],
    "fd3-log",
    "Correct! Logarithmic and Box-Cox transformations compress right-tail dispersion and stabilize variance.",
    "Incorrect. Right-skewed positive data is normalized using logarithmic or Box-Cox power transformations.",
    "Descriptive Analysis"
  ),
  makeQuestion(
    "final-prob-1",
    "probability",
    "intermediate",
    "A fair coin is tossed 10 times. Which formula gives the probability of getting exactly 7 heads?",
    [
      { id: "fp1-bin", text: "Binomial probability formula: P(X=7) = (10 choose 7) * (0.5)^7 * (0.5)^3." },
      { id: "fp1-poi", text: "Poisson formula: e^(-5) * 5^7 / 7!." },
      { id: "fp1-geo", text: "Geometric formula: (0.5)^6 * (0.5)." },
      { id: "fp1-hyp", text: "Hypergeometric sampling without replacement formula." }
    ],
    "fp1-bin",
    "Correct! Fixed independent trials with constant probability are modeled with the Binomial formula.",
    "Incorrect. A sequence of independent binary trials with fixed n uses the Binomial probability formula.",
    "Probability Theory"
  ),
  makeQuestion(
    "final-prob-2",
    "probability",
    "upperIntermediate",
    "A population has mean 200 and standard deviation 40. For random samples of size n = 64, what is the standard error of the sample mean?",
    [
      { id: "fp2-five", text: "5, calculated as sigma / sqrt(n) = 40 / sqrt(64) = 40 / 8 = 5." },
      { id: "fp2-40", text: "40, because standard error equals population standard deviation." },
      { id: "fp2-0625", text: "0.625, calculated as 40 / 64." },
      { id: "fp2-25", text: "25, calculated as 200 / 8." }
    ],
    "fp2-five",
    "Correct! Standard Error = sigma / sqrt(n) = 40 / 8 = 5.",
    "Incorrect. SE = sigma / sqrt(n). With sigma = 40 and n = 64, SE = 40 / 8 = 5.",
    "Probability Theory"
  ),
  makeQuestion(
    "final-prob-3",
    "probability",
    "advanced",
    "In a quantile-quantile (Q-Q) plot, what visual pattern indicates that sample data conforms closely to a theoretical normal distribution?",
    [
      { id: "fp3-straight", text: "The sample points fall closely along a straight 45-degree reference diagonal line." },
      { id: "fp3-s", text: "The points form a distinct S-shaped sinusoidal wave." },
      { id: "fp3-u", text: "The points form a sharp U-shaped parabolic curve." },
      { id: "fp3-vert", text: "The points cluster vertically on the zero axis." }
    ],
    "fp3-straight",
    "Correct! Conformity to a straight diagonal line confirms that empirical quantiles match theoretical normal quantiles.",
    "Incorrect. Points closely following a straight diagonal line signify normality on a Q-Q plot.",
    "Probability Theory"
  ),
  makeQuestion(
    "final-inf-1",
    "inferential",
    "intermediate",
    "What does a 95% Confidence Interval for a population mean [42.1, 48.7] formally signify?",
    [
      { id: "fi1-ci", text: "In 95% of repeated random samples from this population, the calculated interval will contain the true population mean." },
      { id: "fi1-95data", text: "95% of all individual values in the sample fall between 42.1 and 48.7." },
      { id: "fi1-param", text: "There is a 95% probability that the sample mean varies across trials." },
      { id: "fi1-certain", text: "The population mean is proven to equal the midpoint 45.4." }
    ],
    "fi1-ci",
    "Correct! The 95% confidence level reflects the long-run capture rate across repeated sampling.",
    "Incorrect. Confidence intervals describe the long-run coverage rate of the estimation procedure.",
    "Hypothesis Testing"
  ),
  makeQuestion(
    "final-inf-2",
    "inferential",
    "upperIntermediate",
    "When conducting an independent two-sample t-test, what test should be performed if Levene's test indicates unequal group variances?",
    [
      { id: "fi2-welch", text: "Welch's t-test (which adjusts degrees of freedom for unequal variances)." },
      { id: "fi2-pooled", text: "Standard pooled-variance Student's t-test." },
      { id: "fi2-z", text: "Paired Z-test without variance adjustment." },
      { id: "fi2-chi", text: "One-sample Goodness-of-Fit test." }
    ],
    "fi2-welch",
    "Correct! Welch's t-test handles unequal population variances reliably and controls Type I error.",
    "Incorrect. Heteroscedastic groups require Welch's t-test with Satterthwaite degrees of freedom.",
    "Hypothesis Testing"
  ),
  makeQuestion(
    "final-inf-3",
    "inferential",
    "advanced",
    "When performing 20 simultaneous hypothesis tests at alpha = 0.05, what is the Bonferroni-adjusted significance threshold per test?",
    [
      { id: "fi3-bonf", text: "alpha_adj = 0.05 / 20 = 0.0025." },
      { id: "fi3-const", text: "alpha_adj = 0.05, because each test is independent." },
      { id: "fi3-one", text: "alpha_adj = 1.0 (no threshold)." },
      { id: "fi3-sqrt", text: "alpha_adj = 0.05 / sqrt(20) = 0.0112." }
    ],
    "fi3-bonf",
    "Correct! The Bonferroni correction divides nominal alpha by the number of comparisons: 0.05 / 20 = 0.0025.",
    "Incorrect. Bonferroni adjustment divides alpha by the number of comparisons: 0.05 / 20 = 0.0025.",
    "Hypothesis Testing"
  ),
  makeQuestion(
    "final-cat-1",
    "categorical",
    "intermediate",
    "In a Chi-Square test of independence, how is the expected frequency E calculated for a cell in row i and column j?",
    [
      { id: "fc1-formula", text: "E = (Row i Total * Column j Total) / Grand Sample Total." },
      { id: "fc1-mean", text: "E = (Observed value + Grand Total) / 2." },
      { id: "fc1-equal", text: "E = Grand Total divided by the number of rows." },
      { id: "fc1-sub", text: "E = Row Total minus Column Total." }
    ],
    "fc1-formula",
    "Correct! Under independence, expected count = (Row Total * Column Total) / Grand Total.",
    "Incorrect. Expected cell frequency = (Row Total * Column Total) / Grand Total.",
    "Categorical Analysis"
  ),
  makeQuestion(
    "final-cat-2",
    "categorical",
    "upperIntermediate",
    "If a 2x2 contingency table has an observed cell count of 3 with an expected count of 2.1, what test is recommended over standard Chi-Square?",
    [
      { id: "fc2-fisher", text: "Fisher's Exact Test, which calculates exact hypergeometric probabilities for small counts." },
      { id: "fc2-z", text: "Standard Z-test with normal continuity approximation." },
      { id: "fc2-anova", text: "One-Way ANOVA with Welch correction." },
      { id: "fc2-regression", text: "Multiple linear regression." }
    ],
    "fc2-fisher",
    "Correct! When expected counts are small (< 5), Fisher's Exact Test provides exact p-values.",
    "Incorrect. Small cell counts violate asymptotic Chi-Square assumptions; Fisher's Exact Test is required.",
    "Categorical Analysis"
  ),
  makeQuestion(
    "final-cat-3",
    "categorical",
    "advanced",
    "In a clinical cohort study, the risk of disease is 8% in exposed patients and 2% in unexposed patients. What is the Relative Risk (RR)?",
    [
      { id: "fc3-four", text: "4.0 (Risk in exposed / Risk in unexposed = 0.08 / 0.02 = 4.0)." },
      { id: "fc3-six", text: "6.0, calculated as the risk difference 8% - 2%." },
      { id: "fc3-zero", text: "0.25, the inverse ratio." },
      { id: "fc3-ten", text: "10.0, the sum of the two percentages." }
    ],
    "fc3-four",
    "Correct! Relative Risk = 0.08 / 0.02 = 4.0. Exposed individuals have 4 times the risk.",
    "Incorrect. Relative Risk = (Risk in exposed) / (Risk in unexposed) = 0.08 / 0.02 = 4.0.",
    "Categorical Analysis"
  ),
  makeQuestion(
    "final-var-1",
    "variance",
    "intermediate",
    "In an ANOVA summary table, how is the Mean Square Between (MSB) calculated?",
    [
      { id: "fv1-msb", text: "MSB = Sum of Squares Between (SSB) / Degrees of Freedom Between (k - 1)." },
      { id: "fv1-sub", text: "MSB = Total Sum of Squares minus Error Sum of Squares." },
      { id: "fv1-mult", text: "MSB = SSB multiplied by total sample size N." },
      { id: "fv1-sqrt", text: "MSB = Square root of the F-ratio." }
    ],
    "fv1-msb",
    "Correct! Mean square is always calculated as Sum of Squares divided by its degrees of freedom.",
    "Incorrect. Mean square between groups MSB = SSB / df_between.",
    "Analysis of Variance"
  ),
  makeQuestion(
    "final-var-2",
    "variance",
    "upperIntermediate",
    "What does a significant interaction effect in a Two-Way Factorial ANOVA indicate?",
    [
      { id: "fv2-inter", text: "The effect of Factor A on the response variable depends on the level of Factor B." },
      { id: "fv2-none", text: "Neither Factor A nor Factor B has any main effect on the response." },
      { id: "fv2-paral", text: "The response lines on a profile interaction plot are completely parallel." },
      { id: "fv2-error", text: "The ANOVA model has zero residual error." }
    ],
    "fv2-inter",
    "Correct! Interaction means that the effect of one factor changes across levels of the other factor.",
    "Incorrect. Interaction signifies that the effect of one factor depends on the level of the other factor.",
    "Analysis of Variance"
  ),
  makeQuestion(
    "final-var-3",
    "variance",
    "advanced",
    "In Repeated Measures ANOVA, which assumption states that variances of differences between all possible pairs of within-subject conditions must be equal?",
    [
      { id: "fv3-spher", text: "Sphericity (tested via Mauchly's test, corrected with Greenhouse-Geisser if violated)." },
      { id: "fv3-homo", text: "Homogeneity of regression slopes." },
      { id: "fv3-indep", text: "Complete independence of repeated observations." },
      { id: "fv3-bimod", text: "Bimodality of condition medians." }
    ],
    "fv3-spher",
    "Correct! Sphericity is the repeated measures compound symmetry assumption, evaluated by Mauchly's test.",
    "Incorrect. Sphericity requires equal variances of pairwise differences across repeated conditions.",
    "Analysis of Variance"
  ),
  makeQuestion(
    "final-reg-1",
    "regression",
    "intermediate",
    "What is the mathematical criterion used by Ordinary Least Squares (OLS) to fit the best regression line?",
    [
      { id: "fr1-min", text: "Minimizing the sum of squared vertical residuals: sum((Y_i - Y_hat_i)^2)." },
      { id: "fr1-abs", text: "Maximizing the sum of absolute errors between points." },
      { id: "fr1-zero", text: "Setting the correlation coefficient to zero." },
      { id: "fr1-dist", text: "Minimizing perpendicular Euclidean distances for all coordinates." }
    ],
    "fr1-min",
    "Correct! OLS estimates minimize the sum of squared vertical residuals (errors).",
    "Incorrect. OLS minimizes the sum of squared vertical residuals: sum((Y - Y_hat)^2).",
    "Linear Regression"
  ),
  makeQuestion(
    "final-reg-2",
    "regression",
    "upperIntermediate",
    "In multiple linear regression, what metric evaluates whether two or more explanatory variables are dangerously correlated with each other?",
    [
      { id: "fr2-vif", text: "Variance Inflation Factor (VIF), where VIF > 5 to 10 indicates high multicollinearity." },
      { id: "fr2-f", text: "The omnibus F-statistic." },
      { id: "fr2-intercept", text: "The standard error of the Y-intercept." },
      { id: "fr2-df", text: "Residual degrees of freedom." }
    ],
    "fr2-vif",
    "Correct! VIF measures how much predictor variance is inflated due to collinearity with other predictors.",
    "Incorrect. Multicollinearity among predictors is diagnosed using the Variance Inflation Factor (VIF).",
    "Linear Regression"
  ),
  makeQuestion(
    "final-reg-3",
    "regression",
    "advanced",
    "When inspecting a residual plot against fitted values, a distinct funnel/cone shape (expanding spread) violates which OLS regression assumption?",
    [
      { id: "fr3-homo", text: "Homoscedasticity (equal residual variance across all fitted values; indicates heteroscedasticity)." },
      { id: "fr3-linear", text: "Linearity of the underlying relationship." },
      { id: "fr3-indep", text: "Independence of explanatory variable measurements." },
      { id: "fr3-norm", text: "Normality of independent variable predictors." }
    ],
    "fr3-homo",
    "Correct! An expanding funnel pattern demonstrates heteroscedasticity (non-constant residual variance).",
    "Incorrect. Non-constant residual spread indicates heteroscedasticity (violating homoscedasticity).",
    "Linear Regression"
  )
];

const statisticsProject = {
  editorVersion: "4.1.0",
  version: "1.0.0",
  code: "STAT101",
  title: "Basic to Advanced Statistics",
  subtitle: "Master descriptive metrics, probability distributions, hypothesis testing, ANOVA, and regression modeling.",
  context: "Data Science, Business Analytics & Research Methodology",
  jurisdiction: "Global / ISO & Academic Standard",
  passMark: 80,
  supportThreshold: 55,
  challengeThreshold: 82,
  estimatedMinutes: 75,
  theme,
  coverPage,
  defaultRoleId: "data-analyst",
  xapiEnabled: true,
  roles,
  modules,
  diagnostic,
  final,
  sources
};

fs.writeFileSync("statistics_starter.json", JSON.stringify(statisticsProject, null, 2));
console.log("Successfully generated statistics_starter.json!");
console.log("Modules:", statisticsProject.modules.length);
console.log("Diagnostic items:", statisticsProject.diagnostic.length);
console.log("Final items:", statisticsProject.final.length);
