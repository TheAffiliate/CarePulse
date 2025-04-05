export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  MedicalAidProvider: "",
  MedicalAidNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Smart ID Card", // Official national ID for South African citizens and permanent residents
  "Green Barcoded ID Book", // Older version of the South African ID (still valid)
  "Passport", // Used for international travel and identification
  "Driver's License", // Government-issued driver's license
  "Birth Certificate", // Used for minors who do not yet have an ID card
  "Temporary Identity Certificate", // Issued while waiting for a permanent Smart ID Card
  "Medical Aid Card/Policy", // Used for medical aid verification
  "Military ID Card", // Issued to South African National Defence Force (SANDF) members
];


export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Ezekiel Mathebula",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name:  "Lesego Mothibi",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Mfundo Kuhlase",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};