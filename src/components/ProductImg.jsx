import  { useState } from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css' 

function ProductImg({ images = [] }) {
  const [mainImg, setMainImg] = useState(images?.[0]?.url || "");

  if (!images || images.length === 0) {
    return (
      <div className="w-full flex items-center justify-center p-8 bg-slate-100 rounded-xl">
        <span className="text-slate-400">No images available</span>
      </div>
    );
  }

  return (
     <div className="flex flex-col md:flex-row gap-5 w-full">
      <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto pb-2 md:pb-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            onClick={() => setMainImg(img.url)}
            className={`cursor-pointer w-16 h-16 md:w-20 md:h-20 border rounded-xl object-cover transition-all ${
              mainImg === img.url
                ? "ring-2 ring-blue-600 border-transparent shadow-sm"
                : "border-slate-200 hover:border-blue-400 opacity-80 hover:opacity-100"
            }`}
          />
        ))}
      </div>

      <div className="w-full order-1 md:order-2 flex justify-center bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <Zoom>
          <img
            src={mainImg || images?.[0]?.url}
            alt="product"
            className="w-full max-h-110 object-contain rounded-xl"
          />
        </Zoom>
      </div>
    </div>
  );
}

export default ProductImg;
