import { useBookmarks, PostType } from "@lens-protocol/react-web";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Space,
  Center,
  Paper,
  Skeleton,
} from "@mantine/core";
import Post from "@/components/Post";

export const Bookmarks = () => {
    const bookmarks = useBookmarks();

    return(
        <>
         {!bookmarks.loading && bookmarks.data && (
                <InfiniteScroll
                  dataLength={bookmarks?.data?.length || 0}
                  next={() => bookmarks?.next()}
                  hasMore={bookmarks?.hasMore}
                  loader={
                    <>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <>
                          <Paper
                            p="xs"
                            shadow="xl"
                            radius="md"
                            withBorder
                            key={i}
                          >
                            <Space h="md" />
                            <Center>
                              <Skeleton height={50} circle mb="xl" />
                            </Center>
                            <Skeleton height={8} radius="xl" />
                            <Skeleton height={8} mt={6} radius="xl" />
                            <Skeleton
                              height={8}
                              mt={6}
                              width="70%"
                              radius="xl"
                            />
                            <Space h="md" />
                          </Paper>
                          <Space h="md" />
                        </>
                      ))}
                    </>
                  }
                  endMessage={<Space h={100} />}
                >
                  {// @ts-ignore post type
                  bookmarks?.data?.map((post, index) => (
                    <Post key={index} post={post} />
                  ))}
                </InfiniteScroll>
              )}
        
        </>
    )
}