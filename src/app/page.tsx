'use client'
import { Container } from "@qasirdev/common-ui";
import { ClientOnly } from "@qasirdev/common-ui";
import ListingList from "@/components/listings/ListingList";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0.01;
export interface HomeProps {
  searchParams: IListingsParams
};

const Home = ({ searchParams }: HomeProps) => {

  return (
    <ClientOnly>
      <Container>
        <div 
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          <ListingList searchParameters={searchParams} />
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;
