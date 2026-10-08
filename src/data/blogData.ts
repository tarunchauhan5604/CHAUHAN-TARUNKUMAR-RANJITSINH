import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-emi-is-calculated',
    title: 'How EMI is Calculated: The Reducing Balance Formula Explained',
    category: 'Finance',
    readTime: '6 min read',
    publishedDate: 'October 2026',
    excerpt:
      'Demystify your monthly loan statement. Learn how banks calculate Equated Monthly Installments (EMI) using the reducing-balance method and how to save on total interest.',
    relatedCalculatorSlug: 'emi',
    content: `
When you take out a loan for a home, automobile, or education, you agree to repay the borrowed capital through Equated Monthly Installments (EMI). While the monthly payout remains identical each billing cycle, the underlying split between principal and interest shifts dramatically over time.

### The Standard Reducing-Balance EMI Formula

Modern retail banking uses the reducing balance formula:

$$\\text{EMI} = P \\times r \\times \\frac{(1+r)^n}{(1+r)^n - 1}$$

Where:
* **P** = Principal loan amount (e.g. ₹25,00,000)
* **r** = Monthly interest rate (Annual Interest Rate ÷ 12 ÷ 100)
* **n** = Total number of monthly installments (Years × 12)

### Why Initial EMIs Feel Heavy on Interest

During the early months of a 20-year home loan, your outstanding principal balance is near its peak. Because monthly interest equals *Current Balance × r*, up to 70% of your first few payments goes purely toward paying bank interest. 

As you gradually shave off principal, the monthly interest portion decreases. By year 15, the proportions reverse: the vast majority of your payment retires the principal balance.

### Strategies to Save on Loan Interest

1. **Make Prepayments Early**: Prepaying even ₹50,000 in the first 3 years cuts down the principal while the compounding interest burden is highest.
2. **Increase Your EMI with Salary Hikes**: Bumping up your EMI by just 5% to 10% annually can shave 4 to 6 years off a 20-year loan tenure.
3. **Compare Effective Rates**: Avoid flat-rate loans; a 7% flat-rate loan is often equivalent to a 13% reducing-balance loan!
    `,
  },
  {
    slug: 'how-gst-is-calculated',
    title: 'How GST is Calculated: Forward vs Reverse GST Calculation',
    category: 'Taxation',
    readTime: '5 min read',
    publishedDate: 'October 2026',
    excerpt:
      'Understand Goods & Services Tax math. Learn how to calculate GST-exclusive additions and GST-inclusive reverse extractions with real examples.',
    relatedCalculatorSlug: 'gst',
    content: `
The Goods and Services Tax (GST) is a unified destination-based tax structure. Whether you run an e-commerce shop, invoice clients as a freelancer, or check a grocery receipt, understanding both forward and backward GST calculations is essential.

### 1. Forward GST Calculation (Exclusive)

When you know the base price and want to add tax:

$$\\text{GST Amount} = \\text{Base Price} \\times \\left(\\frac{\\text{GST Rate}}{100}\\right)$$
$$\\text{Total Invoice Amount} = \\text{Base Price} + \\text{GST Amount}$$

**Example**: A smartphone base price is ₹20,000 at 18% GST.
* GST Amount = ₹20,000 × (18 / 100) = ₹3,600
* Final Invoice Price = ₹20,000 + ₹3,600 = ₹23,600

### 2. Reverse GST Calculation (Inclusive)

When a retail price already includes GST and you need to determine the original pre-tax price:

$$\\text{Base Price} = \\frac{\\text{Total Price}}{1 + (\\text{GST Rate} / 100)}$$
$$\\text{GST Amount} = \\text{Total Price} - \\text{Base Price}$$

**Example**: You purchased an item for ₹5,900 inclusive of 18% GST.
* Base Price = ₹5,900 / 1.18 = ₹5,000
* GST Amount = ₹5,900 - ₹5,000 = ₹900

### Intra-State vs Inter-State Splits

* **Intra-State (Within same State)**: GST is split 50/50 into Central GST (CGST) and State GST (SGST). For an 18% rate, 9% is CGST and 9% is SGST.
* **Inter-State (Across different States)**: The full 18% is billed as Integrated GST (IGST) directly to the Central Government.
    `,
  },
  {
    slug: 'how-to-calculate-percentage',
    title: 'Master the Percentage Formula: Practical Everyday Tricks',
    category: 'Mathematics',
    readTime: '4 min read',
    publishedDate: 'October 2026',
    excerpt:
      'Percentages govern discounts, exam scores, tips, and investment gains. Here is the definitive guide to mental percentage shortcuts.',
    relatedCalculatorSlug: 'percentage',
    content: `
The term *percentage* comes from the Latin *per centum*, meaning "by the hundred." Despite being one of the simplest mathematical tools, percentage problems often trip people up in daily shopping or business negotiations.

### The Three Core Percentage Queries

1. **What is X% of Y?**
   $$\\text{Value} = \\frac{X \\times Y}{100}$$
   *Shortcut*: 16% of 50 is the same as 50% of 16 (which is 8!). Percentages are reversible: $X\\% \\text{ of } Y = Y\\% \\text{ of } X$.

2. **X is what percentage of Y?**
   $$\\text{Percentage} = \\left(\\frac{X}{Y}\\right) \\times 100$$
   *Example*: You answered 42 questions correctly out of 50. $(42 / 50) \\times 100 = 84\\%$.

3. **Percentage Increase or Decrease:**
   $$\\text{Percentage Change} = \\left(\\frac{\\text{New} - \\text{Old}}{\\text{Old}}\\right) \\times 100$$
   If a stock price rises from ₹200 to ₹250: $((250 - 200) / 200) \\times 100 = +25\\%$.

### The 10% and 1% Rule for Mental Math

* To find **10%** of any number, move the decimal point one place left (10% of 450 is 45).
* To find **1%**, move the decimal point two places left (1% of 450 is 4.5).
* Want **15%**? Add 10% (45) + half of 10% (22.5) = 67.5!
    `,
  },
  {
    slug: 'bmi-meaning-and-health',
    title: 'Understanding BMI: What Your Score Really Tells You',
    category: 'Health',
    readTime: '5 min read',
    publishedDate: 'October 2026',
    excerpt:
      'Is Body Mass Index an accurate measure of wellness? Discover what your BMI score means, healthy ranges, and how to combine it with waist-to-hip ratio.',
    relatedCalculatorSlug: 'bmi',
    content: `
Body Mass Index (BMI) was created in the 1830s by Belgian mathematician Adolphe Quetelet. Today, it remains the standard screening tool used by healthcare professionals and the World Health Organization (WHO) to classify weight categories.

### The BMI Formula

$$\\text{BMI} = \\frac{\\text{Weight in kilograms}}{(\\text{Height in meters})^2}$$

### Standard Adult BMI Categories (WHO)

* **Below 18.5**: Underweight (risk of nutritional deficiencies)
* **18.5 – 24.9**: Normal / Healthy Weight (lowest statistical disease risk)
* **25.0 – 29.9**: Overweight (elevated risk of cardiovascular issues)
* **30.0 and above**: Obese (higher risk of hypertension, type 2 diabetes)

### Limitations of BMI

While BMI is quick and non-invasive, it has key blind spots:
1. **Muscle vs Fat**: Muscle is approximately 18% denser than fat. A muscular athlete may have a BMI of 28 yet maintain single-digit body fat.
2. **Fat Distribution**: Visceral fat (around internal organs) is substantially more dangerous than subcutaneous fat (under the skin). BMI cannot differentiate between the two.
3. **Age & Bone Density**: Older adults naturally lose lean muscle mass and bone mineral density, meaning a "normal" BMI might still mask unhealthy body fat levels.

For a comprehensive picture, pair your BMI measurement with your **waist circumference** and regular medical blood panels.
    `,
  },
  {
    slug: 'sip-basics-wealth-compounding',
    title: 'SIP Basics: How Rupee Cost Averaging Multiplies Wealth',
    category: 'Investing',
    readTime: '7 min read',
    publishedDate: 'October 2026',
    excerpt:
      'Why Systematic Investment Plans (SIP) beat market timing. Learn how automated monthly investing harnesses the twin engines of compounding and dollar cost averaging.',
    relatedCalculatorSlug: 'sip',
    content: `
Trying to time market peaks and troughs is notoriously difficult even for professional fund managers. A Systematic Investment Plan (SIP) removes emotional guesswork by automating regular investments into mutual funds at predefined intervals.

### The Power of Rupee Cost Averaging

When markets decline, your fixed monthly allocation buys **more units** at lower Net Asset Values (NAV). When markets surge, your money buys **fewer units** at higher prices. Over long horizons, your average purchase price per unit tends to be lower than the average market price.

### The Compounding Equation

Albert Einstein famously called compound interest the "eighth wonder of the world." The mathematical formula governing monthly SIP future value is:

$$\\text{FV} = P \\times \\left[\\frac{(1 + i)^n - 1}{i}\\right] \\times (1 + i)$$

Where:
* **P** = Monthly installment (e.g. ₹10,000)
* **i** = Monthly growth rate (e.g. 12% annual = 1% per month = 0.01)
* **n** = Number of monthly contributions (e.g. 15 years = 180 months)

### Real-World Example: 15 Years of Compounding

* Monthly Investment: **₹10,000**
* Total Capital Deposited: **₹18,00,000**
* Estimated Return at 12%: **₹50,45,760**
* **Total Wealth Generated: ₹32,45,760 in pure compounding gains!**

The secret is consistency: time in the market consistently outperforms timing the market.
    `,
  },
  {
    slug: 'simple-vs-compound-interest-basics',
    title: 'Simple vs Compound Interest: Which Loans Cost You More?',
    category: 'Finance',
    readTime: '6 min read',
    publishedDate: 'October 2026',
    excerpt:
      'Compare simple interest vs compound interest. Understand how interest frequency transforms your borrowing costs and savings yields.',
    relatedCalculatorSlug: 'compound-interest',
    content: `
Interest is simply the fee paid for borrowing money or the reward earned for lending capital. However, whether that interest is calculated on a *simple* or *compounded* basis completely changes the financial outcome.

### Simple Interest: Linear Growth

In simple interest, returns are calculated solely on the original principal amount for the entirety of the duration:

$$\\text{Interest} = \\frac{P \\times R \\times T}{100}$$

If you lend ₹1,00,000 at 10% simple interest for 5 years:
* Annual interest is ₹10,000 every single year.
* Total interest after 5 years = ₹50,000.
* Maturity = ₹1,50,000.

### Compound Interest: Exponential Growth

In compound interest, interest earned in earlier periods is added back into the principal. The next period's interest is then calculated on the new, larger sum:

$$\\text{Amount} = P \\times \\left(1 + \\frac{R}{100 \\times n}\\right)^{n \\times T}$$

With the same ₹1,00,000 at 10% compounded annually for 5 years:
* Year 1: ₹1,10,000 (Interest: ₹10,000)
* Year 2: ₹1,21,000 (Interest: ₹11,000)
* Year 3: ₹1,33,100 (Interest: ₹12,100)
* Year 4: ₹1,46,410 (Interest: ₹13,310)
* Year 5: ₹1,61,051 (Interest: ₹14,641)
* Total interest = ₹61,051 (over ₹11,000 more than simple interest!).

### Practical Takeaways

* **When Borrowing**: Prefer simple interest or pay off compound debt immediately before interest snowballs.
* **When Investing**: Always look for compound interest and reinvest your payouts.
    `,
  },
];
