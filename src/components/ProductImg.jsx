import  { useState } from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css' 

function ProductImg({ images }) {
  const [mainImg, setMainImg] = useState(images[0].url);

  return (
     <div className="flex flex-col md:flex-row gap-5 w-full">
      
      <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            onClick={() => setMainImg(img.url)}
            className="cursor-pointer w-16 h-16 md:w-20 md:h-20 border shadow object-cover rounded-lg"
          />
        ))}
      </div>

      <div className="w-full order-1 md:order-2">
        <Zoom>
          <img
            src={mainImg}
            alt=""
            className="w-full max-h-100 object-contain border rounded-lg shadow-lg"
          />
        </Zoom>
      </div>
    </div>
  );
}

export default ProductImg;
