
import ClientOnly from "@/components/ClientOnly";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = () => {
  return (
    <ClientOnly>
      <PropertiesClient />
    </ClientOnly>
  );
}
 
export default PropertiesPage;
