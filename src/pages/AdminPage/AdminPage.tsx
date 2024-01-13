import { AdminNavigation } from "../../components/AdminUI/AdminNavigation/AdminNavigation"
import './AdminPage.scss';

export const AdminPage = () => {
  return (
    <div className="admin-panel">
      <h1>Dashboard</h1>
      <AdminNavigation />
    </div>
  )
}