import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const ItemCard = ({ imgSrc, itemName, itemSold }) => {
  return (
    <Card className="cursor-pointer overflow-hidden">
      <CardContent className="relative aspect-square p-0">
        <Image
          src={imgSrc}
          alt={`${itemName}'s image`}
          fill
          className="object-cover"
        />
      </CardContent>
    </Card>
  );
};

export { ItemCard };
