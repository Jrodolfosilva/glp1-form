"use server";

export type FormDataEntry = {
  name: string;
  value: unknown;
};

export async function submitCheckEligibility(
  dados: Record<string, unknown>
): Promise<{ success: boolean }> {
  // Organizar em array name:value
  const organizado: FormDataEntry[] = Object.entries(dados).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  console.log("=== CHECK Eligibility - Server Action ===");
  console.log(JSON.stringify(organizado, null, 2));

  return { success: true };
}
