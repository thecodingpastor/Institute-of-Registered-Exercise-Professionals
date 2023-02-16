export type DraftCourseType = {
  title: string;
  onlinePrice: number;
  offlinePrice: number;
  duration: string;
  promoPercentage: number;
  mainContent: string;
  imageBase64: CourseImageType;
};

export type CourseType = DraftCourseType & {
  _id: string;
  slug?: string;
  createdBy?: string;
  createdAt?: string;
  isPublished?: boolean;
};
// export type CourseType = DraftCourseType & {
//   _id: string;
//   title: string;
//   slug?: string;
//   promoPercentage?: number;
//   onlinePrice?: number;
//   offlinePrice?: number;
//   image?: CourseImageType;
//   duration: string;
//   createdBy?: string;
//   createdAt?: string;
//   mainContent: string;
//   isPublished?: boolean;
// };

export type CourseImageType = {
  secure_url: string;
  public_id: string;
};

export interface InitialCourseStateType {
  courseLoading: null | string;
  courseList: CourseType[];
  draftCourse: DraftCourseType;
  currentCourse: "loading" | CourseType | null;
  // lookForDraftCourse: boolean;
}

export type FormatPricePropType = {
  price: number;
  promoPercentage: number;
  status: "online" | "offline";
  showHidden?: boolean;
};

export type BannerProptype = {
  image: string;
  children: React.ReactNode;
};
