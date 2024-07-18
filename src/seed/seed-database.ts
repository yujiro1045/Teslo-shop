import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  // 1. Borrar registros previos
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  const { categories, products } = initialData;

  // Categorias

  /*  {
    name: "Shirts";
  } */
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;

    return map;
  }, {} as Record<string, string>); // <string=shirt, string=categoryID>

  // Productos
  const { images, type, ...product1 } = products[0];

  /* await prisma.product.create({
    data: {
      ...product1,
      categoryId: categoriesMap["shirts"],
    },
  }); */

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // Images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("Seed ejecutando correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
