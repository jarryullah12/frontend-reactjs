
<<<<<<< HEAD
import { Suspense, lazy } from 'react';
=======
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { Disclaimer } from './pages/Disclaimer';
import { CalculatorsList } from './pages/CalculatorsList';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { UploadBlog } from './pages/UploadBlog';
<<<<<<< HEAD
import { CookieConsent } from './components/CookieConsent';

const loading = <div className="text-center py-20 min-h-[50vh]"><h1 className="text-3xl font-bold">Loading...</h1></div>;

// Lazy load calculators
const EMICalculator = lazy(() => import('./pages/calculators/EMICalculator').then(module => ({ default: module.EMICalculator })));
const CompoundInterestCalculator = lazy(() => import('./pages/calculators/CompoundInterestCalculator').then(module => ({ default: module.CompoundInterestCalculator })));
const RetirementCalculator = lazy(() => import('./pages/calculators/RetirementCalculator').then(module => ({ default: module.RetirementCalculator })));
const PersonalLoanCalculator = lazy(() => import('./pages/calculators/PersonalLoanCalculator').then(module => ({ default: module.PersonalLoanCalculator })));
const ROICalculator = lazy(() => import('./pages/calculators/ROICalculator').then(module => ({ default: module.ROICalculator })));
const MortgageCalculator = lazy(() => import('./pages/calculators/MortgageCalculator').then(module => ({ default: module.MortgageCalculator })));
const CarLoanCalculator = lazy(() => import('./pages/calculators/CarLoanCalculator').then(module => ({ default: module.CarLoanCalculator })));
const HomeLoanEligibilityCalculator = lazy(() => import('./pages/calculators/HomeLoanEligibilityCalculator').then(module => ({ default: module.HomeLoanEligibilityCalculator })));
const LoanComparisonCalculator = lazy(() => import('./pages/calculators/LoanComparisonCalculator').then(module => ({ default: module.LoanComparisonCalculator })));
const SavingsCalculator = lazy(() => import('./pages/calculators/SavingsCalculator').then(module => ({ default: module.SavingsCalculator })));
const Calculator401k = lazy(() => import('./pages/calculators/401kCalculator').then(module => ({ default: module.Calculator401k })));
const InvestmentCalculator = lazy(() => import('./pages/calculators/InvestmentCalculator').then(module => ({ default: module.InvestmentCalculator })));
const StockCalculator = lazy(() => import('./pages/calculators/StockCalculator').then(module => ({ default: module.StockCalculator })));
const CreditCardPayoffCalculator = lazy(() => import('./pages/calculators/CreditCardPayoffCalculator').then(module => ({ default: module.CreditCardPayoffCalculator })));
const LeaseCalculator = lazy(() => import('./pages/calculators/LeaseCalculator').then(module => ({ default: module.LeaseCalculator })));
const SalaryCalculator = lazy(() => import('./pages/calculators/SalaryCalculator').then(module => ({ default: module.SalaryCalculator })));
const InflationCalculator = lazy(() => import('./pages/calculators/InflationCalculator').then(module => ({ default: module.InflationCalculator })));
const BudgetCalculator = lazy(() => import('./pages/calculators/BudgetCalculator').then(module => ({ default: module.BudgetCalculator })));
const NetWorthCalculator = lazy(() => import('./pages/calculators/NetWorthCalculator').then(module => ({ default: module.NetWorthCalculator })));
const CurrencyConverter = lazy(() => import('./pages/calculators/CurrencyConverter').then(module => ({ default: module.CurrencyConverter })));
const RentalYieldCalculator = lazy(() => import('./pages/calculators/RentalYieldCalculator').then(module => ({ default: module.RentalYieldCalculator })));
const DividendCalculator = lazy(() => import('./pages/calculators/DividendCalculator').then(module => ({ default: module.DividendCalculator })));
const CryptocurrencyCalculator = lazy(() => import('./pages/calculators/CryptocurrencyCalculator').then(module => ({ default: module.CryptocurrencyCalculator })));
const TipCalculator = lazy(() => import('./pages/calculators/TipCalculator').then(module => ({ default: module.TipCalculator })));
const TimeZoneConverter = lazy(() => import('./pages/calculators/TimeZoneConverter').then(module => ({ default: module.TimeZoneConverter })));
const AgeCalculator = lazy(() => import('./pages/calculators/AgeCalculator').then(module => ({ default: module.AgeCalculator })));
const PercentageCalculator = lazy(() => import('./pages/calculators/PercentageCalculator').then(module => ({ default: module.PercentageCalculator })));
const BMICalculator = lazy(() => import('./pages/calculators/BMICalculator').then(module => ({ default: module.BMICalculator })));
const UnitConverter = lazy(() => import('./pages/calculators/UnitConverter').then(module => ({ default: module.UnitConverter })));
const DateCalculator = lazy(() => import('./pages/calculators/DateCalculator').then(module => ({ default: module.DateCalculator })));
const TimeCalculator = lazy(() => import('./pages/calculators/TimeCalculator').then(module => ({ default: module.TimeCalculator })));
const BMRCalculator = lazy(() => import('./pages/calculators/BMRCalculator').then(module => ({ default: module.BMRCalculator })));
const LoanCalculator = lazy(() => import('./pages/calculators/LoanCalculator').then(module => ({ default: module.LoanCalculator })));
const PaybackPeriodCalculator = lazy(() => import('./pages/calculators/PaybackPeriodCalculator').then(module => ({ default: module.PaybackPeriodCalculator })));
const DebtToIncomeCalculator = lazy(() => import('./pages/calculators/DebtToIncomeCalculator').then(module => ({ default: module.DebtToIncomeCalculator })));
const EmergencyFundCalculator = lazy(() => import('./pages/calculators/EmergencyFundCalculator').then(module => ({ default: module.EmergencyFundCalculator })));
const CollegeSavingsCalculator = lazy(() => import('./pages/calculators/CollegeSavingsCalculator').then(module => ({ default: module.CollegeSavingsCalculator })));
const CapitalGainsTaxCalculator = lazy(() => import('./pages/calculators/CapitalGainsTaxCalculator').then(module => ({ default: module.CapitalGainsTaxCalculator })));
const AmortizationScheduleCalculator = lazy(() => import('./pages/calculators/AmortizationScheduleCalculator').then(module => ({ default: module.AmortizationScheduleCalculator })));
const RequiredMinimumDistributionCalculator = lazy(() => import('./pages/calculators/RequiredMinimumDistributionCalculator').then(module => ({ default: module.RequiredMinimumDistributionCalculator })));
const AnnuityPayoutCalculator = lazy(() => import('./pages/calculators/AnnuityPayoutCalculator').then(module => ({ default: module.AnnuityPayoutCalculator })));
const RuleOf72Calculator = lazy(() => import('./pages/calculators/RuleOf72Calculator').then(module => ({ default: module.RuleOf72Calculator })));
const MutualFundFeeCalculator = lazy(() => import('./pages/calculators/MutualFundFeeCalculator').then(module => ({ default: module.MutualFundFeeCalculator })));
const CostOfLivingCalculator = lazy(() => import('./pages/calculators/CostOfLivingCalculator').then(module => ({ default: module.CostOfLivingCalculator })));
const StudentLoanCalculator = lazy(() => import('./pages/calculators/StudentLoanCalculator').then(module => ({ default: module.StudentLoanCalculator })));
const SalesTaxCalculator = lazy(() => import('./pages/calculators/SalesTaxCalculator').then(module => ({ default: module.SalesTaxCalculator })));
const EarlyRetirementCalculator = lazy(() => import('./pages/calculators/EarlyRetirementCalculator').then(module => ({ default: module.EarlyRetirementCalculator })));
const SocialSecurityCalculator = lazy(() => import('./pages/calculators/SocialSecurityCalculator').then(module => ({ default: module.SocialSecurityCalculator })));
const HELOCCalculator = lazy(() => import('./pages/calculators/HELOCCalculator').then(module => ({ default: module.HELOCCalculator })));
const PensionCalculator = lazy(() => import('./pages/calculators/PensionCalculator').then(module => ({ default: module.PensionCalculator })));
const FinancialIndependenceCalculator = lazy(() => import('./pages/calculators/FinancialIndependenceCalculator').then(module => ({ default: module.FinancialIndependenceCalculator })));
const MillionaireCalculator = lazy(() => import('./pages/calculators/MillionaireCalculator').then(module => ({ default: module.MillionaireCalculator })));
const PresentValueCalculator = lazy(() => import('./pages/calculators/PresentValueCalculator').then(module => ({ default: module.PresentValueCalculator })));

