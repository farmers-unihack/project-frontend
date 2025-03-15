import React, { useEffect, useState } from "react";
import { Collectible, collectibles as allCollectibles } from "./collectibles";

interface CollectibleComponentsProps {
  collectibleList: string[];
}

const CollectibleComponents: React.FC<CollectibleComponentsProps> = ({ collectibleList }) => {
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);

  useEffect(() => {
    const filtered = allCollectibles.filter((item) => collectibleList.includes(item.name));
    setCollectibles(filtered);
  }, [collectibleList]);

  return (
    <div className="absolute inset-0 z-29 pointer-events-none">
      {collectibles.map((collectible, index) => (
        <img
          key={index}
          src={collectible.image}
          alt={collectible.name}
          className="absolute w-[50px] h-[50px]"
          style={{
            top: collectible.position.top,
            left: collectible.position.left,
          }}
        />
      ))}
    </div>
  );
};

export default CollectibleComponents;
