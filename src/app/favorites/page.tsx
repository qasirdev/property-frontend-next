'use client'
import { ClientOnly } from "@qasirdev/common-ui";

import FavoritesClient from "./FavoritesClient";

const ListingPage = () => {
  return (
    <ClientOnly>
      <FavoritesClient />
    </ClientOnly>
  );
}
 
export default ListingPage;
