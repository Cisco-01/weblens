"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Spinner from "./Spinner";

const videoConstraints = {
  width: 1280,
  height: 720,
};

const WebcamRecorder = () => {
  const [isLoading, setIsLoading] = useState(true);
  const webcamRef = useRef<any>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<any>(null);

  const [deviceId, setDeviceId] = useState<string>("");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const handleDataAvailable = useCallback(
    ({ data }: any) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    // Retrasa la ejecución de setIsLoading(false) por 500ms
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [mediaRecorderRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      // Lógica para descargar el video
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = url;
      a.download = "recorded-video.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    } else if (imageSrc) {
      // Lógica para descargar la imagen
      const a = document.createElement("a");
      a.href = imageSrc;
      a.download = "captured-image.png";
      document.body.appendChild(a);
      a.style.display = "none";
      a.click();
      document.body.removeChild(a);
    }
  }, [recordedChunks, imageSrc]);

  return (
    <div className="flex flex-col p-5 md:p-0 mx-auto text-xs sm:text-sm md:text-base items-center justify-center">
      <div className="text-white z-30 mb-2">
        <select
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-light p-3 rounded-full text-center ring-1 ring-black ring-inset"
        >
          {devices.map((device, key) => (
            <option key={key} value={device.deviceId}>
              {device.label || `Device ${key + 1}`}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center mx-auto gap-3">
        <button
          className="bg-indigo-500 hover:bg-indigo-700 buttons"
          onClick={async () => {
            const imageSrc = await webcamRef.current.getScreenshot();
            setImageSrc(imageSrc);
            // Retrasa la ejecución de setIsLoading(false) por 500ms
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          }}
        >
          Capture photo
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 buttons"
          onClick={() => {
            setFacingMode(facingMode === "user" ? "environment" : "user");
          }}
        >
          Change Camera
        </button>
        {capturing ? (
          <button
            onClick={handleStopCaptureClick}
            className="bg-red-500 hover:bg-red-700 buttons"
          >
            Stop Capture
          </button>
        ) : (
          <div className="z-20">
            <button
              onClick={handleStartCaptureClick}
              className="bg-emerald-500 hover:bg-emerald-700 buttons"
            >
              Start Capture
            </button>
          </div>
        )}
      </div>
      <Webcam
        ref={webcamRef}
        audio={false}
        height={360}
        screenshotFormat="image/png"
        width={720}
        videoConstraints={{
          ...videoConstraints,
          facingMode,
        }}
        className="rounded-xl z-50 my-4"
      />
      <div className="z-20 items-center mx-auto justify-center bg-black/25 hover:bg-transparent transition-all ease-in-out duration-500 px-2 m-4 rounded-xl">
        {/* SNAPSHOT */}
        {imageSrc && (
          <div className="my-2 text-center">
            <span className="font-bold tracking-widest">SNAPSHOT</span>
            {isLoading ? (
              <Spinner />
            ) : (
              <Image
                src={imageSrc}
                alt="captured"
                className="z-20 rounded-xl"
                width={720}
                height={360}
                priority={false}
              />
            )}

            <div className="mt-2">
              {imageSrc && (
                <div className="flex space-x-2 mx-auto justify-center items-center">
                  <button
                    className="bg-indigo-500 hover:bg-indigo-700 buttons"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 buttons mx-auto justify-center items-center"
                    onClick={() => setImageSrc(null)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {recordedChunks.length > 0 && (
          <div className="my-2 text-center">
            <span className="font-bold tracking-widest">RECORDED VIDEO</span>
            {isLoading ? (
              <Spinner />
            ) : (
              <video
                controls
                style={{ marginTop: 20, width: 720, height: 360 }}
              >
                <source
                  src={URL.createObjectURL(
                    new Blob(recordedChunks, { type: "video/webm" })
                  )}
                  type="video/webm"
                />
              </video>
            )}

            <div className="mt-2">
              {recordedChunks.length > 0 && (
                <div className="flex space-x-2 mx-auto justify-center items-center">
                  <button
                    className="bg-indigo-500 hover:bg-indigo-700 buttons"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 buttons mx-auto justify-center items-center"
                    onClick={() => setRecordedChunks([])}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamRecorder;
