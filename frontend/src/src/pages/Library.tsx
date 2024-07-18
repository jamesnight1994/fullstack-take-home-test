// src/components/Library.tsx
import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import { styled, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Book, { BookProps, BookType } from '../components/Book';
import Box from '@mui/material/Box';
import { Stack, Typography, Pagination, IconButton, Tooltip, Button, ButtonGroup, MobileStepper, Backdrop, CircularProgress } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import Books from '../components/Books';

const Item = styled(Book)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const GET_READINGLEVELS = gql`
  query {
    readingLevels
  }
`;


const Library = () => {
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(4);
  const [offset, setOffset] = React.useState(0);

  // Calculate the offset whenever the page changes
  React.useEffect(() => {
    setOffset((page - 1) * limit);
  }, [page, limit]);




  const { loading, error, data } = useQuery(GET_READINGLEVELS);


  if (loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (error) return <p>Error :</p>;

  const readingLevels: string[] = data.readingLevels

  return (
    <Box sx={{ paddingTop: 9 }}>
      {readingLevels.map(readingLevel => (
        <Books key={readingLevel} readingLevel={readingLevel} />
        
      ))}

    </Box>
  );
}

export default Library;
