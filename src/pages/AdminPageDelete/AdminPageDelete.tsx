import { useState } from "react"
import cn from 'classnames';
import { AdminTabs } from "../../utils/adminActiveTabs";
import { TabWrapper } from "../../components/TabWrapper/TabWrapper";
import { AdminTabTitles } from "../../utils/enumAdminTabs";
import { DeleteBrandComponent } from "../../components/AdminDeleteComponents/DeleteBrand/DeleteBrandComponent";
import { DeleteCategoryComponent } from "../../components/AdminDeleteComponents/DeleteCategory/DeleteCategory";
import { DeleteCountryComponent } from "../../components/AdminDeleteComponents/DeleteCountry/DeleteCountry";
import { DeleteProductComponent } from "../../components/AdminDeleteComponents/DeleteProduct/DeleteProduct";
import { DeleteProductVariationComponent } from "../../components/AdminDeleteComponents/DeleteProductVariation/DeleteProductVariation";
import { AdminHeader } from "../../components/AdminUI/AdminHeader/AdminHeader";
import { DeleteVariationDetailsComponent } from "../../components/AdminDeleteComponents/DeleteVariationsDetails/DeleteVariationsDetails";

export const AdminPageDeleteProduct = () => {
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className="adminpage">
      <AdminHeader />
      <div className="adminpage__container">
        <ul className="adminpage__tabs">
          {AdminTabs.deleters.map(tab => (
            <li
              className={cn("adminpage__tab", { 'active': activeTab === tab.value })}
              onClick={() => setActiveTab(tab.value)}
              key={tab.id}
            >
              {tab.name}
            </li>
          ))}
        </ul>

        <div>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Delete.DELETE_VARIATIONS_DETAILS}>
            <DeleteVariationDetailsComponent />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Delete.DELETE_PRODUCTVARIATION}>
            <DeleteProductVariationComponent />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Delete.DELETE_PRODUCT}>
            <DeleteProductComponent />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Delete.DELETE_BRAND}>
            <DeleteBrandComponent />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Delete.DELETE_CATEGORY}>
            <DeleteCategoryComponent />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Delete.DELETE_COUNTRY}>
            <DeleteCountryComponent />
          </TabWrapper>
        </div>
      </div>
    </div>
  )
}