"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Header,
  TrustBar,
  ProgressBar,
  BackButton,
  CTAButton,
  FormOption,
  FormInput,
  DateInput,
  SelectInput,
  CheckItem,
  CheckCircle,
  SocialProof,
  PricingOption,
  OrderSummary,
  WarningCard,
  RiskItem,
  TestimonialQuote,
} from "@/components/formations-ui";
import { MotionStagger, MotionFadeIn } from "@/components/motion";
import { ChevronDown, Lock, Shield } from "lucide-react";

// ─── CONSTANTS ──────────────────────────────────────────

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
].map((s) => ({ value: s, label: s }));

const EMPLOYEE_OPTIONS = ["Just me", "2-5 employees", "6-20 employees", "20+ employees"];

const ENTITY_TYPES = ["LLC", "Corporation", "Nonprofit", "Partnership", "Sole Proprietorship"];

// ─── STATE-SPECIFIC DATA ────────────────────────────────

interface StateData {
  name: string;
  penaltyAmount: string;
  raUsagePercent: string;
}

const STATE_DATA: Record<string, StateData> = {
  Alabama: { name: "Alabama", penaltyAmount: "$100", raUsagePercent: "68%" },
  Alaska: { name: "Alaska", penaltyAmount: "$200", raUsagePercent: "65%" },
  Arizona: { name: "Arizona", penaltyAmount: "$100", raUsagePercent: "71%" },
  Arkansas: { name: "Arkansas", penaltyAmount: "$300", raUsagePercent: "66%" },
  California: { name: "California", penaltyAmount: "$250", raUsagePercent: "78%" },
  Colorado: { name: "Colorado", penaltyAmount: "$100", raUsagePercent: "72%" },
  Connecticut: { name: "Connecticut", penaltyAmount: "$250", raUsagePercent: "69%" },
  Delaware: { name: "Delaware", penaltyAmount: "$200", raUsagePercent: "82%" },
  Florida: { name: "Florida", penaltyAmount: "$400", raUsagePercent: "76%" },
  Georgia: { name: "Georgia", penaltyAmount: "$100", raUsagePercent: "70%" },
  Hawaii: { name: "Hawaii", penaltyAmount: "$150", raUsagePercent: "64%" },
  Idaho: { name: "Idaho", penaltyAmount: "$100", raUsagePercent: "67%" },
  Illinois: { name: "Illinois", penaltyAmount: "$300", raUsagePercent: "74%" },
  Indiana: { name: "Indiana", penaltyAmount: "$100", raUsagePercent: "68%" },
  Iowa: { name: "Iowa", penaltyAmount: "$100", raUsagePercent: "65%" },
  Kansas: { name: "Kansas", penaltyAmount: "$200", raUsagePercent: "66%" },
  Kentucky: { name: "Kentucky", penaltyAmount: "$100", raUsagePercent: "67%" },
  Louisiana: { name: "Louisiana", penaltyAmount: "$150", raUsagePercent: "68%" },
  Maine: { name: "Maine", penaltyAmount: "$100", raUsagePercent: "63%" },
  Maryland: { name: "Maryland", penaltyAmount: "$200", raUsagePercent: "71%" },
  Massachusetts: { name: "Massachusetts", penaltyAmount: "$250", raUsagePercent: "73%" },
  Michigan: { name: "Michigan", penaltyAmount: "$200", raUsagePercent: "69%" },
  Minnesota: { name: "Minnesota", penaltyAmount: "$100", raUsagePercent: "70%" },
  Mississippi: { name: "Mississippi", penaltyAmount: "$200", raUsagePercent: "64%" },
  Missouri: { name: "Missouri", penaltyAmount: "$100", raUsagePercent: "68%" },
  Montana: { name: "Montana", penaltyAmount: "$100", raUsagePercent: "65%" },
  Nebraska: { name: "Nebraska", penaltyAmount: "$200", raUsagePercent: "66%" },
  Nevada: { name: "Nevada", penaltyAmount: "$300", raUsagePercent: "79%" },
  "New Hampshire": { name: "New Hampshire", penaltyAmount: "$100", raUsagePercent: "64%" },
  "New Jersey": { name: "New Jersey", penaltyAmount: "$250", raUsagePercent: "72%" },
  "New Mexico": { name: "New Mexico", penaltyAmount: "$100", raUsagePercent: "66%" },
  "New York": { name: "New York", penaltyAmount: "$250", raUsagePercent: "77%" },
  "North Carolina": { name: "North Carolina", penaltyAmount: "$200", raUsagePercent: "70%" },
  "North Dakota": { name: "North Dakota", penaltyAmount: "$100", raUsagePercent: "63%" },
  Ohio: { name: "Ohio", penaltyAmount: "$200", raUsagePercent: "71%" },
  Oklahoma: { name: "Oklahoma", penaltyAmount: "$100", raUsagePercent: "67%" },
  Oregon: { name: "Oregon", penaltyAmount: "$100", raUsagePercent: "69%" },
  Pennsylvania: { name: "Pennsylvania", penaltyAmount: "$200", raUsagePercent: "72%" },
  "Rhode Island": { name: "Rhode Island", penaltyAmount: "$100", raUsagePercent: "64%" },
  "South Carolina": { name: "South Carolina", penaltyAmount: "$100", raUsagePercent: "67%" },
  "South Dakota": { name: "South Dakota", penaltyAmount: "$100", raUsagePercent: "65%" },
  Tennessee: { name: "Tennessee", penaltyAmount: "$200", raUsagePercent: "69%" },
  Texas: { name: "Texas", penaltyAmount: "$300", raUsagePercent: "75%" },
  Utah: { name: "Utah", penaltyAmount: "$100", raUsagePercent: "68%" },
  Vermont: { name: "Vermont", penaltyAmount: "$100", raUsagePercent: "63%" },
  Virginia: { name: "Virginia", penaltyAmount: "$200", raUsagePercent: "72%" },
  Washington: { name: "Washington", penaltyAmount: "$200", raUsagePercent: "73%" },
  "West Virginia": { name: "West Virginia", penaltyAmount: "$100", raUsagePercent: "64%" },
  Wisconsin: { name: "Wisconsin", penaltyAmount: "$200", raUsagePercent: "69%" },
  Wyoming: { name: "Wyoming", penaltyAmount: "$200", raUsagePercent: "76%" },
};

