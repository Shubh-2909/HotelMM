import { Carousel } from "@material-tailwind/react";

export default function Room() {
  return (
    <Carousel className="h-[92vh]" placeholder="">
      <img
        src="https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI="
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://www.newworldhotels.com/wp-content/uploads/2014/05/Mobile-NWHBR-Exterior.jpg"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}
