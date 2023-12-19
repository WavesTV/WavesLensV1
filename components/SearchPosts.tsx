import {
  ActionIcon,
  Modal,
  Image,
  TextInput,
  Space,
  useMantineTheme,
  Text,
  Group,
  Loader,
  UnstyledButton,
  Avatar,
  Box,
  ScrollArea,
  HoverCard,
  Grid,
  Button
} from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/router";
import { TbUserSearch } from "react-icons/tb";
import { BiSearchAlt } from "react-icons/bi";
import { useSearchProfiles, LimitType, useSearchPublications, SearchPublicationType  } from '@lens-protocol/react-web';
import { IconCheck, IconX } from "@tabler/icons-react";
import classes from "../styles/RecommendedWaves.module.css";
import Post from "@/components/Post";
import { FaCommentDots } from "react-icons/fa6";
import { MdComment } from "react-icons/md";


type SearchResultsProps = {
  query: string;
  closeSearch: () => void; 
};

export const SearchPosts = ({ query, closeSearch }: SearchResultsProps) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const [searchInput, setSearchInput] = useState(""); 
  const { data, error, loading } = useSearchPublications ({ query: searchInput,
    limit: LimitType.TwentyFive,
    where: { publicationTypes: [SearchPublicationType.Post]},
        });





  return (
    <>
      <TextInput
        ml={2}
        radius="md"
        size="md"
        placeholder="Search Lens Posts"
        variant="filled"
        value={searchInput} // Set the value of the input field
        onChange={(e) => {
          setSearchInput(e.target.value);

        }}
        error={data && data.length === 0 && searchInput.length > 0 &&  ("No Posts Found")}
        leftSection={<MdComment color={theme.colors.blue[6]} size="1.3rem" />}
   
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
      <Grid.Col span={4}><Button onClick={() => {setSearchInput("Lens V2")}} fullWidth size="compact-md" variant="light"><Text size="xs">Lens v2</Text></Button></Grid.Col>
      <Grid.Col span={4}><Button onClick={() => {setSearchInput("Orna")}}  fullWidth size="compact-md" variant="light"><Text size="xs">Orna</Text></Button></Grid.Col>
      <Grid.Col span={4}><Button onClick={() => {setSearchInput("bjj")}}  fullWidth size="compact-md" variant="light"><Text size="xs">Bjj</Text></Button></Grid.Col>
      <Grid.Col span={4}><Button onClick={() => {setSearchInput("Free Palestin")}}  fullWidth size="compact-md" variant="light"><Text size="xs">Free Palestine</Text></Button></Grid.Col>
      <Grid.Col span={4}><Button onClick={() => {setSearchInput("Waves")}}  fullWidth size="compact-md" variant="light"><Text size="xs">Waves</Text></Button></Grid.Col>
    </Grid>
   
    <Space h="xs"/>
      {data && data.length > 0 && searchInput.length > 0 && (
        <>
      
        {data.map((post: any) => (
             <HoverCard
          key={post?.id}
          width={555}
          shadow="md"
          withArrow
        >
           <Box>
  <UnstyledButton
    onClick={() => {
      router.push(`/post/${post?.id}`);
      closeSearch();
    }}
    className={classes.user}
    style={{ display: 'flex', alignItems: 'center' }} // Add flex styling here
  >
    <Group style={{ width: '100%', alignItems: 'center' }}>
    
    <HoverCard.Target>
     {post?.metadata.__typename === "ImageMetadataV3" ? (
    <Image
      alt={`${post.by.handle?.localName}'s post`}
      w={50}
      h={50}
      radius="md"
      src={post?.metadata?.asset?.image?.optimized?.uri}/>
     ):(
        <Avatar
                    alt={`${post.by.localName}'s profile picture`}
                    // @ts-ignore
                    src={
                      post.by.metadata?.picture &&
                      "optimized" in post.by.metadata?.picture
                        ? post.by.metadata?.picture.optimized?.uri
                        : "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
                    }
                    radius="xl"
                  />
     )}
    </HoverCard.Target>

      <div style={{ flex: 1, overflow: 'hidden' }}> 
        <Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} size='sm' truncate="end">{post?.metadata?.content}</Text>

        
      </div>

      {/* Add any additional elements here if needed */}
    </Group>
  </UnstyledButton>
</Box>

            <HoverCard.Dropdown>
                <ScrollArea.Autosize scrollbars="y" offsetScrollbars scrollbarSize={8} mah={555}  mx="auto">
              <Post key={post.id} post={post} />
                </ScrollArea.Autosize>
            </HoverCard.Dropdown>
          
        </HoverCard>

            ))}
            
     </>
     )}
    </>
  );
};
