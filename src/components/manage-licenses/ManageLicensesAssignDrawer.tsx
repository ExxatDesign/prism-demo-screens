import * as React from "react";
import { createPortal } from "react-dom";
import ClinicalEducationProductLogo from "@/components/manage-licenses/ClinicalEducationProductLogo";
import ExamManagementProductLogo from "@/components/manage-licenses/ExamManagementProductLogo";

const APPROVE_LICENSES = [
  {
    id: "S03043",
    title: "S03043: Approve licenses for class of 2026-2029 - All program",
    available: "200/400",
  },
  {
    id: "S01026",
    title: "S01026: Approve licenses for class of 2026-2029 - PT",
    available: "300/500",
  },
] as const;

const CLINICAL_EDUCATION_LICENSES = [
  {
    id: "S0023-PT",
    title: "S0023: Clinical Education licenses for class of 2026-2029 - PT",
    available: "203/400",
  },
  {
    id: "S0023-ALL",
    title: "S0023: Clinical Education licenses for class of 2026-2029 - All program",
    available: "50/100",
  },
] as const;

const EXAM_MANAGEMENT_LICENSES = [
  {
    id: "S0041-PT",
    title: "S0041: Exam Management licenses for class of 2026-2029 - PT",
    available: "88/200",
  },
  {
    id: "S0041-ALL",
    title: "S0041: Exam Management licenses for class of 2026-2029 - All program",
    available: "120/250",
  },
] as const;

/** Demo tenant — set false to show copy when the school has no Compliance product. */
const DEMO_SCHOOL_HAS_COMPLIANCE = true;

type LicenseOption = {
  id: string;
  title: string;
  available: string;
  description?: string;
};

function clinicalEducationComplianceDescription(schoolHasCompliance: boolean): string {
  if (schoolHasCompliance) {
    return "Includes Compliance — your school has an active Compliance subscription.";
  }
  return "Compliance is not included — your school does not have an active Compliance subscription.";
}

const CLINICAL_EDUCATION_LICENSE_OPTIONS: LicenseOption[] =
  CLINICAL_EDUCATION_LICENSES.map((lic) => ({
    ...lic,
    description: clinicalEducationComplianceDescription(DEMO_SCHOOL_HAS_COMPLIANCE),
  }));

function LicenseOptionCards({
  licenses,
  radioName,
  selectedId,
  onSelect,
}: {
  licenses: readonly LicenseOption[];
  radioName: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="ml-assign-license-block__options">
      {licenses.map((lic) => {
        const selected = selectedId === lic.id;
        return (
          <div
            key={lic.id}
            className={`ml-assign-lic-card${selected ? " ml-assign-lic-card--selected" : ""}`}
          >
            <div className="ml-assign-lic-card__row">
              <label className="ml-assign-lic-card__label">
                <input
                  type="radio"
                  name={radioName}
                  checked={selected}
                  onChange={() => onSelect(lic.id)}
                />
                <span className="ml-assign-lic-card__radio" aria-hidden />
                <span className="ml-assign-lic-card__text">
                  <span className="ml-assign-lic-card__title">{lic.title}</span>
                  {lic.description ? (
                    <span className="ml-assign-lic-card__desc">{lic.description}</span>
                  ) : null}
                </span>
              </label>
              <span className="ml-assign-lic-card__avail">{lic.available} Available</span>
            </div>
            <button type="button" className="ml-assign-link-btn">
              View Details
            </button>
          </div>
        );
      })}
    </div>
  );
}

type Props = {
  open: boolean;
  studentCount: number;
  onClose: () => void;
};

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`ml-assign-toggle${on ? " ml-assign-toggle--on" : ""}`}
      onClick={() => onChange(!on)}
    >
      <span className="ml-assign-toggle__track">
        <span className="ml-assign-toggle__thumb" />
      </span>
    </button>
  );
}

const MANAGE_LICENSES_ASSETS = `${import.meta.env.BASE_URL}assets/manage-licenses`;

function ApproveLogo() {
  return (
    <span className="ml-assign-logo-approve" role="img" aria-label="Approve">
      <img
        className="ml-assign-logo-approve__mark"
        src={`${MANAGE_LICENSES_ASSETS}/approve-logo-mark.svg`}
        alt=""
        width={19}
        height={20}
        draggable={false}
      />
      <img
        className="ml-assign-logo-approve__word"
        src={`${MANAGE_LICENSES_ASSETS}/approve-logo-word.svg`}
        alt=""
        width={60}
        height={15}
        draggable={false}
      />
    </span>
  );
}

const WIZARD_ASSETS = `${MANAGE_LICENSES_ASSETS}/wizard`;

