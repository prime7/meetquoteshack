"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formSteps } from "./steps";
import { FormHeader } from "@/components/shared/loan-application/form-header";
import { EligibilityStep } from "@/components/shared/loan-application/eligibility-step";
import { PersonalStep } from "@/components/shared/loan-application/personal-step";
import { ResidenceStep } from "@/components/shared/loan-application/residence-step";
import { EmploymentStep } from "@/components/shared/loan-application/employment-step";
import { MortgageLoanStep } from "@/components/shared/loan-application/mortgage-loan-step";
import { mortgageLoanFormSchema, type MortgageLoanFormValues } from "./types";
import Section from "@/components/shared/section";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { GeneralLoanFormValues } from "../general/types";

export default function LoanForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<MortgageLoanFormValues>({
    resolver: zodResolver(mortgageLoanFormSchema),
    defaultValues: {
      isAdult: false,
      hasBankruptcy: false,
      firstName: "",
      lastName: "",
      currentAddress: "",
      yearsAtCurrentAddress: undefined,
      housingStatus: undefined,
      housingPayment: undefined,
      dateOfBirth: undefined,
      maritalStatus: undefined,
      residencyStatus: undefined,
      personalPhone: "",
      personalEmail: "",
      employmentStatus: undefined,
      grossIncome: undefined,
      workplaceName: "",
      workplaceAddress: "",
      workplacePhone: "",
      workplaceEmail: "",
      loanAmount: undefined,
      mortgagePurpose: undefined,
      mortgageType: undefined,
      mortgageHousingType: undefined,
      mortgageDownPayment: undefined,
    },
    mode: "all",
  });

  async function onNext() {
    const fieldsToValidate: Record<number, (keyof MortgageLoanFormValues)[]> = {
      0: ["isAdult", "hasBankruptcy"],
      1: [
        "firstName",
        "lastName",
        "maritalStatus",
        "dateOfBirth",
        "personalPhone",
        "personalEmail",
      ],
      2: [
        "residencyStatus",
        "currentAddress",
        "yearsAtCurrentAddress",
        "housingStatus",
        "housingPayment",
      ],
      3: [
        "employmentStatus",
        "grossIncome",
        "workplaceName",
        "workplaceAddress",
        "workplacePhone",
        "workplaceEmail",
      ],
      4: [
        "loanAmount",
        "mortgagePurpose",
        "mortgageType",
        "mortgageHousingType",
        "mortgageDownPayment",
      ],
    };

    const isValid = await form.trigger(fieldsToValidate[currentStep] ?? []);

    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  }

  function onPrevious() {
    setCurrentStep(currentStep - 1);
  }

  function onSubmit(data: MortgageLoanFormValues) {
    if (currentStep < formSteps.length - 1) {
      onNext();
    } else {
      const payload = {
        ...data,
        yearsAtCurrentAddress: Number(data.yearsAtCurrentAddress),
        grossIncome: Number(data.grossIncome),
        loanAmount: data.loanAmount ? Number(data.loanAmount) : undefined,
      };

      axios
        .post("/api/apply/mortgage", payload)
        .then(() => {
          router.push("/apply/mortgage/success");
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.response?.data?.error || "Something went wrong",
            variant: "destructive",
          });
        });
    }
  }

  return (
    <Section className="py-24">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Mortgage Loan Application
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormHeader currentStep={currentStep} steps={formSteps} />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {currentStep === 0 && <EligibilityStep form={form as UseFormReturn<MortgageLoanFormValues | GeneralLoanFormValues>} />}
              {currentStep === 1 && <PersonalStep form={form as UseFormReturn<MortgageLoanFormValues | GeneralLoanFormValues>} />}
              {currentStep === 2 && <ResidenceStep form={form as UseFormReturn<MortgageLoanFormValues | GeneralLoanFormValues>} />}
              {currentStep === 3 && <EmploymentStep form={form as UseFormReturn<MortgageLoanFormValues | GeneralLoanFormValues>} />}
              {currentStep === 4 && <MortgageLoanStep form={form as UseFormReturn<MortgageLoanFormValues>} />}

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onPrevious}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                {currentStep < formSteps.length - 1 ? (
                  <Button type="button" onClick={onNext}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Section>
  );
}
