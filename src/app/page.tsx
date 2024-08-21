import WebcamRecorder from "../components/WebcamRecorder";
import { VisitorStats } from "../components/VisitorStats";
import { BgEffect } from "@/components/BgEffect";

const Page = () => {
  return (
    <>
      <BgEffect>
        <VisitorStats />
        <WebcamRecorder />
      </BgEffect>
    </>
  );
};

export default Page;
