export const products = [
    {
        id: 1,
        category: "Automóvil/camioneta radial",
        title: "145/80 R13 75T TL AR-300 FATE",        
        desc: "",
        price: 77650,
        img: "Automovil/ar-300.png",
        ancho: 145,
        alto: 80,
        rodado: 13,
    },
    {
        id: 2,
        category: "Automóvil/camioneta radial",
        title: "165/70 R 13 79T TL PRESTIVA FATE",        
        desc: "",
        price: 86850,
        img: "Automovil/prestiva.png",
        ancho: 165,
        alto: 70,
        rodado: 13,
    },
    {
        id: 3,
        category: "Camión radial",
        title: "11 R22.5 148/145L TL DR-400 TM",        
        desc: "",
        price: 95450,
        img: "Transporte/fatecargo-dr-400.png",
        ancho: 165,
        alto: 70,
        rodado: 13,
    },
    {
        id: 4,
        category: "Camión radial",
        title: "12 R22.5 152/148L TL DR-400 TM",        
        desc: "",
        price: 132750,
        img: "Transporte/fatecargo-sr-200.png",
        ancho: 165,
        alto: 70,
        rodado: 14,
    },
    {
        id: 5,
        category: "Agrícola convencional",
        title: "10.00-16 CUATRO GUIAS 10T FATE",        
        desc: "",
        price: 132750,
        img: "Agro-Vial/4-guias-f-2m.png",
        ancho: 165,
        alto: 70,
        rodado: 14,
    },
    {
        id: 6,
        category: "Agrícola convencional",
        title: "10.5/65-16 SD 10T TL (FLOTACIÓN) FATE",        
        desc: "",
        price: 132750,
        img: "Agro-Vial/sd-f-3.png",
        ancho: 165,
        alto: 70,
        rodado: 14,
    },
    {
        id: 7,
        category: "Camión/camioneta convencional",
        title: "10.00-20 CARRETERA PLUS 16T FATE",        
        desc: "",
        price: 132750,
        img: "Transporte/carretera-plus.png",
        ancho: 165,
        alto: 70,
        rodado: 14,
    },
    {
        id: 8,
        category: "Camión/camioneta convencional",
        title: "10.00-20 PCR 16T FATE",        
        desc: "",
        price: 132750,
        img: "Transporte/pcr.png",
        ancho: 165,
        alto: 70,
        rodado: 14,
    },
    {
        id: 9,
        category: "Baterias",
        title: "BATERIA MOURA 100HA 12x110 ALTA",        
        desc: "",
        price: 155000,
        img: "Baterias/moura.png",
        ancho: 165,
        alto: 70,
        rodado: 14,
    },
    
]

export const TotalProducts = products.length;

export const Products = products.reduce((acc, product) => {
    if (!acc[product.category]) {
        acc[product.category] = [];
    }

    acc[product.category] = [...acc[product.category], product];

    return acc;
}, {});