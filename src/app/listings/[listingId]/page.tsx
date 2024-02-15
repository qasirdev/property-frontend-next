'use client'
import { ClientOnly } from "@qasirdev/common-ui";
import ListingClient from "./ListingClient";

 export interface IParams {
  listingId?: string;
}

const ListingPage = ({ params }: { params: IParams }) => {

  return (
    <ClientOnly>
      <ListingClient params={params}/>
    </ClientOnly>
  );
}
 
export default ListingPage;
