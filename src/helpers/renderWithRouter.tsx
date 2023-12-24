import { render } from "@testing-library/react"
import { ReactNode } from "react"
import { MemoryRouter } from "react-router-dom"

export const renderWithRouter = (component: ReactNode, initialRoute = '/makeup/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      {component}
    </MemoryRouter>
  );
}