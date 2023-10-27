import {
    Space,
    Center,
    Text,
    Paper,
    Divider, 
    Container
  } from "@mantine/core";
import {
  useActiveProfile,
  useNotifications 
} from "@lens-protocol/react-web";

export default function Notifications() {
  const activeProfile = useActiveProfile();
 

        
  
  
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