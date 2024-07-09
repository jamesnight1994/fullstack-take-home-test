import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Box, Grid, MobileStepper, Button, useTheme, styled, Typography, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Book, { BookType } from './Book'
import { gql, useLazyQuery, useQuery } from '@apollo/client'

type BookProps = {
    readingLevel: string
}

const GET_BOOKS = gql`
    query($readingLevel: String, $limit: Int, $offset: Int)  {
        books (readingLevel: $readingLevel,limit: $limit, offset: $offset) {
            total
            books {
                title
                author
                coverPhotoURL
                readingLevel
            }
        }
    }
`;

function Books({ readingLevel }: BookProps) {
    const [books, setBooks] = useState<BookType[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [offset, setOffset] = useState(0);
    const theme = useTheme();

    const [getBooks, { error, data, loading }] = useLazyQuery(GET_BOOKS, {
        variables: { readingLevel, limit, offset },
        fetchPolicy: 'network-only'
    });

    React.useEffect(() => {
        if (data) {
            setTotalPages(Math.ceil(data.books.total / limit));
            setOffset((page - 1) * limit);
            setBooks(data.books.books);
        }

        getBooks();
    }, [data, page]);

    const handleNext = () => {
        setPage((page) => page + 1);
        getBooks();
    };

    const handleBack = () => {
        setPage((page) => page - 1);
    };

    const Item = styled(Book)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    if (error) return <>ERROR...</>;

    if (loading) return <>LOADING...</>;

    return (
        <Box sx={{ margin:"auto",paddingLeft: 5,border: '1px solid lightgrey' }}>
            <Box>
                <Typography sx={{
                border: '1px solid lightgrey',
                
                }} variant='h5'>
                    Reading Level: {readingLevel}


                    <Divider />
                </Typography>
            </Box>
            <Grid sx={{ marginTop: -8 }} spacing={10} container>
                {books.map((book: BookType, index: any) => (
                    <Grid item xs={12} sm={12} md={4} key={index}>
                        <Item book={book} />
                    </Grid>
                ))}
            </Grid>

            <MobileStepper
                variant="progress"
                steps={totalPages + 1}
                position="static"
                activeStep={page}
                sx={{
                    // flexGrow: 1,
                    height: 10,
                    maxWidth: 640, /* Can be in percentage also. */
                    marginTop: 5,
                    marginX: "30%",
                    padding: 2,
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
    )
}

export default Books