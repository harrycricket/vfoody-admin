import useIdListState from '@/hooks/states/useIdListState';
import { formatCurrency } from '@/util';
import { Card } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  productId: number;
  shopId: number;
  name: string;
  des: string;
  price: number;
  image: string;
};

export default function Product({ productId, shopId, name, price, image, des }: Props) {
  const { setProductId, setShopId } = useIdListState();
  const router = useRouter();
  const handleClick = () => {
    setProductId(productId);
    setShopId(shopId);
    router.push(`/shops/shop-details/product-details?shopId=${shopId}&productId=${productId}`);
  };
  return (
    <div className="w-1/2 cursor-pointer" onClick={handleClick}>
      <Card className="space-y-5 p-6 shadow-xl mb-4 mr-4" radius="md">
        <div className="flex items-center gap-4">
          <Image
            src={image}
            width={120}
            height={120}
            alt="image product"
            loading="lazy"
            quality={100}
            className="rounded-lg"
          />
          <div className="">
            <h3 className="text-xl font-bold">{name}</h3>
            <p>{des}</p>
            <p className="text-primary font-bold">{formatCurrency(price)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
