import img1 from "../assets/images/products/img1.png";
import img2 from "../assets/images/products/img2.png";
import img3 from "../assets/images/products/img3.png";
import img4 from "../assets/images/products/img4.png";
import img5 from "../assets/images/products/img5.png";
import img6 from "../assets/images/products/img6.png";
import img7 from "../assets/images/products/img7.png";
import img8 from "../assets/images/products/img8.png";
export const categories = [
  {
    name: "Chairs",
    img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhaXJzfGVufDB8fDB8fHww",
    path: "/shop",
  },
  {
    name: "Sofas",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
    path: "/shop",
  },
  {
    name: "Tables",
    img: "https://images.unsplash.com/photo-1535799695145-f3849086ee3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGFibGVzfGVufDB8fDB8fHww",
    path: "/shop",
  },
  {
    name: "Beds",
    img: "https://images.unsplash.com/photo-1521783988139-89397d761dce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJlZHN8ZW58MHx8MHx8fDA%3D",
    path: "/shop",
  },
];
export const All_Products = [
  {
    id: 1,
    image: img1,
    title: "Syltherine",
    shortDesc: "Stylish cafe chair",
    description:
      "Syltherine is a stylish cafe chair crafted with premium materials. It offers comfort, durability, and a modern look suitable for cafes and homes.",

    additionalInfo: {
      material: "Wood & Fabric",
      color: "Brown",
      weight: "7 kg",
      dimensions: "45 × 50 × 85 cm",
    },

    reviews: [
      {
        user: "Ali",
        rating: 5,
        comment: "Very comfortable and premium quality.",
      },
      {
        user: "Sara",
        rating: 4,
        comment: "Good product but delivery was slow.",
      },
    ],

    rating: 4.5,
    price: 20,
    originalPrice: 50,
  },

  {
    id: 2,
    image: img2,
    title: "Leviosa",
    shortDesc: "Minimalist modern chair",
    description:
      "Leviosa features a minimalist design with a modern touch, ideal for workspaces and contemporary interiors.",

    additionalInfo: {
      material: "Metal & Foam",
      color: "Black",
      weight: "6 kg",
      dimensions: "40 × 45 × 80 cm",
    },

    reviews: [
      {
        user: "Hamza",
        rating: 5,
        comment: "Perfect chair for my office.",
      },
    ],

    rating: 5,
    price: 25,
    originalPrice: 60,
  },

  {
    id: 3,
    image: img3,
    title: "Lolito",
    shortDesc: "Luxury leather sofa",
    description:
      "Lolito is a luxury leather sofa designed for maximum comfort and elegance. Ideal for premium living rooms.",

    additionalInfo: {
      material: "Genuine Leather",
      color: "Dark Brown",
      weight: "35 kg",
      dimensions: "200 × 90 × 85 cm",
    },

    reviews: [
      {
        user: "Usman",
        rating: 5,
        comment: "Absolutely luxurious and comfortable.",
      },
    ],

    rating: 5,
    price: 180,
    originalPrice: 250,
  },

  {
    id: 4,
    image: img4,
    title: "Respira",
    shortDesc: "Outdoor bar table",
    description:
      "Respira is an outdoor bar table built with weather-resistant materials, perfect for gardens and patios.",

    additionalInfo: {
      material: "Metal & Wood",
      color: "Natural",
      weight: "10 kg",
      dimensions: "60 × 60 × 105 cm",
    },

    reviews: [
      {
        user: "Ahmed",
        rating: 4,
        comment: "Strong and stylish for outdoor use.",
      },
    ],

    rating: 4,
    price: 35,
    originalPrice: 80,
  },

  {
    id: 5,
    image: img5,
    title: "Grifo",
    shortDesc: "Classic wooden shelf",
    description:
      "Grifo is a classic wooden shelf offering both storage and style. Suitable for living rooms and offices.",

    additionalInfo: {
      material: "Solid Wood",
      color: "Oak",
      weight: "12 kg",
      dimensions: "80 × 30 × 150 cm",
    },

    reviews: [
      {
        user: "Ayesha",
        rating: 5,
        comment: "Looks amazing and holds a lot of weight.",
      },
    ],

    rating: 5,
    price: 40,
    originalPrice: 90,
  },

  {
    id: 6,
    image: img6,
    title: "Muggo",
    shortDesc: "Small ceramic mug",
    description:
      "Muggo is a small ceramic mug perfect for coffee and tea lovers with a simple and elegant design.",

    additionalInfo: {
      material: "Ceramic",
      color: "White",
      weight: "0.3 kg",
      capacity: "250 ml",
    },

    reviews: [
      {
        user: "Zain",
        rating: 4,
        comment: "Nice mug but slightly small.",
      },
    ],

    rating: 4,
    price: 5,
    originalPrice: 12,
  },

  {
    id: 7,
    image: img7,
    title: "Pingky",
    shortDesc: "Pink high-back sofa",
    description:
      "Pingky is a stylish high-back sofa designed for comfort and aesthetics, adding elegance to any room.",

    additionalInfo: {
      material: "Fabric",
      color: "Pink",
      weight: "30 kg",
      dimensions: "190 × 85 × 95 cm",
    },

    reviews: [
      {
        user: "Noor",
        rating: 5,
        comment: "Super comfy and looks beautiful.",
      },
    ],

    rating: 5,
    price: 150,
    originalPrice: 300,
  },

  {
    id: 8,
    image: img8,
    title: "Potty",
    shortDesc: "Plant pot decor",
    description:
      "Potty is a decorative plant pot perfect for indoor and outdoor plants, enhancing your home decor.",

    additionalInfo: {
      material: "Clay",
      color: "Beige",
      weight: "2 kg",
      dimensions: "25 × 25 × 30 cm",
    },

    reviews: [
      {
        user: "Fatima",
        rating: 4,
        comment: "Simple and elegant plant pot.",
      },
    ],

    rating: 4,
    price: 10,
    originalPrice: 25,
  },
  // chairs
  {
    id: 11,
    category: "chairs",
    title: "Nordic Comfort Chair",
    shortDesc: "Modern wooden chair with soft cushion",
    description:
      "A minimalist Nordic-style chair designed for comfort and durability. Perfect for dining rooms, cafes, or workspaces.",
    price: 120,
    originalPrice: 180,
    rating: 4.6,
    reviewsCount: 124,
    stock: 18,
    material: "Solid Oak Wood",
    color: "Natural Wood",
    dimensions: "45 x 50 x 85 cm",
    image:
      "https://plus.unsplash.com/premium_photo-1705169612592-32610774a5d0?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 12,
    category: "chairs",
    title: "Elegant Lounge Chair",
    shortDesc: "Premium lounge chair for living rooms",
    description:
      "An elegant lounge chair with ergonomic seating and premium finish. Ideal for relaxing spaces and modern interiors.",
    price: 210,
    originalPrice: 280,
    rating: 4.8,
    reviewsCount: 89,
    stock: 10,
    material: "Walnut Wood & Fabric",
    color: "Warm Brown",
    dimensions: "60 x 65 x 90 cm",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 13,
    category: "chairs",
    title: "Minimal Dining Chair",
    shortDesc: "Simple & clean dining chair",
    description:
      "A lightweight dining chair with a clean silhouette. Designed to fit seamlessly into modern dining spaces.",
    price: 95,
    originalPrice: 140,
    rating: 4.3,
    reviewsCount: 64,
    stock: 25,
    material: "Beech Wood",
    color: "Matte Black",
    dimensions: "43 x 48 x 82 cm",
    image:
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 14,
    category: "chairs",
    title: "Premium Arm Chair",
    shortDesc: "Comfortable arm chair with cushion",
    description:
      "A premium arm chair offering superior comfort with padded armrests and high-quality upholstery.",
    price: 260,
    originalPrice: 340,
    rating: 4.9,
    reviewsCount: 152,
    stock: 7,
    material: "Leather & Metal Frame",
    color: "Dark Grey",
    dimensions: "65 x 70 x 95 cm",
    image:
      "https://plus.unsplash.com/premium_photo-1705169612261-2cf0407141c3?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 15,
    category: "chairs",
    title: "Scandinavian Accent Chair",
    shortDesc: "Stylish accent chair for modern homes",
    description:
      "A Scandinavian-inspired accent chair that blends style and comfort for living rooms and bedrooms.",
    price: 175,
    originalPrice: 230,
    rating: 4.5,
    reviewsCount: 97,
    stock: 14,
    material: "Plywood & Fabric",
    color: "Light Beige",
    dimensions: "55 x 60 x 88 cm",
    image:
      "https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 16,
    category: "chairs",
    title: "Classic Wooden Chair",
    shortDesc: "Traditional wooden seating",
    description:
      "A timeless wooden chair built with strong joints and classic craftsmanship for long-lasting use.",
    price: 80,
    originalPrice: 120,
    rating: 4.2,
    reviewsCount: 41,
    stock: 30,
    material: "Teak Wood",
    color: "Natural Brown",
    dimensions: "44 x 46 x 80 cm",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 17,
    category: "chairs",
    title: "Modern Office Chair",
    shortDesc: "Stylish chair for home offices",
    description:
      "A modern office chair designed for productivity with ergonomic support and contemporary design.",
    price: 190,
    originalPrice: 260,
    rating: 4.7,
    reviewsCount: 133,
    stock: 12,
    material: "Metal & Mesh",
    color: "Charcoal Black",
    dimensions: "58 x 60 x 92 cm",
    image:
      "https://images.unsplash.com/photo-1549497538-303791108f95?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 18,
    category: "chairs",
    title: "Cozy Reading Chair",
    shortDesc: "Soft chair for reading corners",
    description:
      "A cozy and relaxing chair designed for reading nooks and quiet corners of your home.",
    price: 225,
    originalPrice: 300,
    rating: 4.8,
    reviewsCount: 76,
    stock: 9,
    material: "Fabric & Solid Wood",
    color: "Soft Grey",
    dimensions: "62 x 68 x 94 cm",
    image:
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 19,
    category: "chairs",
    title: "Designer Lounge Chair",
    shortDesc: "Luxury designer seating",
    description:
      "A statement lounge chair with a premium design, perfect for luxury interiors and statement spaces.",
    price: 320,
    originalPrice: 420,
    rating: 4.9,
    reviewsCount: 58,
    stock: 5,
    material: "Leather & Steel",
    color: "Tan Brown",
    dimensions: "70 x 75 x 100 cm",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 20,
    category: "chairs",
    title: "Compact Dining Chair",
    shortDesc: "Perfect for small spaces",
    description:
      "A compact dining chair ideal for apartments and small dining areas without compromising comfort.",
    price: 70,
    originalPrice: 110,
    rating: 4.1,
    reviewsCount: 34,
    stock: 40,
    material: "Engineered Wood",
    color: "White",
    dimensions: "42 x 45 x 78 cm",
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 21,
    category: "chairs",
    title: "Luxury Velvet Chair",
    shortDesc: "Velvet finish with premium comfort",
    description:
      "A luxury velvet chair designed to add elegance and softness to your living space.",
    price: 240,
    originalPrice: 320,
    rating: 4.8,
    reviewsCount: 92,
    stock: 8,
    material: "Velvet & Metal",
    color: "Emerald Green",
    dimensions: "60 x 65 x 90 cm",
    image:
      "https://images.unsplash.com/photo-1506326426992-32b61983f2fd?w=500&auto=format&fit=crop&q=60",
  },
  // sofas data
  {
    id: 101,
    category: "sofas",
    title: "Modern Luxury Sofa",
    shortDesc: "Premium 3-seater sofa with soft cushions",
    description:
      "A modern luxury sofa designed for comfort and style. Features deep seating, plush cushions, and a durable frame perfect for living rooms.",
    price: 850,
    originalPrice: 1100,
    rating: 4.8,
    reviewsCount: 146,
    stock: 6,
    material: "Fabric & Solid Wood",
    color: "Warm Beige",
    dimensions: "220 x 90 x 85 cm",
    image:
      "https://plus.unsplash.com/premium_photo-1674567529895-c89b6bb1b9e6?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 102,
    category: "sofas",
    title: "Scandinavian 2-Seater Sofa",
    shortDesc: "Minimal sofa for compact spaces",
    description:
      "A Scandinavian-inspired 2-seater sofa ideal for apartments and modern interiors. Clean lines and cozy seating.",
    price: 620,
    originalPrice: 780,
    rating: 4.6,
    reviewsCount: 93,
    stock: 9,
    material: "Linen Fabric & Wood",
    color: "Light Grey",
    dimensions: "165 x 85 x 80 cm",
    image:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 103,
    category: "sofas",
    title: "Contemporary Fabric Sofa",
    shortDesc: "Comfort-focused modern seating",
    description:
      "This contemporary fabric sofa blends comfort with modern aesthetics, offering soft cushioning and strong support.",
    price: 780,
    originalPrice: 980,
    rating: 4.7,
    reviewsCount: 121,
    stock: 7,
    material: "Premium Fabric",
    color: "Charcoal",
    dimensions: "210 x 92 x 84 cm",
    image:
      "https://images.unsplash.com/photo-1630585308572-f53438fc684f?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 104,
    category: "sofas",
    title: "Luxury Velvet Sofa",
    shortDesc: "Velvet finish with elegant design",
    description:
      "A luxury velvet sofa that adds elegance and richness to your living room with superior comfort.",
    price: 980,
    originalPrice: 1250,
    rating: 4.9,
    reviewsCount: 78,
    stock: 4,
    material: "Velvet & Metal Frame",
    color: "Royal Blue",
    dimensions: "225 x 95 x 88 cm",
    image:
      "https://plus.unsplash.com/premium_photo-1676320514018-ec119b57dbce?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 105,
    category: "sofas",
    title: "Classic Living Room Sofa",
    shortDesc: "Timeless design with extra comfort",
    description:
      "A classic living room sofa built for everyday comfort with a timeless look that never goes out of style.",
    price: 700,
    originalPrice: 900,
    rating: 4.5,
    reviewsCount: 66,
    stock: 11,
    material: "Cotton Blend & Wood",
    color: "Soft Cream",
    dimensions: "205 x 90 x 83 cm",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 106,
    category: "sofas",
    title: "Compact Urban Sofa",
    shortDesc: "Perfect for apartments",
    description:
      "A compact sofa designed for urban living, offering comfort without occupying too much space.",
    price: 540,
    originalPrice: 690,
    rating: 4.4,
    reviewsCount: 51,
    stock: 13,
    material: "Polyester Fabric",
    color: "Dark Green",
    dimensions: "170 x 85 x 80 cm",
    image:
      "https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 107,
    category: "sofas",
    title: "Minimal Lounge Sofa",
    shortDesc: "Relaxed seating with clean lines",
    description:
      "A minimal lounge sofa ideal for relaxed environments, featuring deep seats and a modern profile.",
    price: 890,
    originalPrice: 1150,
    rating: 4.7,
    reviewsCount: 84,
    stock: 6,
    material: "Fabric & Hardwood",
    color: "Stone Grey",
    dimensions: "230 x 98 x 86 cm",
    image:
      "https://images.unsplash.com/photo-1611967164521-abae8fba4668?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 108,
    category: "sofas",
    title: "Designer Corner Sofa",
    shortDesc: "L-shaped sofa for large spaces",
    description:
      "A designer L-shaped corner sofa offering generous seating space and premium comfort for family living rooms.",
    price: 1350,
    originalPrice: 1700,
    rating: 4.9,
    reviewsCount: 109,
    stock: 3,
    material: "Fabric & Solid Wood",
    color: "Taupe",
    dimensions: "280 x 200 x 85 cm",
    image:
      "https://images.unsplash.com/photo-1512212621149-107ffe572d2f?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 109,
    category: "sofas",
    title: "Modern Chesterfield Sofa",
    shortDesc: "Classic chesterfield with modern touch",
    description:
      "A modern interpretation of the classic Chesterfield sofa with deep button detailing and plush comfort.",
    price: 1150,
    originalPrice: 1450,
    rating: 4.8,
    reviewsCount: 72,
    stock: 5,
    material: "Leatherette",
    color: "Dark Brown",
    dimensions: "230 x 95 x 90 cm",
    image:
      "https://images.unsplash.com/photo-1565374395542-0ce18882c857?w=500&auto=format&fit=crop&q=60",
  },
  //  tables
  {
    id: 201,
    category: "tables",
    title: "Modern Dining Table",
    shortDesc: "Elegant dining table for modern homes",
    description:
      "A modern dining table crafted for everyday meals and special gatherings. Strong build with a clean, contemporary design.",
    price: 720,
    originalPrice: 950,
    rating: 4.7,
    reviewsCount: 112,
    stock: 6,
    material: "Solid Wood",
    color: "Natural Oak",
    dimensions: "180 x 90 x 75 cm",
    image:
      "https://plus.unsplash.com/premium_photo-1670984939638-01d1854a5d12?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 202,
    category: "tables",
    title: "Minimal Coffee Table",
    shortDesc: "Low-profile coffee table",
    description:
      "A minimal coffee table designed to complement modern sofas and living room interiors.",
    price: 260,
    originalPrice: 350,
    rating: 4.5,
    reviewsCount: 68,
    stock: 14,
    material: "Engineered Wood",
    color: "Walnut Brown",
    dimensions: "110 x 55 x 40 cm",
    image:
      "https://images.unsplash.com/photo-1643558544531-bff73bbffc28?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 203,
    category: "tables",
    title: "Luxury Marble Table",
    shortDesc: "Premium marble top table",
    description:
      "A luxury table featuring a marble top and sturdy base, perfect for elegant living spaces.",
    price: 980,
    originalPrice: 1250,
    rating: 4.9,
    reviewsCount: 91,
    stock: 4,
    material: "Marble & Metal",
    color: "White Marble",
    dimensions: "160 x 80 x 75 cm",
    image:
      "https://plus.unsplash.com/premium_photo-1670984939016-ac6de78350e8?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 204,
    category: "tables",
    title: "Classic Wooden Table",
    shortDesc: "Traditional wooden craftsmanship",
    description:
      "A classic wooden table built with durability and timeless design, suitable for dining or workspace use.",
    price: 540,
    originalPrice: 720,
    rating: 4.4,
    reviewsCount: 56,
    stock: 10,
    material: "Teak Wood",
    color: "Dark Brown",
    dimensions: "170 x 85 x 75 cm",
    image:
      "https://images.unsplash.com/photo-1575435745494-d25c354515c1?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 205,
    category: "tables",
    title: "Scandinavian Work Table",
    shortDesc: "Clean & functional work table",
    description:
      "A Scandinavian-style table ideal for home offices and creative workspaces with a minimal footprint.",
    price: 420,
    originalPrice: 580,
    rating: 4.6,
    reviewsCount: 74,
    stock: 12,
    material: "Plywood & Steel",
    color: "Light Wood",
    dimensions: "140 x 70 x 75 cm",
    image:
      "https://images.unsplash.com/photo-1535799695145-f3849086ee3d?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 206,
    category: "tables",
    title: "Round Coffee Table",
    shortDesc: "Compact round table",
    description:
      "A round coffee table designed to fit perfectly in small living spaces while maintaining style.",
    price: 310,
    originalPrice: 420,
    rating: 4.3,
    reviewsCount: 49,
    stock: 18,
    material: "Wood & Metal",
    color: "Matte Black",
    dimensions: "90 x 90 x 42 cm",
    image:
      "https://images.unsplash.com/photo-1609670514643-b6217a80d15e?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 207,
    category: "tables",
    title: "Industrial Dining Table",
    shortDesc: "Industrial-style large table",
    description:
      "A bold industrial dining table with a metal frame and solid wooden top for a modern loft aesthetic.",
    price: 880,
    originalPrice: 1150,
    rating: 4.8,
    reviewsCount: 87,
    stock: 5,
    material: "Solid Wood & Iron",
    color: "Rustic Brown",
    dimensions: "200 x 95 x 76 cm",
    image:
      "https://images.unsplash.com/photo-1615803796379-b4cda8e9c09c?w=500&auto=format&fit=crop&q=60",
  },

  {
    id: 208,
    category: "tables",
    title: "Compact Side Table",
    shortDesc: "Perfect bedside or sofa table",
    description:
      "A compact side table ideal for bedrooms or sofa corners, offering functionality in small spaces.",
    price: 180,
    originalPrice: 250,
    rating: 4.2,
    reviewsCount: 33,
    stock: 22,
    material: "Engineered Wood",
    color: "White",
    dimensions: "45 x 45 x 50 cm",
    image:
      "https://images.unsplash.com/photo-1529878404804-c3bb78ba7995?w=500&auto=format&fit=crop&q=60",
  },
  // bedsdata
  {
    id: 301,
    category: "beds",
    title: "Modern Queen Bed",
    shortDesc: "Stylish queen bed with headboard",
    description:
      "A modern queen-size bed featuring a comfortable headboard, solid frame, and elegant design for your bedroom.",
    price: 650,
    originalPrice: 850,
    rating: 4.7,
    reviewsCount: 85,
    stock: 6,
    material: "Solid Wood & Fabric",
    color: "Light Beige",
    dimensions: "160 x 200 x 110 cm",
    image:
      "https://plus.unsplash.com/premium_photo-1670076515907-2736a3492f23?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 302,
    category: "beds",
    title: "Luxury King Bed",
    shortDesc: "Spacious king-size bed with comfort",
    description:
      "A luxurious king-size bed designed for ultimate comfort and durability, perfect for master bedrooms.",
    price: 950,
    originalPrice: 1200,
    rating: 4.9,
    reviewsCount: 72,
    stock: 4,
    material: "Solid Oak Wood & Leather",
    color: "Dark Brown",
    dimensions: "200 x 210 x 115 cm",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 303,
    category: "beds",
    title: "Minimalist Bed Frame",
    shortDesc: "Simple design for small spaces",
    description:
      "A minimalist bed frame perfect for compact bedrooms. Sleek, functional, and sturdy design.",
    price: 420,
    originalPrice: 550,
    rating: 4.4,
    reviewsCount: 49,
    stock: 12,
    material: "Metal & Wood",
    color: "Black",
    dimensions: "140 x 200 x 105 cm",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 304,
    category: "beds",
    title: "Classic Wooden Bed",
    shortDesc: "Traditional wooden bed for comfort",
    description:
      "A classic wooden bed combining durability and elegance. Ideal for traditional and modern bedrooms alike.",
    price: 550,
    originalPrice: 700,
    rating: 4.6,
    reviewsCount: 61,
    stock: 8,
    material: "Teak Wood",
    color: "Natural Brown",
    dimensions: "160 x 200 x 110 cm",
    image:
      "https://images.unsplash.com/photo-1698517486200-e89403ea2738?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 305,
    category: "beds",
    title: "Upholstered Bed",
    shortDesc: "Soft fabric bed with modern look",
    description:
      "A comfy upholstered bed with fabric covering, offering a cozy feel and contemporary bedroom aesthetic.",
    price: 700,
    originalPrice: 900,
    rating: 4.8,
    reviewsCount: 54,
    stock: 5,
    material: "Fabric & Wood",
    color: "Grey",
    dimensions: "180 x 200 x 115 cm",
    image:
      "https://plus.unsplash.com/premium_photo-1671269943825-e45b177add8f?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 306,
    category: "beds",
    title: "Storage Bed",
    shortDesc: "Bed with built-in storage drawers",
    description:
      "A practical bed with storage drawers underneath for extra space. Perfect for small bedrooms.",
    price: 820,
    originalPrice: 1050,
    rating: 4.7,
    reviewsCount: 38,
    stock: 6,
    material: "Solid Wood & MDF",
    color: "Walnut",
    dimensions: "160 x 200 x 110 cm",
    image:
      "https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 307,
    category: "beds",
    title: "Platform Bed",
    shortDesc: "Low-profile modern platform bed",
    description:
      "A sleek platform bed with minimal design, offering a contemporary look and sturdy support.",
    price: 480,
    originalPrice: 650,
    rating: 4.5,
    reviewsCount: 44,
    stock: 10,
    material: "Plywood & Fabric",
    color: "White",
    dimensions: "150 x 200 x 100 cm",
    image:
      "https://images.unsplash.com/photo-1578898887932-dce23a595ad4?w=500&auto=format&fit=crop&q=60",
  },
];