function AssignLicenseWizard({ step }: { step: 1 | 2 }) {
  return (
    <nav className="ml-assign-wizard" aria-label="Assign license steps">
      <div className="ml-assign-wizard__track">
        <div
          className={`ml-assign-wizard__seg ml-assign-wizard__seg--first${
            step === 1 ? " ml-assign-wizard__seg--first-active" : " ml-assign-wizard__seg--first-done"
          }`}
        >
          {step === 1 ? (
            <>
              <img
                className="ml-assign-wizard__bg"
                src={`${WIZARD_ASSETS}/step1-active-bg.svg`}
                alt=""
              />
              <img
                className="ml-assign-wizard__border"
                src={`${WIZARD_ASSETS}/step1-active-border.svg`}
                alt=""
              />
              <span className="ml-assign-wizard__index">1.</span>
            </>
          ) : (
            <>
              <img
                className="ml-assign-wizard__bg"
                src={`${WIZARD_ASSETS}/step1-done-union.svg`}
                alt=""
              />
              <img
                className="ml-assign-wizard__border"
                src={`${WIZARD_ASSETS}/step1-done-border.svg`}
                alt=""
              />
              <img
                className="ml-assign-wizard__check"
                src={`${WIZARD_ASSETS}/step1-done-check.svg`}
                alt=""
              />
            </>
          )}
          <span className="ml-assign-wizard__label">Select License</span>
        </div>

        <div
          className={`ml-assign-wizard__seg ml-assign-wizard__seg--second${
            step === 2 ? " ml-assign-wizard__seg--second-active" : " ml-assign-wizard__seg--second-inactive"
          }`}
        >
          {step === 2 ? (
            <>
              <img
                className="ml-assign-wizard__bg ml-assign-wizard__bg--second"
                src={`${WIZARD_ASSETS}/step2-active-bg.svg`}
                alt=""
              />
              <img
                className="ml-assign-wizard__border ml-assign-wizard__border--second"
                src={`${WIZARD_ASSETS}/step2-active-border.svg`}
                alt=""
              />
            </>
          ) : (
            <>
              <img
                className="ml-assign-wizard__bg ml-assign-wizard__bg--second"
                src={`${WIZARD_ASSETS}/step2-inactive-bg.svg`}
                alt=""
              />
              <img
                className="ml-assign-wizard__border ml-assign-wizard__border--second"
                src={`${WIZARD_ASSETS}/step2-inactive-border.svg`}
                alt=""
              />
            </>
          )}
          <span className="ml-assign-wizard__index">2.</span>
          <span className="ml-assign-wizard__label">Review and confirm</span>
        </div>
      </div>
    </nav>
  );
}

