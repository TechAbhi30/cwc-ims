import { Routes, Route, Navigate } from 'react-router'
import { AuthProvider } from './store/AuthContext'
import { ToastProvider } from './store/ToastContext'
import Toast from './components/ui/Toast'

// Layout
import AppLayout from './components/layout/AppLayout'

// Auth
import LoginPage from './features/auth/pages/LoginPage'
import SetupPage from './features/auth/pages/SetupPage'

// Pages
import DashboardPage from './features/dashboard/pages/DashboardPage'
import EmployeesPage from './features/employees/pages/EmployeesPage'
import AssetsPage from './features/assets/pages/AssetsPage'
import AssignmentsPage from './features/assignments/pages/AssignmentsPage'
import ConsumablesPage from './features/consumables/pages/ConsumablesPage'
import CategoriesPage from './features/categories/pages/CategoriesPage'
import CategoryFieldsPage from './features/categories/pages/CategoryFieldsPage'
import ReportsPage from './features/reports/pages/ReportsPage'

const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <Toast />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setup" element={<SetupPage />} />

          {/* Protected routes */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/consumables" element={<ConsumablesPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:id/fields" element={<CategoryFieldsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </ToastProvider>
  )
}

export default App
