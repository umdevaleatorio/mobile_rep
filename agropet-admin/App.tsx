import React from 'react';
import { AuthProvider } from './src/presentation/contexts/AuthContext';
import AppNavigator from './src/presentation/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
