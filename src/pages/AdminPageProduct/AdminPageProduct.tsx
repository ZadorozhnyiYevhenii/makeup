import { useState } from "react";
import cn from 'classnames';
import { AddProductForm } from "../../components/AddProductForm/AddProductForm";
import './AdminPageProduct.scss';
import { TabWrapper } from "../../components/TabWrapper/TabWrapper";
import { AddBrandForm } from "../../components/AddBrandForm/AddBrandForm";
import { AddCountryForm } from "../../components/AddCountryForm/AddCountryForm";
import { AddImageToProductForm } from "../../components/AddImageToProductForm/AddImageToProductForm";
import { AddProductVariationForm } from "../../components/AddProductVariationForm/AddProductVariationForm";
import { AddVariationsDetailsForm } from "../../components/AddVariationsDetailsForm/AddVariationsDetailsForm";
import { DashBoardNavigation } from "../../components/DashBoardNavigation/DashBoardNavigation";

export const AdminPageProduct = () => {
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className="adminpage">
      <div className="adminpage__top">
        <div className="adminpage__title">
          Dashboard
        </div>
        <DashBoardNavigation />
      </div>
      <div className="adminpage__container">
        <div className="adminpage__tabs">
          <div
            className={cn("adminpage__tab", { 'active': activeTab === 'addProduct' })}
            onClick={() => setActiveTab('addProduct')}
          >
            Add product
          </div>
          <div
            className={cn("adminpage__tab", { 'active': activeTab === 'addBrand' })}
            onClick={() => setActiveTab('addBrand')}
          >
            Add brand
          </div>
          <div
            className={cn("adminpage__tab", { 'active': activeTab === 'addCountry' })}
            onClick={() => setActiveTab('addCountry')}
          >
            Add country
          </div>
          <div
            className={cn("adminpage__tab", { 'active': activeTab === 'addImage' })}
            onClick={() => setActiveTab('addImage')}
          >
            Add Image to Product
          </div>
          <div
            className={cn("adminpage__tab", { 'active': activeTab === 'addProductVariation' })}
            onClick={() => setActiveTab('addProductVariation')}
          >
            Add product variation
          </div>
          <div
            className={cn("adminpage__tab", { 'active': activeTab === 'v' })}
            onClick={() => setActiveTab('addVariationsDetails')}
          >
            Add variations details
          </div>
        </div>
        <div>
          <TabWrapper activeTab={activeTab === 'addProduct'}>
            <AddProductForm />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === 'addBrand'}>
            <AddBrandForm />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === 'addCountry'}>
            <AddCountryForm />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === 'addImage'}>
            <AddImageToProductForm />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === 'addProductVariation'}>
            <AddProductVariationForm />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === 'addVariationsDetails'}>
            <AddVariationsDetailsForm />
          </TabWrapper>
        </div>
      </div>
    </div>
  );
};