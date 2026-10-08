import { CalculatorMeta } from '../types';

export const CALCULATORS: CalculatorMeta[] = [
  // FINANCE
  {
    id: 'emi',
    slug: 'emi',
    title: 'EMI Calculator',
    category: 'finance',
    shortDesc: 'Calculate home, car, or personal loan EMI with smart 3-of-4 reverse solving and full amortization.',
    iconName: 'CreditCard',
    isPopular: true,
    hasSmart3of4: true,
    formula: 'EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1)',
    formulaExplanation:
      'Where P is Principal Loan Amount, r is Monthly Interest Rate (Annual Rate / 12 / 100), and n is Total Number of Monthly Installments. If you provide any 3 of the 4 values (Principal, Rate, Tenure, EMI), the system automatically solves for the missing 4th value using reducing-balance mathematics.',
    faqs: [
      {
        question: 'What is reducing balance EMI?',
        answer:
          'In a reducing balance loan, interest is calculated each month only on the remaining outstanding principal, not on the original loan amount. As you pay off principal, interest portions decrease while principal repayment portions increase.',
      },
      {
        question: 'How does the Smart 3-of-4 calculation work?',
        answer:
          'Enter any 3 values—for example, your target EMI, desired tenure, and bank interest rate—and the calculator will automatically calculate the maximum loan amount you can borrow.',
      },
      {
        question: 'Can I calculate the exact tenure if I increase my EMI?',
        answer:
          'Yes! Enter your loan amount, interest rate, and higher EMI to see how many months sooner your loan will be paid off.',
      },
    ],
    relatedSlugs: ['loan', 'simple-interest', 'compound-interest', 'salary'],
  },
  {
    id: 'gst',
    slug: 'gst',
    title: 'GST Calculator',
    category: 'finance',
    shortDesc: 'Instant Goods & Services Tax calculation with smart reverse calculation and slab breakdowns.',
    iconName: 'Receipt',
    isPopular: true,
    hasSmart3of4: true,
    formula: 'GST Amount = Amount × (Rate / 100) | Final Amount = Amount + GST',
    formulaExplanation:
      'Enter any 3 parameters (Base Amount, GST %, GST Tax Amount, or Final Gross Amount) and the engine calculates the missing figure, verifying invoice precision.',
    faqs: [
      {
        question: 'What is Inclusive vs Exclusive GST?',
        answer:
          'GST Exclusive means GST is added on top of the base product price. GST Inclusive means the gross retail price already contains the GST tax amount.',
      },
      {
        question: 'What are standard GST slabs in India?',
        answer: 'Common GST tax brackets are 0%, 5%, 12%, 18%, and 28%.',
      },
    ],
    relatedSlugs: ['gst-split', 'discount', 'profit-loss'],
  },
  {
    id: 'discount',
    slug: 'discount',
    title: 'Discount Calculator',
    category: 'finance',
    shortDesc: 'Calculate sale savings, percentage off, or reverse engineer original retail prices.',
    iconName: 'Tag',
    isPopular: true,
    hasSmart3of4: true,
    formula: 'Discount Amount = Original Price × (Discount% / 100) | Final = Original - Discount',
    formulaExplanation:
      'Enter any 3 values (Original Price, Discount %, Discount Amount, Final Price) to solve the 4th value instantly.',
    faqs: [
      {
        question: 'Can I find the original price if I only know the final sale price and discount percentage?',
        answer: 'Yes! Simply enter the Final Price and Discount % to auto-calculate the original pre-sale price.',
      },
    ],
    relatedSlugs: ['gst', 'profit-loss', 'percentage'],
  },
  {
    id: 'profit-loss',
    slug: 'profit-loss',
    title: 'Profit & Loss Calculator',
    category: 'finance',
    shortDesc: 'Analyze margins, markups, cost prices, and net profitability with smart 3-of-4 solving.',
    iconName: 'TrendingUp',
    isPopular: true,
    hasSmart3of4: true,
    formula: 'Profit = Selling Price - Cost Price | Profit % = (Profit / Cost Price) × 100',
    formulaExplanation:
      'Given any 3 fields among Cost Price, Selling Price, Profit/Loss Amount, and Profit/Loss Percentage, the engine deduces the missing variable.',
    faqs: [
      {
        question: 'What is the difference between margin and markup?',
        answer:
          'Markup is the percentage added to Cost Price to get Selling Price. Margin is the percentage of Selling Price that represents profit.',
      },
    ],
    relatedSlugs: ['discount', 'percentage', 'gst'],
  },
  {
    id: 'percentage',
    slug: 'percentage',
    title: 'Percentage Calculator',
    category: 'finance',
    shortDesc: 'Solve X% of Y, find percentage share, and calculate percentage increase or decrease.',
    iconName: 'Percent',
    isPopular: true,
    hasSmart3of4: false,
    formula: 'X% of Y = (X × Y) / 100 | Change% = ((New - Old) / Old) × 100',
    formulaExplanation:
      'Three dedicated calculators in one: compute direct percentage of a number, determine what fraction one number is of another, or analyze percentage growth/decline.',
    faqs: [
      {
        question: 'How do you calculate percentage increase?',
        answer: 'Subtract the old value from the new value, divide by the old value, and multiply by 100.',
      },
    ],
    relatedSlugs: ['discount', 'profit-loss', 'gst'],
  },
  {
    id: 'simple-interest',
    slug: 'simple-interest',
    title: 'Simple Interest Calculator',
    category: 'finance',
    shortDesc: 'Calculate non-compounding interest, principal, rate, or investment duration effortlessly.',
    iconName: 'Coins',
    isPopular: false,
    hasSmart3of4: true,
    formula: 'Simple Interest (SI) = (P × R × T) / 100 | Total Amount = P + SI',
    formulaExplanation:
      'Where P is Principal, R is Annual Interest Rate %, and T is Time in years. Useful for bonds, agricultural loans, and basic deposit agreements.',
    faqs: [
      {
        question: 'When is simple interest used?',
        answer: 'Simple interest is commonly used for short-term personal loans, car loans in some regions, and certain government bonds.',
      },
    ],
    relatedSlugs: ['compound-interest', 'fd', 'loan'],
  },
  {
    id: 'compound-interest',
    slug: 'compound-interest',
    title: 'Compound Interest Calculator',
    category: 'finance',
    shortDesc: 'Experience the power of compounding with customizable frequency (monthly, quarterly, annual).',
    iconName: 'PiggyBank',
    isPopular: true,
    hasSmart3of4: false,
    formula: 'A = P × (1 + r / (100 × n))ⁿᵗ | CI = A - P',
    formulaExplanation:
      'Where A is Maturity Amount, P is Principal, r is Annual Interest Rate %, n is Compounding Frequency per year, and t is Duration in years.',
    faqs: [
      {
        question: 'How does compounding frequency affect returns?',
        answer:
          'The more frequently interest is compounded (e.g. monthly vs annually), the higher your effective annual return, because interest earns interest sooner.',
      },
    ],
    relatedSlugs: ['sip', 'fd', 'simple-interest'],
  },
  {
    id: 'sip',
    slug: 'sip',
    title: 'SIP Calculator',
    category: 'finance',
    shortDesc: 'Estimate future wealth creation from mutual fund systematic investment plans.',
    iconName: 'LineChart',
    isPopular: true,
    hasSmart3of4: false,
    formula: 'FV = P × [((1 + i)ⁿ - 1) / i] × (1 + i)',
    formulaExplanation:
      'Where P is Monthly Investment, i is Monthly Return (Annual Rate / 12 / 100), and n is Total Months (Years × 12). Demonstrates compounding over investment horizons.',
    faqs: [
      {
        question: 'What is the benefit of starting a SIP early?',
        answer:
          'Starting early gives your money more time to compound exponentially. A 5-year head start can often double the final accumulated corpus.',
      },
    ],
    relatedSlugs: ['compound-interest', 'rd', 'fd'],
  },
  {
    id: 'fd',
    slug: 'fd',
    title: 'Fixed Deposit (FD) Calculator',
    category: 'finance',
    shortDesc: 'Calculate bank fixed deposit maturity amount with quarterly compounding standard.',
    iconName: 'Landmark',
    isPopular: true,
    hasSmart3of4: false,
    formula: 'A = P × (1 + r / 400)⁴ᵗ',
    formulaExplanation:
      'Calculates maturity payout and cumulative interest earned based on standard Indian bank quarterly compounding conventions.',
    faqs: [
      {
        question: 'Is FD interest compounded annually or quarterly?',
        answer: 'Most major banks (such as SBI, HDFC, ICICI) compound fixed deposit interest on a quarterly basis.',
      },
    ],
    relatedSlugs: ['rd', 'compound-interest', 'sip'],
  },
  {
    id: 'rd',
    slug: 'rd',
    title: 'Recurring Deposit (RD) Calculator',
    category: 'finance',
    shortDesc: 'Determine interest and maturity proceeds for disciplined monthly recurring deposits.',
    iconName: 'CalendarCheck',
    isPopular: false,
    hasSmart3of4: false,
    formula: 'Interest = P × [n(n+1) / (2 × 12)] × (r / 100)',
    formulaExplanation:
      'Where P is Monthly Installment, n is Total Months, and r is Annual Interest Rate. Computes total deposited capital and guaranteed bank return.',
    faqs: [
      {
        question: 'How is RD different from SIP?',
        answer:
          'An RD is a fixed-income bank deposit with guaranteed returns, while a SIP invests in market-linked mutual funds with higher potential growth but market risk.',
      },
    ],
    relatedSlugs: ['fd', 'sip', 'compound-interest'],
  },
  {
    id: 'loan',
    slug: 'loan',
    title: 'Loan Calculator',
    category: 'finance',
    shortDesc: 'Full loan amortization analysis with monthly repayment schedules and interest totals.',
    iconName: 'Building',
    isPopular: false,
    hasSmart3of4: true,
    formula: 'Monthly Payment = P × r(1+r)ⁿ / ((1+r)ⁿ - 1)',
    formulaExplanation:
      'Calculates monthly installment, total interest obligation, and principal amortization curve for personal, commercial, or mortgage debt.',
    faqs: [
      {
        question: 'What factors determine loan interest rates?',
        answer: 'Credit score, loan tenure, loan-to-value ratio, applicant income stability, and central bank benchmark rates.',
      },
    ],
    relatedSlugs: ['emi', 'salary', 'simple-interest'],
  },
  {
    id: 'salary',
    slug: 'salary',
    title: 'Salary Calculator',
    category: 'finance',
    shortDesc: 'Compute gross to net in-hand salary with Basic, HRA, EPF, and tax deductions.',
    iconName: 'Briefcase',
    isPopular: true,
    hasSmart3of4: false,
    formula: 'Net In-Hand = Gross Salary - (EPF + Professional Tax + TDS)',
    formulaExplanation:
      'Breaks down monthly cost to company (CTC) into Basic Salary, House Rent Allowance (HRA), special allowances, and statutory employee deductions.',
    faqs: [
      {
        question: 'Why is take-home pay lower than CTC?',
        answer:
          'CTC includes employer benefits, gratuity, and employee deductions such as Provident Fund (EPF), Professional Tax, and Income Tax (TDS).',
      },
    ],
    relatedSlugs: ['emi', 'loan', 'gst'],
  },

  // HEALTH
  {
    id: 'bmi',
    slug: 'bmi',
    title: 'BMI Calculator',
    category: 'health',
    shortDesc: 'Body Mass Index calculator for adults with World Health Organization weight categories.',
    iconName: 'Activity',
    isPopular: true,
    hasSmart3of4: false,
    formula: 'BMI = Weight (kg) / [Height (m)]²',
    formulaExplanation:
      'Categorizes adults into Underweight (<18.5), Normal weight (18.5–24.9), Overweight (25–29.9), and Obese (≥30), and provides the target healthy weight range.',
    faqs: [
      {
        question: 'Is BMI accurate for athletes and bodybuilders?',
        answer:
          'BMI measures excess weight rather than excess body fat. Muscular individuals may register as overweight or obese despite low body fat percentages.',
      },
      {
        question: 'What is a healthy BMI range?',
        answer: 'According to WHO standards, a BMI between 18.5 and 24.9 is considered normal/healthy for adults.',
      },
    ],
    relatedSlugs: ['bmr', 'calorie', 'age'],
  },
  {
    id: 'bmr',
    slug: 'bmr',
    title: 'BMR Calculator',
    category: 'health',
    shortDesc: 'Basal Metabolic Rate estimation using the clinical Mifflin-St Jeor formula.',
    iconName: 'Flame',
    isPopular: false,
    hasSmart3of4: false,
    formula: 'Men: 10W + 6.25H - 5A + 5 | Women: 10W + 6.25H - 5A - 161',
    formulaExplanation:
      'Calculates minimum caloric expenditure required to sustain vital organ functions at rest, where W is weight (kg), H is height (cm), and A is age (years).',
    faqs: [
      {
        question: 'What is Basal Metabolic Rate?',
        answer: 'BMR is the amount of energy (in calories) your body burns every day just keeping vital organs working while at complete rest.',
      },
    ],
    relatedSlugs: ['bmi', 'calorie', 'age'],
  },
  {
    id: 'calorie',
    slug: 'calorie',
    title: 'Calorie Calculator',
    category: 'health',
    shortDesc: 'Daily caloric expenditure and targets for fat loss, muscle gain, or maintenance.',
    iconName: 'Apple',
    isPopular: true,
    hasSmart3of4: false,
    formula: 'TDEE = BMR × Activity Multiplier (1.2 to 1.9)',
    formulaExplanation:
      'Determines Total Daily Energy Expenditure (TDEE) and computes tailored daily calorie targets for mild deficit, aggressive fat loss, or lean bulk.',
    faqs: [
      {
        question: 'How many calories should I cut to lose 1 kg of fat?',
        answer: '1 kg of body fat contains roughly 7,700 calories. A daily deficit of 500 calories leads to roughly 0.5 kg of weight loss per week.',
      },
    ],
    relatedSlugs: ['bmr', 'bmi'],
  },
  {
    id: 'age',
    slug: 'age',
    title: 'Age Calculator',
    category: 'health',
    shortDesc: 'Calculate exact age in years, months, and days with next birthday countdown.',
    iconName: 'Cake',
    isPopular: true,
    hasSmart3of4: false,
    formula: 'Calendar Date Differential with leap-year precision',
    formulaExplanation:
      'Calculates chronological age down to exact days, accounting for leap years, varying month lengths, and days remaining until your next milestone birthday.',
    faqs: [
      {
        question: 'Does the calculator account for leap years?',
        answer: 'Yes, our date engine calculates exact leap years (including century leap rules) with full accuracy.',
      },
    ],
    relatedSlugs: ['date-difference', 'age-difference', 'time-duration'],
  },
  {
    id: 'date-difference',
    slug: 'date-difference',
    title: 'Date Difference Calculator',
    category: 'health',
    shortDesc: 'Count total days, weeks, months, and business days between any two dates.',
    iconName: 'Calendar',
    isPopular: false,
    hasSmart3of4: false,
    formula: 'ΔDays = (Date₂ - Date₁) in milliseconds / (86,400,000)',
    formulaExplanation:
      'Provides exact span breakdown, total calendar days, elapsed weeks, and working business days (excluding Saturdays and Sundays).',
    faqs: [
      {
        question: 'How are business days calculated?',
        answer: 'Business days count all Mondays through Fridays between the start and end dates.',
      },
    ],
    relatedSlugs: ['age', 'time-duration', 'age-difference'],
  },
  {
    id: 'pregnancy-due-date',
    slug: 'pregnancy-due-date',
    title: 'Pregnancy Due Date Calculator',
    category: 'health',
    shortDesc: 'Estimate expected delivery date and trimester milestones using Naegele’s rule.',
    iconName: 'HeartPulse',
    isPopular: false,
    hasSmart3of4: false,
    formula: 'Due Date = First day of Last Menstrual Period + 280 days + (Cycle Length - 28)',
    formulaExplanation:
      'Informational gestational tracking estimating estimated delivery date (EDD), trimester progress, and days remaining. This tool is for informational planning only and does not substitute professional medical care.',
    faqs: [
      {
        question: 'How accurate is the Naegele rule?',
        answer:
          'Approximately 5% of babies are born precisely on their estimated due date, but over 80% arrive within two weeks before or after.',
      },
    ],
    relatedSlugs: ['age', 'date-difference'],
  },

  // CONVERTERS
  {
    id: 'length-converter',
    slug: 'length-converter',
    title: 'Length Converter',
    category: 'converters',
    shortDesc: 'Convert meters, kilometers, feet, inches, miles, yards, centimeters, and millimeters.',
    iconName: 'Ruler',
    isPopular: true,
    hasSmart3of4: false,
    formula: 'Standard SI Metric & Imperial unit ratio conversion',
    formulaExplanation:
      'Transforms any length or distance between metric and imperial measurement standards with high precision.',
    faqs: [
      {
        question: 'How many feet are in a meter?',
        answer: '1 meter is approximately equal to 3.28084 feet.',
      },
    ],
    relatedSlugs: ['area-converter', 'speed-converter'],
  },
  {
    id: 'weight-converter',
    slug: 'weight-converter',
    title: 'Weight & Mass Converter',
    category: 'converters',
    shortDesc: 'Convert kilograms, grams, pounds (lbs), ounces, stones, milligrams, and metric tons.',
    iconName: 'Scale',
    isPopular: true,
    hasSmart3of4: false,
    formula: '1 lb = 0.45359237 kg | 1 stone = 14 lbs',
    formulaExplanation:
      'Converts mass units across international metric standards and British/American avoirdupois units.',
    faqs: [
      {
        question: 'How many pounds are in one kilogram?',
        answer: '1 kilogram equals approximately 2.20462 pounds.',
      },
    ],
    relatedSlugs: ['length-converter', 'volume-converter'],
  },
  {
    id: 'temperature-converter',
    slug: 'temperature-converter',
    title: 'Temperature Converter',
    category: 'converters',
    shortDesc: 'Convert between Celsius (°C), Fahrenheit (°F), and Kelvin (K) thermal scales.',
    iconName: 'Thermometer',
    isPopular: true,
    hasSmart3of4: false,
    formula: '°F = (°C × 9/5) + 32 | K = °C + 273.15',
    formulaExplanation:
      'Provides instantaneous bidirectional conversion across major scientific and domestic temperature scales.',
    faqs: [
      {
        question: 'At what point are Celsius and Fahrenheit equal?',
        answer: 'Celsius and Fahrenheit are identical at -40 degrees (-40°C = -40°F).',
      },
    ],
    relatedSlugs: ['volume-converter', 'speed-converter'],
  },
  {
    id: 'area-converter',
    slug: 'area-converter',
    title: 'Area Converter',
    category: 'converters',
    shortDesc: 'Convert square meters, square feet, square yards, acres, hectares, and square kilometers.',
    iconName: 'Grid',
    isPopular: false,
    hasSmart3of4: false,
    formula: '1 Acre = 43,560 sq ft = 4,046.86 sq meters',
    formulaExplanation:
      'Essential for real estate, agricultural plot measurement, architectural floor plans, and survey calculations.',
    faqs: [
      {
        question: 'How many square feet are in 1 acre?',
        answer: '1 acre is equal to exactly 43,560 square feet.',
      },
    ],
    relatedSlugs: ['length-converter', 'volume-converter'],
  },
  {
    id: 'volume-converter',
    slug: 'volume-converter',
    title: 'Volume Converter',
    category: 'converters',
    shortDesc: 'Convert liters, milliliters, US gallons, cubic meters, cups, and fluid ounces.',
    iconName: 'Boxes',
    isPopular: false,
    hasSmart3of4: false,
    formula: '1 US Gallon = 3.78541 Liters | 1 Liter = 1,000 mL',
    formulaExplanation:
      'Converts liquid and dry volumetric measurements across metric, US customary, and culinary units.',
    faqs: [
      {
        question: 'How many cups are in a US gallon?',
        answer: 'There are 16 US cups in 1 US gallon.',
      },
    ],
    relatedSlugs: ['weight-converter', 'area-converter'],
  },
  {
    id: 'time-converter',
    slug: 'time-converter',
    title: 'Time Converter',
    category: 'converters',
    shortDesc: 'Convert seconds, minutes, hours, days, weeks, months, and calendar years.',
    iconName: 'Clock',
    isPopular: false,
    hasSmart3of4: false,
    formula: '1 Hour = 3,600 Seconds | 1 Day = 86,400 Seconds',
    formulaExplanation:
      'Seamlessly translates durations across time intervals from microsecond units up to astronomical years.',
    faqs: [
      {
        question: 'How many hours are in a standard year?',
        answer: 'A normal 365-day year has 8,760 hours (leap year: 8,784 hours).',
      },
    ],
    relatedSlugs: ['time-duration', 'date-difference'],
  },
  {
    id: 'speed-converter',
    slug: 'speed-converter',
    title: 'Speed Converter',
    category: 'converters',
    shortDesc: 'Convert km/h, miles per hour (mph), meters per second (m/s), and nautical knots.',
    iconName: 'Gauge',
    isPopular: false,
    hasSmart3of4: false,
    formula: '1 mph = 1.60934 km/h | 1 knot = 1.852 km/h',
    formulaExplanation:
      'Converts velocity measurements for automotive travel, aviation, maritime navigation, and physics applications.',
    faqs: [
      {
        question: 'What is 1 knot in km/h?',
        answer: '1 knot represents one nautical mile per hour, which equals exactly 1.852 km/h.',
      },
    ],
    relatedSlugs: ['length-converter', 'fuel-cost'],
  },
  {
    id: 'data-storage-converter',
    slug: 'data-storage-converter',
    title: 'Data Storage Converter',
    category: 'converters',
    shortDesc: 'Convert Bytes, KB, MB, GB, TB, and Petabytes (binary 1024 basis).',
    iconName: 'HardDrive',
    isPopular: false,
    hasSmart3of4: false,
    formula: '1 KB = 1,024 Bytes | 1 GB = 1,024 MB',
    formulaExplanation:
      'Translates digital file sizes and bandwidth storage capacities using binary standard multiples.',
    faqs: [
      {
        question: 'Why does a 1TB hard drive show less space on a computer?',
        answer:
          'Manufacturers use decimal units (1,000,000,000,000 bytes = 1TB), while operating systems measure binary gibibytes (1024^4), making it display as ~931 GB.',
      },
    ],
    relatedSlugs: ['time-converter', 'speed-converter'],
  },

  // UTILITY
  {
    id: 'fuel-cost',
    slug: 'fuel-cost',
    title: 'Fuel Cost Calculator',
    category: 'utility',
    shortDesc: 'Estimate journey petrol/diesel expense, fuel required, and per-kilometer travel cost.',
    iconName: 'Fuel',
    isPopular: true,
    hasSmart3of4: false,
    formula: 'Total Cost = (Distance / Mileage) × Fuel Price',
    formulaExplanation:
      'Inputs travel distance, vehicle fuel efficiency (km/l or mpg), and current pump rate to compute total trip expenditure.',
    faqs: [
      {
        question: 'How do I calculate cost per kilometer?',
        answer: 'Divide the total fuel cost of the journey by the distance traveled in kilometers.',
      },
    ],
    relatedSlugs: ['speed-converter', 'salary'],
  },
  {
    id: 'age-difference',
    slug: 'age-difference',
    title: 'Age Difference Calculator',
    category: 'utility',
    shortDesc: 'Compare two birth dates to see exact difference in years, months, and days.',
    iconName: 'Users',
    isPopular: false,
    hasSmart3of4: false,
    formula: 'ΔAge = Date of Birth 2 - Date of Birth 1',
    formulaExplanation:
      'Compares two birthdays to reveal who is older and the exact chronological gap between siblings, partners, or friends.',
    faqs: [
      {
        question: 'Can I check age differences between historical dates?',
        answer: 'Yes, any two valid calendar dates can be compared.',
      },
    ],
    relatedSlugs: ['age', 'date-difference'],
  },
  {
    id: 'time-duration',
    slug: 'time-duration',
    title: 'Time Duration Calculator',
    category: 'utility',
    shortDesc: 'Calculate hours and minutes elapsed between two times, with overnight support.',
    iconName: 'Timer',
    isPopular: false,
    hasSmart3of4: false,
    formula: 'Elapsed Time = End Timestamp - Start Timestamp',
    formulaExplanation:
      'Computes time spans for timesheets, shifts, sports events, flight durations, and overnight work periods.',
    faqs: [
      {
        question: 'Does it support overnight shifts crossing midnight?',
        answer: 'Yes! The calculator intelligently handles shifts starting in the evening and ending the next morning.',
      },
    ],
    relatedSlugs: ['time-converter', 'date-difference'],
  },
  {
    id: 'gst-split',
    slug: 'gst-split',
    title: 'GST Split Calculator',
    category: 'utility',
    shortDesc: 'Decompose tax invoices into CGST (Central), SGST (State), or IGST (Integrated).',
    iconName: 'ReceiptText',
    isPopular: true,
    hasSmart3of4: false,
    formula: 'CGST = Tax / 2 | SGST = Tax / 2 (Intra-State) OR IGST = Tax (Inter-State)',
    formulaExplanation:
      'Splits GST amounts for Indian billing compliance. Intra-state transactions split 50/50 between Central and State GST, while inter-state transactions levy 100% IGST.',
    faqs: [
      {
        question: 'When is IGST charged instead of CGST + SGST?',
        answer:
          'IGST is charged when the supplier and buyer are located in different Indian states or union territories (Inter-State trade).',
      },
    ],
    relatedSlugs: ['gst', 'discount', 'salary'],
  },
];