=======
import { EMICalculator } from './pages/calculators/EMICalculator';
import { CompoundInterestCalculator } from './pages/calculators/CompoundInterestCalculator';
import { RetirementCalculator } from './pages/calculators/RetirementCalculator';
import { PersonalLoanCalculator } from './pages/calculators/PersonalLoanCalculator';
import { ROICalculator } from './pages/calculators/ROICalculator';
import { MortgageCalculator } from './pages/calculators/MortgageCalculator';
import { CarLoanCalculator } from './pages/calculators/CarLoanCalculator';
import { HomeLoanEligibilityCalculator } from './pages/calculators/HomeLoanEligibilityCalculator';
import { LoanComparisonCalculator } from './pages/calculators/LoanComparisonCalculator';
import { SavingsCalculator } from './pages/calculators/SavingsCalculator';
import { CookieConsent } from './components/CookieConsent';

>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
export function App() {
  return (
    <>
      <Helmet>
        <title>My Awesome App</title>
        <meta name="description" content="This is a description of my awesome app." />
      </Helmet>
      <BrowserRouter>
<<<<<<< HEAD
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="disclaimer" element={<Disclaimer />} />
              
              <Route path="calculators">
                <Route index element={<CalculatorsList />} />
                <Route path="emi" element={<EMICalculator />} />
                <Route path="personal-loan" element={<PersonalLoanCalculator />} />
                <Route path="mortgage" element={<MortgageCalculator />} />
                <Route path="car-loan" element={<CarLoanCalculator />} />
                <Route path="home-loan-eligibility" element={<HomeLoanEligibilityCalculator />} />
                <Route path="loan-comparison" element={<LoanComparisonCalculator />} />
                <Route path="compound-interest" element={<CompoundInterestCalculator />} />
                <Route path="retirement" element={<RetirementCalculator />} />
                <Route path="roi" element={<ROICalculator />} />
                <Route path="savings-interest" element={<SavingsCalculator />} />
                <Route path="401k-calculator" element={<Calculator401k />} />
                <Route path="investment-calculator" element={<InvestmentCalculator />} />
                <Route path="stock-calculator" element={<StockCalculator />} />
                <Route path="credit-card-payoff-calculator" element={<CreditCardPayoffCalculator />} />
                <Route path="lease-calculator" element={<LeaseCalculator />} />
                <Route path="salary-calculator" element={<SalaryCalculator />} />
                <Route path="inflation-calculator" element={<InflationCalculator />} />
                <Route path="budget-calculator" element={<BudgetCalculator />} />
                <Route path="net-worth-calculator" element={<NetWorthCalculator />} />
                <Route path="currency-converter" element={<CurrencyConverter />} />
                <Route path="rental-yield-calculator" element={<RentalYieldCalculator />} />
                <Route path="dividend-calculator" element={<DividendCalculator />} />
                <Route path="cryptocurrency-calculator" element={<CryptocurrencyCalculator />} />
                <Route path="tip-calculator" element={<TipCalculator />} />
                <Route path="time-zone-converter" element={<TimeZoneConverter />} />
                <Route path="age-calculator" element={<AgeCalculator />} />
                <Route path="percentage-calculator" element={<PercentageCalculator />} />
                <Route path="bmi-calculator" element={<BMICalculator />} />
                <Route path="unit-converter" element={<UnitConverter />} />
                <Route path="date-calculator" element={<DateCalculator />} />
                <Route path="time-calculator" element={<TimeCalculator />} />
                <Route path="bmr-calculator" element={<BMRCalculator />} />
                <Route path="loan-calculator" element={<LoanCalculator />} />
                <Route path="payback-period" element={<PaybackPeriodCalculator />} />
                <Route path="debt-to-income" element={<DebtToIncomeCalculator />} />
                <Route path="emergency-fund" element={<EmergencyFundCalculator />} />
                <Route path="college-savings" element={<CollegeSavingsCalculator />} />
                <Route path="capital-gains-tax" element={<CapitalGainsTaxCalculator />} />
                <Route path="amortization-schedule" element={<AmortizationScheduleCalculator />} />
                <Route path="required-minimum-distribution" element={<RequiredMinimumDistributionCalculator />} />
                <Route path="annuity-payout" element={<AnnuityPayoutCalculator />} />
                <Route path="rule-of-72" element={<RuleOf72Calculator />} />
                <Route path="mutual-fund-fee" element={<MutualFundFeeCalculator />} />
                <Route path="cost-of-living" element={<CostOfLivingCalculator />} />
                <Route path="student-loan" element={<StudentLoanCalculator />} />
                <Route path="sales-tax" element={<SalesTaxCalculator />} />
                <Route path="early-retirement" element={<EarlyRetirementCalculator />} />
                <Route path="social-security" element={<SocialSecurityCalculator />} />
                <Route path="heloc" element={<HELOCCalculator />} />
                <Route path="pension" element={<PensionCalculator />} />
                <Route path="financial-independence" element={<FinancialIndependenceCalculator />} />
                <Route path="millionaire" element={<MillionaireCalculator />} />
                <Route path="present-value" element={<PresentValueCalculator />} />
              </Route>

              <Route path="blog">
                <Route index element={<BlogList />} />
                <Route path=":slug" element={<BlogPost />} />
              </Route>
              <Route path="upload-blog" element={<UploadBlog />} />
              
              <Route path="*" element={<div className="text-center py-20 min-h-[50vh]"><h1 className="text-3xl font-bold">404 - Page Not Found</h1></div>} />
            </Route>
          </Routes>
        </Suspense>
=======
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            
            <Route path="calculators">
              <Route index element={<CalculatorsList />} />
              <Route path="emi" element={<EMICalculator />} />
              <Route path="personal-loan" element={<PersonalLoanCalculator />} />
              <Route path="mortgage" element={<MortgageCalculator />} />
              <Route path="car-loan" element={<CarLoanCalculator />} />
              <Route path="home-loan-eligibility" element={<HomeLoanEligibilityCalculator />} />
              <Route path="loan-comparison" element={<LoanComparisonCalculator />} />
              <Route path="compound-interest" element={<CompoundInterestCalculator />} />
              <Route path="retirement" element={<RetirementCalculator />} />
              <Route path="roi" element={<ROICalculator />} />
              <Route path="savings-interest" element={<SavingsCalculator />} />
            </Route>

            <Route path="blog">
              <Route index element={<BlogList />} />
              <Route path=":slug" element={<BlogPost />} />
            </Route>
            <Route path="upload-blog" element={<UploadBlog />} />
            
            <Route path="*" element={<div className="text-center py-20 min-h-[50vh]"><h1 className="text-3xl font-bold">404 - Page Not Found</h1></div>} />
          </Route>
        </Routes>
>>>>>>> 07dd0a11ae9f46469c2ac6c1ac6bcd9d788fc742
        <CookieConsent />
      </BrowserRouter>
    </>
  );
}
