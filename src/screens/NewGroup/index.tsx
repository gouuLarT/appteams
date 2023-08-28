import { useState } from 'react';
import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles'
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';

export function NewGroup(){
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleNew() {
      try {
      if (group.trim().length === 0){
        return Alert.alert('New Group', 'Provide the class name')
      }
      await groupCreate(group);
        navigation.navigate('players', {group});

      } catch (error) {
        if(error instanceof AppError){
        Alert.alert('New Group', error.message);
        } else {
          Alert.alert('New Group', 'It was not possible to create a new project');
        }
        }
}

  return(
    <Container>
      <Header showBackButton />

      <Content>
      <Icon />

      <Highlight
        title='New group'
        subtitle='Create the team to add people'
      />

      <Input
        placeholder='Group name'
        onChangeText={setGroup}
      />

      <Button
         title='Create'
         onPress={handleNew}
        />
      </Content>
    </Container>
  );
}