import { Carousel } from "@material-tailwind/react";

export default function Room() {
  return (
    <Carousel className="h-[92vh]" placeholder="">
      <img
        src="../src/assets/yeppp.jpg"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="../src/assets/yep.jpg"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="../src/assets/yepp.jpg"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}
