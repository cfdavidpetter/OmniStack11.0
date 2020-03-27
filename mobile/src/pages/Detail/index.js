import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import * as MailComposer from "expo-mail-composer";

import styles from "./styles";

import logoImg from "../../assets/logo.png";

export default function Detail() {
  const route = useRoute();
  const nagevation = useNavigation();

  const incident = route.params.incident;
  const message = `Olá "${incident.name}" gostaria de ajuda no caso "${incident.title}" com o valor de R$ 120,00`;

  function navegationBack() {
    nagevation.goBack();
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: 'Herói do caso: Cachorro Atropelado',
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        
        <TouchableOpacity onPress={navegationBack} >
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{incident.value}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o Herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp} >
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendEmail} >
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}