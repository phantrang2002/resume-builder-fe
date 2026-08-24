import * as yup from "yup";

export const resumeDetailsSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Please enter a resume name.")
    .max(100, "Resume name is too long — please shorten it."),
  targetJobTitle: yup
    .string()
    .trim()
    .required("Please enter a target job title.")
    .max(120, "Job title is too long — please shorten it."),
  experienceLevel: yup
    .string()
    .oneOf(["intern", "junior", "mid", "senior"])
    .nullable()
    .optional(),
  industry: yup.string().trim().max(80, "Industry is too long — please shorten it.").nullable().optional(),
});

export type ResumeDetailsValues = yup.InferType<typeof resumeDetailsSchema>;
