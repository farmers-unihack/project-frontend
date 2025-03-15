export interface Collectible {
    id: string;
    name: string;
    image: string;
    position: { top: string; left: string };
  }

  import c1 from "./assets/collectibles/collectible_1.png";
  import c2 from "./assets/collectibles/collectible_2.png";
  import c3 from "./assets/collectibles/collectible_3.png";
  import c4 from "./assets/collectibles/collectible_4.png";
  import c5 from "./assets/collectibles/collectible_5.png";
  import c6 from "./assets/collectibles/collectible_6.png";
  
  export const collectibles: Collectible[] = [
    { id: "collectible_1", name: "Item 1", image: c1, position: { top: "47%", left: "43%" } },
    { id: "collectible_2", name: "Item 2", image: c2, position: { top: "44%", left: "47%" } },
    { id: "collectible_3", name: "Item 3", image: c3, position: { top: "35%", left: "53%" } },
    { id: "collectible_4", name: "Item 4", image: c4, position: { top: "65%", left: "46%" } },
    { id: "collectible_5", name: "Item 5", image: c5, position: { top: "57%", left: "54%" } },
    { id: "collectible_6", name: "Item 6", image: c6, position: { top: "53%", left: "58%" } },
  ];
  
