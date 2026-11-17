/* Lumora — catalogue data: categories, glow tones, shipping threshold and products */
const C=["Table lamps","Pendants","Sunset glow","Crystal"],SZ=["Candle","Amber","Moon"],FREE=150;
const D={
"Table lamps":"Hand-woven orb shades on a sculpted stem. Warm LED bulb included, low heat, safe to leave on all evening.",
"Pendants":"A hanging cluster of woven orbs that throws a canopy of leaf shadows across the ceiling and walls.",
"Sunset glow":"A tilting projector that paints a soft sunset halo on any wall. USB powered, with a dimmable glow.",
"Crystal":"Hand-carved Himalayan salt with a warm inner light. Soothing by night, sculptural by day."
};
const GLOW={Candle:"CND",Amber:"AMB",Moon:"MON"};
const P=[
[1,"Maple Ember Lamp","Table lamps",89,"ma","Autumn amber|#E8742A","Bestseller",4.9,"LM-TB-MPL","table lamp rattan orb woven maple leaf autumn vase warm bedside"],
[2,"Garden Vine Lamp","Table lamps",119,"vn","Ivory rose|#E9DFC9","New",4.8,"LM-TB-VIN","table lamp floor rattan orbs roses ivy vine garden wicker vase"],
[3,"Orb Cascade Chandelier","Pendants",189,"cs","Wicker gold|#D9A441","Bestseller",4.9,"LM-PD-CAS","pendant chandelier hanging ceiling rattan orbs ivy leaves six light"],
[4,"Sprout Orb Lamp","Table lamps",64,"sp","Sprout green|#8FB04A","",4.7,"LM-TB-SPR","table lamp leaf sprout rattan orb bedside nursery green desk"],
[5,"Golden Hour Projector","Sunset glow",38,"gh","Golden|#F2B33D","New",4.8,"LM-SG-GLD","sunset projector halo rainbow wall golden hour yellow mood usb"],
[6,"Ember Sun Projector","Sunset glow",42,"em","Ember orange|#F0562B","Bestseller",4.9,"LM-SG-EMB","sunset projector red orange sun wall mood bedroom usb"],
[7,"Crystal Tree Salt Lamp","Crystal",79,"cr","Himalayan rose|#F3A35C","",4.7,"LM-CR-TRE","salt lamp himalayan crystal rock wire tree night light pink"]
].map(a=>({id:a[0],n:a[1],c:a[2],p:a[3],s:a[4],k:a[5].split(",").map(x=>{const y=x.split("|");return{n:y[0],h:y[1],t:y[2]}}),b:a[6],r:a[7],sku:a[8],kw:a[9]}));

/* SKU helpers: product SKU is the base (e.g. LM-TB-MPL); each glow tone is its own variant SKU (LM-TB-MPL-AMB) */
const vsku=(p,z)=>p.sku+"-"+(GLOW[z]||"AMB");
const sizesOf=p=>SZ;
