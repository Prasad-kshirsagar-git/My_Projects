import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonLabel } from '@ionic/react';

const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignup = () => {
    console.log('Signup details:', { name, email, password });
    // Add signup logic here
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Signup</h2>
        <IonLabel>Name</IonLabel>
        <IonInput
          placeholder="Name"
          value={name}
          onIonChange={(e) => setName(e.detail.value!)}
        />
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
        <IonButton expand="block" onClick={handleSignup}>
          Signup
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
