import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'

import api from '../../services/api'

//A logo sera importada automaticamnete de acordo com seu dispositivo
import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Incidents() {
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)

    //scroll infinito
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident })
    }

    //Carregando a lista de incidents da API
    async function loadIncidents() {

        //scroll infinito
        if (loading) {
            return
        }

        if (total > 0 && incidents.length === total) {
            return
        }

        setLoading(true)

        const response = await api.get('incidents', {
            params: { page }
        })
        
        //Colocando os dados que vieram na response dentro de um state
        setIncidents([...incidents, ...response.data])// setIncidents(response.data)
        
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }
    
    //Mostrando esses dados em tela
    useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                data={incidents}// data={[1, 2, 3, 4, 5]}
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)} //String(incident)}
                showsVerticalScrollIndicator={false}

                //function disparada automaticamente quando o usuario chegar ao final da lista
                onEndReached={loadIncidents}//scroll infinito
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL' 
                            })
                            .format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            //Passando os valores da function para onPress
                            onPress={() => navigateToDetail(incident)} // onPress={() => {}}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}