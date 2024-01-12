import { useState } from "react";
import cn from 'classnames';
import { AddProductForm } from "../../components/AddProductForm/AddProductForm";
import { TabWrapper } from "../../components/TabWrapper/TabWrapper";
import { AddBrandForm } from "../../components/AddBrandForm/AddBrandForm";
import { AddCountryForm } from "../../components/AddCountryForm/AddCountryForm";
import { AddImageToProductForm } from "../../components/AddImageToProductForm/AddImageToProductForm";
import { AddProductVariationForm } from "../../components/AddProductVariationForm/AddProductVariationForm";
import { AddVariationsDetailsForm } from "../../components/AddVariationsDetailsForm/AddVariationsDetailsForm";
import { AdminTabs } from "../../utils/adminActiveTabs";
import { AdminTabTitles } from "../../utils/enumAdminTabs";
import { AdminHeader } from "../../components/AdminHeader/AdminHeader";
import './AdminPageProduct.scss';

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