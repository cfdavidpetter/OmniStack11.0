import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";

import api from "../../services/api";

import styles from "./styles";

import logoImg from "../../assets/logo.png";

export default function Incidents() {
  const nagevation = useNavigation();

  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setloading] = useState(false);

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length == total) {
      return;
    }

    setloading(true);

    const res = await api.get('incidents', {
      params: { page }
    });
    setIncidents([...incidents, ...res.data]);
    setTotal(res.headers['x-total-count']);    

    setPage(page + 1);
    setloading(false);
  }

  function navegationToDetail(incident) {
    nagevation.navigate('Detail', { incident });
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList 
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => navegationToDetail(incident)} >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )} />
    </View>
  );
}