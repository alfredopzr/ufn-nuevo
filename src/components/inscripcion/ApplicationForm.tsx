"use client";

import { useState } from "react";
import StepPersonalInfo from "./StepPersonalInfo";
import StepDocuments from "./StepDocuments";
import StepReview from "./StepReview";
import StepConfirmation from "./StepConfirmation";
import type { ApplicationFormData } from "@/lib/validations";
import type { RequiredDocument } from "@/types/database";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface DocumentFile {
  documentId: string;
  file: File | null;
}

interface Props {
  requiredDocuments: RequiredDocument[];
}

const steps = [
  { label: "Datos Personales", number: 1 },
  { label: "Documentos", number: 2 },
  { label: "Revisión", number: 3 },
];

export default function ApplicationForm({ requiredDocuments }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationFormData | null>(null);
  const [documentFiles, setDocumentFiles] = useState<DocumentFile[]>(
    requiredDocuments.map((doc) => ({ documentId: doc.id, file: null }))
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handlePersonalInfoComplete(data: ApplicationFormData) {
    setFormData(data);
    setCurrentStep(2);
  }

  function handleDocumentsComplete(files: DocumentFile[]) {
    setDocumentFiles(files);
    setCurrentStep(3);
  }

  function handleSubmitSuccess() {
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return <StepConfirmation />;
  }

  return (
    <div className="space-y-8">
      {/* Step indicator */}
      <nav aria-label="Progreso" className="flex items-center justify-center gap-2">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <button
              type="button"
              onClick={() => {
                // Only allow going back to completed steps
                if (step.number < currentStep) setCurrentStep(step.number);
              }}
              disabled={step.number > currentStep}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                step.number === currentStep &&
                  "bg-primary text-primary-foreground",
                step.number < currentStep &&
                  "bg-primary/10 text-primary cursor-pointer hover:bg-primary/20",
                step.number > currentStep &&
                  "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              {step.number < currentStep ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs">
                  {step.number}
                </span>
              )}
              <span className="hidden sm:inline">{step.label}</span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-px w-8",
                  step.number < currentStep ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </nav>

      {/* Step content */}
      {currentStep === 1 && (
        <StepPersonalInfo
          defaultValues={formData}
          onComplete={handlePersonalInfoComplete}
        />
      )}
      {currentStep === 2 && (
        <StepDocuments
          requiredDocuments={requiredDocuments}
          documentFiles={documentFiles}
          onComplete={handleDocumentsComplete}
          onBack={() => setCurrentStep(1)}
        />
      )}
      {currentStep === 3 && formData && (
        <StepReview
          formData={formData}
          requiredDocuments={requiredDocuments}
          documentFiles={documentFiles}
          onBack={() => setCurrentStep(2)}
          onSuccess={handleSubmitSuccess}
        />
      )}
    </div>
  );
}
