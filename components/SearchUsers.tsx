import {
  ActionIcon,
  Modal,
  Button,
  TextInput,
  Space,
  useMantineTheme,
  Text,
  Group,
  Loader,
  UnstyledButton,
  Avatar,
  Grid
} from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/router";
import { TbUserSearch } from "react-icons/tb";
import { BiSearchAlt } from "react-icons/bi";
import { useSearchProfiles, LimitType } from '@lens-protocol/react-web';
import { IconCheck, IconX } from "@tabler/icons-react";
import classes from "../styles/RecommendedWaves.module.css";
import { TbUserFilled } from "react-icons/tb";

type SearchResultsProps = {
  query: string;
  closeSearch: () => void; 
};

export const SearchUsers = ({ query, closeSearch }: SearchResultsProps) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const [searchInput, setSearchInput] = useState(""); 
  const { data, error, loading } = useSearchProfiles({ query: searchInput,
    limit: LimitType.TwentyFive });





  return (
    <>
      <TextInput
        ml={2}
        radius="md"
        size="md"
        placeholder="Search Lens Users"
        variant="filled"
        value={searchInput} // Set the value of the input field
        onChange={(e) => {
          setSearchInput(e.target.value);

        }}
        error={data && data.length === 0 && searchInput.length > 0 &&  ("No Users Found")}
        leftSection={<TbUserFilled size="1.3rem" color={theme.colors.blue[6]}/>}
   
           rightSection={
          searchInput.length > 0 && loading ? (
            <Loader size={19} />
          ) : (
            searchInput.length > 0 && (
              <ActionIcon
                size={32}
                radius="sm"
                color="red"
                variant="light"
                onClick={() => {setSearchInput("")}}
              >
                <IconX size="1.1rem" />
              </ActionIcon>
            )
          )
        }
        
        rightSectionWidth={42}
      />
<Space h="xs"/>
    
    <Grid grow gutter="xs">
      <Grid.Col span={4}><Button onClick={() => {router.push("/wave/titannode"); closeSearch();}} fullWidth size="compact-md" variant="light"><Text size="xs">Titan Node</Text></Button></Grid.Col>
      <Grid.Col span={4}><Button onClick={() => {router.push("/wave/ornaart"); closeSearch();}} fullWidth size="compact-md" variant="light"><Text size="xs">Orna</Text></Button></Grid.Col>
      <Grid.Col span={4}><Button onClick={() => {router.push("/wave/stani"); closeSearch();}} fullWidth size="compact-md" variant="light"><Text size="xs">Stani</Text></Button></Grid.Col>
      <Grid.Col span={4}><Button onClick={() => {router.push("/wave/krassenstein"); closeSearch();}}  fullWidth size="compact-md" variant="light"><Text size="xs">Krassenstein</Text></Button></Grid.Col>
      <Grid.Col span={4}><Button onClick={() => {router.push("/wave/nader"); closeSearch();}}  fullWidth size="compact-md" variant="light"><Text size="xs">Nader Dabit</Text></Button></Grid.Col>
    </Grid>
      <Space h="xs"/>

      {data && data.length > 0 && searchInput.length > 0 && (
        
        <>
        {data.map((user: any) => (
              <Group key={user?.id}>
                 <UnstyledButton
                onClick={() => {
                  router.push(`/wave/${user.handle?.localName}`);
                  closeSearch();
                }}
                className={classes.user}
              >
                <Group>
                  <Avatar
                    alt={`${user.handle?.localName}'s profile picture`}
                    // @ts-ignore
                    src={
                      user.metadata?.picture &&
                      "optimized" in user.metadata?.picture
                        ? user.metadata?.picture.optimized?.uri
                        : "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
                    }
                    radius="xl"
                  />

                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      {user.metadata?.displayName || user.handle?.localName}
                    </Text>

                    <Text c="dimmed" size="xs">
                      @{user.handle?.localName}
                    </Text>
                  </div>
                </Group>
              </UnstyledButton>
              </Group>
            ))}
    
     </>
     )}
    </>
  );
};
