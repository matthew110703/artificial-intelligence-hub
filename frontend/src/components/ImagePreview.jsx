/* eslint-disable react/prop-types */

export default function ImagePreview({ isLoading, imgUrl }) {
  return (
    <div
      className="text-center p-3 m-auto border-4 border-white rounded bg-secondary"
      style={{ width: "700", height: "700" }}
    >
      {isLoading ? (
        <>
          <p className="text-2xl m-10 font-extralight tracking-wide italic">
            Please be patient, <br /> AI is painting your Image...
          </p>
          <img
            src="/media/picture-loading.gif"
            alt="load"
            className="m-auto"
            width={128}
            height={128}
          />
        </>
      ) : imgUrl ? (
        <a href={imgUrl} download="image.png">
          <img
            src={imgUrl}
            alt="Generated-Image"
            className=" aspect-square"
            width={650}
            height={650}
          />
        </a>
      ) : (
        <div className="p-10 space-y-5">
          <p className="text-2xl font-extralight tracking-wide italic ">
            Generate an Image to preview...
          </p>
          <img
            width="128"
            height="128"
            src="https://img.icons8.com/ios/50/picture.png"
            alt="placeholder"
            className="m-auto"
          />
        </div>
      )}
    </div>
  );
}
