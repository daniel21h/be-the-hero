import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import './styles.css'


export default function Register() {

    // Armazenando os dados recebidos nos input's e enviando para a API
    //name=valor e setName=atualiza o valor
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    //Enviando o usuario ed volta a page de login apos o cadastro
    const history = useHistory()

    async function handleRegister(e) {
        //Chamando o (e) na function e evitando o compaortamento padrao de recarregamento da pagina // ao realizar o cadastro
        e.preventDefault()

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        //Enviando dados para API
        try {
            const response = await api.post('ongs', data)
            //Se der certo
            alert(`Seu ID de acesso: ${response.data.id}`)

            //Enviando o usuario ed volta a page de login apos o cadastro
            history.push('/')
            //Se falhar
        } catch (err) {
            alert('Erro no cadastro, tente novamente.')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Nao tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG" 
                        //props. que estao abaixo only devem ser definidas apos a conexao com API
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input 
                        type="email"
                        placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="WhatsApp" 
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade" 
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }} 
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}