import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepAuth from '../components/onboarding/StepAuth';
import StepCompanyStatus from '../components/onboarding/StepCompanyStatus';
import StepLinkCompany from '../components/onboarding/StepLinkCompany';
import StepSelectType from '../components/onboarding/StepSelectType';
import StepRegisterMEI from '../components/onboarding/StepRegisterMEI';
import StepRegisterCompany from '../components/onboarding/StepRegisterCompany';
import StepReview from '../components/onboarding/StepReview';

export type OnboardingStep = 
  | 'auth'
  | 'status'
  | 'link'
  | 'select_type'
  | 'register_mei'
  | 'register_company'
  | 'review';

export interface OnboardingData {
  user: any;
  companyStatus: 'has-cnpj' | 'need-to-open' | null;
  companyType: 'MEI' | 'ME' | 'SLU' | 'LTDA' | null;
  companyData: any; // could be linked or registered
}

const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('auth');
  const [data, setData] = useState<OnboardingData>({
    user: null,
    companyStatus: null,
    companyType: null,
    companyData: null,
  });

  const updateData = (partialData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...partialData }));
  };

  const handleFinish = () => {
    // Save to global state or API
    navigate('/dashboard');
  };

  return (
    <div className="w-full min-h-screen bg-neutral-50 flex flex-col">
      {/* Progress Bar (Optional, can be added later) */}
      <div className="flex-1 overflow-y-auto">
        {currentStep === 'auth' && (
          <StepAuth 
            onNext={(userData) => {
              updateData({ user: userData });
              setCurrentStep('status');
            }} 
          />
        )}

        {currentStep === 'status' && (
          <StepCompanyStatus 
            onNext={(status) => {
              updateData({ companyStatus: status });
              if (status === 'has-cnpj') {
                setCurrentStep('link');
              } else {
                setCurrentStep('select_type');
              }
            }}
            onBack={() => setCurrentStep('auth')}
          />
        )}

        {currentStep === 'link' && (
          <StepLinkCompany 
            onNext={(companyData) => {
              updateData({ companyData });
              setCurrentStep('review');
            }}
            onBack={() => setCurrentStep('status')}
          />
        )}

        {currentStep === 'select_type' && (
          <StepSelectType 
            onNext={(type) => {
              updateData({ companyType: type });
              if (type === 'MEI') {
                setCurrentStep('register_mei');
              } else {
                setCurrentStep('register_company');
              }
            }}
            onBack={() => setCurrentStep('status')}
          />
        )}

        {currentStep === 'register_mei' && (
          <StepRegisterMEI 
            onNext={(companyData) => {
              updateData({ companyData });
              setCurrentStep('review');
            }}
            onBack={() => setCurrentStep('select_type')}
          />
        )}

        {currentStep === 'register_company' && (
          <StepRegisterCompany 
            type={data.companyType as 'ME' | 'SLU' | 'LTDA'}
            onNext={(companyData) => {
              updateData({ companyData });
              setCurrentStep('review');
            }}
            onBack={() => setCurrentStep('select_type')}
          />
        )}

        {currentStep === 'review' && (
          <StepReview 
            data={data}
            onNext={handleFinish}
            onBack={() => {
              if (data.companyStatus === 'has-cnpj') setCurrentStep('link');
              else if (data.companyType === 'MEI') setCurrentStep('register_mei');
              else setCurrentStep('register_company');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;
