export type ProjectType = {
  _id?: string;
  slug?: string;
  images?: ProjectImagesType[];
  title?: string;
  domainName?: string;
  tags?: string[];
  videoURL?: string;
  frontEndGithubURL?: string;
  backEndGithubURL?: string;
  mainContent?: string;
  url?: string;
  description?: string;
  isPublished?: boolean;
  isDraft?: boolean;
};

type ProjectLoadingOptionsType = string | null;

export type ProjectImagesType = {
  secure_url: string;
  public_id: string;
};

export type InitialProjectStateType = {
  projects: ProjectType[];
  currentProject: ProjectType | null;
  projectLoading: ProjectLoadingOptionsType;
  currentlyUploadedImages: ProjectImagesType[];
  draftProject?: ProjectType | null | undefined;
  lookForDraftProject?: boolean;
};

export type ProjectProps = {
  _id: string;
  slug: string;
  images: ProjectImagesType[];
  domainName: string;
  title: string;
  tags: string[];
  videoURL: string;
  url: string;
  description: string;
  mainContent?: string;
};
