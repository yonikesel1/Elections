"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SliderField from "../../components/SliderField";

const schema = z.object({
  /* coerce strings → numbers so validation doesn't block submit */
  security: z.coerce.number().min(0).max(100),
  socioEconomic: z.coerce.number().min(0).max(100),
  religious: z.coerce.number().min(0).max(100),
});
type FormValues = z.infer<typeof schema>;

export default function QuizPage() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { security: 50, socioEconomic: 50, religious: 50 },
  });

  const onSubmit = (data: FormValues) => {
    const params = new URLSearchParams({
      s: data.security.toString(),
      e: data.socioEconomic.toString(),
      r: data.religious.toString(),
    });
    router.push(`/result?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <h2 className="text-2xl font-semibold text-center">הזז/י את הסליידרים</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SliderField name="security" label="ביטחון" control={control} />
        <SliderField name="socioEconomic" label="חברתי-כלכלי" control={control} />
        <SliderField name="religious" label="דתי" control={control} />

        <button
          type="submit"
          className="w-full rounded-lg bg-brand-600 py-3 text-white hover:opacity-90 transition"
        >
          המשך
        </button>
      </form>
    </div>
  );
}