export default function ManageLicensesAssignDrawer({
  open,
  studentCount,
  onClose,
}: Props) {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [approveOn, setApproveOn] = React.useState(false);
  const [prismOn, setPrismOn] = React.useState(false);
  const [examOn, setExamOn] = React.useState(false);
  const [selectedApproveId, setSelectedApproveId] = React.useState<string | null>(
    null,
  );
  const [selectedClinicalEdId, setSelectedClinicalEdId] = React.useState<
    string | null
  >(null);
  const [selectedExamId, setSelectedExamId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;
    setStep(1);
    setApproveOn(false);
    setPrismOn(false);
    setExamOn(false);
    setSelectedApproveId(null);
    setSelectedClinicalEdId(null);
    setSelectedExamId(null);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const selectedApproveLicense = APPROVE_LICENSES.find(
    (l) => l.id === selectedApproveId,
  );
  const selectedClinicalEdLicense = CLINICAL_EDUCATION_LICENSES.find(
    (l) => l.id === selectedClinicalEdId,
  );
  const selectedExamLicense = EXAM_MANAGEMENT_LICENSES.find(
    (l) => l.id === selectedExamId,
  );
  const canProceed =
    (approveOn && selectedApproveId !== null) ||
    (prismOn && selectedClinicalEdId !== null) ||
    (examOn && selectedExamId !== null);

  const reviewLicense =
    approveOn && selectedApproveLicense
      ? selectedApproveLicense
      : examOn && selectedExamLicense
        ? selectedExamLicense
        : selectedClinicalEdLicense;

  const handleApproveToggle = (next: boolean) => {
    setApproveOn(next);
    if (!next) setSelectedApproveId(null);
  };

  const handleClinicalEdToggle = (next: boolean) => {
    setPrismOn(next);
    if (next) {
      setSelectedClinicalEdId(CLINICAL_EDUCATION_LICENSES[0].id);
    } else {
      setSelectedClinicalEdId(null);
    }
  };

  const handleExamToggle = (next: boolean) => {
    setExamOn(next);
    if (next) {
      setSelectedExamId(EXAM_MANAGEMENT_LICENSES[0].id);
    } else {
      setSelectedExamId(null);
    }
  };

  if (!open) return null;

  return createPortal(
    <>
      <div
        className="ml-assign-drawer-backdrop"
        aria-hidden
        onClick={onClose}
      />
      <aside
        className="ml-assign-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ml-assign-drawer-title"
      >
        <header className="ml-assign-drawer__header">
          <button
            type="button"
            className="ml-assign-drawer__close"
            aria-label="Close"
            onClick={onClose}
          >
            <i className="fa-light fa-xmark" aria-hidden />
          </button>
          <h2 id="ml-assign-drawer-title" className="ml-assign-drawer__title">
            Assign License
          </h2>
        </header>

        <div className="ml-assign-drawer__body">
          <AssignLicenseWizard step={step} />

          <div className="ml-assign-step-toolbar">
            <h3 className="ml-assign-step-toolbar__heading">
              {step === 1 ? "Select License" : "Review and confirm"}
            </h3>
            <div className="ml-assign-step-toolbar__actions">
              <button
                type="button"
                className="ml-assign-btn ml-assign-btn--outline"
                onClick={() => {
                  if (step === 2) setStep(1);
                  else onClose();
                }}
              >
                Previous
              </button>
              {step === 1 ? (
                <button
                  type="button"
                  className="ml-assign-btn ml-assign-btn--primary"
                  disabled={!canProceed}
                  onClick={() => setStep(2)}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  className="ml-assign-btn ml-assign-btn--primary"
                  onClick={onClose}
                >
                  Save
                </button>
              )}
            </div>
          </div>

          {step === 1 ? (
            <div className="ml-assign-step-content">
              <div className="ml-assign-summary-card">
                <div className="ml-assign-summary-card__icon">
                  <i className="fa-light fa-graduation-cap" aria-hidden />
                </div>
                <div>
                  <p className="ml-assign-summary-card__title">Selected Students</p>
                  <p className="ml-assign-summary-card__meta">
                    {studentCount} Student{studentCount === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <div className="ml-assign-license-block">
                <div className="ml-assign-license-block__head">
                  <ApproveLogo />
                  <Toggle
                    label="Approve licenses"
                    on={approveOn}
                    onChange={handleApproveToggle}
                  />
                </div>
                {approveOn ? (
                  <LicenseOptionCards
                    licenses={APPROVE_LICENSES}
                    radioName="approve-license"
                    selectedId={selectedApproveId}
                    onSelect={setSelectedApproveId}
                  />
                ) : null}
              </div>

              <div className="ml-assign-license-block">
                <div className="ml-assign-license-block__head">
                  <ClinicalEducationProductLogo />
                  <Toggle
                    label="Clinical Education licenses"
                    on={prismOn}
                    onChange={handleClinicalEdToggle}
                  />
                </div>
                {prismOn ? (
                  <LicenseOptionCards
                    licenses={CLINICAL_EDUCATION_LICENSE_OPTIONS}
                    radioName="clinical-ed-license"
                    selectedId={selectedClinicalEdId}
                    onSelect={setSelectedClinicalEdId}
                  />
                ) : null}
              </div>

              <div className="ml-assign-license-block">
                <div className="ml-assign-license-block__head">
                  <ExamManagementProductLogo />
                  <Toggle
                    label="Exam Management licenses"
                    on={examOn}
                    onChange={handleExamToggle}
                  />
                </div>
                {examOn ? (
                  <LicenseOptionCards
                    licenses={EXAM_MANAGEMENT_LICENSES}
                    radioName="exam-management-license"
                    selectedId={selectedExamId}
                    onSelect={setSelectedExamId}
                  />
                ) : null}
              </div>
            </div>
          ) : (
            <div className="ml-assign-step-content">
              <div className="ml-assign-summary-card">
                <div className="ml-assign-summary-card__icon">
                  <i className="fa-light fa-graduation-cap" aria-hidden />
                </div>
                <div>
                  <p className="ml-assign-summary-card__title">Students</p>
                  <p className="ml-assign-summary-card__meta ml-assign-summary-card__meta--sm">
                    {studentCount} Student{studentCount === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <div className="ml-assign-review-card">
                {approveOn && selectedApproveLicense ? (
                  <ApproveLogo />
                ) : examOn && selectedExamLicense ? (
                  <ExamManagementProductLogo />
                ) : (
                  <ClinicalEducationProductLogo />
                )}
                <p className="ml-assign-review-card__title">
                  {reviewLicense?.title ??
                    "S03043: Approve licenses for class of 2026-2029 - All program"}
                </p>
                <div className="ml-assign-review-grid">
                  <div className="ml-assign-review-grid__cell">
                    <span className="ml-assign-review-grid__label">Pay by</span>
                    <span className="ml-assign-chip">
                      <i className="fa-light fa-school" aria-hidden />
                      School
                      <i className="fa-light fa-circle-info" aria-hidden />
                    </span>
                  </div>
                  <div className="ml-assign-review-grid__cell">
                    <span className="ml-assign-review-grid__label">
                      Validity for Used Licenses
                    </span>
                    <span className="ml-assign-review-grid__value">
                      1 Years
                      <i className="fa-light fa-circle-info" aria-hidden />
                    </span>
                  </div>
                  <div className="ml-assign-review-grid__cell">
                    <span className="ml-assign-review-grid__label">
                      Students Selected
                    </span>
                    <span className="ml-assign-review-grid__value ml-assign-review-grid__value--lg">
                      {studentCount}
                    </span>
                  </div>
                  <div className="ml-assign-review-grid__cell ml-assign-review-grid__cell--last">
                    <span className="ml-assign-review-grid__label">Available</span>
                    <span className="ml-assign-review-grid__value ml-assign-review-grid__value--lg">
                      {studentCount}/400
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>,
    document.body,
  );
}
