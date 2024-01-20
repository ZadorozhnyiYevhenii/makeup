import { useState } from "react";
import cn from 'classnames';
import { AdminTabs } from "../../utils/adminActiveTabs";
import { ChangeProduct } from "../../components/AdminChangeComponents/ChangeProduct/ChangeProduct";
import { AdminTabTitles } from "../../utils/enumAdminTabs";
import { ChangeProductVariation } from "../../components/AdminChangeComponents/ChangeProductVariation/ChangeProdutVariation";
import { AdminHeader } from "../../components/AdminUI/AdminHeader/AdminHeader";
import { ChangeVariationDetailsComponent } from "../../components/AdminChangeComponents/ChangeVariationDetails/ChangeVariationDetails";
import { TabWrapper } from "../../components/TabComponents/TabWrapper/TabWrapper";

export const AdminPageChange = () => {
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className="adminpage">
      <AdminHeader />
      <div className="adminpage__container">
        <div className="adminpage__tabs">
          {AdminTabs.change.map(tab => (
            <li
              className={cn("adminpage__tab", { 'active': activeTab === tab.value })}
              onClick={() => setActiveTab(tab.value)}
              key={tab.id}
            >
              {tab.name}
            </li>
          ))}
        </div>
        <div>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Change.CHANGE__PRODUCT}>
            <ChangeProduct />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Change.CHANGE_PRODUCT_VARIATION}>
            <ChangeProductVariation />
          </TabWrapper>
          <TabWrapper activeTab={activeTab === AdminTabTitles.Change.CHANGE_VARIATION_DETAILS}>
            <ChangeVariationDetailsComponent />
          </TabWrapper>
        </div>
      </div>
    </div>
  )
}