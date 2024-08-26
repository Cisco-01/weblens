import WebcamRecorder from "../components/WebcamRecorder";
import { VisitorStats } from "../components/VisitorStats";
import { BgEffect } from "@/components/BgEffect";
import ShareButton from "@/components/ShareButton";

const Page = () => {
  return (
    <>
      <BgEffect>
        <VisitorStats />
        <ShareButton />
        <WebcamRecorder />
      </BgEffect>
    </>
  );
};

export default Page;
