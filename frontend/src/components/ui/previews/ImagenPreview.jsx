const ImagenPreview = () => {
  return (
    <div className="h-[300px] w-full lg:h-[400px]">
      <figure className="*:border-primary relative *:h-[180px] *:w-[180px] *:border *:xl:h-[300px] *:xl:w-[300px]">
        <img
          src="/media/imagen/1.webp"
          alt="Image 1"
          className="shadow-primary absolute right-1/2 z-[1] mx-4 aspect-square rounded-lg shadow-md lg:mx-8"
          loading="lazy"
        />
        <img
          src="/media/imagen/2.webp"
          alt="Image 2"
          className="shadow-primary absolute left-1/2 z-[5] aspect-square -translate-x-1/2 translate-y-32 rounded-lg shadow-md"
          loading="lazy"
        />
        <img
          src="/media/imagen/3.webp"
          alt="Image 3"
          className="shadow-primary z[1] absolute left-1/2 mx-4 aspect-square rounded-lg shadow-md lg:mx-8"
          loading="lazy"
        />
      </figure>
    </div>
  );
};

export default ImagenPreview;
