import parser from "html-react-parser";

import { useEffect } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";

import axios from "../../../fetchConfig/api/axios";
import { CourseType } from "../../../features/course/types";

import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { AddAlertMessage } from "../../../features/UI/UISlice";
import {
  SelectCourse,
  SetCurrentCourse,
} from "../../../features/course/courseSlice";

import { __time } from "../../../utils/formatDate";

import Transition from "../../../components/general/Transition";
import FormatPrice from "../../../features/course/components/FormatPrice";
import AuthPageLoading from "../../../components/loaders/AuthPageLoading";

import { SelectAuth } from "../../../features/auth/authSlice";

import classes from "./Slug.module.scss";
import Head from "next/head";

const SingleCourse: React.FC<CourseType> = (course) => {
  const dispatch = useAppDispatch();
  const { currentCourse } = useAppSelector(SelectCourse);
  const { accessToken } = useAppSelector(SelectAuth);
  const {
    _id,
    image,
    onlinePrice,
    offlinePrice,
    promoPercentage,
    mainContent,
    title,
    createdBy,
    createdAt,
    slug,
    announcement,
  } = course;

  useEffect(() => {
    if (_id) {
      dispatch(SetCurrentCourse(course));
    } else {
      dispatch(
        AddAlertMessage({
          message: "That course could not be found.",
        })
      );
      Router.replace("/course");
    }
  }, []);

  if (currentCourse === "loading" || !currentCourse) return <AuthPageLoading />;

  return (
    <Transition mode="scale-out" className={classes.Container}>
      <Head>
        <title>{title || "Buy Course"}</title>
      </Head>
      <header>
        <Image
          src={image?.secure_url ? image.secure_url : "/images/question.jpg"}
          alt={title || "Course Image"}
          width={100}
          height={100}
          priority
          sizes="1%"
          blurDataURL="/images/loading.gif"
          placeholder="blur"
        />
        <div className={classes.Content}>
          <div className={classes.Inner}>
            <h1>{title}</h1>
            <article>
              <p>
                You can register for <span>{title}</span>{" "}
                <Link
                  href={"/course/" + slug + "/pay"}
                  className="Pulse"
                  style={{ marginBottom: ".5rem" }}
                >
                  HERE.
                </Link>{" "}
              </p>
              <p>
                {" "}
                If you have any challenge registering, please call{" "}
                <a href="tel:09025868678">09025868678</a>
              </p>
            </article>
            <div className={classes.CourseCard}>
              <FormatPrice
                price={offlinePrice}
                promoPercentage={promoPercentage}
                status="offline"
                showHidden
                expiryDate={announcement?.date}
              />
              <FormatPrice
                price={onlinePrice}
                promoPercentage={promoPercentage}
                status="online"
                showHidden
                expiryDate={announcement?.date}
              />
            </div>
          </div>
        </div>
      </header>
      {accessToken && (
        <div className={classes.Admin}>
          <p>
            <b>Created By:</b> {createdBy}
          </p>
          <p>
            <b>Created At:</b> {__time(createdAt)}
          </p>
        </div>
      )}

      <div className={classes.MainContent}>{parser(mainContent)}</div>
      <div className={classes.RegisterNow}>
        <Link href={"/course/" + slug + "/pay"} className="Pulse">
          REGISTER NOW
        </Link>
      </div>
    </Transition>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    process.env.NODE_ENV === "production"
      ? "https://astonishing-hummingbird-f8eb14.netlify.app/api/course/" +
          context.params?.slug
      : "http://localhost:3000/api/course/" + context.params?.slug
  );
  const data = await res.json();

  // for one strange reason, axios stopped working
  // const { data } = await axios.get("/course/" + context.params?.slug);

  if (!data) {
    return {
      props: { notFound: true },
    };
  }

  return {
    props: data,
  };
};

export default SingleCourse;
