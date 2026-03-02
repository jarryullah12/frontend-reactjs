
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

export function App() {
  return (
    <>
      <Helmet>
        <title>My Awesome App</title>
        <meta name="description" content="This is a description of my awesome app." />
      </Helmet>
      <BrowserRouter>
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
        <CookieConsent />
      </BrowserRouter>
    </>
  );
}
