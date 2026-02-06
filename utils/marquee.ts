

const LEFT_ARROW =` \u{2190} `;
const RIGHT_ARROW =` \u{27F6} `;

export function MarqueeStripString(data:string[],spliter: "leftArrow" | "rightArrow"):string{
    
    const capitalised = data.map((str)=> str.toUpperCase());
      
    let split = spliter === "leftArrow" ? LEFT_ARROW : RIGHT_ARROW;

    return capitalised.join(split)+split;
}