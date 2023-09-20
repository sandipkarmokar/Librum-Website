import { useNextSanityImage } from "next-sanity-image";
import { createClient } from "next-sanity";
import { buildFileUrl } from "@sanity/asset-utils";
import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const client = createClient({
  projectId: "46vwrypj",
  dataset: "production",
  apiVersion: "2023-08-27",
  useCdn: true,
});

const SanityVideo = ({ asset, videoSize, alignment }) => {
  const [videoUrl, setVideoUrl] = useState();

  useEffect(() => {
    client
      .fetch(
        `*[_id == '${assetId}'] {
      url,
      videoSize
    }`
      )
      .then((data) => {
        setVideoUrl(data[0].url);
      })
      .catch((error) => {
        console.error("Error fetching asset data:", error);
      });
  }, []);

  const assetId = asset?._ref;
  let width;
  let height;

  if (videoSize === "small") {
    width = "300px";
    height = "auto";
  } else if (videoSize === "medium") {
    width = "640px";
    height = "auto";
  } else if (videoSize === "large") {
    width = "940px";
    height = "auto";
  }
  console.log(videoUrl);

  return (
    <ReactPlayer url={videoUrl} controls={true} width={width} height={height} />
  );
};

export default SanityVideo;