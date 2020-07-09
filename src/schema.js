/* 
DB Schema 
*/

let DB = {
  patients: [
    {
      rut: 189876787,
      names: "rodrigo alberto",
      father_last_name: "rodriguez",
      mother_last_name: "henriquez",
      city: "Talca",
      state: "activo",
      in_date: "01/01/2020",
      email: "rrhen@email.com",
      phone: "+56923456789",
      birth_date: "02/06/1995",
      sex: "masculino",
      alimentation: "vegetariano",
      password: "",
    },
  ],
  carnets: [
    {
      rut: 189876787,
      controls: [
        {
          date: "02/02/2020",
          weight: 87.5, // kg
          size: 1.8, // m
          cbr: 30, //cm
          cbc: 32, // cm
          cc_min: 78, // cm
          cc_max: 83, // cm
          cad_max: 101, //cm
          triceps_fold: 10, // mm
          subscapular_fold: 11, // mm
          abdominal_fold: 14, // mm
          imc: 23, // kg/mt2
          dni: "normal",
          biological_age: 21,
          visceral_fat: 5,
          fat: 15.1, // %
          mass: 45, // %
          muscle_mass: 29, // kg
        },
      ],
      biochemists: [
        {
          date: "04/01/2020",
          b12: "normal",
          d: "alterada (29,5)",
        },
      ],
    },
  ],
  daily_diets: [
    {
      rut: 189876787,
      history: [
        {
          date: "02/02/2020",
          breakfast: {
            time: "09:00",
            meal:
              "2 porciones de lacteos..., 1 porcion de fruta, 1 porcion de cereal",
          },
          lunch: {
            time: "12:30",
            meal:
              "fondo: 1 porcion de cereal, 2 porciones de proteina (...), preparaciones liquidas... ensalada: 2 porciones de ensalada libre consumo, 1 porcion de ensalada consumo moderado, aderezo (...)",
          },
          snack: {
            time: "16:00",
            meal: "1 porcion de fruta, 1 porcion de cereal",
          },
          post_training: "1 porcion de lacteo alto en proteina",
          dinner: {
            time: "19:30",
            meal:
              "1 porcion de cereal, 1 porcion de proteina, 2 porciones de ensalada de libre consumo",
          },
          calories: 1700, // kcal
          prot: 60, // gr/d
          goals:
            "no pases mas de 4 horas sin comer, cumple con el consumo de agua diario, ...",
          extra_info: "",
        },
        {},
      ],
    },
  ],
  weekly_diets: [
    {
      rut: 189876787,
      history: [
        {
          monday: {
            breakfast: {
              time: "...",
              meal: "...",
            },
            lunch: {
              time: "...",
              meal: "...",
            },
          },
          tuesday: {},
          wednesday: {},
          thursday: {},
          friday: {},
          saturday: {},
          sunday: {},
        },
        {},
      ],
    },
  ],
  // daily_diet_permanent: {
  //   exchange_portions: {
  //     skim_dairy: "* 1 taza de leche desc, * 2 cdas de leche en polvo, ...",
  //     prot: "* 2 huevos, * 1/2 taza soya sin hidratar, ...",
  //     elc: "lechuga, apio, zapallo, ...",
  //     ecm: "* 1 taza de brocoli/coliflor/zapallo italiano (cocido), ...",
  //     fruits:
  //       "* 1 unidad pequeña manzana, naranjam pera, * 1/2 unidad de platano, ...",
  //     fats_and_oils: "* 2 cdas de aceite vegetal, * 10 unidades almendras, ...",
  //     cereals_and_potatoes:
  //       "*3/4 taza de arroz, fideos, quínoa, polenta y cuscús cocidos, *1 papa cocida pequeña,...",
  //     bread_and_cookies:
  //       "*1/2 pan hallulla o marraqueta, *2 rebanadas pan de molde,...",
  //     water:
  //       "2 a 2.5 lt (completar con agua de frutas cocidas, hidratación (agua fría y caliente con trozos de fruta))",
  //     info: "azucar y embutidos no tienen recomendación",
  //   },
  //   food_pyramid: "img",
  //   vit_c: { img: "img", info: "ddr ..." },
  //   vit_d: { img: "img", info: "ddr ..." },
  // },
};
