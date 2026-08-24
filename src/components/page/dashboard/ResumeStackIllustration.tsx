import miniResumes from "@/assets/images/mini-resumes.png";

export default function ResumeStackIllustration() {
  return (
    <div className="mx-auto w-full max-w-[280px]">
      <img
        src={miniResumes}
        alt="Preview of three overlapping resume templates"
        className="mx-auto h-auto w-full"
      />
    </div>
  );
}
