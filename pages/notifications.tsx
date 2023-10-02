import {
    Space,
    Center,
    Text,
    Paper,
    Divider, 
    Container
  } from "@mantine/core";

export default function Notifications() {

    return(
        <>
        <Divider
        my="xs"
        label={
          <>
            <Text fw={444} fz="xl">
            Notifications
            </Text>
          </>
        }
        labelPosition="center"
      />

<Space h="lg"/>
<Container>
        <Paper shadow="xl" p="lg" withBorder>
        <Center>
          <Text c="dimmed" fw={700}>
            Coming Soon
          </Text>
        </Center>
        
        </Paper>
        </Container>
        </>
    )
}