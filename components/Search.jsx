import { ActionIcon, Modal, Button, TextInput, Space, useMantineTheme, Text } from "@mantine/core";
import { useState } from "react";
import { useRouter } from 'next/router';
import { TbUserSearch } from 'react-icons/tb';
import { BiSearchAlt } from 'react-icons/bi';

export const Search = (props) => {
 const router = useRouter();
  const theme = useMantineTheme();
  const [searchInput, setSearchInput] = useState(''); // State to store the user input
  const [error, setError] = useState(''); // State to store the error message

  const handleSearch = () => {
    if (searchInput.trim() === '') {
      setError('Please enter a Lens Handle.'); // Set an error message
      return; // Don't perform the search if the input is empty
    }

    // Clear any previous error
    setError('');

    // Use router.push to navigate to the profile page with the input value
    router.push(`/profile/${searchInput}`);
  };

  return (
    <>
      <TextInput
        ml={2}
        radius="md"
        size="md"
        placeholder="Search Lens Handle"
        variant="filled"
        value={searchInput} // Set the value of the input field
        onChange={(e) => {
          setSearchInput(e.target.value);
          // Clear the error when the user starts typing again
          setError('');
        }}
        error={error}
        leftSection={<BiSearchAlt size="1rem" />}
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="light"
            onClick={handleSearch} // Call handleSearch on button click
          >
            {theme.dir === 'ltr' ? (
              <TbUserSearch size="1.1rem" />
            ) : (
              <TbUserSearch size="1.1rem" />
            )}
          </ActionIcon>
        }
        rightSectionWidth={42}
      />
      
    </>
  );
};