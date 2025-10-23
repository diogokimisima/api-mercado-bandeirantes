import { PrismaClient, UnitType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🌱 Iniciando o seed do banco de dados...')

    // Limpar dados existentes
    console.log('Limpando dados existentes...')
    await prisma.orderItem.deleteMany({})
    await prisma.order.deleteMany({})
    await prisma.product.deleteMany({})
    await prisma.category.deleteMany({})

  console.log('🧹 Dados existentes removidos')

  // 1. Criar Categorias
  const categories = await prisma.category.createMany({
    data: [
      { categoryName: 'Frutas' },
      { categoryName: 'Legumes' },
      { categoryName: 'Nozes'},
      { categoryName: 'Tubérculos' }
    ],
    skipDuplicates: true, // ✅ evita duplicação
  })
  console.log(`✅ ${categories.count} categorias criadas`)

  // Buscar as categorias criadas para pegar os IDs
  const categoriesData = await prisma.category.findMany({
    where: {
      categoryName: { in: ['Frutas', 'Legumes', 'Nozes', 'Tubérculos'] }
    }
  })

  const frutas = categoriesData.find(c => c.categoryName === 'Frutas')!
  const legumes = categoriesData.find(c => c.categoryName === 'Legumes')!
  const nozes = categoriesData.find(c => c.categoryName === 'Nozes')!
  const tuberculos = categoriesData.find(c => c.categoryName === 'Tubérculos')!

  // 2. Criar Produtos
  const products = [
    // Frutas
      { description: 'ABACATE ESPECIAL KG', 
        pluCode: '554855', 
        categoryId: frutas!.id, 
        imageUrl: 'https://ik.imagekit.io/syusjvn1k/554855.png?updatedAt=1759246840731'
      },
    { description: 'ABACATE KG', 
      pluCode: '60851', 
      categoryId: frutas!.id,
      imageUrl:'https://ik.imagekit.io/syusjvn1k/554855.png?updatedAt=1759246840731'
    },
    { description: 'ABACAXI HAVAÍ KG', 
      pluCode: '60868', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60868.png?updatedAt=1759246840701'
    },
    { description: 'ABACAXI PÉROLA UN', 
      pluCode: '411752', 
      categoryId: frutas!.id,
     imageUrl: 'https://ik.imagekit.io/syusjvn1k/411752.png?updatedAt=1759246840580'
     },
    { description: 'AMEIXA IMPORTADA KG', 
      pluCode: '60875', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60875.png?updatedAt=1759246840548'
    },
   /* { description: 'AMEIXA NACIONAL BANDEJA 600G', 
       pluCode: '509350', 
       categoryId: frutas.id,
       imageUrl: '' 
      }, */
    { description: 'AMEIXA NACIONAL KG', 
      pluCode: '60882', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60882.png?updatedAt=1759246840420'
    },
    { description: 'AMORA KG', 
      pluCode: '483841', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/483841.png?updatedAt=1759246840425'
    },
    { description: 'ATEMÓIA KG', 
      pluCode: '60899', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60899.png?updatedAt=1759246840502'
     },
    { description: 'BANANA-DA-TERRA KG', 
      pluCode: '289382', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/289382.png?updatedAt=1759246840384'
    },
    { description: 'BANANA MAÇÃ KG', 
      pluCode: '60912', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60912.png?updatedAt=1759246840329'
    },
    { description: 'BANANA MARMELO KG', 
      pluCode: '581554', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/581554.png?updatedAt=1759246863486'
    },
    { description: 'BANANA NANICA KG', 
      pluCode: '60929', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60929.png?updatedAt=1759246840357'
    },
    { description: 'BANANA PRATA KG', 
      pluCode: '60936', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60936.png?updatedAt=1759246840310' 
    },
    { description: 'CACAU KG', 
      pluCode: '546874', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/546874.png?updatedAt=1759246840515'
    },
    { description: 'CAQUI CHOCOLATE KG', 
      pluCode: '60691', 
      categoryId: frutas!.id,
      imageUrl:'https://ik.imagekit.io/syusjvn1k/60691.png?updatedAt=1759246885352'
    },
    { description: 'CAQUI FUYU KG', 
      pluCode: '60707', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60707.png?updatedAt=1759246885422'
    },
    { description: 'CAQUI GIOMBO KG', 
      pluCode: '60714', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60714.png?updatedAt=1759246840405'
    },
    { description: 'CAQUI IMPORTADO KG', 
      pluCode: '335362', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/335362.png?updatedAt=1759246840469' 
    },
    { description: 'CAQUI KYOTO KG', 
      pluCode: '490900', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/490900.png?updatedAt=1759246840481'
    },
    { description: 'CAQUI RAMA FORTE BANDEJA 500G', 
      pluCode: '575317', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/575317.png?updatedAt=1759246840336'
    },
    { description: 'CAQUI RAMA FORTE KG', 
      pluCode: '61179', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61179.png?updatedAt=1759291200102'
    },
    { description: 'CARAMBOLA KG', 
      pluCode: '132824', 
      categoryId: frutas!.id, 
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/132824.png?updatedAt=1759246912881'
    },
    { description: 'CEREJA KG', 
      pluCode: '61377', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61377.png?updatedAt=1759246909909'
    },
    { description: 'COCO SECO BAHIA KG', 
      pluCode: '60943', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60943.png?updatedAt=1759246839261'
    },
    { description: 'COCO VERDE UN', 
      pluCode: '60950', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60950.png?updatedAt=1759246909814'
    },
    { description: 'CUPUAÇU KG', 
      pluCode: '495639', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/495639.png?updatedAt=1759246909831'
    },
    { description: 'FIGO VERDE KG', 
      pluCode: '61193', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61193.png?updatedAt=1759246912945'
    },
    { description: 'GOIABA KG', 
      pluCode: '60967', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60967.png?updatedAt=1759246913573'
    },
    { description: 'GRAVIOLA KG', 
      pluCode: '486644', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/486644.png?updatedAt=1759246913254'
    },
    { description: 'JACA KG', 
      pluCode: '61209', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61209.png?updatedAt=1759246913409'
    },
   /* { description: 'KIWI IMPORTADO BANDEJA 600G', //observar
      pluCode: '281089', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'KIWI IMPORTADO KG', 
      pluCode: '60974', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60974.png?updatedAt=1759246913585'
    },
    /* { description: 'KIWI NACIONAL BANDEJA 600G', //observar
      pluCode: '321181', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'KIWI NACIONAL KG', 
      pluCode: '60738', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60738.png?updatedAt=1759246913614'
    },
    { description: 'LARANJA BAHIA KG', 
      pluCode: '60608', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60608.png?updatedAt=1759246913309'
    },
    { description: 'LARANJA IMPORTADA KG', 
      pluCode: '362160', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/362160.png?updatedAt=1759246913388'
    },
    { description: 'LARANJA LIMA KG', 
      pluCode: '60615', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60615.png?updatedAt=1759246913129'
    },
    { description: 'LARANJA LIMA PÉRSIA KG', 
      pluCode: '527132', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/527132.png?updatedAt=1759246913553'
    },
    { description: 'LARANJA PERA RIO KG', 
      pluCode: '60622', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60622.png?updatedAt=1759246910148'
    },
    /*{ description: 'LICHIA BANDEJA 350G', //observar
      pluCode: '563215', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'LICHIA KG', 
      pluCode: '373975', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/373975.png?updatedAt=1759246913377'
    },
    { description: 'LIMÃO SICILIANO KG', 
      pluCode: '321174', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/321174.png?updatedAt=1759246913339'
    },
    { description: 'LIMÃO TAITI KG', 
      pluCode: '60639', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60639.png?updatedAt=1759246913328'
    },
    { description: 'MAÇÃ ARGENTINA KG', 
      pluCode: '60745', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60745.png?updatedAt=1759246913111'
    },
    { description: 'MAÇÃ FUJI KG', 
      pluCode: '60752', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60752.png?updatedAt=1759246913260'
    },
    { description: 'MAÇÃ GALA KG', 
      pluCode: '60769', 
      categoryId: frutas!.id, 
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60769.png?updatedAt=1759246840495' 
    },
    /*{ description: 'MAÇÃ NACIONAL LILI PACOTE 1KG', //observar
      pluCode: '485807', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'MAÇÃ PINK LADY KG', 
      pluCode: '590396', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/590396.png?updatedAt=1759246913241'
    },
    { description: 'MAÇÃ VERDE GRANNY SMITH KG', 
      pluCode: '60776', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60776.png?updatedAt=1759246913075'
    },
    { description: 'MAMÃO FORMOSA KG', 
      pluCode: '60998', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60998.png?updatedAt=1759246912990'
    },
    { description: 'MAMÃO PAPAIA KG', 
      pluCode: '61001', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61001.png?updatedAt=1759246912958'
    },
    { description: 'MANGA BOURBON KG', 
      pluCode: '372718', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/372718.png?updatedAt=1759246912694'
    },
    { description: 'MANGA ESPADA KG', 
      pluCode: '431231', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/431231.png?updatedAt=1759246912642'
    },
    { description: 'MANGA PALMER KG', 
      pluCode: '61018', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61018.png?updatedAt=1759246913293'
    },
    { description: 'MANGA TOMMY ATKINS KG', 
      pluCode: '61032', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61032.png?updatedAt=1759246913247'
    },
    { description: 'MARACUJÁ AZEDO KG', 
      pluCode: '61049', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61049.png?updatedAt=1759246913097'
    },
    { description: 'MARACUJÁ DOCE KG', 
      pluCode: '61056', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61056.png?updatedAt=1759246913563'
    },
    { description: 'MELANCIA BABY KG', 
      pluCode: '470926', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/470926.png?updatedAt=1759246912719'
    },
    { description: 'MELANCIA FAVO DE MEL KG', 
      pluCode: '702195', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/702195.png?updatedAt=1759246913572'
    },
    { description: 'MELANCIA KG', 
      pluCode: '61063', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61063.png?updatedAt=1759246913082'
    },
    { description: 'MELÃO AMARELO KG', 
      pluCode: '61070', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61070.png?updatedAt=1759246913635'
    },
   /* { description: 'MELÃO AMARELO REDINHA KG', //observar
      pluCode: '508933', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'MELÃO CAIPIRA KG', 
      pluCode: '61087', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61087.png?updatedAt=1759246913687'
    },
    { description: 'MELÃO CANTALOUPE KG', 
      pluCode: '529303', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/529303.png?updatedAt=1759248790837'
    },
    { description: 'MELÃO DINO KG', 
      pluCode: '439091', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/439091.png?updatedAt=1759246909974'
    },
    { description: 'MELÃO GÁLIA KG', 
      pluCode: '260060', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/260060.png?updatedAt=1759246910048'
    },
    { description: 'MELÃO ORANGE KG', 
      pluCode: '61100', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61100.png?updatedAt=1759246910033'
    },
    { description: 'MELÃO REI KG', 
      pluCode: '431415', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/431415.png?updatedAt=1759246910195'
    },
    { description: 'MELÃO SAPO ESPANHOL KG', 
      pluCode: '227513', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/227513.png?updatedAt=1759246909902'
    },
    { description: 'MEXERICA KG', 
      pluCode: '60653', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60653.png?updatedAt=1759246912979'
    },
    { description: 'MORANGO WP BANDEJA 250G', 
      pluCode: '538923', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/538923.png?updatedAt=1759291417868'
    },
    { description: 'MURCOTE KG', 
      pluCode: '60660', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60660.png?updatedAt=1759246909849'
    },
    { description: 'NECTARINA IMPORTADA KG', 
      pluCode: '60783', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60783.png?updatedAt=1759246913561'
    },
    { description: 'NECTARINA NACIONAL KG', 
      pluCode: '60790', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60790.png?updatedAt=1759246913103'
    },
    { description: 'PERA ARGENTINA VERMELHA KG', 
      pluCode: '543590', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/543590.png?updatedAt=1759246913812'
    },
    { description: 'PERA NACIONAL KG', 
      pluCode: '60820', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60820.png?updatedAt=1759246913162'
    },
    { description: 'PERA PORTUGUESA KG', 
      pluCode: '232609', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/232609.png?updatedAt=1759246913206'
    },
    { description: 'PERA RED KG', 
      pluCode: '61230', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61230.png?updatedAt=1759246913566'
    },
    { description: 'PERA WILLIAMS ARGENTINA KG', 
      pluCode: '60813', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60813.png?updatedAt=1759246912940'
    },
    { description: 'PÊSSEGO IMPORTADO KG', 
      pluCode: '60837', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60813.png?updatedAt=1759246912940'
    },
    { description: 'PÊSSEGO NACIONAL KG', 
      pluCode: '60844', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60844.png?updatedAt=1759246913158'
    },
    { description: 'PINHA KG', 
      pluCode: '61247', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61247.png?updatedAt=1759246913607'
    },
    { description: 'PITAIA KG', 
      pluCode: '159753', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/159753.png?updatedAt=1759246913610'
    },
    { description: 'PONKAN KG', 
      pluCode: '60677', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60677.png?updatedAt=1759246909817'
    },
    { description: 'ROMÃ KG', 
      pluCode: '368025', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/368025.png?updatedAt=1759246913363'
    },
    { description: 'TANGERINA KG', 
      pluCode: '60684', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/60684.png?updatedAt=1759246910149'
    },
     { description: 'TANGERINA DECOPOM KG', 
      pluCode: '178624', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/178624.png?updatedAt=1759246910143'
    },
   /* { description: 'UVA BENITAKA BANDEJA 500G', //observar
      pluCode: '483803', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'UVA BENITAKA KG', 
      pluCode: '61384', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61384.png?updatedAt=1759246910155'
    },
    /*  { description: 'UVA BRASIL BANDEJA 500G', //observar
      pluCode: '546942', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'UVA BRASIL KG', 
      pluCode: '378581', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/378581.png?updatedAt=1759246910195'
    },
    /* { description: 'UVA CRIMSON SEM SEMENTE BANDEJA 500G', //observar
      pluCode: '451338', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'UVA CRIMSON SEM SEMENTE KG', //observar
      pluCode: '218573', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/218573.png?updatedAt=1759292031137'
    },
    /* { description: 'UVA ISABEL BANDEJA 500G', //observar
      pluCode: '1014341', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'UVA ISABEL KG', 
      pluCode: '489843', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/489843.png?updatedAt=1759246910170'
    },
    { description: 'UVA ISIS KG', 
      pluCode: '575270', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/575270.png?updatedAt=1759246909894'
    },
   /* { description: 'UVA ISIS SEM SEMENTE BANDEJA 500G', //observar
      pluCode: '513593', 
      categoryId: frutas.id,
      imageUrl: ''
    }, 
    { description: 'UVA ITÁLIA BANDEJA 500G', //observar
      pluCode: '483797', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'UVA ITÁLIA KG', 
      pluCode: '61414', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61414.png?updatedAt=1759246908542'
    },
    /*{ description: 'UVA NIÁGARA BANDEJA 500G', //observar
      pluCode: '1005943', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'UVA NIÁGARA KG', 
      pluCode: '61421', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61421.png?updatedAt=1759246909818'
    },
   /* { description: 'UVA NÚBIA BANDEJA 500G', //observar
      pluCode: '589611', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'UVA NÚBIA KG', 
      pluCode: '48755', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/48755.png?updatedAt=1759246910079'
    },
    /*{ description: 'UVA RED GLOBE BANDEJA 500G', //observar
      pluCode: '458139', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'UVA RED GLOBE KG', 
      pluCode: '61278', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61278.png?updatedAt=1759246913348'
    },
    /*{ description: 'UVA RUBI BANDEJA 500G', //observar
      pluCode: '505123', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'UVA RUBI KG', 
      pluCode: '61438', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61438.png?updatedAt=1759246910178'
    },
    /*{ description: 'UVA THOMPSON SEM SEMENTE BANDEJA 500G', //observar
      pluCode: '451321', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */
    { description: 'UVA THOMPSON SEM SEMENTE KG', 
      pluCode: '302753', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/302753.png?updatedAt=1759246909999'
    },
    { description: 'UVA VITÓRIA KG', 
      pluCode: '369350', 
      categoryId: frutas!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/369350.png?updatedAt=1759246909304'
    },
   /* { description: 'UVA VITÓRIA SEM SEMENTE BANDEJA 500G', //observar
      pluCode: '483858', 
      categoryId: frutas.id,
      imageUrl: ''
    }, */

    // Legumes
    { description: 'AÇAFRÃO KG',  
      pluCode: '515931', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/515931.png?updatedAt=1759258084373'
    },
    { description: 'ACELGA KG', 
      pluCode: '61926', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61926.png?updatedAt=1759258085157'
    },
    { description: 'ABÓBORA CABOTIÁ KG', 
      pluCode: '62404', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62404.png?updatedAt=1759258085487'
    },
    { description: 'ABÓBORA GIGANTE KG', 
      pluCode: '62350', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62350.png?updatedAt=1759258084853'
    },
    { description: 'ABÓBORA ITÁLIA KG', 
      pluCode: '62374', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62374.png?updatedAt=1759258084818'
    },
    { description: 'ABÓBORA JACAREZINHO KG', 
      pluCode: '509558', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/509558.png?updatedAt=1759258084370'
    },
    { description: 'ABÓBORA MENINA KG', 
      pluCode: '62435', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62435.png?updatedAt=1759258084379'
    },
    { description: 'ABÓBORA MORANGA KG', 
      pluCode: '62459', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62459.png?updatedAt=1759291689950'
    },
    { description: 'MINI ABÓBORA MORANGA KG', 
      pluCode: '1006308', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/1006308.png?updatedAt=1759258085270'
    },
    { description: 'ABÓBORA PAULISTA MADURA KG', 
      pluCode: '62480', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62480.png?updatedAt=1759258085141'
    },
    { description: 'ABÓBORA PAULISTA VERDE KG', 
      pluCode: '62534', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62534.png?updatedAt=1759258085149'
    },
    { description: 'ABÓBORA SERGIPANA KG', 
      pluCode: '589024', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/589024.png?updatedAt=1759258084895'
    },
    { description: 'ALCACHOFRA KG', 
      pluCode: '589437', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/589437.png?updatedAt=1759258085150'
    },
    { description: 'ALHO KG', 
      pluCode: '61682', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61682.png?updatedAt=1759258085137'
    },
   /* { description: 'ALHO BANDEJA KG', //observar
      pluCode: '581936', 
      categoryId: legumes.id,
      imageUrl: ''
    }, */
    { description: 'ALHO-PORÓ KG', 
      pluCode: '290500', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/290500.png?updatedAt=1759258085261'
    },
    { description: 'BERINJELA KG', 
      pluCode: '62558', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62558.png?updatedAt=1759258085054'
    },
    { description: 'BERINJELA JAPONESA KG', 
      pluCode: '445955', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/445955.png?updatedAt=1759258085361'
    },
    { description: 'BRÓCOLIS CHINÊS KG', 
      pluCode: '61964', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61964.png?updatedAt=1759258084862'
    },
    /*{ description: 'BRÓCOLIS CHINÊS WP 300G', //observar
      pluCode: '538930', 
      categoryId: legumes.id,
      imageUrl: ''
    }, */
    { description: 'CAXI KG', 
      pluCode: '368865', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/368865.png?updatedAt=1759258085034'
    },
    { description: 'CEBOLA ESPECIAL KG', 
      pluCode: '306591', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/306591.png?updatedAt=1759258084552'
    },
    /* { description: 'CEBOLA MÉDIA NA BANDEJA KG', 
      pluCode: '492430', 
      categoryId: legumes.id,
      imageUrl: ''
    }, */
    { description: 'CEBOLA PARA CONSERVA KG', 
      pluCode: '61759', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61759.png?updatedAt=1759258085051'
    },
    { description: 'CEBOLA ROXA KG', 
      pluCode: '61766', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61759.png?updatedAt=1759258085051'
    },
    { description: 'CHUCHU KG', 
      pluCode: '62602', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62602.png?updatedAt=1759258084858'
    },
    { description: 'ERVILHA TORTA KG', 
      pluCode: '321365', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/321365.png?updatedAt=1759258084511'
    },
    { description: 'FEIJÃO-DE-CORDA KG', 
      pluCode: '62626', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62626.png?updatedAt=1759258084866'
    },
    { description: 'JILÓ KG', 
      pluCode: '62633', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62633.png?updatedAt=1759258085229'
    },
    { description: 'MAXIXE KG', 
      pluCode: '62640', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62640.png?updatedAt=1759258085084'
    },
    { description: 'PEPINO CAIPIRA KG', 
      pluCode: '62688', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62688.png?updatedAt=1759258085057'
    },
    { description: 'PEPINO JAPONÊS KG', 
      pluCode: '62701', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62701.png?updatedAt=1759258085217'
    },
    { description: 'PIMENTA AMERICANA KG', 
      pluCode: '62732', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62732.png?updatedAt=1759258084727'
    },
    { description: 'PIMENTA CAMBUCI KG', 
      pluCode: '62756', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62756.png?updatedAt=1759258084878'
    },
    { description: 'PIMENTA DEDO-DE-MOÇA ARDIDA KG', 
      pluCode: '62770', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62770.png?updatedAt=1759258085059'
    },
    { description: 'PIMENTA DOCE KG', 
      pluCode: '62800', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62800.png?updatedAt=1759258085197'
    },
    { description: 'PIMENTA JALAPEÑO KG', 
      pluCode: '501392', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/501392.png?updatedAt=1759258084526'
    },
    { description: 'PIMENTÃO AMARELO KG', 
      pluCode: '62909', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62909.png?updatedAt=1759258085771'
    },
    { description: 'PIMENTÃO VERDE KG', 
      pluCode: '62923', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62923.png?updatedAt=1759258085522'
    },
    { description: 'PIMENTÃO VERMELHO KG', 
      pluCode: '62930', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62930.png?updatedAt=1759258084224'
    },
    { description: 'QUIABO KG', 
      pluCode: '451352', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/451352.png?updatedAt=1759258085468'
    },
    { description: 'RABANETE MC', 
      pluCode: '62145', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62145.png?updatedAt=1759258084431'
    },
    { description: 'REPOLHO ROXO KG', 
      pluCode: '62077', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62077.png?updatedAt=1759258084902'

    },
    { description: 'REPOLHO VERDE KG', 
      pluCode: '62684', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62684.png?updatedAt=1759258085067'
    },
    { description: 'SALSÃO', 
      pluCode: '62107', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62107.png?updatedAt=1759258084363'
    },
   /* { description: 'TOMATE GRAP BANDEJA 180G', //observar
      pluCode: '192222', 
      categoryId: legumes.id,
      imageUrl: ''
    }, */
    { description: 'TOMATE GRAPE KG', 
      pluCode: '463317', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/463317.png?updatedAt=1759258084896'
    },
    { description: 'TOMATE LONGA VIDA KG', 
      pluCode: '63012', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/63012.png?updatedAt=1759258084941'
    },
    { description: 'TOMATE RASTEIRO KG', 
      pluCode: '63050', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/63050.png?updatedAt=1759258085200'
    },
    { description: 'TOMATE SALADETE KG', 
      pluCode: '63180', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/63180.png?updatedAt=1759258085480'
    },
    { description: 'VAGEM KG', 
      pluCode: '63203', 
      categoryId: legumes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/63203.png?updatedAt=1759258085581'
    },

    // Tubérculos
    { description: 'BATATA ASTERIX KG', 
      pluCode: '61629', 
      categoryId: tuberculos!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61629.png?updatedAt=1759255015974'
    },
    { description: 'BATATA-DOCE BRANCA KG', 
      pluCode: '61636', 
      categoryId: tuberculos!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61636.png?updatedAt=1759255015967'
    },
    { description: 'BATATA-DOCE ROXA KG', 
      pluCode: '61667', 
      categoryId: tuberculos!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61667.png?updatedAt=1759255015980'
    },
    { description: 'BATATA EXTRA KG', 
      pluCode: '61643', 
      categoryId: tuberculos!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61643.png?updatedAt=1759255015948'
    },
    /*{ description: 'BATATA MÉDIA NA BANDEJA KG', //observar
      pluCode: '582445', 
      categoryId: tuberculos.id,
      imageUrl: ''
    }, */
    { description: 'BATATA PIRULITO KG', 
      pluCode: '61698', 
      categoryId: tuberculos!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61698.png?updatedAt=1759255014859'
    },
    { description: 'BATATA YACON KG', 
      pluCode: '62305', 
      categoryId: tuberculos!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62305.png?updatedAt=1759255015436'
    },
    /* { description: 'BETERRABA BANDEJA PROMOÇÃO', //observar
      pluCode: '621151', 
      categoryId: tuberculos.id,
      imageUrl: ''
    }, */
    { description: 'BETERRABA KG', 
      pluCode: '61704', 
      categoryId: tuberculos!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61704.png?updatedAt=1759255016021'
    },
    { description: 'CARÁ KG', 
      pluCode: '61711', 
      categoryId: tuberculos!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61711.png?updatedAt=1759255015962'
    },

    { description: 'CENOURA BANDEJA PROMOÇÃO', //observar
      pluCode: '620457', 
      categoryId: tuberculos!.id,
      imageUrl: ''
    },

    { description: 'CENOURA KG', 
      pluCode: '61797', 
      categoryId: tuberculos!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61797.png?updatedAt=1759255015665'
    },
   /* { description: 'CENOURA MÉDIA NA BANDEJA KG', //observar
      pluCode: '1019162', 
      categoryId: tuberculos.id,
      imageUrl: ''
    }, */
    { description: 'GENGIBRE KG', 
      pluCode: '61858', 
      categoryId: tuberculos!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/61858.png?updatedAt=1759255015390'
    },
    { description: 'GOBÔ RAIZ MC', 
      pluCode: '327428', 
      categoryId: tuberculos!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/327428.png?updatedAt=1759255015905'
    },
    { description: 'INHAME KG', 
      pluCode: '62183', 
      categoryId: tuberculos!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62183.png?updatedAt=1759255015968'
    },
    { description: 'NABO', 
      pluCode: '62282', 
      categoryId: tuberculos!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62282.png?updatedAt=1759255015741'
    },
    { description: 'MANDIOQUINHA KG', 
      pluCode: '62251', 
      categoryId: tuberculos!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/62251.png?updatedAt=1759255015865'
    },
    /* { description: 'MANDIOQUINHA SALSA WP 500G', //observar
      pluCode: '545525', 
      categoryId: tuberculos.id,
      imageUrl: ''
    }, */

    // Nozes
    { description: 'CASTANHA AMENDOIM TORRADO COM CASCA KG', 
      pluCode: '14793', 
      categoryId: nozes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/14793.png?updatedAt=1759250677351'
    },
    { description: 'CASTANHA-DO-PARÁ COM CASCA KG', 
      pluCode: '313254', 
      categoryId: nozes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/313254.png?updatedAt=1759250677612'
    },
    { description: 'CASTANHA NOZES COM CASCA KG', 
      pluCode: '313230', 
      categoryId: nozes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/313230.png?updatedAt=1759250677675'
    },
    { description: 'CASTANHA PINHÃO KG', 
      pluCode: '313261', 
      categoryId: nozes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/313261.png?updatedAt=1759250677720'
    },
    { description: 'CASTANHA PORTUGUESA KG', 
      pluCode: '507639', 
      categoryId: nozes!.id,
      imageUrl: 'https://ik.imagekit.io/syusjvn1k/507639.png?updatedAt=1759250677687'
    },

  ]

  const createdProducts = await prisma.product.createMany({
    data: products
  })
  console.log(`✅ ${createdProducts.count} produtos criados`)

 // Buscar produtos criados para usar nos pedidos
  const productsData = await prisma.product.findMany()

  // 3. Criar Pedidos
  const orders = [
    {
      orderDate: new Date('2024-01-15'),
      time: new Date('2024-01-15T08:30:00'),
      productsQuantity: 0, // Será atualizado depois
      itemsQuantity: 0     // Será atualizado depois
    },
    {
      orderDate: new Date('2024-01-16'),
      time: new Date('2024-01-16T10:15:00'),
      productsQuantity: 0,
      itemsQuantity: 0
    },
    {
      orderDate: new Date('2024-01-17'),
      time: new Date('2024-01-17T14:45:00'),
      productsQuantity: 0,
      itemsQuantity: 0
    },
    {
      orderDate: new Date('2024-01-18'),
      time: new Date('2024-01-18T09:20:00'),
      productsQuantity: 0,
      itemsQuantity: 0
    }
  ]

  const createdOrders = await prisma.order.createMany({
    data: orders
  })
  console.log(`✅ ${createdOrders.count} pedidos criados`)

  // Buscar pedidos criados
  const ordersData = await prisma.order.findMany()

  // 4. Criar Itens de Pedidos
  const orderItems = [
    // Pedido 1 - Frutas
    { orderId: ordersData[0].id, productId: productsData[0].id, quantity: 2.5, unitType: UnitType.KG}, // Banana Prata
    { orderId: ordersData[0].id, productId: productsData[1].id, quantity: 1.2, unitType: UnitType.KG}, // Maçã Fuji
    { orderId: ordersData[0].id, productId: productsData[2].id, quantity: 3.0, unitType: UnitType.KG}, // Laranja Pera
    { orderId: ordersData[0].id, productId: productsData[4].id, quantity: 1, unitType: UnitType.UNIT}, // Abacaxi Pérola
    { orderId: ordersData[0].id, productId: productsData[11].id, quantity: 0.5, unitType: UnitType.KG}, // Morango
    
    // Pedido 2 - Legumes
    { orderId: ordersData[1].id, productId: productsData[12].id, quantity: 1.5, unitType: UnitType.KG}, // Tomate Salada
    { orderId: ordersData[1].id, productId: productsData[13].id, quantity: 3, unitType: UnitType.UNIT}, // Alface Americana
    { orderId: ordersData[1].id, productId: productsData[15].id, quantity: 0.8, unitType: UnitType.KG}, // Pimentão Verde
    { orderId: ordersData[1].id, productId: productsData[16].id, quantity: 0.5, unitType: UnitType.KG}, // Pimentão Vermelho
    { orderId: ordersData[1].id, productId: productsData[19].id, quantity: 1, unitType: UnitType.KG}, // Brócolis
    { orderId: ordersData[1].id, productId: productsData[21].id, quantity: 0.3, unitType: UnitType.KG}, // Espinafre
    
    // Pedido 3 - Tubérculos
    { orderId: ordersData[2].id, productId: productsData[24].id, quantity: 5, unitType: UnitType.KG}, // Batata Inglesa
    { orderId: ordersData[2].id, productId: productsData[25].id, quantity: 2, unitType: UnitType.KG}, // Batata Doce
    { orderId: ordersData[2].id, productId: productsData[26].id, quantity: 1, unitType: UnitType.KG}, // Cebola Branca
    { orderId: ordersData[2].id, productId: productsData[29].id, quantity: 1.5, unitType: UnitType.KG}, // Cenoura
    { orderId: ordersData[2].id, productId: productsData[30].id, quantity: 1, unitType: UnitType.KG}, // Beterraba
    
    // Pedido 4 - Mix de produtos
    { orderId: ordersData[3].id, productId: productsData[3].id, quantity: 2, unitType: UnitType.KG}, // Mamão Formosa
    { orderId: ordersData[3].id, productId: productsData[7].id, quantity: 1, unitType: UnitType.UNIT}, // Melancia
    { orderId: ordersData[3].id, productId: productsData[14].id, quantity: 2, unitType: UnitType.UNIT}, // Pepino
    { orderId: ordersData[3].id, productId: productsData[17].id, quantity: 1, unitType: UnitType.UNIT}, // Berinjela
    { orderId: ordersData[3].id, productId: productsData[28].id, quantity: 0.2, unitType: UnitType.KG}, // Alho
    { orderId: ordersData[3].id, productId: productsData[33].id, quantity: 1, unitType: UnitType.KG}, // Mandioca
    { orderId: ordersData[3].id, productId: productsData[35].id, quantity: 0.3, unitType: UnitType.KG}  // Gengibre
  ]

  const createdOrderItems = await prisma.orderItem.createMany({
    data: orderItems
  })

  console.log(`✅ ${createdOrderItems.count} itens de pedidos criados`)

  // 5. Atualizar quantidades nos pedidos
  for (const order of ordersData) {
    const orderItemsCount = await prisma.orderItem.count({
      where: { orderId: order.id }
    })
    
    const orderItemsSum = await prisma.orderItem.aggregate({
      where: { orderId: order.id },
      _sum: { quantity: true }
    })

    await prisma.order.update({
      where: { id: order.id },
      data: {
        productsQuantity: orderItemsCount,
        itemsQuantity: Math.round(Number(orderItemsSum._sum.quantity || 0))
      }
    })
  }

  console.log('✅ Quantidades dos pedidos atualizadas')

  // 6. Estatísticas finais
  const stats = {
    products: await prisma.product.count(),
    categories: await prisma.category.count(),
    orders: await prisma.order.count(),
    orderItems: await prisma.orderItem.count()
  }

  console.log('📊 Estatísticas do banco de dados:')
  console.log(`   - Categorias: ${stats.categories}`)
  console.log(`   - Produtos: ${stats.products}`)
  console.log(`   - Pedidos: ${stats.orders}`)
  console.log(`   - Itens de pedidos: ${stats.orderItems}`)

    console.log('🎉 Seed concluído com sucesso!')
  } catch (error) {
    console.error('❌ Erro durante o seed:')
    console.error(error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })