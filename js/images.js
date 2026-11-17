/* Lumora — image map
   Keys are referenced by products (P[].s) and by the hero/editorial sections.
   Replace a file in /assets/img and keep its name to swap a picture. */
const IM = {
  ma: "assets/img/product-maple-ember-lamp.jpg",
  vn: "assets/img/product-garden-vine-lamp.jpg",
  cs: "assets/img/product-orb-cascade-chandelier.jpg",
  sp: "assets/img/product-sprout-orb-lamp.jpg",
  gh: "assets/img/product-golden-hour-projector.jpg",
  em: "assets/img/product-ember-sun-projector.jpg",
  cr: "assets/img/product-crystal-tree-salt-lamp.jpg",
  h1: "assets/img/hero-orb-cascade.jpg",
  h2: "assets/img/hero-golden-hour.jpg",
  h3: "assets/img/hero-maple-ember.jpg",
  e1: "assets/img/editorial-crystal-tree.jpg"
};
/* Per-product crop focus so the glowing part stays in frame */
const POS = { ma: "50% 40%", vn: "50% 35%", cs: "50% 45%", sp: "50% 50%", gh: "50% 50%", em: "50% 50%", cr: "50% 45%" };
const art = (s, k) => `<img src="${IM[s]}" alt=""${POS[s] ? ` style="object-position:${POS[s]}"` : ""} loading="lazy">`;
