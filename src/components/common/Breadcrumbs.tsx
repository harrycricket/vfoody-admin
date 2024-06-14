import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import Link from 'next/link';

interface BreadcrumbsProps {
  root: string;
  extra?: string;
  rootName: string;
  extraName?: string;
  childrenName?: string;
}

export default function BreadcrumbsCustom({
  root,
  extra,
  rootName,
  extraName,
  childrenName,
}: BreadcrumbsProps) {
  return (
    <>
      <Breadcrumbs size="lg" className="my-8">
        <BreadcrumbItem>
          <Link href={`/${root}`} className="opacity-50 hover:opacity-100 font-medium">
            {rootName}
          </Link>
        </BreadcrumbItem>
        {extra && (
          <BreadcrumbItem>
            <Link href={`/${extra}`} className="opacity-50 hover:opacity-100 font-medium">
              {extraName}
            </Link>
          </BreadcrumbItem>
        )}
        <BreadcrumbItem>
          <p className="font-medium">{childrenName}</p>
        </BreadcrumbItem>
      </Breadcrumbs>
    </>
  );
}
