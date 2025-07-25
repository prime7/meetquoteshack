import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import type { UseFormReturn } from "react-hook-form";
import type { GeneralLoanFormValues } from "@/app/apply/general/types";
import type { MortgageLoanFormValues } from "@/app/apply/mortgage/types";

interface EligibilityStepProps {
  form: UseFormReturn<GeneralLoanFormValues | MortgageLoanFormValues>;
}

export function EligibilityStep({ form }: EligibilityStepProps) {
  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      <FormField
        control={form.control}
        name="isAdult"
        render={({ field }) => (
          <FormItem className="flex flex-col md:flex-row items-center justify-between rounded-lg border p-4 md:p-6 lg:p-8">
            <div className="space-y-0.5 md:space-y-1 lg:space-y-2 w-full md:w-2/3 lg:w-3/4">
              <FormLabel className="text-base md:text-lg lg:text-xl">
                Terms, Age and Privacy Agreement
              </FormLabel>
              <FormDescription>
                By clicking this button, you are accepting the terms and
                conditions, as well as the privacy policy, of MeetQuoteShack
                Inc. This also allows us to obtain your credit information from
                credit reporting agencies (credit bureaus) and confirms that you
                are 19 years of age or older.
              </FormDescription>
              <FormMessage />
            </div>
            <FormControl className="mt-4 md:mt-0 ml-auto">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="hasBankruptcy"
        render={({ field }) => (
          <FormItem className="flex flex-col md:flex-row items-center justify-between rounded-lg border p-4 md:p-6 lg:p-8">
            <div className="space-y-0.5 md:space-y-1 lg:space-y-2 w-full md:w-2/3 lg:w-3/4">
              <FormLabel className="text-base md:text-lg lg:text-xl">
                Bankruptcy Status
              </FormLabel>
              <FormDescription>
                Have you filed for bankruptcy/consumer proposal?
              </FormDescription>
              <FormMessage />
            </div>
            <FormControl className="mt-4 md:mt-0 ml-auto">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
