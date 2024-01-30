import { useState } from "react";
import cn from 'classnames';
import { AddBrandForm } from "../../components/AdminAddComponents/AddBrandForm/AddBrandForm";
import { AdminTabs } from "../../utils/adminActiveTabs";
import { AdminTabTitles } from "../../utils/enumAdminTabs";
import { AddProductForm } from "../../components/AdminAddComponents/AddProductForm/AddProductForm";
import { AddCountryForm } from "../../components/AdminAddComponents/AddCountryForm/AddCountryForm";
import { AddImageToProductForm } from "../../components/AdminAddComponents/AddImageToProductForm/AddImageToProductForm";
import { AddProductVariationForm } from "../../components/AdminAddComponents/AddProductVariationForm/AddProductVariationForm";
import { AddVariationsDetailsForm } from "../../components/AdminAddComponents/AddVariationsDetailsForm/AddVariationsDetailsForm";
import { AdminHeader } from "../../components/AdminUI/AdminHeader/AdminHeader";
import { AddCategoryComponent } from "../../components/AdminAddComponents/AddCategory/AddCategoryForm";
import { TabWrapper } from "../../components/TabComponents/TabWrapper/TabWrapper";
import './AdminPageAdd.scss';

export const AdminPageProduct = () => {
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className="adminpage">
      <AdminHeader />
      <div className="adminpage__container">
        <ul className="adminpage__tabs">
          {AdminTabs.add.map(tab => (
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
          <TabWrapper activeTab={activeTab === AdminTabTitles.Add.ADD_PRODUCT}>
            <AddProductForm />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Add.ADD_BRAND}>
            <AddBrandForm />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Add.ADD_COUNTRY}>
            <AddCountryForm />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Add.ADD_IMAGE}>
            <AddImageToProductForm />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Add.ADD_CATEGORY}>
            <AddCategoryComponent />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Add.ADD_PRODUCT_VARIATION}>
            <AddProductVariationForm />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Add.ADD_VARIATION_DETAILS}>
            <AddVariationsDetailsForm />
          </TabWrapper>
        </div>
      </div>
    </div>
  );
};