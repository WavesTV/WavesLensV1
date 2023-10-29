
import React, { use, useEffect, useMemo, useState } from "react";
import { Icons } from "./icons";
import formatDate from "@/lib/formatDate";
import Link from "next/link";
import {
  useCreateMirror,
  useCollect,
  useReaction,
  Post,
  Comment,
  ReactionTypes,
  CollectState,
  useEncryptedPublication,
  ProfileOwnedByMe,
  useActiveProfile
} from "@lens-protocol/react-web";
import { useRouter } from "next/router";
import { Skeleton } from "./ui/skeleton";
import ReactPlayer from 'react-player';
import { Paper, ActionIcon, Group, Tooltip, Avatar, Space, UnstyledButton, Text, Spoiler, Image, Center} from "@mantine/core";
import { IconCheck, IconHeart, IconHeartFilled, IconMessageCircle, IconMessageShare, IconScriptMinus, IconScriptPlus, IconStack3, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { GiMirrorMirror } from "react-icons/gi";
import { MediaRenderer } from "@thirdweb-dev/react";
import { Player } from "@livepeer/react";

type Props = {
  post: Post | Comment;
  activeProfile: ProfileOwnedByMe;
  className?: string;
};

// Currently only handle upvote
const reactionType = ReactionTypes.Upvote;

export default function Post({ post, className, activeProfile }: Props) {
  const router = useRouter();


  const mirror = useCreateMirror({
    publisher: activeProfile,
  });

  const collect = useCollect({
    collector: activeProfile,
    publication: post,
  });

  const react = useReaction({
    profileId: activeProfile?.id,
  });



  const [hasDecrypted, setHasDecrypted] = useState<boolean>(false);

  const encryptedPublication = useEncryptedPublication({
    publication: post,
  });

  // Either use the post, or if it has been decrypted, use the decrypted post
  const postToUse = useMemo(() => {
    if (hasDecrypted) {
      if (!encryptedPublication?.data) {
        return post;
      }

      if (encryptedPublication.isPending) {
        return post;
      }

      return encryptedPublication?.data;
    } else {
      return post;
    }
  }, [hasDecrypted, encryptedPublication, post]);

    const hasReaction = useMemo(() => {
    return react?.hasReaction({
      publication: postToUse,
      reactionType,
    });
  }, [react, postToUse]);

  const postMedia = useMemo(() => {
    return (
      postToUse?.metadata?.image ||
      postToUse?.metadata?.media?.[0]?.original?.url ||
      null
    );
  }, [postToUse]);

  // If can be decrypted by observer, do so by default
  useEffect(() => {
    if (hasDecrypted) return;

    if (post.isGated && post.canObserverDecrypt.result) {
      void encryptedPublication?.decrypt();
    }
  }, [post, hasDecrypted, encryptedPublication]);

  // When "pending" changes on the encrypted publication, set the hasDecrypted state
  useEffect(() => {
    if (hasDecrypted) return;

    if (
      encryptedPublication?.data &&
      encryptedPublication.isPending === false &&
      post.isGated &&
      post.canObserverDecrypt.result
    ) {
      setHasDecrypted(true);
    }
  }, [
    encryptedPublication,
    hasDecrypted,
    post.canObserverDecrypt.result,
    post.isGated,
  ]);

  async function handleReaction() {
    if (!react) return;

    if (!hasReaction) {
      await react.addReaction({
        publication: post,
        reactionType,
      });
    } else {
      await react.removeReaction({
        publication: post,
        reactionType,
      });
    }
  }

    const replaceURLs = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const atSymbolRegex = /(\S*@+\S*)/g;

    return text
      .replace(urlRegex, (url: string) => `<a href="${url}" target="_blank">${url}</a>`)
      .replace(atSymbolRegex, (match: string) => ` ${match} `);
  };

  return (
    <>
      <Paper shadow="xl" radius="md" withBorder >
        <Space h="xs"/>
        <Group grow>
      <Group justify="left">
         {postToUse.isGated && (
                  <Tooltip label={hasDecrypted
                        ? "Only followers can see this content."
                        : "This content is for followers only."}>
                      <Icons.gated
                        className="text-muted-foreground"
                        color={
                          hasDecrypted
                            ? "rgb(74 222 128)"
                            : "hsl(var(--muted-foreground))"
                        }
                      />
                  </Tooltip>
            )}
            </Group>
         <Group justify="right">
             <Text c="dimmed" size="xs" fw={500} mr={10}>{formatDate(postToUse.createdAt)} ago</Text>
          </Group>
</Group>
      <UnstyledButton component={Link} href={`/profile/${postToUse.profile.handle}`}>
        <Group justify="center">
        <Avatar
        // @ts-ignore
        src={postToUse.profile.picture?.original?.url || "/user.png"}
                  alt={`${
                    postToUse.profile.name || postToUse.profile.handle
                  }'s profile picture`}
        size="lg" 
        />

       
         <Text fw={500} >{postToUse.profile.name || postToUse.profile.handle}</Text>
         </Group>
      </UnstyledButton>
      <Space h="xl" />
       
           <Center>
      <Spoiler
                  maxHeight={222}
                  showLabel={
                    <>
                      <Space h="xs" />
                      <Tooltip label="Show More">
                        <IconScriptPlus />
                      </Tooltip>
                    </>
                  }
                  hideLabel={
                    <>
                      <Space h="xs" />
                      <Tooltip label="Show Less">
                        <IconScriptMinus />
                      </Tooltip>
                    </>
                  }
                >
                   
                   <div
          style={{
            maxWidth: "100%", // Adjust this value to control the maximum width
            margin: "0 auto", // Center the content horizontally if needed
          }}
        >
 {/* Post content */}
            {encryptedPublication?.isPending && (
              <Skeleton className="w-full h-20 mt-2" />
            )}

            {post.isGated && post.canObserverDecrypt.result === false ? (
                <Text size="md" fw={500}>
                  {`This is a followers-only exclusive. Follow ${
                    post.profile.name || post.profile.handle
                  } to see this content.`}
                </Text>
            ) : (
              !encryptedPublication?.isPending && (
                <Text
                size="md"
               style={{
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textAlign: "center",
            }}
                dangerouslySetInnerHTML={{
                  // @ts-ignore
                        __html: replaceURLs(postToUse.metadata.content.replace(/\n/g, "<br> ")),
                      }}
                />

              )
            )}
             
         </div>
             
                </Spoiler>
                </Center>
                <Space h="md"/>  
       

           

            {postMedia && (
          <Center>
          <Image
                        src={postToUse?.metadata?.media?.[0]?.small?.url}
                        radius="md"
                        h='auto'
                        w="auto"
                        fit="contain"
                      />
                     </Center>
            )}

        {postToUse.metadata.mainContentFocus === "VIDEO" && (
          <Center>
          <Player
                        src={postToUse?.metadata?.media?.[0]?.optimized?.url}

                      />
                     </Center>
            )}
             {postToUse.metadata.animatedUrl && (
         
          <iframe
      src={postToUse.metadata.animatedUrl}
      width="100%"
      height="600"
      
      maxWidth="100%"

                      />
                     
            )}
            <Space h="xl" />

            {/* Post metadata */}
            <Group justify="center" style={{ whiteSpace: 'nowrap' }}>
              {/* Comments - Take user to the post */}
                <Tooltip position="bottom" label="Comment">
              <ActionIcon
                variant="subtle"
                      radius="md"
                      size={36}
                onClick={(e) => {
                  router.push(`/post/${postToUse?.id}`);
                  e.stopPropagation();
                }}
              >
                <IconMessageCircle size={18} stroke={1.5} />
                
              </ActionIcon>
              </Tooltip>
                <Text size="xs" c="dimmed">
                  {postToUse?.stats?.commentsCount}
                  </Text>


              {/* Mirrors */}
              <Tooltip position="bottom" label="Mirror">
          <ActionIcon
  variant="subtle"
  radius="md"
  size={36}
  onClick={async (e) => {
    try {
      e.stopPropagation();
      if (activeProfile) { // Check if activeProfile.data is truthy
        await mirror?.execute({
          publication: postToUse,
        });
        notifications.show({
          title: "Post mirrored",
          icon: <IconCheck size="1.1rem" />,
          color: "green",
          message: `Successfully mirrored ${
            postToUse.profile.name || postToUse.profile.handle
          }'s post.`,
        });
      } else {
        // Handle the case when activeProfile.data is falsy (button disabled)
        notifications.show({
          title: "Error",
          icon: <IconX size="1.1rem" />,
          color: "red",
          message: `Login to mirror this post!`,
        });
      }
    } catch (error) {
      console.error(error);
      notifications.show({
          title: "Error",
          icon: <IconX size="1.1rem" />,
          color: "red",
          message: `Something Happened: ${error}`,
        });
    }
  }}
>
                <GiMirrorMirror size={18}/>
              </ActionIcon>
              </Tooltip>
               <Text size="xs" c="dimmed">
                  {postToUse?.stats?.totalAmountOfMirrors}
                </Text>

              {/* Hearts */}
                    <Tooltip position="bottom" label="Heart">
              <ActionIcon
               variant="subtle"
                      radius="md"
                      size={36}
             
                onClick={(e) => {
                  e.stopPropagation();
                  try {
                    if (!activeProfile) {
        notifications.show({
      title: "Error",
      icon: <IconX size="1.1rem" />,
      color: "red",
      message: `Login to like this post!`,
    });
        return; // Return early to prevent further execution
      }

                    handleReaction();
                    notifications.show({
          title: "Liked!",
          icon: <IconHeartFilled size="1.1rem" />,
          color: "blue",
          message: `You Liked ${
            postToUse.profile.handle || "Anon"
          }'s post. Keep it going!`,
        });
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
               

                {hasReaction ? (
  <IconHeartFilled size={18} stroke={1.5} />
) : (
  <IconHeart size={18} stroke={1.5} />
)}
               
                   
              </ActionIcon>
              </Tooltip>
                <Text size="xs" c="dimmed">
                  {postToUse?.stats?.totalUpvotes}
                  </Text>
 <Tooltip position="bottom" label="Collect">
              <ActionIcon
                      
                      variant="subtle"
                      radius="md"
                      size={36}
                
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    if (!activeProfile) {
        notifications.show({
      title: "Error",
      icon: <IconX size="1.1rem" />,
      color: "red",
      message: `Login to collect this post!`,
    });
        return; // Return early to prevent further execution
      }

                    switch (postToUse.collectPolicy.state) {
                      case CollectState.COLLECT_TIME_EXPIRED:
                        notifications.show({
      title: "Error: Post cannot be collected!",
      icon: <IconX size="1.1rem" />,
      color: "red",
      message: `The collection time has expired for this post.`,
    });
                     

                      case CollectState.COLLECT_LIMIT_REACHED:
                        notifications.show({
      title: "Error: Post cannot be collected!",
      icon: <IconX size="1.1rem" />,
      color: "red",
      message: `The collection limit has been reached for this post.`,
    });


                      case CollectState.NOT_A_FOLLOWER:
                        notifications.show({
      title: "Error: Post cannot be collected!",
      icon: <IconX size="1.1rem" />,
      color: "red",
      message: `You need to follow ${post.profile.name} to collect this post.`,
    });
                    
                      case CollectState.CANNOT_BE_COLLECTED:
                         notifications.show({
      title: "Error: Post cannot be collected!",
      icon: <IconX size="1.1rem" />,
      color: "red",
      message: `The creator of this post has disabled collections.`,
    });
            
                      case CollectState.CAN_BE_COLLECTED:
                        try {
                          const result = await collect?.execute();

                          if (result?.isFailure()) {
                            throw new Error(result.error.message);
                          }
                          notifications.show({
      title: "Success!",
      icon: <IconCheck size="1.1rem" />,
      color: "green",
      message: `You have collected ${postToUse.profile.name || postToUse.profile.handle}'s post`,
    });
  
                        } catch (error) {
                          console.error(error);
                          // TODO: Handle "InsufficientFundsError"
                           notifications.show({
      title: "Error: Post cannot be collected!",
      icon: <IconX size="1.1rem" />,
      color: "red",
      message: `Something went wrong collecting this post. Please try again later.`,
    });
                       
                        }
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                <IconStack3
                      size={18}
                      stroke={1.5}
                      />  
              </ActionIcon>
             </Tooltip>
              <Text size="xs" c="dimmed">
                  {postToUse?.stats?.totalAmountOfCollects}
              </Text>
            </Group>
         <Space h="lg"/>
       
      </Paper>
      <Space h="md"/>
    </>
  );
}
