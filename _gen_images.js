const products = [
  {id:'pro-001',seed:'savoury-burrito-bowl',name:'Savoury Burrito Bowl'},
  {id:'ind-001',seed:'fresh-sprouted-mung-tamarind',name:'Fresh Sprouted Mung'},
  {id:'sal-001',seed:'quinoa-mango-or-pineapple',name:'Tropical Quinoa'},
  {id:'sal-007',seed:'vibrant-millet-chia',name:'Vibrant Millet Salad'},
  {id:'pro-003',seed:'creamy-paneer-bowl',name:'Creamy Paneer Bowl'},
  {id:'sal-002',seed:'zesty-chickpea-colourful',name:'Zesty Chickpea'},
  {id:'pas-001',seed:'sizzling-pasta-veggies',name:'Sizzling Pasta'},
  {id:'ind-002',seed:'hearty-kala-chana',name:'Hearty Kala Chana'},
  {id:'sal-003',seed:'golden-paneer-corn',name:'Golden Paneer Corn'},
  {id:'sal-008',seed:'protein-chickpea-quinoa',name:'Protein Chickpea Quinoa'},
  {id:'pas-002',seed:'classic-spaghetti-salad',name:'Classic Spaghetti Salad'},
  {id:'pas-003',seed:'silky-rice-noodles-salad',name:'Silky Rice Noodles Salad'},
  {id:'sal-004',seed:'crunchy-thai-peanut-butter',name:'Crunchy Thai Salad'},
  {id:'mex-001',seed:'roasted-mexican-sweet-potato',name:'Roasted Mexican Sweet Potato'},
  {id:'mex-002',seed:'smoky-mexican-chipotle',name:'Smoky Mexican Salad'},
  {id:'sal-005',seed:'wholesome-barley-green-goddess',name:'Wholesome Barley Salad'},
  {id:'pro-004',seed:'velvety-hummus-paneer-bowl',name:'Velvety Hummus Paneer'},
  {id:'pro-005',seed:'double-protein-chickpea-paneer',name:'Double Protein Chickpea'},
  {id:'pro-006',seed:'zesty-mexican-rice-salsa',name:'Zesty Mexican Rice'},
];
for (const p of products) {
  console.log('// ' + p.id + ' - ' + p.name);
  console.log('images: [');
  console.log("  { url: 'https://picsum.photos/seed/" + p.seed + "/600/600', alt: '" + p.name + "' },");
  console.log("  { url: 'https://picsum.photos/600/600', alt: '" + p.name + " - Top View' },");
  console.log("  { url: 'https://picsum.photos/601/600', alt: '" + p.name + " - Ingredients' },");
  console.log("  { url: 'https://picsum.photos/600/601', alt: '" + p.name + " - Packed' },");
  console.log("  { url: 'https://picsum.photos/602/600', alt: '" + p.name + " - Serving' },");
  console.log('],');
}
