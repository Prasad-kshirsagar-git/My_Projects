import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonLabel } from '@ionic/react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    console.log('Login details:', { email, password });
    // Call the login API here
    // Example: login(email, password).then(response => handleResponse(response));
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Login</h2>
        <IonLabel>Email</IonLabel>
        <IonInput
          placeholder="Email"
          type="email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
        <IonLabel>Password</IonLabel>
        <IonInput
          placeholder="Password"
          type="password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
