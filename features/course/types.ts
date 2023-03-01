export type DraftCourseType = {
  title: string;
  onlinePrice: number;
  offlinePrice: number;
  duration: string;
  promoPercentage: number;
  mainContent: string;
  image: CourseImageType;
  announcement: AnnouncementType;
};

export type AnnouncementType = {
  courseId: string;
  text: string;
  link: string;
  date: Date;
  isGeneral: boolean;
};

export type CourseType = DraftCourseType & {
  _id: string;
  slug?: string;
  createdBy?: string;
  createdAt?: string;
  isPublished?: boolean;
  announcement?: object;
};

export type CourseImageType = {
  secure_url?: string;
  public_id?: string;
  url?: string;
  size?: string;
};

export interface InitialCourseStateType {
  courseLoading: null | string;
  hasNext: boolean;
  courseList: CourseType[];
  draftCourse: DraftCourseType;
  currentCourse: "loading" | CourseType | null;
  announcements: AnnouncementType[];
  announcementIsOpen: boolean;
}

export type FormatPricePropType = {
  price: number;
  promoPercentage: number;
  status: "online" | "offline";
  showHidden?: boolean;
  expiryDate?: Date;
};

export type BannerProptype = {
  image: string;
  children: React.ReactNode;
};
