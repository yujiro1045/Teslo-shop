import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import SizeSelector from "@/components/product/sise-selector/SizeSelector";
import ProductMobileSlideshow from "@/components/product/slideshow/ProductMobileSlideshow";
import ProductSlideShow from "@/components/product/slideshow/ProductSlideshow";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductBySlugPage({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((product) => product.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2 ">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
        {/* Desktop Slideshow */}
        <ProductSlideShow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Detallles */}
      <div className="col-span-1 px-5 ">
        <h1
          className={` ${titleFont.className} antialiased font-bold text-xl `}
        >
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
