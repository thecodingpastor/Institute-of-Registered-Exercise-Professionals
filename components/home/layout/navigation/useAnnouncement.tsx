import { useRouter } from "next/router";
import { SelectCourse } from "../../../../features/course/courseSlice";
import { AnnouncementType } from "../../../../features/course/types";
import { useAppSelector } from "../../../../fetchConfig/store";

const useAnnouncement = (announcements: AnnouncementType[]) => {
  const { pathname } = useRouter();
  const { currentCourse } = useAppSelector(SelectCourse);

  return announcements.length === 0
    ? null
    : announcements.length === 1
    ? announcements[0]
    : pathname === "/course/[slug]" && currentCourse !== "loading"
    ? announcements.find((ann) => ann?.courseId === currentCourse?._id)
    : announcements.find((ann) => ann?.isGeneral);
};

export default useAnnouncement;
