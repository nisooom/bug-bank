import { ItemCard } from "./item-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export const ItemCardCarousel = ({ items }) => {
  return (
    <div className="flex h-auto w-full items-center justify-center">
      <div className="flex flex-grow items-start justify-start sm:w-3/4 sm:justify-start md:w-full">
        <Carousel className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
          <CarouselContent className="-ml-2 md:-ml-1">
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 pl-2 sm:basis-1/3 md:basis-1/4 md:pl-4 lg:basis-1/5"
              >
                <ItemCard imgSrc={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" /> */}
        </Carousel>
      </div>
    </div>
  );
};
