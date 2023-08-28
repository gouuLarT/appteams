import { useNavigation, useRoute } from '@react-navigation/native'
import { useState, useEffect, useRef } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayCard } from '@components/Playercard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroup } from '@storage/player/playerGetByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'

import { AppError } from '@utils/AppError'

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'

type RouteParams = {
  group: string;
}

export function Players(){
  const [newPlayerName, setNewPlayerName] = useState  ('')
  const [team, setTeam] = useState('Team A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])


  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer(){
    if (newPlayerName.trim().length === 0){
      return Alert.alert("New Person", "Please, provide the person's name for add" )
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try{
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');
      fetchPlayersByTeam();

    } catch (error) {
      if (error instanceof AppError){
        Alert.alert('New person', error.message);
      }else{
        console.log(error)
        Alert.alert('New person', 'Unable to add')
      }
    }
  }


  async function fetchPlayersByTeam(){
    try{
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch(error) {
      console.log(error)
      Alert.alert('People','Unable to load the people')
    }
  }

  async function handlePlayerRemove(playerName: string){
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert('Remove person', 'Unable to remove this person')
    }
  }

  async function groupRemove(){
    try {
      await groupRemoveByName(group);

      navigation.navigate('groups')

    } catch (error) {
      Alert.alert('Remove group', 'Unable to remove the group')
    }
  }

  async function handleGroupRemove(){
    Alert.alert(
      'Remove',
      'Do you want to remove the group?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => groupRemove() }
      ]
    );
  }


  useEffect(()=>{
    fetchPlayersByTeam();
  },[team])

  return(
    <Container>
    <Header showBackButton />

    <Highlight
    title={group}
    subtitle='Add the folks and organize the teams.'
    />

    <Form>

    <Input
    onChangeText={setNewPlayerName}
    inputRef={newPlayerNameInputRef}
    value={newPlayerName}
    placeholder="Person's name"
    onSubmitEditing={handleAddPlayer}
    returnKeyType="done"
    autoCorrect={false}/>


    <ButtonIcon
    icon="add"
    onPress={handleAddPlayer}
    />
    </Form>

    <HeaderList>
    <FlatList
      data={['Team A', 'Team B']}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <Filter
          title={item}
          isActive={item === team}
          onPress={() => setTeam(item)}
        />
      )}
      horizontal
    />
      <NumbersOfPlayers>
        {players.length}
      </NumbersOfPlayers>
     </HeaderList>

     <FlatList
    data={players}
    keyExtractor={item => item.name}
    renderItem={({ item }) => (
      <PlayCard
      name={item.name}
      onRemove={() =>  handlePlayerRemove(item.name)}
      />
    )}
    ListEmptyComponent={() => (
      <ListEmpty
        message='There are no people on this team'
      />
    )}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={[
      { paddingBottom: 100 },
      players.length === 0 && {flex: 1}
    ]}
      />

      <Button
        title='Remove group'
        type='SECONDARY'
        onPress={handleGroupRemove}
      />
    </Container>
  )
}