const EmailPattern =
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";

const PhoneNumberPattern = "^([0|+[0-9]{1,5})?([7-9][0-9]{9})$";

export const TestNumber = /^[0-9]+$/;

export const CourseFormInputsArray = [
  {
    name: "title",
    label: "Course Title",
    placeholder: "Course Title",
    required: true,
    focused: false,
    pattern: "^.{5,100}$",
    errorText: "Course title should be 5 - 100 characters.",
  },
  {
    name: "onlinePrice",
    label: "Online Price",
    placeholder: "Online Price",
    type: "number",
    required: true,
    focused: false,
    pattern: "^d+$",
    // pattern: "[0-9]$",
    errorText: "Numbers only. Not less than 0",
  },
  {
    name: "offlinePrice",
    label: "Offline Price",
    placeholder: "Offline Price",
    type: "number",
    required: true,
    focused: false,
    pattern: "^d+$",
    // pattern: "[0-9]$",
    errorText: "Numbers only. Not less than 0",
  },
  {
    name: "promoPercentage",
    label: "Promo Percentage",
    placeholder: "Promo Percentage",
    pattern: "^d+$",
    type: "number",
    required: true,
    focused: false,
    errorText: "Must be between 0 - 100",
  },
  {
    name: "duration",
    label: "Duration (eg. 4 weeks)",
    placeholder: "Duration (eg. 4 weeks)",
    required: true,
    pattern: "^.{4,30}$",
    errorText: "Invalid Duration",
  },
];

export const PaymentFormInputsArray = [
  {
    name: "fullName",
    label: "Full Name",
    placeholder: "Full Name",
    required: true,
    focused: false,
    pattern: "^[A-Za-z-\\s]{5,100}$",
    errorText: "Full Name should be 5 - 100 letters.",
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Email Address",
    required: true,
    focused: false,
    pattern: EmailPattern,
    errorText: "Email Address is invalid",
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "Phone Number",
    required: true,
    focused: false,
    pattern: PhoneNumberPattern,
    errorText: "Phone Number is invalid",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Address",
    required: true,
    focused: false,
    pattern: "^.{5,100}$",
    errorText: "Address should be 5 - 100 characters.",
  },
  {
    name: "state",
    label: "State",
    placeholder: "State",
    required: true,
    focused: false,
    pattern: "[a-zA-Z-\\s]{2,50}$",
    errorText: "State should be 2 - 50 letters.",
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Country",
    required: true,
    focused: false,
    pattern: "[a-zA-Z-\\s]{2,50}$",
    errorText: "Country should be 2 - 50 letters.",
  },
];

export const AnnouncementFormInputArray = [
  {
    name: "text",
    label: "Announcement",
    placeholder: "Announcement",
    required: true,
    focused: false,
    pattern: "^.{20,200}$",
    errorText: "Announcement should be 20 - 200 letters.",
  },
  {
    name: "link",
    label: "Link",
    placeholder: "Link",
    required: true,
    focused: false,
    pattern: "^.{5,200}$",
    errorText: "Link must be 5-200 characters",
  },
  {
    name: "date",
    label: "Expiry Date",
    placeholder: "Expiry Date",
    required: true,
    type: "date",
    focused: false,
    errorText: "Invalid date",
  },
  {
    name: "isGeneral",
    placeholder: "Is Announcement General?",
    required: true,
    type: "select",
    errorText: "Invalid entry",
    options: [
      { caption: "Yes", value: true },
      { caption: "No", value: false },
    ],
    defaultValue: "Is Announcement General?",
  },
];
