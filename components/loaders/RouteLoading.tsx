import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SetAnnouncementAlert } from "../../features/course/courseSlice";
import { useAppDispatch } from "../../fetchConfig/store";

import classes from "./RouteLoading.module.scss";

const RouteLoading = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const loadingStart = (url: string) => {
      url !== router.asPath && setLoading(true);
    };
    const loadingEnds = (url: string) => {
      url !== router.asPath && setLoading(false);
      // This ensures that after closing, the announcement is reopened
      dispatch(SetAnnouncementAlert(true));
    };

    router.events.on("routeChangeStart", loadingStart);
    router.events.on("routeChangeComplete", loadingEnds);
    router.events.on("routeChangeError", loadingEnds);

    return () => {
      router.events.off("routeChangeStart", loadingStart);
      router.events.off("routeChangeComplete", loadingEnds);
      router.events.off("routeChangeError", loadingEnds);
    };
  }, []);

  return (
    Loading && (
      <div className={classes.Container}>
        <div className={Loading ? classes.Animate : ""}></div>
      </div>
    )
  );
};

export default RouteLoading;
