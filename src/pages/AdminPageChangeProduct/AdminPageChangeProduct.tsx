import { useState } from "react";
import cn from 'classnames';
import { AdminHeader } from "../../components/AdminHeader/AdminHeader";
import { AdminTabs } from "../../utils/adminActiveTabs";
import { ChangeProduct } from "../../components/ChangeProduct/ChangeProduct";
import { TabWrapper } from "../../components/TabWrapper/TabWrapper";
import { AdminTabTitles } from "../../utils/enumAdminTabs";
import { ChangeProductVariation } from "../../components/ChangeProductVariation/ChangeProdutVariation";

export const AdminPageChangeProduct = () => {
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
        </div>
      </div>
    </div>
  )
}