function getStateData(stateName: string): StateData {
  return STATE_DATA[stateName] ?? { name: stateName || "your state", penaltyAmount: "$250", raUsagePercent: "70%" };
}

const PLANS = [
  { years: 3, totalPrice: 299, perYearPrice: 99.67, originalPrice: 597, savePct: "50%", bestValue: true },
  { years: 2, totalPrice: 249, perYearPrice: 124.5, originalPrice: 398, savePct: "37%", bestValue: false },
  { years: 1, totalPrice: 199, perYearPrice: 199, originalPrice: null, savePct: null, bestValue: false },
];

const INCLUDED_FEATURES = [
  "Legal document handling & forwarding",
  "State compliance monitoring & alerts",
  "Business address for public filings",
  "Expert support when you need it",
  "Digital document dashboard",
];

// ─── FORM DATA TYPE ─────────────────────────────────────

interface FormData {
  state: string;
  employees: string;
  startDate: string;
  businessStatus: string;
  planIndex: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  entityName: string;
  entityType: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

const initialFormData: FormData = {
  state: "",
  employees: "",
  startDate: "",
  businessStatus: "",
  planIndex: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  entityName: "",
  entityType: "LLC",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

// ─── STEP TRANSITION VARIANTS ───────────────────────────

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

// ─── MAIN COMPONENT ─────────────────────────────────────

export default function RegisteredAgentFlow() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [direction, setDirection] = useState(1);
  const [analysisPhase, setAnalysisPhase] = useState<"loading" | "complete">("loading");
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const update = (fields: Partial<FormData>) =>
    setFormData((prev) => ({ ...prev, ...fields }));

  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 8));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  // Scroll to top on every step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [step]);

  // Reset analysis state when entering step 3
  useEffect(() => {
    if (step === 3) {
      setAnalysisPhase("loading");
      setAnalysisProgress(0);

      // Animate progress from 0 to 100 over ~3s
      const duration = 3000;
      const interval = 50;
      let elapsed = 0;
      const timer = setInterval(() => {
        elapsed += interval;
        const t = Math.min(elapsed / duration, 1);
        // Ease-out curve for natural feel
        const eased = 1 - Math.pow(1 - t, 3);
        setAnalysisProgress(Math.round(eased * 100));
        if (elapsed >= duration) {
          clearInterval(timer);
          setAnalysisPhase("complete");
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [step]);

  const progressPercent = step === 0 ? 0 : step >= 8 ? 100 : (step / 8) * 100;
  const selectedPlan = PLANS[formData.planIndex];
  const showProgress = step > 0 && step < 8;
  const showBack = step > 0 && step < 8;

  // Centralized step validation
  const isStepValid = (): boolean => {
    switch (step) {
      case 0:
        return !!formData.state;
      case 1:
        return !!formData.employees;
      case 2:
        return !!formData.startDate;
      case 3:
        return analysisPhase === "complete";
      case 4:
        return true;
      case 5:
        return !!(
          formData.firstName.trim() &&
          formData.lastName.trim() &&
          formData.email.trim() &&
          formData.phone.trim()
        );
      case 6:
        return !!(formData.entityName.trim() && formData.entityType);
      case 7:
        return !!(
          formData.cardName.trim() &&
          formData.cardNumber.trim() &&
          formData.cardExpiry.trim() &&
          formData.cardCvc.trim()
        );
      default:
        return true;
    }
  };

  const canProceed = isStepValid();

  const goNextGuarded = () => {
    if (!canProceed) return;
    goNext();
  };

  const mobileCTALabels: Record<number, string> = {
    0: "Get started",
    2: "Continue",
    3: "See your personalized plan",
    4: "Continue",
    5: "Continue",
    6: "Continue",
    7: "Complete my order",
  };
  const showMobileFooter = step in mobileCTALabels;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header - responsive */}
      <div className="hidden tablet:block">
        <Header variant="desktop" securedText="This experience is secured by Formations" />
      </div>
      <div className="block tablet:hidden">
        <Header variant="mobile" />
      </div>

      {/* Progress bar */}
      {step === 3 ? (
        <div className="flex flex-col items-center gap-xs pt-md">
          <AnimatePresence mode="wait">
            {analysisPhase === "loading" ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-xs text-neutral-400"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-neutral-200 border-t-primary-500 rounded-full"
                />
                <span className="text-body-sm font-medium">Analyzing your business…</span>
              </motion.div>
            ) : (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-xs text-secondary-500"
              >
                <CheckCircle className="w-4 h-4" />
                <span className="text-body-sm font-medium">Analysis complete</span>
              </motion.div>
            )}
          </AnimatePresence>
          <ProgressBar
            progress={analysisProgress}
            color={analysisPhase === "complete" ? "secondary" : "primary"}
          />
        </div>
      ) : showProgress ? (
        <ProgressBar progress={progressPercent} />
      ) : null}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Back button */}
        {showBack && (
          <div className="px-xl pt-lg">
            <BackButton onClick={goBack} />
          </div>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className={`flex-1 flex flex-col items-center px-lg tablet:px-xl ${
              showMobileFooter ? "pb-[120px] tablet:pb-0" : ""
            }`}
          >
            {step === 0 && (
              <StepWelcome formData={formData} update={update} onNext={goNextGuarded} disabled={!canProceed} />
            )}
            {step === 1 && (
              <StepEmployees formData={formData} update={update} onNext={goNext} />
            )}
            {step === 2 && (
              <StepBusinessStartDate formData={formData} update={update} onNext={goNext} />
            )}
            {step === 3 && (
              <StepAnalysis formData={formData} onNext={goNextGuarded} analysisPhase={analysisPhase} update={update} />
            )}
            {step === 4 && (
              <StepPricing formData={formData} update={update} onNext={goNextGuarded} />
            )}
            {step === 5 && (
              <StepPersonalInfo formData={formData} update={update} onNext={goNextGuarded} disabled={!canProceed} />
            )}
            {step === 6 && (
              <StepBusinessName formData={formData} update={update} onNext={goNextGuarded} disabled={!canProceed} />
            )}
            {step === 7 && (
              <StepCheckout formData={formData} update={update} onNext={goNextGuarded} disabled={!canProceed} />
            )}
            {step === 8 && <StepConfirmation formData={formData} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Trust bar footer — hidden on mobile when sticky CTA is showing */}
      <div className={showMobileFooter ? "hidden tablet:block" : ""}>
        <TrustBar />
      </div>

      {/* Mobile: Sticky CTA footer */}
      {showMobileFooter && (
        <div
          className="tablet:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 z-50"
          style={{ boxShadow: "0px -2px 28px 0px rgba(0,0,0,0.24)" }}
        >
          <div className="px-lg py-md">
            <CTAButton
              fullWidth
              onClick={goNextGuarded}
              disabled={!canProceed}
            >
              {mobileCTALabels[step]}
            </CTAButton>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── STEP PROPS ─────────────────────────────────────────

interface StepProps {
  formData: FormData;
  update: (fields: Partial<FormData>) => void;
  onNext: () => void;
  disabled?: boolean;
}

interface ReadOnlyStepProps {
  formData: FormData;
  onNext: () => void;
}

// ─── STEP 0: WELCOME ───────────────────────────────────

function StepWelcome({ formData, update, onNext, disabled }: StepProps) {
  return (
    <MotionStagger className="flex flex-col items-center gap-xl max-w-[630px] w-full pt-xl tablet:pt-[60px] pb-xl">
      <MotionFadeIn className="flex flex-col items-center gap-xl w-full">
        <div className="flex flex-col items-center gap-sm text-center">
          <h1 className="text-title-sm font-bold text-text-dark-blue">
            Registered Agent Service
          </h1>
          <p className="text-body-md text-neutral-400 max-w-[480px]">
            Professional registered agent service trusted by 50,000+ businesses.
            Get started in minutes.
          </p>
        </div>

        <div className="flex flex-col items-center gap-sm w-full max-w-[420px]">
          <p className="text-body-sm font-semibold text-neutral-800">
            What state is your business registered in?
          </p>
          <SelectInput
            placeholder="Select your state"
            value={formData.state}
            onChange={(val) => update({ state: val })}
            options={US_STATES}
          />
        </div>

        <SocialProof text="50,000+ businesses trust Formations" />

        <CTAButton
          fullWidth
          onClick={onNext}
          disabled={disabled}
          className="max-w-[420px] hidden tablet:flex"
        >
          Get started
        </CTAButton>
      </MotionFadeIn>
    </MotionStagger>
  );
}

// ─── STEP 1: EMPLOYEE COUNT ─────────────────────────────

function StepEmployees({ formData, update, onNext }: StepProps) {
  const handleSelect = (option: string) => {
    update({ employees: option });
    setTimeout(onNext, 200);
  };

  return (
    <MotionStagger className="flex flex-col items-center gap-xl max-w-[500px] w-full pt-xl pb-xl">
      <MotionFadeIn className="flex flex-col items-center gap-sm text-center">
        <h1 className="text-title-sm font-bold text-text-dark-blue">
          How many employees does your business have?
        </h1>
        <p className="text-body-md text-neutral-400">
          This helps us tailor your registered agent service.
        </p>
      </MotionFadeIn>

      <MotionFadeIn className="flex flex-col gap-md w-full">
        {EMPLOYEE_OPTIONS.map((option) => (
          <FormOption
            key={option}
            label={option}
            selected={formData.employees === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </MotionFadeIn>
    </MotionStagger>
  );
}

// ─── STEP 2: BUSINESS START DATE ────────────────────────

function StepBusinessStartDate({ formData, update, onNext }: StepProps) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const daysInMonth = month && year
    ? new Date(parseInt(year), parseInt(month), 0).getDate()
    : 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    if (month && day && year) {
      const dateStr = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      const startDate = new Date(dateStr);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      const status = startDate >= threeMonthsAgo ? "new" : "existing";
      update({ startDate: dateStr, businessStatus: status });
    } else {
      update({ startDate: "", businessStatus: "" });
    }
  }, [month, day, year]);

  return (
    <MotionStagger className="flex flex-col items-center gap-xl max-w-[500px] w-full pt-xl pb-xl">
      <MotionFadeIn className="flex flex-col items-center gap-sm text-center">
        <h1 className="text-title-sm font-bold text-text-dark-blue">
          When did you start your business?
        </h1>
        <p className="text-body-md text-neutral-400">
          This helps us personalize your experience.
        </p>
      </MotionFadeIn>

      <MotionFadeIn className="flex flex-col gap-lg w-full">
        <div className="grid grid-cols-3 gap-sm">
          <div>
            <label className="block text-body-xs font-semibold text-neutral-400 mb-xs">
              Month
            </label>
            <div className="relative">
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full py-md px-lg rounded-sm border border-outline shadow-input text-body-md appearance-none bg-white focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-200 transition-colors cursor-pointer"
                style={{ color: month ? "var(--color-neutral-800)" : "var(--color-neutral-400)" }}
              >
                <option value="">Month</option>
                {months.map((m, i) => (
                  <option key={m} value={String(i + 1)}>{m}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-lg top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-body-xs font-semibold text-neutral-400 mb-xs">
              Day
            </label>
            <div className="relative">
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full py-md px-lg rounded-sm border border-outline shadow-input text-body-md appearance-none bg-white focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-200 transition-colors cursor-pointer"
                style={{ color: day ? "var(--color-neutral-800)" : "var(--color-neutral-400)" }}
              >
                <option value="">Day</option>
                {days.map((d) => (
                  <option key={d} value={String(d)}>{d}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-lg top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-body-xs font-semibold text-neutral-400 mb-xs">
              Year
            </label>
            <div className="relative">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full py-md px-lg rounded-sm border border-outline shadow-input text-body-md appearance-none bg-white focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-200 transition-colors cursor-pointer"
                style={{ color: year ? "var(--color-neutral-800)" : "var(--color-neutral-400)" }}
              >
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-lg top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <CTAButton
          fullWidth
          onClick={onNext}
          disabled={!formData.startDate}
          className="hidden tablet:flex"
        >
          Continue
        </CTAButton>
      </MotionFadeIn>
    </MotionStagger>
  );
}

// ─── ANALYSIS LOADER ITEMS ──────────────────────────────

const ANALYSIS_STEPS = [
  "Checking state requirements…",
  "Reviewing compliance risks…",
  "Preparing your personalized report…",
];

// ─── STEP 3: ANALYSIS / VALUE PROP ──────────────────────

function StepAnalysis({
  formData,
  onNext,
  analysisPhase,
  update,
}: StepProps & { analysisPhase: "loading" | "complete" }) {
  const stateData = getStateData(formData.state);
  const stateName = stateData.name;
  const isNew = formData.businessStatus === "new";
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    if (analysisPhase === "loading") {
      setVisibleItems(0);
      const stepDelay = 3000 / (ANALYSIS_STEPS.length + 1);
      const timers = ANALYSIS_STEPS.map((_, i) =>
        setTimeout(() => setVisibleItems(i + 1), stepDelay * (i + 1))
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [analysisPhase]);

  // Show interstitial while loading
  if (analysisPhase === "loading") {
    return (
      <div className="flex flex-col items-center justify-center gap-xl max-w-[400px] w-full pt-[80px] pb-xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-md text-center"
        >
          <div className="w-[56px] h-[56px] rounded-full bg-primary-50 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-500" />
          </div>
          <h2 className="text-title-xs font-bold text-text-dark-blue">
            Analyzing your responses…
          </h2>
          <p className="text-body-sm text-neutral-400">
            We&apos;re reviewing {stateName} requirements for your business.
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-md w-full">
          {ANALYSIS_STEPS.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -10 }}
              animate={
                i < visibleItems
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0.3, x: 0 }
              }
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-md"
            >
              {i < visibleItems ? (
                <CheckCircle className="w-5 h-5 shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-neutral-200 shrink-0" />
              )}
              <span
                className={`text-body-sm ${
                  i < visibleItems
                    ? "text-neutral-800 font-medium"
                    : "text-neutral-300"
                }`}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Branch: new business vs existing business
  return isNew ? (
    <NewBusinessContent stateName={stateName} penaltyAmount={stateData.penaltyAmount} onNext={onNext} />
  ) : (
    <ExistingBusinessContent stateName={stateName} raUsagePercent={stateData.raUsagePercent} onNext={onNext} />
  );
}

// ─── NEW BUSINESS CONTENT ───────────────────────────────

function NewBusinessContent({
  stateName,
  penaltyAmount,
  onNext,
}: {
  stateName: string;
  penaltyAmount: string;
  onNext: () => void;
}) {
  return (
    <MotionStagger className="flex flex-col gap-xl max-w-[560px] w-full pt-xl pb-xl">
      <MotionFadeIn>
        <div className="bg-white border border-outline rounded-md p-xl">
          <h2 className="text-title-xs font-bold text-text-dark-blue">
            Protect your new business from day one
          </h2>
          <p className="text-body-sm text-neutral-400 mt-sm">
            Every {stateName} business needs a registered agent. Here&apos;s why it
            matters.
          </p>

          <div className="flex flex-col gap-md mt-lg">
            <div className="flex items-start gap-md p-lg bg-primary-50 rounded-sm">
              <Shield className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-body-sm font-bold text-neutral-800">
                  What is a registered agent?
                </p>
                <p className="text-body-xs text-neutral-500 mt-xs">
                  Your LLC&apos;s official representative, receiving state mail and legal
                  notices on your behalf so you never miss a deadline.
                </p>
              </div>
            </div>

            <WarningCard
              title={`${stateName} state requirement`}
              description={`Without a registered agent, your business risks fines up to ${penaltyAmount} and possible administrative dissolution.`}
            />
          </div>
        </div>
      </MotionFadeIn>

      <MotionFadeIn>
        <h3 className="text-body-md font-bold text-text-dark-blue mb-md">
          What you could miss without one:
        </h3>
        <div className="flex flex-col gap-sm">
          <RiskItem text="Missing critical state deadlines and lawsuit notifications" />
          <RiskItem text="Default judgments against your business before you can respond" />
          <RiskItem text="Heavy fines and possible business suspension by the state" />
        </div>
      </MotionFadeIn>

      <MotionFadeIn>
        <div className="bg-white border border-outline rounded-md p-xl">
          <h3 className="text-body-md font-bold text-text-dark-blue mb-lg">
            Why Formations handles this best:
          </h3>
          <div className="flex flex-col gap-lg">
            <div className="flex gap-md">
              <CheckCircle className="w-5 h-5 mt-0.5" />
              <div>
                <p className="text-body-sm font-bold text-neutral-800">Privacy protection</p>
                <p className="text-body-xs text-neutral-400">
                  Our address on public records, not yours. Legal notices served at our
                  office, not your home.
                </p>
              </div>
            </div>
            <div className="flex gap-md">
              <CheckCircle className="w-5 h-5 mt-0.5" />
              <div>
                <p className="text-body-sm font-bold text-neutral-800">Never miss a notice</p>
                <p className="text-body-xs text-neutral-400">
                  Instant alerts and secure online access to all your official documents.
                </p>
              </div>
            </div>
            <div className="flex gap-md">
              <CheckCircle className="w-5 h-5 mt-0.5" />
              <div>
                <p className="text-body-sm font-bold text-neutral-800">Work from anywhere</p>
                <p className="text-body-xs text-neutral-400">
                  Run your business from anywhere while our agents are available every
                  business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MotionFadeIn>

      <MotionFadeIn>
        <TestimonialQuote
          quote="This is my first time starting any kind of a business so I didn't know where to begin, but the whole process through Formations was simple and made it easy to get me started."
          name="Lauren Flynn"
          company="Girl and Bubbly Design LLC"
        />
      </MotionFadeIn>

      <MotionFadeIn className="hidden tablet:block">
        <CTAButton fullWidth onClick={onNext}>
          See your personalized plan
        </CTAButton>
      </MotionFadeIn>
    </MotionStagger>
  );
}

// ─── EXISTING BUSINESS CONTENT ──────────────────────────

function ExistingBusinessContent({
  stateName,
  raUsagePercent,
  onNext,
}: {
  stateName: string;
  raUsagePercent: string;
  onNext: () => void;
}) {
  const VALUE_PROPS = [
    { title: "Privacy protection", desc: "Our address on public records instead of yours. Legal notices at our office, not your home." },
    { title: "Never miss critical documents", desc: "Our agents are always present during business hours. No missed deadlines, no missed correspondences." },
    { title: "Instant alerts & easy access", desc: "Stay informed with instant notifications and access notices anywhere through your secure document hub." },
    { title: "Multi-state expansion", desc: "Grow beyond your home state with registered agents authorized in each state you plan to operate in." },
  ];

  const STATS = [
    { stat: "90%", label: "say setup was simple and effortless" },
    { stat: "82%", label: "had it done in less than 30 minutes" },
    { stat: "79%", label: "completed their LLC application in one sitting" },
  ];

  return (
    <MotionStagger className="flex flex-col gap-xl max-w-[560px] w-full pt-xl pb-xl">
      {/* Hero card */}
      <MotionFadeIn>
        <div className="bg-primary-50 border border-outline rounded-md p-xl">
          <h2 className="text-title-xs font-bold text-text-dark-blue">
            You&apos;re in expert hands with{" "}
            <span className="text-primary-500">Formations</span>
          </h2>
          <p className="text-body-sm text-neutral-400 mt-sm mb-lg">
            {raUsagePercent} of {stateName} business owners chose us as their
            registered agent. Here&apos;s why.
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-md mb-lg">
            <div className="flex -space-x-2">
              {["bg-primary-500", "bg-primary-700", "bg-secondary-500", "bg-tertiary-400"].map((bg, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-body-xs font-bold`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-body-sm text-neutral-400">
              <span className="font-bold text-neutral-800">50,000+</span> businesses protected
            </span>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-3 gap-md">
            {STATS.map((s, i) => (
              <div key={i} className="text-center bg-white rounded-sm p-md border border-outline">
                <p className="text-title-sm font-bold text-primary-500">{s.stat}</p>
                <p className="text-body-xs text-neutral-400 mt-xs leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionFadeIn>

      {/* Why choose Formations */}
      <MotionFadeIn>
        <div className="bg-white border border-outline rounded-md p-xl">
          <h3 className="text-body-md font-bold text-text-dark-blue mb-lg">
            Why {stateName} business owners choose us:
          </h3>
          <div className="flex flex-col gap-lg">
            {VALUE_PROPS.map((vp, i) => (
              <div key={i} className="flex gap-md">
                <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="text-body-sm font-bold text-neutral-800">{vp.title}</p>
                  <p className="text-body-xs text-neutral-400 mt-xs">{vp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionFadeIn>

      {/* Testimonial */}
      <MotionFadeIn>
        <TestimonialQuote
          quote="Forming my LLC with Formations was super easy and cost effective. They walked me through everything I needed for my business down to credit card options, banking, and lines of credit."
          name="Lauren Flynn"
          company="Girl and Bubbly Design LLC"
        />
      </MotionFadeIn>

      {/* CTA */}
      <MotionFadeIn className="hidden tablet:block">
        <CTAButton fullWidth onClick={onNext}>
          See your personalized plan
        </CTAButton>
      </MotionFadeIn>
    </MotionStagger>
  );
}

// ─── STEP 4: CHOOSE PLAN ────────────────────────────────

function StepPricing({ formData, update, onNext }: StepProps) {
  const stateData = getStateData(formData.state);
  const stateName = stateData.name;
  const raUsagePercent = stateData.raUsagePercent;

  return (
    <MotionStagger className="flex flex-col items-center gap-xl max-w-[560px] w-full pt-xl pb-xl">
      <MotionFadeIn className="flex flex-col items-center gap-sm text-center">
        <h1 className="text-title-sm font-bold text-text-dark-blue">
          Choose Your Plan
        </h1>
        <p className="text-body-md text-neutral-400">
          Select the plan that works best for your business.
        </p>
      </MotionFadeIn>

      {/* Protected banner */}
      <MotionFadeIn className="w-full">
        <div className="flex items-start gap-md p-lg bg-primary-50 border border-primary-100 rounded-sm">
          <Shield className="w-5 h-5 text-secondary-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-body-sm font-bold text-neutral-800">
              Your business is fully protected
            </p>
            <p className="text-body-xs text-neutral-400">
              Legal document handling, compliance monitoring, and a professional
              business address — all covered.
            </p>
          </div>
        </div>
      </MotionFadeIn>

      {/* Pricing cards */}
      <MotionFadeIn className="flex flex-col gap-md w-full">
        {PLANS.map((plan, i) => (
          <PricingOption
            key={plan.years}
            years={plan.years}
            totalPrice={plan.totalPrice}
            perYearPrice={plan.perYearPrice}
            originalPrice={plan.originalPrice}
            savePct={plan.savePct}
            bestValue={plan.bestValue}
            selected={formData.planIndex === i}
            onClick={() => update({ planIndex: i })}
          />
        ))}
      </MotionFadeIn>

      {/* What's included */}
      <MotionFadeIn className="w-full">
        <div className="border border-outline rounded-sm p-xl">
          <p className="text-body-xs font-semibold text-neutral-400 uppercase tracking-wider mb-lg">
            WHAT&apos;S INCLUDED
          </p>
          <div className="flex flex-col gap-md">
            {INCLUDED_FEATURES.map((feature) => (
              <CheckItem key={feature} text={feature} />
            ))}
          </div>
        </div>
      </MotionFadeIn>

      {/* Trust badges */}
      <MotionFadeIn className="flex items-center justify-center gap-lg">
        <div className="flex items-center gap-xs">
          <Shield className="w-4 h-4 text-secondary-500" />
          <span className="text-body-xs text-neutral-400">Money-back guarantee</span>
        </div>
        <div className="flex items-center gap-xs">
          <CheckCircle className="w-4 h-4" />
          <span className="text-body-xs text-neutral-400">Cancel anytime</span>
        </div>
      </MotionFadeIn>

      {/* Social proof stat */}
      <MotionFadeIn className="text-center">
        <p className="text-body-sm text-neutral-500">
          <span className="font-bold text-neutral-800">
            {raUsagePercent} of businesses in {stateName}
          </span>{" "}
          use our Registered Agent service
        </p>
      </MotionFadeIn>

      {/* CTA */}
      <MotionFadeIn className="w-full flex-col items-center gap-md hidden tablet:flex">
        <CTAButton fullWidth onClick={onNext}>
          Continue
        </CTAButton>
        <button className="text-body-sm font-medium text-primary-500 hover:underline">
          Not ready? Save for later
        </button>
      </MotionFadeIn>
    </MotionStagger>
  );
}

// ─── STEP 5: PERSONAL INFO ──────────────────────────────

function StepPersonalInfo({ formData, update, onNext, disabled }: StepProps) {
  return (
    <MotionStagger className="flex flex-col items-center gap-xl max-w-[560px] w-full pt-xl pb-xl">
      <MotionFadeIn className="flex flex-col items-center gap-sm text-center">
        <h1 className="text-title-sm font-bold text-text-dark-blue">
          Tell us about yourself
        </h1>
        <p className="text-body-md text-neutral-400">
          We&apos;ll use this to set up your registered agent service.
        </p>
      </MotionFadeIn>

      <MotionFadeIn className="flex flex-col gap-lg w-full">
        <div className="grid grid-cols-2 gap-lg">
          <FormInput
            label="First name"
            placeholder="Jane"
            value={formData.firstName}
            onChange={(val) => update({ firstName: val })}
          />
          <FormInput
            label="Last name"
            placeholder="Smith"
            value={formData.lastName}
            onChange={(val) => update({ lastName: val })}
          />
        </div>
        <FormInput
          label="Email"
          type="email"
          placeholder="jane@example.com"
          value={formData.email}
          onChange={(val) => update({ email: val })}
        />
        <FormInput
          label="Phone"
          type="tel"
          placeholder="(555) 123-4567"
          value={formData.phone}
          onChange={(val) => update({ phone: val })}
        />
        <CTAButton
          fullWidth
          onClick={onNext}
          disabled={disabled}
          className="hidden tablet:flex"
        >
          Continue
        </CTAButton>
      </MotionFadeIn>
    </MotionStagger>
  );
}

// ─── STEP 6: BUSINESS NAME & TYPE ───────────────────────

function StepBusinessName({ formData, update, onNext, disabled }: StepProps) {
  const entityTypeOptions = ENTITY_TYPES.map((t) => ({ value: t, label: t }));

  return (
    <MotionStagger className="flex flex-col items-center gap-xl max-w-[560px] w-full pt-xl pb-xl">
      <MotionFadeIn className="flex flex-col items-center gap-sm text-center">
        <h1 className="text-title-sm font-bold text-text-dark-blue">
          What is your business name?
        </h1>
        <p className="text-body-md text-neutral-400">
          Enter the legal name and type of your business as registered with the
          state.
        </p>
      </MotionFadeIn>

      <MotionFadeIn className="flex flex-col gap-lg w-full">
        <div className="flex flex-col gap-sm">
          <label className="text-body-sm font-semibold text-neutral-800">
            Entity name &amp; type
          </label>
          <div className="flex flex-col tablet:flex-row gap-sm">
            <input
              type="text"
              placeholder="e.g. Smith Consulting"
              value={formData.entityName}
              onChange={(e) => update({ entityName: e.target.value })}
              className="min-w-0 flex-1 py-md px-lg rounded-sm border border-outline shadow-input text-body-md text-neutral-800 bg-white focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-200 transition-colors"
            />
            <div className="relative w-full tablet:w-auto shrink-0">
              <select
                value={formData.entityType || "LLC"}
                onChange={(e) => update({ entityType: e.target.value })}
                className="w-full py-md pl-lg pr-[40px] rounded-sm border border-outline shadow-input text-body-md text-neutral-800 appearance-none bg-white focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-200 transition-colors cursor-pointer"
              >
                {ENTITY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-lg top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>
        <CTAButton
          fullWidth
          onClick={onNext}
          disabled={disabled}
          className="hidden tablet:flex"
        >
          Continue
        </CTAButton>
      </MotionFadeIn>
    </MotionStagger>
  );
}

// ─── STEP 8: CHECKOUT ───────────────────────────────────

function StepCheckout({ formData, update, onNext, disabled }: StepProps) {
  const plan = PLANS[formData.planIndex];
  const stateName = formData.state || "your state";

  return (
    <MotionStagger className="flex flex-col items-center gap-xl max-w-[560px] w-full pt-xl pb-xl">
      <MotionFadeIn className="flex flex-col items-center gap-sm text-center">
        <h1 className="text-title-sm font-bold text-text-dark-blue">
          Complete your order
        </h1>
      </MotionFadeIn>

      <MotionFadeIn className="w-full">
        <OrderSummary
          stateName={stateName}
          planYears={plan.years}
          perYearPrice={plan.perYearPrice}
          totalPrice={plan.totalPrice}
        />
      </MotionFadeIn>

      <MotionFadeIn className="flex flex-col gap-lg w-full">
        <FormInput
          label="Full name"
          placeholder="Jane Smith"
          value={formData.cardName}
          onChange={(val) => update({ cardName: val })}
        />
        <FormInput
          label="Card number"
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={(val) => update({ cardNumber: val })}
        />
        <div className="grid grid-cols-2 gap-lg">
          <FormInput
            label="Expiry"
            placeholder="MM/YY"
            value={formData.cardExpiry}
            onChange={(val) => update({ cardExpiry: val })}
          />
          <FormInput
            label="CVC"
            placeholder="123"
            value={formData.cardCvc}
            onChange={(val) => update({ cardCvc: val })}
          />
        </div>
      </MotionFadeIn>

      {/* Trust badges */}
      <MotionFadeIn className="flex items-center justify-center gap-lg">
        <div className="flex items-center gap-xs">
          <Lock className="w-4 h-4 text-neutral-400" />
          <span className="text-body-xs text-neutral-400">Secure checkout</span>
        </div>
        <div className="flex items-center gap-xs">
          <Shield className="w-4 h-4 text-secondary-500" />
          <span className="text-body-xs text-neutral-400">Money-back guarantee</span>
        </div>
      </MotionFadeIn>

      <MotionFadeIn className="w-full hidden tablet:block">
        <CTAButton
          fullWidth
          onClick={onNext}
          disabled={disabled}
        >
          Complete my order
        </CTAButton>
      </MotionFadeIn>
    </MotionStagger>
  );
}

// ─── STEP 9: CONFIRMATION ───────────────────────────────

function StepConfirmation({ formData }: { formData: FormData }) {
  const stateName = formData.state || "your state";

  return (
    <MotionStagger className="flex flex-col items-center gap-xl max-w-[500px] w-full pt-[80px] pb-xl">
      <MotionFadeIn className="flex flex-col items-center gap-xl">
        {/* Large green check */}
        <div className="w-[72px] h-[72px] rounded-full bg-secondary-50 flex items-center justify-center">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="flex flex-col items-center gap-md text-center">
          <h1 className="text-title-sm font-bold text-text-dark-blue">
            You&apos;re all set!
          </h1>
          <p className="text-body-md text-neutral-400">
            Your registered agent service for {stateName} is being activated.
            You&apos;ll receive a confirmation email shortly.
          </p>
          <p className="text-body-sm text-neutral-400">
            Welcome to the 50,000+ businesses protected by Formations.
          </p>
        </div>
      </MotionFadeIn>
    </MotionStagger>
  );
}
