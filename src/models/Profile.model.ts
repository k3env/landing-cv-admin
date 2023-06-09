export interface Profile {
  name: string;
  profilePhoto: string;
  about_photo: string;
  about_header: string;
  about_summary: string;
  degree: "Intern" | "Junior" | "Middle" | "Senior" | "Lead";
  birth: string;
  experience: string;
  phone: string;
  email: string;
  address: string;
  isFreelance: boolean;
  lookForJob: "active" | "passive" | "not-interested";
}
