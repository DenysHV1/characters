import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SessionProvider } from '../entities/session'
import { ProtectedRoute } from './router/ProtectedRoute'
import { Navbar } from '../widgets/navbar'
import { HomePage } from '../pages/home'
import { AuthPage } from '../pages/auth'
import { ErrorPage } from '../pages/error'
import { PartyPage } from '../pages/party'
import { CharacterFormPage } from '../pages/character-form'
import { Container } from '../shared/ui/Container.jsx'

export const App = () => (
  <BrowserRouter>
    <SessionProvider>
      <Container>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/party/:partyId" element={<ProtectedRoute><PartyPage /></ProtectedRoute>} />
          <Route path="/characters/new" element={<ProtectedRoute><CharacterFormPage /></ProtectedRoute>} />
          <Route path="/characters/:id/edit" element={<ProtectedRoute><CharacterFormPage /></ProtectedRoute>} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Container>
    </SessionProvider>
  </BrowserRouter>
)
