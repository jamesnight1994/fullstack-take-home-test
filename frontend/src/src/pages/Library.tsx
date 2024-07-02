// src/components/Library.tsx
import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import { styled, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Book, { BookProps, BookType } from '../components/Book';
import Box from '@mui/material/Box';
import { Stack, Typography, Pagination, IconButton, Tooltip, Button, ButtonGroup, MobileStepper } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const Item = styled(Book)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const GET_BOOKS = gql`
  query($limit: Int, $offset: Int)  {
    total
    books (limit: $limit, offset: $offset) {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;


const Library = () => {
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(5);
  const [offset, setOffset] = React.useState(0);
  const theme = useTheme();

  // Calculate the offset whenever the page changes
  React.useEffect(() => {
    setOffset((page - 1) * limit);
  }, [page, limit]);

  const [activeStep, setActiveStep] = React.useState(1);

  const handleNext = () => {
    setPage((page) => page + 1);
  };

  const handleBack = () => {
    setPage((page) => page - 1);
  };



  const { loading, error, data } = useQuery(GET_BOOKS, {
    variables: { limit: limit, offset: offset }
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const totalPages = Math.ceil(data.total / limit)

  const readingLevels: string[] = ['12', 'gg', 'yy'];

  return (
    <Box sx={{ paddingTop: 9 }}>
      {readingLevels.map(readingLevel => (
        <Box key={readingLevel}>
          <Grid spacing={0.5} container rowSpacing={1}>
            {data.books.map((book: BookType, index: any) => (
              <Grid xs={10} sm={5} md={3} key={index}>
                <Item book={book} />
              </Grid>
            ))}
          </Grid>

          <MobileStepper
            variant="progress"
            steps={totalPages}
            position="static"
            activeStep={page}
            sx={{
              flexGrow: 1,
              maxWidth: 640, /* Can be in percentage also. */
              margin: "auto",
              padding: "10px",
              position: "relative"
            }}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={page === totalPages}>
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={page === 1}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      ))}

    </Box>
  );
};

export default Library;
