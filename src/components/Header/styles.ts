import { CaretLeft } from "phosphor-react-native";
import { useTheme } from "styled-components";
import styled  from "styled-components/native";

export const Container = styled.View`
  width: 100%;

  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Logo = styled.Image`
  width: 46px;
  height: 55px;
  margin-top: 5px;
`;

export const BackButton = styled.TouchableOpacity`
  flex:1;

`;

export const BackIcon = styled(CaretLeft).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.WHITE
}))`

`;
